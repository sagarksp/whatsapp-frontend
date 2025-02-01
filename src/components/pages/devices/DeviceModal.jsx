// components/DeviceModal.jsx
import React from 'react';

const DeviceModal = ({ isOpen, onClose, newDevice, onDeviceChange, onCreateDevice }) => (
    isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md animate-slideUp">
                <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                        New Device
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Device Name
                        </label>
                        <input
                            type="text"
                            value={newDevice.deviceName}
                            onChange={(e) =>
                                onDeviceChange({ ...newDevice, deviceName: e.target.value })
                            }
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Enter device name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={newDevice.devicePhone}
                            onChange={(e) =>
                                onDeviceChange({ ...newDevice, devicePhone: e.target.value })
                            }
                            className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                            placeholder="Enter phone number"
                        />
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={onCreateDevice}
                            className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white p-3 rounded-lg font-semibold transition-all duration-300"
                        >
                            Create Device
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-3 rounded-lg font-semibold transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
);

export default DeviceModal;