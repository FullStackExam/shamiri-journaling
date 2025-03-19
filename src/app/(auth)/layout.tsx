import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold">Personal Journal</h1>
              <p className="text-sm text-muted-foreground mt-1">Record, organize, and gain insights from your journal entries</p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}