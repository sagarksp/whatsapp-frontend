// export default function Header({ setIsOpen }) {
//     return (
//       <header className="bg-white shadow-md">
//         <div className="flex items-center justify-between px-4 py-3">
//           <button
//             onClick={() => setIsOpen(true)}
//             className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//           <div className="text-xl font-bold text-red-600">Whatsapp Automation System</div>
//           <div className="w-6 h-6"></div> {/* Placeholder for right side content */}
//         </div>
//       </header>
//     )
//   }

import { useRouter } from "next/navigation";

  
  


export default function Header({ setIsOpen }) {
  const router = useRouter()
  const handleLogout = async () => {

    
    try {
      const response = await fetch('http://localhost:8000/api/auth/logout', {
        method: 'GET',
        credentials: 'include' // Include cookies if using session-based auth
      });

      if (response.ok) {
        // Redirect to login page after successful logout
        router.push("/")
        window.location.href = '/';
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-600 hover:text-red-600 focus:outline-none transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-xl font-bold text-red-600">Whatsapp Automation System</div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  )
}