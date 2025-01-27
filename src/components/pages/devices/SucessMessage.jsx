// components/SuccessMessage.jsx
import React from 'react';


const SuccessMessage = ({ success }) =>
    success ? (
        <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
            {success}
        </div>
    ) : null;

export default SuccessMessage;