// // pages/dashboard.jsx
// import UserProfile from "@/components/pages/User/UserProfile";
// import UserTable from "@/components/pages/User/UserTable";
// import RoleTable from "@/components/pages/User/RoleTable";
// const UsersDetail = () => {
//   return (
//     <div>
//       <UserProfile />
//       <UserTable />
//         <RoleTable/>
//     </div>
//   );
// };

// export default UsersDetail;

'use client';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({});
  const [previewImage, setPreviewImage] = useState('');
  const [roleFormData, setRoleFormData] = useState({ 
    name: '', 
    description: '', 
    status: 'true' 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      await fetchUserProfile();
      await fetchAllRoles();
    };
    fetchInitialData();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/profile/', {
        credentials:"include",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUser(data.user);
      setFormData(data.user);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setErrors({ general: 'Failed to load profile' });
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      
      if (formData.name) formDataObj.append('name', formData.name);
      if (formData.email) formDataObj.append('email', formData.email);
      if (formData.profileImage) {
        formDataObj.append('profileImage', formData.profileImage);
      }

      const response = await fetch('http://localhost:8000/api/user/profile-update/', {
        method: 'PUT',
        credentials:"include",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });
      
      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      setUser(data.updatedUser);
      setErrors({});
    } catch (error) {
      console.error('Update error:', error);
      setErrors({ general: 'Failed to update profile' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setFormData({ ...formData, profileImage: file });
    }
  };

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/get-all-users', {
        credentials:"include",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUsers(data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrors({ general: 'Failed to load users' });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, roleId) => {
    try {
      if (!userId || !roleId) {
        setErrors({ general: 'Both User ID and Role ID are required' });
        return;
      }
      
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/change-user-role', {
        method: 'POST',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, roleId }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      fetchAllUsers();
    } catch (error) {
      console.error('Role change error:', error);
      setErrors({ general: 'Failed to update user role' });
    }
  };

  const handleCreateRole = async () => {
    try {
      if (!roleFormData.name || !roleFormData.status) {
        setErrors({ general: 'Please fill in all required fields' });
        return;
      }
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/create-role', {
        method: 'POST',
        credentials:"include",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: roleFormData.name,
          description: roleFormData.description,
          status: roleFormData.status === 'true'
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrors(data.errors || { general: data.error });
        return;
      }

      setRoleFormData({ name: '', description: '', status: 'true' });
      setErrors({});
      fetchAllRoles();
    } catch (error) {
      console.error('Create role error:', error);
      setErrors({ general: 'Failed to create role' });
    }
  };

  const fetchAllRoles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/user/get-roles', {
        credentials:"include",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setRoles(data.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setErrors({ general: 'Failed to load roles' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            </div>
            <div className="flex space-x-8">
              <button 
                onClick={() => { setActiveTab('profile'); setErrors({}); }} 
                className={`${activeTab === 'profile' ? 'border-b-2 border-blue-500' : ''} px-3 py-2 text-gray-600 hover:text-gray-800`}
              >
                Profile
              </button>
              <button 
                onClick={() => { setActiveTab('users'); fetchAllUsers(); setErrors({}); }} 
                className={`${activeTab === 'users' ? 'border-b-2 border-blue-500' : ''} px-3 py-2 text-gray-600 hover:text-gray-800`}
              >
                Users
              </button>
              <button 
                onClick={() => { setActiveTab('roles'); fetchAllRoles(); setErrors({}); }} 
                className={`${activeTab === 'roles' ? 'border-b-2 border-blue-500' : ''} px-3 py-2 text-gray-600 hover:text-gray-800`}
              >
                Roles
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {errors.general && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {errors.general}
          </div>
        )}

        {activeTab === 'profile' && user && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="shrink-0">
                  <img 
                    className="h-16 w-16 rounded-full object-cover" 
                    src={previewImage || user.profileImage || '/placeholder-user.jpg'} 
                    alt="Profile" 
                  />
                </div>
                <label className="block">
                  <input 
                    type="file" 
                    onChange={handleImageChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            </form>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">User Management</h2>
            <button
              onClick={fetchAllUsers}
              className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Refresh Users
            </button>
            
            {loading ? (
              <div className="text-center">Loading users...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={user.role?._id || ''}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          >
                            <option value="">Select Role</option>
                            {roles.map((role) => (
                              <option key={role._id} value={role._id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6">Role Management</h2>
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Role Name <span className="text-red-500 text-sm ml-2">*</span>
                    {errors.name && <span className="text-red-500 text-sm ml-2">{errors.name}</span>}
                  </label>
                  <input
                    type="text"
                    value={roleFormData.name}
                    onChange={(e) => setRoleFormData({ ...roleFormData, name: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                    {errors.description && <span className="text-red-500 text-sm ml-2">{errors.description}</span>}
                  </label>
                  <input
                    type="text"
                    value={roleFormData.description}
                    onChange={(e) => setRoleFormData({ ...roleFormData, description: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status <span className="text-red-500 text-sm ml-2">*</span>
                    {errors.status && <span className="text-red-500 text-sm ml-2">{errors.status}</span>}
                  </label>
                  <select
                    value={roleFormData.status}
                    onChange={(e) => setRoleFormData({ ...roleFormData, status: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={handleCreateRole}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Create New Role
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles.map((role) => (
                    <tr key={role._id}>
                      <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{role.description || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${role.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {role.status ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;