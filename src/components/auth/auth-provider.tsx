'use client';

import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check for token and fetch user profile on initial load
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    
    if (!token) {
      return;
    }

    // Fetch user profile
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(data => {
        setUser(data.user);
      })
      .catch(error => {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      });
  }, []);

  // Handle route protection as a separate effect
  useEffect(() => {
    // Skip redirect checks on initial render
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('auth_token');
    const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/reset-password';
    const isProtectedRoute = 
      pathname.startsWith('/dashboard') || 
      pathname.startsWith('/entries') || 
      pathname.startsWith('/categories') ||
      pathname.startsWith('/insights');
    
    // Redirect authenticated users away from auth routes
    if (token && isAuthRoute) {
      router.push('/dashboard');
      return;
    }
    
    // Redirect unauthenticated users away from protected routes
    if (!token && isProtectedRoute) {
      router.push('/login');
      return;
    }
  }, [pathname, router, user]);

  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    
    // Fetch user profile immediately
    fetch('/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        return response.json();
      })
      .then(data => {
        setUser(data.user);
        router.push('/dashboard');
      })
      .catch(error => {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      });
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}