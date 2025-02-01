// components/ConnectionStatus.jsx
'use client';
import { useState, useEffect } from 'react';

export default function ConnectionStatus({ device, onClose }) {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const checkStatus = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/device/show/${device._id}`, {

        credentials:"include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setStatus(data.data.status);
        setError('');
      }
    } catch (err) {
      setError('Failed to fetch status');
    }
  };

  useEffect(() => {
    if (device) {
      checkStatus();
      const interval = setInterval(checkStatus, 5000);
      return () => clearInterval(interval);
    }
  }, [device]);

  if (!device) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Connection Status</h2>
        
        {error && <div className="text-red-500 mb-2 text-sm">{error}</div>}

        <div className="space-y-2 mb-4">
          <p><span className="font-semibold">Device:</span> {device.deviceName}</p>
          <p><span className="font-semibold">Phone:</span> {device.devicePhone}</p>
          <p>
            <span className="font-semibold">Status:</span> {' '}
            <span className={`${status === 'online' ? 'text-green-600' : 'text-red-600'}`}>
              {status || 'Checking...'}
            </span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};