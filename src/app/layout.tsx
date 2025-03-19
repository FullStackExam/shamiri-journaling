import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner'
import './globals.css';
import { AuthProvider } from '@/components/auth/auth-provider';
import { MainNav } from '@/components/layout/main-nav';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personal Journal App',
  description: 'Record, organize, and gain insights from your personal journal',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <MainNav />
            <main className="flex-1">
              {children}
            </main>
            <footer className="py-6 border-t">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Personal Journal App
              </div>
            </footer>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
