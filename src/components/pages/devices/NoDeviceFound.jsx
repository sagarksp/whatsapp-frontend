// components/NoDevicesFound.jsx
import React from 'react';

const NoDevicesFound = ({searchTerm}) => (
    <div className="p-4 text-center text-gray-600 dark:text-gray-300">
        No devices found{searchTerm && ` matching "${searchTerm}"`}
    </div>
)
export default NoDevicesFound;