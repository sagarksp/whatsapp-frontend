// app/sessions/[sessionId]/page.jsx
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

export default function SessionPage({ params }) {
  const { sessionId } = params;
  const [qrCode, setQrCode] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const socket = io('http://localhost:8000');
    
    socket.emit('join-session', sessionId);

    socket.on('connect', () => {
      console.log('Socket connected:', socket.id);
      setIsLoading(false);
    });

    socket.on('qr-code', (qr) => {
      setQrCode(qr);
      setError('');
      setIsLoading(false);
    });

    socket.on('connected', () => {
      setIsConnected(true);
      localStorage.setItem('isConnected', 'true');
      setQrCode('');
      setError('');
    });

    socket.on('groups-data', (groups) => {
      // Handle groups data if needed
    });

    socket.on('logout-success', () => {
      localStorage.removeItem('sessionId');
      localStorage.removeItem('isConnected');
      router.push('/devices');
    });

    socket.on('error', (errorMsg) => {
      setError(errorMsg);
      setIsLoading(false);
    });

    return () => socket.disconnect();
  }, [sessionId, router]);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/device/connect/logout', {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ sessionId }),
      });
      
      const data = await res.json();
      if (!data.success) setError(data.error);
    } catch (err) {
      setError('Logout failed');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Session Management</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {isLoading && (
        <div className="mt-4 p-4 border rounded">
          <p className="text-gray-600">Initializing session...</p>
        </div>
      )}

      {!isConnected && qrCode && (
        <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-4">Scan QR Code</h2>
          <div 
            className="qr-container mx-auto"
            dangerouslySetInnerHTML={{ __html: qrCode }}
            style={{ width: '256px', height: '256px' }}
          />
        </div>
      )}

      {isConnected && (
        <div className="mt-4 p-4 border rounded space-y-4">
          <h2 className="text-lg font-semibold">✅ Successfully Connected!</h2>
          
          <div className="flex gap-4">
            <button
              onClick={() => router.push('/devices')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Return to Devices
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}