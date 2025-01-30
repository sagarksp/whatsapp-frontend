'use client';
import { useEffect, useState } from 'react';
import { getOutboxItem } from '@/utils/api2';
import Link from 'next/link';
import { fetcher } from '@/utils/api';

export default function OutboxDetail({ params }) {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await getOutboxItem(params.id);
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [params.id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!item) return <div className="p-4">Item not found</div>;

  return (
    <div className="container mx-auto p-4">
      <Link href="/outbox" className="mb-4 inline-block text-blue-500 hover:text-blue-700">
        ← Back to Outbox
      </Link>
      <h1 className="text-2xl font-bold mb-4">Message Details</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label className="font-semibold">Subject:</label>
          <p className="mt-1">{item.subject}</p>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Status:</label>
          <p className="mt-1">{item.status}</p>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Content:</label>
          <p className="mt-1 whitespace-pre-wrap">{item.content}</p>
        </div>
        <div className="mb-4">
          <label className="font-semibold">Date:</label>
          <p className="mt-1">
            {new Date(item.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}