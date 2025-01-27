import React from 'react';

const DeviceList = ({
  currentDevices,
  setSelectedDevice,
  fetchDeviceDetails,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            {[
              "Device Name",
              "Phone",
              "Status",
              "API Token",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="p-4 text-left text-gray-600 dark:text-gray-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentDevices.map((device) => (
            <tr
              key={device._id}
              className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
            >
              <td className="p-4 text-gray-800 dark:text-gray-200">
                {device.deviceName}
              </td>
              <td className="p-4 text-gray-800 dark:text-gray-200">
                {device.devicePhone}
              </td>
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    device.status.toLowerCase() === "online"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {device.status}
                </span>
              </td>
              <td className="p-4 text-blue-600 dark:text-blue-400 break-all">
                {device.apiToken}
              </td>
              <td className="p-4">
                <button
                  onClick={() => {
                    setSelectedDevice(device._id);
                    fetchDeviceDetails(device._id);
                  }}
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;