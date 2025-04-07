'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { joinChatApi } from '@/lib/api';

const JoinForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');

  // Clear the username state when the component mounts
  useEffect(() => {
    setUsername('');
  }, []);

  // Handle the form submission
  async function handleJoin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const username = (formData.get('username') as string).trim();

    if (!username) {
      setError('Username cannot be empty.');
      setLoading(false);
      return;
    }

    try {


      const res = await joinChatApi(username);

      // console.log('Join response Code is :', res);
      if (res.code == 409) {
        setError(res.message);
        return; 
      
      }

      router.push(`/chat/${username}`);
    } catch (error) {
      console.error('Join error:', error);
      setError(error as string);
      setError('An error occurred while joining the chat. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleJoin}>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Choose a username
        </label>
        <Input
          type="text"
          id="username"
          name="username"
          value={username}
          required
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g., JohnDoe"
          disabled={loading}
        />
      </div>

      {error && (
        <div className="text-sm text-red-600 mb-4 p-3 bg-red-100 rounded-lg" aria-live="polite">
          {error}
        </div>
      )}

      <div className="text-xs text-gray-600 mb-4 p-3 bg-gray-100 rounded-lg">
        A minimum of 5 participants. Your username must be unique.
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Joining...' : 'Join Chat'}
      </Button>
    </form>
  );
};

export default JoinForm;