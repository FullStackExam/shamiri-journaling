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
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check for token and fetch user profile on initial load
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
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
        localStorage.removeItem('access_token');
      });
  }, []);

  // Handle route protection as a separate effect
  useEffect(() => {
    // Skip redirect checks on initial render
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('access_token');
    const isAuthRoute = pathname === '/login' || pathname === '/register' || pathname === '/reset-password';
    const isProtectedRoute = 
      pathname.startsWith('/dashboard')
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

  const logout = () => {
    console.log("loging out...")
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
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