'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/auth-provider';
import { Button } from '@/components/ui/button';

export function MainNav() {
  const { user, isLoading, logout } = useAuth();
  const pathname = usePathname();
  
  // Don't show nav on auth pages
  const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/register'); // check reset, forgot etc
  if (isAuthPage) return null;
  
  // Items to show when logged in
  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/entries', label: 'Entries' },
    { href: '/categories', label: 'Categories' },
    { href: '/insights', label: 'Insights' },
  ];

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl">
              Journal App
            </Link>
            
            {user && !isLoading && (
              <nav className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href
                        ? 'text-foreground font-semibold'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-10 w-20 bg-muted animate-pulse rounded" />
            ) : user ? (
              <div className="flex items-center gap-4">
                <div className="text-sm hidden md:block">
                  <span className="text-muted-foreground">Logged in as </span>
                  <span className="font-medium">{user.name}</span>
                </div>
                <Button variant="outline" onClick={logout}>
                  Logout
                </Button>
                <Button asChild>
                  <Link href="/entries/new">New Entry</Link>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}