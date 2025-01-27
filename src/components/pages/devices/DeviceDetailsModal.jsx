// import React from 'react';
// import DetailItem from './DetailItem';

// const DeviceDetailsModal = ({ deviceDetails, detailsLoading, onClose }) => (
//   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
//     <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-2xl animate-slideUp">
//       <div className="flex justify-between items-start mb-6">
//         <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
//           Device Details
//         </h2>
//         <button
//           onClick={onClose}
//           className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
//         >
//           ×
//         </button>
//       </div>

//       {detailsLoading ? (
//         <div className="text-center py-4">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
//         </div>
//       ) : (
//         deviceDetails && (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <DetailItem
//               label="Device Name"
//               value={deviceDetails.deviceName}
//             />
//             <DetailItem
//               label="Phone Number"
//               value={deviceDetails.devicePhone}
//             />
//             <DetailItem
//               label="Status"
//               value={deviceDetails.status}
//               status={deviceDetails.status === "online"}
//             />
//             <DetailItem label="API Token" value={deviceDetails.apiToken} />
//             <DetailItem
//               label="Created At"
//               value={new Date(deviceDetails.createdAt).toLocaleString()}
//             />
//             <DetailItem
//               label="Last Updated"
//               value={new Date(deviceDetails.updatedAt).toLocaleString()}
//             />
//           </div>
//         )
//       )}

//       <div className="mt-6">
//         <button
//           onClick={onClose}
//           className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300"
//         >
//           Close Details
//         </button>
//       </div>
//     </div>
//   </div>
// );

// export default DeviceDetailsModal;














// components/DeviceDetailsModal.jsx
import React from "react";
import DetailItem from "./DetailItem";

const DeviceDetailsModal = ({ deviceDetails, detailsLoading, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-2xl animate-slideUp">
            <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Device Details
                </h2>
                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
                >
                    ×
                </button>
            </div>

            {detailsLoading ? (
                <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                </div>
            ) : (
                deviceDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <DetailItem
                label="Device Name"
                value={deviceDetails.deviceName}
              />
              <DetailItem
                label="Phone Number"
                value={deviceDetails.devicePhone}
              />
              <DetailItem
                label="Status"
                value={deviceDetails.status}
                status={deviceDetails.status === "online"}
              />
              <DetailItem label="API Token" value={deviceDetails.apiToken} />
              <DetailItem
                label="Created At"
                value={new Date(deviceDetails.createdAt).toLocaleString()}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(deviceDetails.updatedAt).toLocaleString()}
              />
                    </div>
                )
            )}

            <div className="mt-6">
                <button
                    onClick={onClose}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300"
                >
                    Close Details
                </button>
            </div>
        </div>
    </div>
);

export default DeviceDetailsModal;