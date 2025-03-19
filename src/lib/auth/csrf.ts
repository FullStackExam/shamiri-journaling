import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Utility function to generate a random CSRF token
export function generateCSRFToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Function to set CSRF token in the response cookies
export function setCSRFToken(): NextResponse {
    const csrfToken = generateCSRFToken();
  
    const response = NextResponse.json({ csrfToken });
  
    // Set CSRF token as HttpOnly cookie
    response.cookies.set(process.env.CSRF_COOKIE_NAME || "csrfToken", csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
    });
  
    return response;
  }