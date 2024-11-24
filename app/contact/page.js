'use client';

import { useState } from 'react';
import PageContainer from '@/components/layout/PageContainer';
import Container from '@/components/layout/Container';
import FeedbackMessage from '@/components/ui/FeedbackMessage';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-7 md:pl-3 text-gray-200">Contact Me</h1>
      
      {status === 'success' && (
        <FeedbackMessage variant="success">Your message has been sent successfully!</FeedbackMessage>
      )}
      {status === 'error' && (
        <FeedbackMessage variant="error">There was an error sending your message. Please try again.</FeedbackMessage>
      )}

      <Container>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-400 rounded bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-400 rounded bg-gray-700"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-3 py-2 border border-slate-400 rounded bg-gray-700"
              rows="4"
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-blue-300"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </Container>
    </PageContainer>
  );
}
