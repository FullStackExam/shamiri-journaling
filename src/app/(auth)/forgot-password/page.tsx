import { Metadata } from 'next';
import ForgotPasswordForm from '@/components/auth/forgot-password';

export const metadata: Metadata = {
  title: 'Forgot Password | Personal Journal',
  description: 'Reset your personal journal account password',
};

export default function ForgotPasswordPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <ForgotPasswordForm />
    </div>
  );
}