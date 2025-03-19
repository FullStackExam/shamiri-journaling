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
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check for token and fetch user profile on initial load
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        // Fetch user profile
        const response = await fetch('/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }

        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('auth_token');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Redirect logic for protected and auth-only routes
  useEffect(() => {
    if (isLoading) return;

    const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register'); // check reset password
    
    // Redirect authenticated users away from auth routes
    if (user && isAuthRoute) {
      router.push('/dashboard');
    }
    
    // Redirect unauthenticated users away from protected routes
    const isProtectedRoute = 
      pathname.startsWith('/dashboard') || 
      pathname.startsWith('/entries') || 
      pathname.startsWith('/categories') ||
      pathname.startsWith('/insights');
      
    if (!user && isProtectedRoute) {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  const login = (token: string) => {
    localStorage.setItem('auth_token', token);
    // Reload the page to trigger the auth check
    window.location.href = '/dashboard';
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
        isLoading,
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