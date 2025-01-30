'use client';
import { useEffect, useState } from 'react';
import { fetchOutbox, deleteOutboxItem } from '@/utils/api2';
import Link from 'next/link';

export default function OutboxPage() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data: resData, pagination: resPagination } = await fetchOutbox(currentPage);
        setData(resData);
        setPagination(resPagination);
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
        await deleteOutboxItem(id);
        setData(data.filter(item => item._id !== id));
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
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Subject</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border-b">{item.subject}</td>
                <td className="py-2 px-4 border-b">{item.status}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <Link
                    href={`/outbox/${item._id}`}
                    className="mr-2 text-blue-500 hover:text-blue-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
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
        <span>Page {currentPage} of {pagination.totalPages}</span>
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