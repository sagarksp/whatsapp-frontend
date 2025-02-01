
  //   "use client";
  // import React, { useState, useEffect } from "react";

  // const MyAccount = () => {
  //   const [userData, setUserData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);
  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch('http://localhost:8000/api/user/profile', {
  //           method: 'GET',
  //           credentials: 'include',
  //           headers: { 
  //             'Content-Type': 'application/json',
  //             'Authorization': `Bearer ${localStorage.getItem('token')}`
  //           },
  //         });

  //         if (!response.ok) throw new Error('Failed to fetch user data');
          
  //         const data = await response.json();
  //         console.log(data)
  //         setUserData(data.user);
  //       } catch (error) {
  //         console.error("Error:", error);
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, []);

  //   if (!isMounted) return null;

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  //         <div className="text-red-500 dark:text-red-400 text-center p-6 bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl">
  //           ⚠️ Error: {error}
  //         </div>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden -mt-16">
  //       {/* Animated Background Elements */}
  //       {isMounted && (
  //         <div className="absolute inset-0 opacity-20 dark:opacity-10">
  //           {[...Array(12)].map((_, i) => (
  //             <div
  //               key={i}
  //               className="absolute animate-float"
  //               style={{
  //                 top: `${Math.random() * 100}%`,
  //                 left: `${Math.random() * 100}%`,
  //                 width: `${Math.random() * 30 + 10}px`,
  //                 height: `${Math.random() * 30 + 10}px`,
  //                 background: `radial-gradient(circle, ${i % 2 ? '#4F46E5' : '#EC4899'} 20%, transparent 70%)`,
  //                 animationDelay: `${Math.random() * 5}s`,
  //               }}
  //             />
  //           ))}
  //         </div>
  //       )}

  //       <div className="container mx-auto p-4 min-h-screen flex items-center justify-center -mt-10">
  //         <div className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl p-8 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
  //           <div className="flex flex-col md:flex-row gap-8">
  //             {/* Profile Section */}
  //             <div className="md:w-1/3 flex flex-col items-center p-6 bg-white/50 dark:bg-gray-700/30 rounded-xl">
  //               <div className="relative group">
  //                 <img
  //                   src={`http://localhost:8000/${userData.profileImage}` || "/default-avatar.jpg"}
  //                   alt="Profile"
  //                   className="w-32 h-32 rounded-full border-4 border-purple-200 dark:border-purple-900/50 object-cover mb-4 transition-transform duration-300 hover:scale-105 mt-20"
  //                 />
  //                 <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-purple-400 dark:group-hover:border-purple-600 transition-all duration-300" />
  //               </div>

  //               <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
  //                 {userData.name}
  //               </h1>
  //               <span className="px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-sm font-medium">
  //                 {userData.role}
  //               </span>

                
  //             </div>

  //             {/* Details Section */}
  //             <div className="md:w-2/3 space-y-6">
  //               <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
  //                 Account Details
  //               </h2>

  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //                 <DetailItem label="Username" value={userData.userName} />
  //                 <DetailItem label="Email" value={userData.email} />
  //                 <DetailItem label="Phone" value={userData.phone} />
  //                 <DetailItem label="Language" value={userData.language} />
  //                 <DetailItem label="Country" value={userData.country} />
  //                 <div className="col-span-full">
  //                   <DetailItem
  //                     label="Status"
  //                     value={userData.status ? "Active" : "Inactive"}
  //                     status={userData.status}
  //                   />
  //                 </div>
  //               </div>

  //               <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]">
  //                 Edit Profile
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       <style jsx global>{`
  //         @keyframes float {
  //           0%, 100% { transform: translateY(0) rotate(0deg); }
  //           50% { transform: translateY(-20px) rotate(10deg); }
  //         }
  //         .animate-float {
  //           animation: float 12s infinite ease-in-out;
  //         }
  //       `}</style>
  //     </div>
  //   );
  // };

  // const DetailItem = ({ label, value, status }) => (
  //   <div className="p-4 bg-white/50 dark:bg-gray-700/30 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
  //     <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
  //     <dd className="mt-1 text-lg text-gray-800 dark:text-white">
  //       {status !== undefined ? (
  //         <span className={`px-2 py-1 rounded-md ${status ? 
  //           'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
  //           'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
  //           {value}
  //         </span>
  //       ) : (
  //         value
  //       )}
  //     </dd>
  //   </div>
  // );

  // export default MyAccount;












  "use client";
import React, { useState, useEffect } from "react";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchData();
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(`${process.env.MAIN_URL}/api/user/profile`, {
  //       method: 'GET',
  //       credentials: 'include',
  //       headers: { 
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${localStorage.getItem('token')}`
  //       },
  //     });

  //     console.log('Profile fetch response status:', response.status);
      
  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || 'Failed to fetch user data');
  //     }

  //     const data = await response.json();
  //     console.log('Fetched user data:', data);
      
  //     setUserData(data.user);
  //     setEditedUserName(data.user.userName || "");
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const fetchData = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/user/profile`, {
        method: 'GET',
        credentials: 'include',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });
  
      console.log('Profile fetch response status:', response.status);
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data');
      }
  
      const data = await response.json();
      console.log('Fetched user data:', data);
  
      setUserData(data.user);
      setEditedUserName(data.user.userName || "");
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setError(null);
  };

  const handleUpdateProfile = async () => {
    if (!editedUserName.trim()) {
      setError('Username cannot be empty');
      return;
    }
  
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append('userName', editedUserName);
  
      if (selectedImage) {
        formData.append('profileImage', selectedImage);
      }
  
      // Log form data before sending
      console.log('FormData contents:');
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/api/user/profile-update/`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: formData,
        }
      );
  
      const responseData = await response.json();
      console.log('Update response:', responseData);
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Profile update failed');
      }
  
      // Check if 'user' exists before accessing 'profileImage'
      const updatedUser = responseData.user || {};
      setUserData(prev => ({
        ...prev,
        userName: editedUserName,
        profileImage: updatedUser.profileImage || prev.profileImage,  // Use a fallback if profileImage is undefined
      }));
  
      setIsEditing(false);
      setSelectedImage(null);
      setPreviewImage("");
      setError(null);
    } catch (error) {
      console.error('Update error:', error);
      setError(error.message);
    } finally {
      setUpdateLoading(false);
    }
  };
  

  if (!isMounted) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-red-500 dark:text-red-400 text-center p-6 bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl">
          ⚠️ Error: {error}
        </div>
      </div>
    );
  }

  return (
    <>
    
  
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden -mt-20">
      {/* Animated Background Elements */}
      {isMounted && (
        <div className="absolute inset-0 opacity-20 dark:opacity-10">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                background: `radial-gradient(circle, ${i % 2 ? '#4F46E5' : '#EC4899'} 20%, transparent 70%)`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center -mt-10">
        <div className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-4xl p-8 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              Error: {error}
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Section */}
            <div className="md:w-1/3 flex flex-col items-center p-6 bg-white/50 dark:bg-gray-700/30 rounded-xl">
              <div className="relative group">
                <label 
                  htmlFor="profileImage" 
                  className={`cursor-pointer ${isEditing ? '' : 'pointer-events-none'}`}
                >
                  <img
                    src={
                      previewImage || 
                      (userData.profileImage 
                        ? `${process.env.NEXT_PUBLIC_MAIN_URL}/${userData.profileImage}`
                        : "/default-avatar.jpg")
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-purple-200 dark:border-purple-900/50 object-cover mb-4 transition-transform duration-300 hover:scale-105 mt-20"
                  />
                  {isEditing && (
                    <div className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  )}
                </label>
                {isEditing && (
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    disabled={!isEditing}
                  />
                )}
              </div>

              {isEditing ? (
                <input
                  type="text"
                  value={editedUserName}
                  onChange={(e) => {
                    setEditedUserName(e.target.value);
                    setError(null);
                  }}
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-2 bg-transparent border-b-2 border-purple-500 focus:outline-none focus:border-purple-700 dark:focus:border-purple-300 text-center"
                  placeholder="Enter username"
                />
              ) : (
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  {userData.userName}
                </h1>
              )}
            </div>

            {/* Details Section */}
            <div className="md:w-2/3 space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Account Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <DetailItem label="Username" value={userData.userName} />
                <DetailItem label="Email" value={userData.email} />
                <DetailItem label="Phone" value={userData.phone} />
                <DetailItem label="Language" value={userData.language} />
                <DetailItem label="Country" value={userData.country} />
                <div className="col-span-full">
                  <DetailItem
                    label="Status"
                    value={userData.status ? "Active" : "Inactive"}
                    status={userData.status}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateProfile}
                      disabled={updateLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {updateLoading ? (
                        <span className="flex items-center justify-center">
                          <span className="animate-spin mr-2">⏳</span>
                          Saving...
                        </span>
                      ) : (
                        'Save Changes'
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setSelectedImage(null);
                        setPreviewImage("");
                        setError(null);
                      }}
                      className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
        .animate-float {
          animation: float 12s infinite ease-in-out;
        }
      `}</style>
    </div>
      </>
  );
};

const DetailItem = ({ label, value, status }) => (
  <div className="p-4 bg-white/50 dark:bg-gray-700/30 rounded-lg transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700/50">
    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</dt>
    <dd className="mt-1 text-lg text-gray-800 dark:text-white">
      {status !== undefined ? (
        <span className={`px-2 py-1 rounded-md ${status ? 
          'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 
          'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
          {value}
        </span>
      ) : (
        value
      )}
    </dd>
  </div>
);

export default MyAccount;