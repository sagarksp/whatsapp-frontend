// components/RichEditor.jsx
'use client';
import { useState, useEffect } from 'react';
import JoditEditor from 'jodit-react';

export default function RichEditor({ value, onChange }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="min-h-[300px] border rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700" />;

  return (
    <div className="border rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 p-4">
      <JoditEditor
        value={value}
        onBlur={(newContent) => onChange(newContent)}
        config={{
          theme: 'default',
          minHeight: 300,
          toolbarAdaptive: false,
          style: {
            backgroundColor: 'white',
            color: 'black',
          },
        }}
        className="w-full text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
      />
    </div>
  );
}
