// app/templates/create/page.js
'use client';
import { useRouter } from 'next/navigation';
import { fetcher } from '@/utils/api';
import TemplateForm from '@/components/pages/TemplateForm';

export default function CreateTemplate() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      await fetcher('http://localhost:8000/api/template/create', {
        method: 'POST',
        
        body: JSON.stringify(formData)
      });
      router.push('/templates');
    } catch (error) {
      alert('Error creating template: ' + error.message);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2 text-center -mt-24 text-black">Create New Template</h1>
      <TemplateForm onSubmit={handleSubmit} />
    </div>
  );
}