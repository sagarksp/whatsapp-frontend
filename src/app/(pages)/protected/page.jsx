// 'use client';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Protected() {
//   const [data, setData] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/login');
//     } else {
//       fetch('/api/protected', {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//         .then((res) => res.json())
//         .then((data) => setData(data))
//         .catch(() => router.push('/login'));
//     }
//   }, [router]);

//   if (!data) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-2xl mb-4">Protected Page</h2>
//         <p>{data.message}</p>
//         <p>User: {data.user}</p>
//       </div>
//     </div>
//   );
// }













// app/protected/page.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="p-4">
      <h1>Protected Content</h1>
    </div>
  );
}