"use client"

import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/register-form';
import { useEffect } from 'react';


export default function RegisterPage() {
  // useEffect(() => {
  //   // Call the API route to set the CSRF token when the page loads
  //   const fetchCSRFToken = async () => {
  //     await fetch('/api/auth/csrf', {
  //       method: 'GET',
  //       credentials: 'include', // Include cookies in the request to set the CSRF token
  //     });
  //   };

  //   fetchCSRFToken();
  // }, []);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <RegisterForm />
    </div>
  );
}
