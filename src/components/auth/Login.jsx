// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const res = await fetch('http://localhost:8000/api/auth/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, password }),
//     });

//     if (res.ok) {
//       const { token } = await res.json();
//       localStorage.setItem('token', token);
//       router.push('/protected');
//     } else {
//       alert('Login failed');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-4 p-2 w-full border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 p-2 w-full border rounded"
//           required
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//         <Link href="/signup">New User? Signup here</Link>
//       </form>
//     </div>
//   );
// }






// 'use client';
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';

// export default function Login() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isMounted, setIsMounted] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   const validateField = (name, value) => {
//     let error = '';
//     switch (name) {
//       case 'email':
//         if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Invalid email format';
//         break;
//       case 'password':
//         if (value.length < 8) error = 'Password must be at least 8 characters';
//         break;
//       default:
//         if (!value.trim()) error = 'This field is required';
//     }
//     setErrors(prev => ({ ...prev, [name]: error }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     if (errors[name]) validateField(name, value);
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     // Validate fields
//     Object.entries(formData).forEach(([name, value]) => validateField(name, value));
    
//     if (Object.values(errors).some(error => error)) {
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:8000/api/auth/login', {
//         method: 'POST',
//         credentials: 'include',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (res.ok) {
//         const { token } = await res.json();
//         localStorage.setItem('token', token);
//         router.push('/myaccount');
//       } else {
//         const errorData = await res.json();
//         setErrors(prev => ({ ...prev, form: errorData.message || 'Login failed' }));
//       }
//     } catch (error) {
//       setErrors(prev => ({ ...prev, form: 'Network error. Please try again.' }));
//     }
//     setIsSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden -mt-16">
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

//       <form
//         onSubmit={handleLogin}
//         className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md relative z-10 border border-white/20 dark:border-gray-700/50 transition-all duration-300 hover:shadow-3xl"
//       >
//         <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
//           Welcome Back
//         </h2>

//         {errors.form && (
//           <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
//             {errors.form}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Address"
//               value={formData.email}
//               onChange={handleChange}
//               onBlur={(e) => validateField(e.target.name, e.target.value)}
//               className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//             {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
//           </div>

//           <div>
//             <input
//               type="password"
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               onBlur={(e) => validateField(e.target.name, e.target.value)}
//               className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
//               required
//             />
//             {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
//           </div>
//         </div>

//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isSubmitting ? 'Logging In...' : 'Login'}
//         </button>

//         <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
//           <Link 
//             href="/signup"
//             className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 font-semibold underline transition-colors"
//           >
//             New User? Signup here
//           </Link>
//         </div>
//       </form>

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
// }







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const validateField = (name, value) => {
    let error = '';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Invalid email format';
    } else if (name === 'password' && value.length < 8) {
      error = 'Password must be at least 8 characters';
    } else if (!value.trim()) {
      error = 'This field is required';
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) validateField(name, value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Object.entries(formData).forEach(([name, value]) => validateField(name, value));
    if (Object.values(errors).some((error) => error)) {
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/myaccount'); // Redirect to the dashboard
      } else {
        const errorData = await res.json();
        setErrors((prev) => ({ ...prev, form: errorData.message || 'Login failed' }));
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, form: 'Network error. Please try again.' }));
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <form
        onSubmit={handleLogin}
        className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 dark:border-gray-700/50"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Welcome Back
        </h2>

        {errors.form && (
          <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {errors.form}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
              required
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50"
              required
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-lg"
        >
          {isSubmitting ? 'Logging In...' : 'Login'}
        </button>

        <div className="mt-4 text-center text-gray-600 dark:text-gray-400">
          <Link href="/signup" className="text-blue-500 font-semibold underline">
            New User? Signup here
          </Link>
        </div>
      </form>
    </div>
  );
}
