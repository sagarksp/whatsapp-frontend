// "use client";
// import React, { useState, useEffect } from "react";

// const UserProfile = () => {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [editMode, setEditMode] = useState(false);
//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         profileImage: null,
//     });
//     const [successMessage, setSuccessMessage] = useState(null);
//     const [profileImagePreview, setProfileImagePreview] = useState(null);
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
//     const token = localStorage.getItem('token');  // Access your token or authentication logic

//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch(`${backendUrl}/api/user/get-all-users`, {
//                     credentials:"include",
//                     headers: {
//                         'Authorization': `Bearer ${token}`, // Include token in the header
//                     },
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || "Failed to fetch user profile");
//                 }
//                 const data = await response.json();
//                 console.log(data)
//                 setUser(data.user);
//                 setFormData({
//                     firstName: data.user.name || '',
//                     lastName: data.user.email || '',
//                     email: data.user.role || ''
//                 });
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfile();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         setFormData({ ...formData, profileImage: file });

//         // preview functionality
//         if(file){
//             const reader = new FileReader();
//             reader.onloadend = () =>{
//                 setProfileImagePreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         } else{
//             setProfileImagePreview(null)
//         }
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         setError(null);
//         setSuccessMessage(null);
//         const formDataToSend = new FormData();
//         for (const key in formData) {
//             formDataToSend.append(key, formData[key]);
//         }
//         try {
//             const response = await fetch(`${backendUrl}/api/profile-update`, {
//                 method: "PUT",
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                 },
//                 body: formDataToSend,
//             });
//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.message || "Failed to update user profile");
//             }
//             const data = await response.json();
//             setUser(data.updatedUser);
//             setSuccessMessage(data.message);
//             setEditMode(false);
//         } catch (err) {
//             setError(err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     if (loading) {
//         return <div className="text-center py-4">Loading user profile...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-500 py-4">Error: {error}</div>;
//     }

//     if (!user) {
//         return <div className="text-center py-4">User data not found.</div>
//     }

//     return (
//         <div className="max-w-2xl mx-auto p-4 border rounded bg-white shadow">
//             <h2 className="text-2xl font-semibold mb-4">User Profile</h2>

//             {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-center">{successMessage}</div>}

//             {!editMode ? (
//                 <div className="mb-4">
//                     {user?.profileImage && (
//                         <div className="flex justify-center mb-4">
//                             <img src={`${backendUrl}/${user.profileImage}`} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
//                         </div>
//                     )}
//                     <p className="mb-2">
//                         <strong className="font-semibold">First Name:</strong> {user.firstName}
//                     </p>
//                     <p className="mb-2">
//                         <strong className="font-semibold">Last Name:</strong> {user.lastName}
//                     </p>
//                     <p className="mb-4">
//                         <strong className="font-semibold">Email:</strong> {user.email}
//                     </p>
//                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditMode(true)}>
//                         Edit Profile
//                     </button>
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit} className="flex flex-col">
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">First Name:</label>
//                         <input
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Last Name:</label>
//                         <input
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Profile Image:</label>
//                         <input type="file" name="profileImage" onChange={handleImageChange} className="mb-2"/>
//                         {profileImagePreview && (
//                             <img
//                                 src={profileImagePreview}
//                                 alt="Profile Preview"
//                                 className="max-w-52 mt-2 rounded"
//                             />
//                         )}
//                         {!profileImagePreview && user?.profileImage && (
//                             <div className="flex justify-center mb-4">
//                                 <img src={`${backendUrl}/${user.profileImage}`} alt="Profile" className="w-40 h-40 rounded-full object-cover" />
//                             </div>
//                         )}
//                     </div>
//                     <div className="flex justify-end gap-2">
//                         <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                             Save
//                         </button>
//                         <button
//                             type="button"
//                             className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                             onClick={() => setEditMode(false)}
//                         >
//                             Cancel
//                         </button>
//                     </div>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default UserProfile;



// "use client";
// import React, { useState, useEffect } from "react";

// const UserProfile = () => {
//     const [users, setUsers] = useState([]); // Store users array
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
//     const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     useEffect(() => {
//         const fetchUserProfiles = async () => {
//             setLoading(true);
//             setError(null);
//             try {
//                 const response = await fetch(`${backendUrl}/api/user/get-all-users`, {
//                     credentials: "include",
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 if (!response.ok) {
//                     const errorData = await response.json();
//                     throw new Error(errorData.message || "Failed to fetch user profiles");
//                 }
//                 const data = await response.json();
//                 console.log(data);
//                 setUsers(data.data || []); // Ensure `data.data` is stored
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUserProfiles();
//     }, []);

//     if (loading) {
//         return <div className="text-center py-4">Loading user profiles...</div>;
//     }

//     if (error) {
//         return <div className="text-center text-red-500 py-4">Error: {error}</div>;
//     }

//     if (!users.length) {
//         return <div className="text-center py-4">No users found.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-4 border rounded bg-white shadow">
//             <h2 className="text-2xl font-semibold mb-4 text-center">User Profiles</h2>

//             <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-300 shadow-sm bg-white">
//                     <thead className="bg-gray-200">
//                         <tr>
//                             <th className="border px-4 py-2">Name</th>
//                             <th className="border px-4 py-2">Email</th>
//                             <th className="border px-4 py-2">Role</th>
//                             <th className="border px-4 py-2">Phone</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user, index) => (
//                             <tr key={user._id} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
//                                 <td className="border px-4 py-2">{user.name}</td>
//                                 <td className="border px-4 py-2">{user.email}</td>
//                                 <td className="border px-4 py-2">{user.role}</td>
//                                 <td className="border px-4 py-2">{user.phone || "N/A"}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// export default UserProfile;







// app/components/UserProfile.jsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:8000/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          reset(data.user);
        }
      } catch (error) {
        toast.error('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [reset]);

  const handleUpdate = async (data) => {
    const formData = new FormData();
    if (data.profileImage[0]) {
      formData.append('profileImage', data.profileImage[0]);
    }
    formData.append('name', data.name);
    formData.append('email', data.email);

    try {
      const response = await fetch('http://localhost:8000/profile-update', {
        method: 'PUT',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        body: formData,
      });
      
      const result = await response.json();
      if (result.success) {
        toast.success('Profile updated successfully');
        setUser(result.updatedUser);
      }
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Profile</h1>
      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
              <input
                type="file"
                {...register('profileImage')}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            
            {user?.profileImage && (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-32 h-32 rounded-full object-cover border-2 border-indigo-100"
              />
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                {...register('name')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}