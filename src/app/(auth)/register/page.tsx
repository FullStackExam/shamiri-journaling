import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';

export const metadata: Metadata = {
  title: 'Register | Personal Journal',
  description: 'Create a new personal journal account',
};

export default function RegisterPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RegisterForm />
    </div>
  );
}