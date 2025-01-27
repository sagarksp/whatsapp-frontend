"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import io from 'socket.io-client';
import QRCodeStyling from 'qr-code-styling';

const WhatsAppIntegration = () => {
  const router = useRouter();
  const [sessionId, setSessionId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [qrData, setQrData] = useState('');
  const [groups, setGroups] = useState([]);
  const [status, setStatus] = useState('Initializing...');
  const qrRef = useRef(null);
  const qrInstance = useRef(null);
  const socketRef = useRef(null);

  // Initialize QR code
  useEffect(() => {
    qrInstance.current = new QRCodeStyling({
      width: 256,
      height: 256,
      type: 'canvas',
      dotsOptions: {
        color: '#2563eb',
        type: 'rounded'
      },
      backgroundOptions: {
        color: '#f8fafc',
      },
      cornersSquareOptions: {
        type: 'extra-rounded',
        color: '#1e40af'
      }
    });

    return () => {
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
    };
  }, []);

  // Handle QR code updates
  useEffect(() => {
    if (qrData && qrInstance.current && qrRef.current) {
      qrRef.current.innerHTML = '';
      qrInstance.current.update({ data: qrData });
      qrInstance.current.append(qrRef.current);
    }
  }, [qrData]);

  // Initialize WebSocket connection
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    socketRef.current = io('http://localhost:8000', {
      auth: { token }
    });

    // Load existing session
    const savedSessionId = localStorage.getItem('sessionId');
    const isConnected = localStorage.getItem('isConnected') === 'true';

    if (savedSessionId && isConnected) {
      setSessionId(savedSessionId);
      setIsConnected(true);
      setStatus('Reconnected to existing session');
    }

    // Socket event handlers
    socketRef.current.on('connect', () => {
      setStatus('Connected to server');
    });

    socketRef.current.on('qr-code', (qr) => {
      setQrData(qr);
      setStatus('Scan QR code to connect');
    });

    socketRef.current.on('connected', (message) => {
      setIsConnected(true);
      setQrData('');
      setStatus(message);
      localStorage.setItem('isConnected', 'true');
    });

    socketRef.current.on('error', (error) => {
      console.error('Socket error:', error);
      setStatus(error.message);
    });

    socketRef.current.on('disconnect', () => {
      setStatus('Disconnected from server');
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [router]);

  const startSession = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const session = localStorage.getItem('sessionId') || socketRef.current?.id;
      const response = await fetch('http://localhost:8000/api/device/connect/startSession', {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId: session }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to start session');
      }

      setSessionId(data.sessionId);
      localStorage.setItem('sessionId', data.sessionId);
      setIsConnected(true);
      setStatus('Session started successfully');

    } catch (error) {
      console.error('Session error:', error);
      setStatus(error.message);
      
      if (error.message.includes('unauthorized')) {
        localStorage.removeItem('token');
        
      }
    }
  };

  const sendMessage = async () => {
    if (!phoneNumber || !message) {
      setStatus('Please enter both phone number and message');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/device/connect/send-message', {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          sessionId,
          phoneNumber,
          message,
          deptType: "67823f62488dc80b1dd316ee"
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setStatus('Message sent successfully');
      setMessage('');

    } catch (error) {
      console.error('Message error:', error);
      setStatus(error.message);
    }
  };

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/device/connect/fetch-groups', {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch groups');
      }

      setGroups(data.groups || []);
      setStatus('Groups fetched successfully');

    } catch (error) {
      console.error('Group fetch error:', error);
      setStatus(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:8000/api/device/connect/logout', {
        method: 'POST',
        credentials:"include",
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId }),
      });
    } finally {
      // Clear all session data
      localStorage.removeItem('sessionId');
      localStorage.removeItem('isConnected');
      setSessionId('');
      setIsConnected(false);
      setStatus('Logged out successfully');
      setGroups([]);
      
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
      }
      
      // Redirect to login if no token
      if (!localStorage.getItem('token')) {
        router.push('/login');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">WhatsApp Integration</h1>
          <p className="mt-2 text-gray-600">Manage your WhatsApp connections</p>
        </div>

        {/* Status Card */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Current Status:</p>
          <p className={`mt-1 text-lg ${
            status.includes('success') ? 'text-green-600' : 
            status.includes('error') ? 'text-red-600' : 'text-blue-600'
          }`}>
            {status}
          </p>
        </div>

        {/* Connection Section */}
        {!isConnected ? (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
            <div className="space-y-4">
              <button
                onClick={startSession}
                disabled={!!qrData}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                  qrData ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {qrData ? 'Awaiting QR Scan...' : 'Start New Session'}
              </button>
              
              {qrData && (
                <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                  <div ref={qrRef} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Message Form */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <input
                type="text"
                placeholder="Phone number with country code (+1234567890)"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              
              <button
                onClick={sendMessage}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Send Message
              </button>
            </div>

            {/* Groups Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
              <button
                onClick={fetchGroups}
                className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Fetch WhatsApp Groups
              </button>
              
              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">ID: {group.id}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full py-3 px-6 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WhatsAppIntegration;