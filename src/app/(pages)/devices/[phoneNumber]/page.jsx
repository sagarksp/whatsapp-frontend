// "use client";
// // app/devices/[phoneNumber]/page.jsx
// import { useEffect, useState } from "react";
// import { useParams, useRouter } from "next/navigation";
// import { io } from "socket.io-client";

// const DevicePage = () => {
//   const params = useParams();
//   const phoneNumber = params.phoneNumber;
//   const [device, setDevice] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [qrCode, setQrCode] = useState("");
//   const [message, setMessage] = useState("");
//   const [socket, setSocket] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchDevice = async () => {
//       const res = await fetch(`http://localhost:8000/api/device/phone/${phoneNumber}`);
//       const data = await res.json();
//       setDevice(data.data);
//     };

//     const newSocket = io("http://localhost:8000");
//     setSocket(newSocket);

//     newSocket.on("qr-code", (qr) => {
//       setQrCode(qr);
//       setIsConnected(false);
//     });

//     newSocket.on("connected", () => {
//       setIsConnected(true);
//       localStorage.setItem("connectedDevice", phoneNumber);
//     });

//     fetchDevice();

//     return () => {
//       newSocket.disconnect();
//       localStorage.removeItem("connectedDevice");
//     };
//   }, [phoneNumber]);

//   const handleStartSession = async () => {
//     try {
//       await fetch("http://localhost:8000/api/device/connect/startSession", {
//         method: "POST",
//         credentials:"include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sessionId: socket.id,
//           devicePhone: phoneNumber
//         }),
//       });
//     } catch (error) {
//       console.error("Session error:", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!message) return;
    
//     try {
//       await fetch("http://localhost:8000/api/device/connect/send-message", {
//         method: "POST",
//         credentials:"include",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           sessionId: socket.id,
//           phoneNumber: device.devicePhone,
//           message
//         }),
//       });
//       setMessage("");
//     } catch (error) {
//       console.error("Send message error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       await fetch("http://localhost:8000/api/device/connect/logout", {
//         method: "POST",
//         credentials:"include",
//         body: JSON.stringify({ sessionId: socket.id }),
//       });
//       router.push("/connectdevices  ");
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   return (
//     <div className="device-page">
//       <h1>{device?.deviceName}</h1>
//       <p className="status">{isConnected ? "Connected" : "Disconnected"}</p>

//       {!isConnected && (
//         <div className="session-controls">
//           <button onClick={handleStartSession} className="btn-connect">
//             Initialize Session
//           </button>
//           {qrCode && <pre className="qrcode">{qrCode}</pre>}
//         </div>
//       )}

//       {isConnected && (
//         <div className="message-container">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type message..."
//             className="message-input"
//           />
//           <button onClick={handleSendMessage} className="btn-send">
//             Send Message
//           </button>
//           <button onClick={handleLogout} className="btn-logout">
//             Logout
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DevicePage;