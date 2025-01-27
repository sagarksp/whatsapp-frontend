// "use client"

// import Link from "next/link"
// import { usePathname } from "next/navigation"


// const UserIcon = () => (
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 13c-3.866 0-7 3.134-7 7 0 0 14 0 14 0 0-3.866-3.134-7-7-7z"
//       />
//     </svg>
//   );
  
//   const DevicesIcon = () => (
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M9.75 3.75H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25h6m0-18h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9M9.75 3.75v18m4.5-4.5h4.5m0 0h-4.5m0 0v2.25m0-2.25V15"
//       />
//     </svg>
//   );
  

  
//   const SendMessageIcon = () => (
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M22 2L11 13M22 2l-6 20-5-10-10-5 20-6z"
//       />
//     </svg>
//   );


//   const OutboxIcon = () => (
//     <svg
//       className="w-6 h-6"
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M3 10l9-7 9 7M12 3v18M9 21h6M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10"
//       />
//     </svg>
//   );
  


// const sidebarItems = [
//   { icon: UserIcon, text: "My Account", href: "/myaccount" },
//   { icon: DevicesIcon, text: "Devices", href: "/connectdevices" },
//   { icon: SendMessageIcon, text: "Send Message", href: "/sendmessages" },
//   { icon: OutboxIcon, text: "OutBox", href: "/outbox" },

// ]

// export default function Sidebar({ isOpen, setIsOpen }) {
//   const pathname = usePathname()

//   return (
//     <aside
//       className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       }`}
//     >
//       <div className="flex justify-end p-4">
//         <button
//           onClick={() => setIsOpen(false)}
//           className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
//         >
//           <svg
//             className="w-6 h-6"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//           </svg>
//         </button>
//       </div>
//       <nav className="px-4 py-4">
//         {sidebarItems.map((item, index) => (
//           <Link
//             key={index}
//             href={item.href}
//             className={`flex items-center space-x-4 px-4 py-3 rounded-lg ${
//               pathname === item.href ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <item.icon />
//             <span className="font-medium">{item.text}</span>
//           </Link>
//         ))}
//       </nav>
//     </aside>
//   )
// }



"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const UserIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM12 13c-3.866 0-7 3.134-7 7 0 0 14 0 14 0 0-3.866-3.134-7-7-7z"
    />
  </svg>
);

const DevicesIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.75 3.75H3.75A2.25 2.25 0 001.5 6v12a2.25 2.25 0 002.25 2.25h6m0-18h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9M9.75 3.75v18m4.5-4.5h4.5m0 0h-4.5m0 0v2.25m0-2.25V15"
    />
  </svg>
);



const SendMessageIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 2L11 13M22 2l-6 20-5-10-10-5 20-6z"
    />
  </svg>
);


const OutboxIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 10l9-7 9 7M12 3v18M9 21h6M5 10v10a2 2 0 002 2h10a2 2 0 002-2V10"
    />
  </svg>
);



const sidebarItems = [
  { icon: UserIcon, text: "My Account", href: "/myaccount" },
  { icon: DevicesIcon, text: "Devices", href: "/connectdevices" },
  { icon: SendMessageIcon, text: "Send Message", href: "/sendmessages" },
  { icon: OutboxIcon, text: "OutBox", href: "/outbox" },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Double-check authentication status
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex justify-end p-4 border-b dark:border-gray-700">
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none"
          aria-label="Close sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <nav className="px-4 py-4">
        {sidebarItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-4 px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive
                  ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="sr-only">{item.text}</span>
              <span aria-hidden="true">
                <item.icon />
              </span>
              <span className="font-medium">{item.text}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
} 