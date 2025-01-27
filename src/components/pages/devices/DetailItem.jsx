// import React from 'react';

// const DetailItem = ({ label, value, status }) => (
//   <div className="bg-white/50 dark:bg-gray-700/30 p-4 rounded-lg transition-colors hover:bg-white/70 dark:hover:bg-gray-700/50">
//     <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
//       {label}
//     </dt>
//     <dd className="mt-1">
//       {status !== undefined ? (
//         <span
//           className={`px-2 py-1 rounded-full text-sm ${
//             status
//               ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
//               : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
//           }`}
//         >
//           {value}
//         </span>
//       ) : (
//         <span className="text-gray-800 dark:text-gray-200 break-all">
//           {value}
//         </span>
//       )}
//     </dd>
//   </div>
// );

// export default DetailItem;












// components/DetailItem.jsx
import React from "react";

const DetailItem = ({ label, value, status }) => (
  <div className="bg-white/50 dark:bg-gray-700/30 p-4 rounded-lg transition-colors hover:bg-white/70 dark:hover:bg-gray-700/50">
    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
      {label}
    </dt>
    <dd className="mt-1">
      {status !== undefined ? (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status
              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-800 dark:text-gray-200 break-all">
          {value}
        </span>
      )}
    </dd>
  </div>
);

export default DetailItem;