// components/PageHeader.jsx
import React from 'react';

const PageHeader = ({ onAddDevice }) => (
    <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Device Management
        </h1>
        <button
            onClick={onAddDevice}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
        >
            Add New Device
        </button>
    </div>
);

export default PageHeader;