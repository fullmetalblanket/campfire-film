'use client'

import { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
import NavLink from '@/components/nav/NavLink';
import FeedbackMessage from '@/components/ui/FeedbackMessage';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

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

  useEffect(() => {
    if (status === 'authenticated') {
      const from = new URLSearchParams(window.location.search).get('from');
      const isUserRoute = userRoutes.includes(from);
      console.log('isUserRoute:', isUserRoute);
      const callbackUrl = isUserRoute && from || '/user/dashboard';
      console.log('Redirecting to:', callbackUrl);
      router.push(callbackUrl);
    }
  }, [status, router]);

  useEffect(() => {
    const errorFromParams = new URLSearchParams(window.location.search).get('error');
    if (errorFromParams) {
      setError(getErrorMessage(errorFromParams));
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
      console.log('Attempting to sign in');
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      console.log('Sign in result:', result);

      if (result.error) {
        setError(getErrorMessage(result.error));
      } else if (result.ok) {
        console.log('Sign in successful');
        router.push('/user/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
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
    return <PageContainer><LoadingOverlay text="loading..." /></PageContainer>;
  }

  if (status === 'authenticated') {
    return <PageContainer><LoadingOverlay text="loading dashboard..." /></PageContainer>;
  }

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-7">Log In</h1>

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
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
              className="w-full px-3 py-2 border rounded"
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        {/* Uncomment if you want to enable Google Sign-In
        <div className="mt-4">
          <button 
            onClick={handleGoogleSignIn} 
            className="w-full bg-red-500 text-white py-2 rounded disabled:bg-red-300"
            disabled={isLoading}
          >
            Log In with Google
          </button>
        </div>
        */}
        <div className="text-center mt-8">
          <NavLink href="/auth/signup" className="mb-4" mobile>sign up</NavLink>
          <NavLink href="/auth/forgot-password" mobile>forgot password?</NavLink>
        </div>
      </Container>
    </PageContainer>
  );
}