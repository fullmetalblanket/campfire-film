// app/auth/signup/page.js

'use client'

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
import NavLink from '@/components/nav/NavLink';
import FeedbackMessage from '@/components/ui/FeedbackMessage';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // First, try to create the user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong during sign up');
      }

      // If user creation was successful, attempt to sign in
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        // If there's an error during sign-in, we'll show it but not throw an error
        setError(`Account created successfully, but there was an issue signing in: ${result.error}. Please try logging in.`);
      } else {
        // Redirect to profile page or dashboard
        router.push('/user/dashboard');
      }
    } catch (error) {
      setError(error.message);
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    signIn('google', { callbackUrl: '/user/dashboard' });
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      {/* <p className="text-2xl mb-7">Get one <span className="font-bold">FREE</span> report when you sign up.</p> */}


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
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>
        {/* <div className="mt-4">
          <button 
            onClick={handleGoogleSignUp} 
            className="w-full bg-red-500 text-white py-2 rounded disabled:bg-red-300"
            disabled={isLoading}
          >
            Sign Up with Google
          </button>
        </div> */}
        <div className="text-center mt-8">
          <NavLink href="/auth/login">login</NavLink>
        </div>
      </Container>
    </PageContainer>
  );
}