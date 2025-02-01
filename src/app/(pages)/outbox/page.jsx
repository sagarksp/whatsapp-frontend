'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function OutboxPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/api/message-tracker/?page=${currentPage}`,{ credentials:"include",});
        if (!response.ok) throw new Error('Failed to fetch messages');

        const result = await response.json();
        if (result.success && result.data) {
          setData(result.data);
          setPagination(result.pagination || { totalPages: 1 });
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [currentPage]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        const response = await fetch(`${backendUrl}/api/message-tracker/${id}`, {
          method: 'DELETE',
          credentials:"include",
        });
        if (!response.ok) throw new Error('Failed to delete message');
        setData((prevData) => prevData.filter((item) => item._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Outbox Messages</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-black">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4 border">Job ID</th>
              <th className="py-2 px-4 border">Sender ID</th>
              <th className="py-2 px-4 border">Receiver ID</th>
              <th className="py-2 px-4 border">Message</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="py-2 px-4 border">{item.jobId}</td>
                  <td className="py-2 px-4 border">{item.senderId}</td>
                  <td className="py-2 px-4 border">{item.receiverId}</td>
                  <td className="py-2 px-4 border">{item.message}</td>
                  <td className="py-2 px-4 border">
                    <span
                      className={`px-2 py-1 text-sm rounded ${
                        item.status === 'sent' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border">{new Date(item.createdAt).toLocaleDateString()}</td>
                  {/* <td className="py-2 px-4 border space-x-2">
                    <Link href={`/outbox/${item._id}`} className="text-blue-500 hover:underline">
                      View
                    </Link>
                    <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-4 text-center text-gray-500">
                  No messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {pagination.totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentPage === pagination.totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
