
// 'use client';
// import { useState, useEffect } from 'react';
// import RichEditor from '../RichEditor';

// export default function TemplateForm({ initialData, onSubmit }) {
//   const [formData, setFormData] = useState({
//     subject: '',
//     template: '',
//     templateType: '',
//     isActive: true
//   });

//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const handleEditorChange = (content) => {
//     setFormData(prev => ({
//       ...prev,
//       template: content
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <form
//     onSubmit={handleSubmit}
//     className="space-y-4 max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
//   >
//     <div>
//       <label className="block mb-2 text-gray-700 dark:text-gray-300">Subject</label>
//       <input
//         type="text"
//         name="subject"
//         value={formData.subject}
//         onChange={handleChange}
//         className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
//         required
//       />
//     </div>
  
//     <div>
//       <label className="block mb-2 text-gray-700 dark:text-gray-300">Template Type</label>
//       <input
//         type="text"
//         name="templateType"
//         value={formData.templateType}
//         onChange={handleChange}
//         className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
//         required
//       />
//     </div>
  
//     <div>
//       <label className="block mb-2 text-gray-700 dark:text-gray-300">Template Content</label>
//       <RichEditor
//         value={formData.template}
//         onChange={handleEditorChange}
//         className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg"
//       />
//     </div>
  
//     {initialData && (
//       <div className="flex items-center space-x-2">
//         <input
//           type="checkbox"
//           name="isActive"
//           checked={formData.isActive}
//           onChange={handleChange}
//           className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
//         />
//         <label className="text-gray-700 dark:text-gray-300">Active Template</label>
//       </div>
//     )}
  
//     <button
//       type="submit"
//       className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition duration-200"
//     >
//       Save Template
//     </button>
//   </form>
//   );
// }














// components/TemplateForm.jsx
'use client';
import { useState, useEffect } from 'react';
import RichEditor from '../RichEditor';

export default function TemplateForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    subject: '',
    template: '',
    templateType: '',
    isActive: true
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      template: content
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xlmax-w-full   mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
    >
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Subject</label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
    
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Template Type</label>
        <input
          type="text"
          name="templateType"
          value={formData.templateType}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
      </div>
    
      <div>
        <label className="block mb-2 text-gray-700 dark:text-gray-300">Template Content</label>
        <RichEditor
          value={formData.template}
          onChange={handleEditorChange}
          className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg"
        />
      </div>
    
      {initialData && (
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          />
          <label className="text-gray-700 dark:text-gray-300">Active Template</label>
        </div>
      )}
    
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-400 transition duration-200"
      >
        Save Template
      </button>
    </form>
  );
}
