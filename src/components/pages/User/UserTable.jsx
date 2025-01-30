// "use client";
// import React, { useState, useEffect } from "react";

// const UserTable = () => {
//     const [users, setUsers] = useState([]);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [pagination, setPagination] = useState({
//         page: 1,
//         limit: 10,
//         totalItems: 0,
//     });

//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
//     const token = localStorage.getItem('token');

//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch(`${backendUrl}/api/get-all-users?page=${pagination.page}&limit=${pagination.limit}`, {
//                     credentials:"include",
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || "Failed to fetch users");
//                 }
//                 const data = await response.json();
//                 setUsers(data.data);
//                 setPagination({
//                     ...pagination,
//                     totalItems: data.pagination.totalItems,
//                 });
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchUsers();
//     }, [pagination.page, pagination.limit]);


//     const handlePageChange = (newPage) => {
//         setPagination({ ...pagination, page: newPage });
//     };

//     const handleLimitChange = (e) => {
//         setPagination({ ...pagination, limit: parseInt(e.target.value), page: 1 });
//     };

//     const renderPaginationButtons = () => {
//         const { page, limit, totalItems } = pagination;
//         const totalPages = Math.ceil(totalItems / limit);
//         const buttons = [];

//         const maxButtons = 5; // Number of pagination buttons to show

//         let startPage = Math.max(1, page - Math.floor(maxButtons / 2));
//         let endPage = Math.min(totalPages, startPage + maxButtons - 1);

//         if (endPage - startPage < maxButtons -1) {
//             startPage = Math.max(1, endPage - maxButtons + 1)
//         }

//         if(totalPages <= 1){
//             return;
//         }
//         if (page > 1) {
//             buttons.push(
//                 <button key="prev" onClick={() => handlePageChange(page - 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-l">
//                     «
//                 </button>
//             );
//         }
//         for (let i = startPage; i <= endPage; i++) {
//             buttons.push(
//                 <button
//                     key={i}
//                     onClick={() => handlePageChange(i)}
//                     className={`py-1 px-2 border border-gray-300 hover:bg-gray-200 ${page === i ? 'bg-blue-500 text-white font-bold' : ''}`}
//                 >
//                     {i}
//                 </button>
//             );
//         }

//         if(page < totalPages){
//             buttons.push(
//                 <button key="next" onClick={() => handlePageChange(page + 1)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-r">
//                     »
//                 </button>
//             );
//         }
//         return buttons
//     };

//     if (loading) {
//         return <div className="text-center py-4">Loading users...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-500 py-4">Error: {error}</div>;
//     }

//     if(users.length === 0){
//         return  <div className="text-center py-4">No users found.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-4 border rounded bg-white shadow">
//             <h2 className="text-2xl font-semibold mb-4">Users</h2>
//             <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center">
//                     <label className="mr-2 text-sm font-medium">Users per page</label>
//                     <select value={pagination.limit} onChange={handleLimitChange} className="border rounded p-1 text-sm">
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="50">50</option>
//                     </select>
//                 </div>
//             </div>
//             <table className="min-w-full table-auto">
//                 <thead>
//                     <tr className="bg-gray-100">
//                         <th className="px-4 py-2 text-left">First Name</th>
//                         <th className="px-4 py-2 text-left">Last Name</th>
//                         <th className="px-4 py-2 text-left">Email</th>
//                         <th className="px-4 py-2 text-left">Role</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                 {users.map((user) => (
//                   <tr key={user._id} className="border-b hover:bg-gray-50">
//                     <td className="px-4 py-2">{user.firstName}</td>
//                     <td className="px-4 py-2">{user.lastName}</td>
//                     <td className="px-4 py-2">{user.email}</td>
//                     <td className="px-4 py-2">{user.role?.name || "N/A"}</td>
//                   </tr>
//                 ))}
//                 </tbody>
//             </table>
//             <div className="flex justify-center mt-4">
//                 {renderPaginationButtons()}
//             </div>
//         </div>
//     );
// };

// export default UserTable;













// app/components/UsersTable.jsx
'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/user/get-all-users?page=${page}&limit=10`, {
        credentials:"include",
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch('http://localhost:8000/update-rolee', {
        method: 'POST',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ userId, roleId: newRole }),
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('Role updated successfully');
        fetchUsers();
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  useEffect(() => { fetchUsers(); }, [page]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
        <div className="flex-1 flex justify-between items-center">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
          </span>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}