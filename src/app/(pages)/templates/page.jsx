// app/templates/page.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetcher } from '@/utils/api';

export default function TemplatesList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;
  
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetcher(
          `http://localhost:8000/api/template?page=${page}&limit=${limit}&isActive=${searchParams.get('isActive') || 'true'}`
        );
        setData(result.data);
        setPagination(result.paginate);
      } catch (error) {
        console.error('Error loading templates:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page, limit, searchParams]);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        await fetcher(`http://localhost:8000/api/template/delete/${id}`, { method: 'DELETE' });
        router.refresh();
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 -mt-20 max-w-full dark:bg-gray-800 dark:text-white transition-colors duration-300">

        {/* Header Section */}
      <div className="flex justify-between items-center mb-6  ">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">Templates</h1>
        <button
          onClick={() => router.push('/templates/create')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      ) : (
        <>
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto  shadow-md rounded">
            <table className="min-w-full bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-600  text-sm sm:text-base">
              <thead className="bg-gray-50 dark:bg-gray-600 dark:text-gray-200">
                <tr>
                  <th className="py-3 text-left text-gray-900  dark:text-gray-200 font-semibold  px-4">Subject</th>
                  <th className="py-3 text-left text-gray-900  dark:text-gray-200 font-semibold  px-4">Type</th>
                  <th className="py-3 text-left text-gray-900  dark:text-gray-200 font-semibold  px-4">Status</th>
                  <th className="py-3 text-left text-gray-900  dark:text-gray-200 font-semibold  px-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600  ">
                {data.map((template) => (
                  <tr key={template._id} className="hover:bg-gray-100 dark:hover:bg-gray-800  ">
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{template.subject}</td>
                    <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{template.templateType}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded  font-medium ${
                          template.isActive
                            ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100'
                        }`}
                      >
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4 space-x-2 flex items-center">
                        <button
                          onClick={() => router.push(`/templates/edit/${template._id}`)}
                          className="text-blue-500 hover:underline dark:text-blue-400"
                        >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(template._id)}
                            className="text-red-500 hover:underline dark:text-red-400"
                          >
                          Delete
                        </button>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Section */}
          <div className="mt-4 flex justify-between items-center">
            <div className="space-x-2">
              <button
                disabled={page <= 1}
                onClick={() => router.push(`/templates?page=${page - 1}&limit=${limit}`)}
                 className={`px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 transition-colors duration-200 ${page <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                Previous
              </button>
              <button
                 disabled={page * limit >= pagination.total}
                onClick={() => router.push(`/templates?page=${page + 1}&limit=${limit}`)}
                 className={`px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200 transition-colors duration-200 ${page * limit >= pagination.total ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                Next
              </button>
            </div>
            <span className="text-gray-700 dark:text-gray-300">Page {page} of {Math.ceil(pagination.total / limit)}</span>
          </div>
        </>
      )}
    </div>
  );
}