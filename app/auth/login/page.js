'use client'

import { useState, useEffect, useRef } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
import NavLink from '@/components/nav/NavLink';
import FeedbackMessage from '@/components/ui/FeedbackMessage';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import Button from '@/components/ui/Button';

const userRoutes = [
  '/user',
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (status === 'authenticated') {
      console.log('login page')
      const from = new URLSearchParams(window.location.search).get('from');
      const isUserRoute = userRoutes.includes(from);
      const callbackUrl = isUserRoute && from || '/';
      router.push(callbackUrl);
    }
  }, [status, router]);

  useEffect(() => {
    const errorFromParams = new URLSearchParams(window.location.search).get('error');
    if (errorFromParams) {
      setError(getErrorMessage(errorFromParams));
    }
  }, []);

  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'CredentialsSignin':
        return 'Invalid email or password. Please try again.';
      case 'EmailNotFound':
        return 'No account found with this email. Please sign up.';
      default:
        return 'An error occurred during login. Please try again.';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError(getErrorMessage(result.error));
      } else if (result.ok) {
        router.push('/user/dashboard');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setError('');
    setIsLoading(true);
    const callbackUrl = new URLSearchParams(window.location.search).get('from') || '/user/dashboard';
    signIn('google', { callbackUrl });
  };

  if (status === 'loading') {
    return <PageContainer><LoadingOverlay text="loading login..." /></PageContainer>;
  }

  if (status === 'authenticated') {
    return <PageContainer><LoadingOverlay text="loading dashboard..." /></PageContainer>;
  }

  return (
    <PageContainer>
      {error && (
        <FeedbackMessage variant="error">
          <span className="block sm:inline">{error}</span>
        </FeedbackMessage>
      )}
      <Container>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              ref={emailInputRef}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded border-slate-400 bg-gray-700"
              disabled={isLoading}
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mb-2 w-full px-3 py-2 border border-slate-400 rounded bg-gray-700"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        <div className="text-center mt-8">
          <NavLink href="/auth/signup" className="mb-4" mobile>sign up</NavLink>
          <NavLink href="/auth/forgot-password" mobile>forgot password?</NavLink>
        </div>
      </Container>
    </PageContainer>
  );
}