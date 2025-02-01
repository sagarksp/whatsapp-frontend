"use client"
import { useState } from 'react';
import Link from 'next/link';

export default function SendMessage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sessionId = localStorage.getItem('sessionId');
    const devicePhone = localStorage.getItem('devicePhone'); // Assuming you store the device phone locally

    if (!sessionId || !devicePhone) {
      setStatus('Session not started. Please start the session first.');
      return;
    }

    if (!phoneNumber || !message) {
      setStatus('Please enter both phone number and message.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/device/connect/sendMessage', {
        method: 'POST',
        credentials:"include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, phoneNumber, message, devicePhone }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus('Message queued for sending.');
      } else {
        setStatus(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      setStatus('Failed to send message.');
    }
  };

  return (
    <div>
      <h1>Send Message</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Receiver Phone Number:
          <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>
        <br />
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        <br />
        <button type="submit">Send</button>
      </form>
      <p>{status}</p>
      <Link href="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}