// components/ErrorMessage.jsx
import React from 'react';

const ErrorMessage = ({ error }) =>
    error ? (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
            Error: {error}
        </div>
    ) : null;

export default ErrorMessage;