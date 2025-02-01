'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function MessageDetail() {
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!id) return;

    const fetchMessage = async () => {
      try {
        console.log(`Fetching message ID: ${id}`); // Debugging log
        const response = await fetch(`${backendUrl}/api/message-tracker/${id}`);
        
        if (response.status === 404) {
          setError('Message not found');
          return;
        }

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setMessage(result);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMessage();
  }, [id]);

  if (!id) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!message) return <div className="p-4">Loading message...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Message Details</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <p><strong>Job ID:</strong> {message.jobId}</p>
        <p><strong>Sender ID:</strong> {message.senderId}</p>
        <p><strong>Receiver ID:</strong> {message.receiverId}</p>
        <p><strong>Message:</strong> {message.message}</p>
        <p><strong>Status:</strong> {message.status}</p>
        <p><strong>Created At:</strong> {new Date(message.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
