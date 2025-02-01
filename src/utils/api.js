// // utils/api.js
// export const fetcher = async (url, options = {}) => {
//     const response = await fetch(url, {
//       ...options,
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         ...options.headers,
//       },
//     });
    
//     if (!response.ok) throw new Error(response.statusText);
//     return response.json();
//   };




// utils/api.js
export const fetcher = async (url, options = {}) => {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
    });
  
    const data = await response.json();
    
    if (!response.ok) {
      const error = new Error(data.message || 'Request failed');
      error.response = data;
      throw error;
    }
  
    return data;
  };