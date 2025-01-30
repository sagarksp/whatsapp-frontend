
'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetcher } from '@/utils/api';
import TemplateForm from '@/components/pages/TemplateForm';

export default function EditTemplate() {
  const { id } = useParams();
  const router = useRouter();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch template data
  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const { success, data, message } = await fetcher(
          `http://localhost:8000/api/template/show/${id}`
        );
        console.log("jdsbkjbfosiughfskbfksbdflkj")
        
        if (success) {
          setTemplate(data);
        } else {
          setError(message || 'Failed to load template');
          router.push('/templates');
        }
      } catch (error) {
        setError(error.message);
        router.push('/templates');
      } finally {
        setLoading(false);
      }
    };
    fetchTemplate();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (formData) => {
    try {
      setError('');
      const { success, data, message } = await fetcher(
        `http://localhost:8000/api/template/update/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify(formData)
        }
      );

      if (success) {
        router.push('/templates');
        router.refresh();
      } else {
        setError(message || 'Failed to update template');
      }
    } catch (error) {
      setError(
        error.response?.data?.message || 
        error.message || 
        'An error occurred while updating the template'
      );
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Loading template data...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={() => router.push('/templates')}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
        >
          Back to Templates
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-center -mt-24 text-black">Edit Template</h1>
      {template && (
        <TemplateForm 
          initialData={template}
          onSubmit={handleSubmit}
          key={template._id} // Force re-render on data change
        />
      )}
    </div>
  );
}