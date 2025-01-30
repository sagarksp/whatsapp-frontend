// "use client"

// import { useState } from "react";

// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import Sidebar from "@/components/common/Sidebar";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export default function RootLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)

//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen bg-gray-100">
//         <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//         <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//         <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"}`}>
//           <main className="p-4 mt-16">{children}</main>
//         </div>
//         <Footer />
//       </body>
//     </html>
//   )
// }




// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import Sidebar from "@/components/common/Sidebar";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuth, setIsAuth] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         router.push("/login");
//         return;
//       }
//       setIsAuth(true);
//       setIsLoading(false);
//     };

//     checkAuth();
//   }, [router]);

//   if (isLoading) {
//     return (
//       <html lang="en">
//         <body className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
//         </body>
//       </html>
//     );
//   }

//   if (!isAuth) return null;

//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
//         <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//         <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
//         <div className={`flex-1 transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "ml-64" : "ml-0"
//         }`}>
//           <main className="p-4 mt-16">{children}</main>
//         </div>
        
//         <Footer />
//       </body>
//     </html>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Header from "@/components/common/Header";
// import Footer from "@/components/common/Footer";
// import Sidebar from "@/components/common/Sidebar";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// export default function RootLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isAuth, setIsAuth] = useState(null); // Initialize as null
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     const checkAuth = async () => {
//     setIsLoading(true);
//     const token = localStorage.getItem("token");
//     console.log("Token from localStorage:", token); // Add this

//     if (!token) {
//         setIsAuth(false);
//         router.push("/login");
//         setIsLoading(false);
//         console.log("isAuth set to false due to no token");
//         return;
//     }

//     setIsAuth(true);
//     setIsLoading(false);
//     console.log("isAuth set to true");
//     };

//     checkAuth();
// }, [router]);


//     if (isLoading) {
//     return (
//         <html lang="en">
//         <body className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
//         </body>
//         </html>
//     );
//   }

//     // Null check for isAuth
//     if(isAuth === null){
//         return <html lang="en">
//         <body className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900"></body>
//         </html>
//     }

//   return (
//     <html lang="en">
//       <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
//       {isAuth === true && ( // Conditionally render header and sidebar
//           <>
//            <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
//           </>
//       )}
        
//         <div className={`flex-1 transition-all duration-300 ease-in-out ${
//           sidebarOpen ? "ml-64" : "ml-0"
//         }`}>
//           <main className="p-4 mt-16">{children}</main>
//         </div>
        
//         <Footer />
//       </body>
//     </html>
//   );
// }












"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Sidebar from "@/components/common/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
      } else {
        // Verify token validity here if needed
        setIsAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <html lang="en">
        <body className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </body>
      </html>
    );
  }

  if (!isAuthenticated) {
    return (
      <html lang="en">
        <body className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <main className="min-h-screen">{children}</main>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`flex flex-col min-h-screen bg-gray-100 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900  ${geistSans.variable} ${geistMono.variable}`}>
        <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <main className="p-4 mt-16 ">{children}</main>
        </div>
        <Footer />
      </body>
    </html>
  );
}