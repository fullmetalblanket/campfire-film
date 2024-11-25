'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
import NavLink from '@/components/nav/NavLink';

// This component will use useSearchParams and handle the form submission
function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const emailParam = searchParams.get('email');
    const tokenParam = searchParams.get('token');
    console.log('Email from URL:', emailParam);
    console.log('Token from URL:', tokenParam);
    if (emailParam && tokenParam) {
      setEmail(emailParam);
      setToken(tokenParam);
    } else {
      setError('Invalid reset password link. Please request a new one.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');

    try {
      console.log('Sending reset password request');
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setMessage(data.message);
      
      if (status === 'authenticated') {
        console.log('Logging out user');
        await signOut({ redirect: false });
      }
      
      console.log('Redirecting to login page');
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err) {
      console.error('Password reset error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error && !email && !token) {
    return (
      <div>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
        <div className="text-center mt-8">
          <NavLink href="/auth/forgot-password">Request a new reset link</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div>
      {status === 'authenticated' && session?.user?.email !== email && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">
            You are currently logged in as {session.user.email}. This password reset is for {email}. 
            You will be logged out after resetting the password.
          </span>
        </div>
      )}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="newPassword" className="block mb-2">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300"
          disabled={isLoading || !email || !token}
        >
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>
      <div className="text-center mt-8">
        <NavLink href="/auth/login">Back to Login</NavLink>
      </div>
    </div>
  );
}

// This is the main component that will be rendered
export default function ResetPasswordPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-7">Reset Password</h1>
      <Container>
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </Container>
    </PageContainer>
  );
}