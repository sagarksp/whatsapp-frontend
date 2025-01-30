"use client";
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useRouter } from 'next/navigation';


const SessionManager = ({ phoneNumber, onLogout }) => {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [statusMessage, setStatusMessage] = useState('Please start a session.');
    const [qrCode, setQrCode] = useState(null);
    const [groups, setGroups] = useState([]);
    const [phone, setPhone] = useState(phoneNumber);
        const [message, setMessage] = useState("");
     const router = useRouter();

    useEffect(() => {
        const newSocket = io('http://localhost:8000');
        setSocket(newSocket);
        const sessionId = localStorage.getItem('sessionId');
        const storedIsConnected = localStorage.getItem('isConnected');

        if (storedIsConnected && sessionId) {
            setIsConnected(true);
            setStatusMessage('You are connected!');
        }

        newSocket.on('connect', () => {
            console.log('Connected to WebSocket server with socket ID:', newSocket.id);
            setStatusMessage(" ");
        });

        newSocket.on('qr-code', (qr) => {
            setQrCode(qr);
        });

        newSocket.on('connected', (message) => {
            setStatusMessage(message);
            setQrCode(null);
            setIsConnected(true);
            localStorage.setItem('isConnected', 'true');
        });
          newSocket.on('logout-success', () => {
        console.log('Logged out successfully.');
          setIsConnected(false);
          localStorage.removeItem('sessionId');
           localStorage.removeItem('isConnected'); // Clear connection state
          setStatusMessage('Logged out. Please scan the QR code to reconnect.');
           window.location.reload();
      });

        return () => {
            newSocket.disconnect();
            console.log('Disconnected from socket');
        };
    }, []);


    const handleStartSession = async () => {
        console.log('Starting session with phone:', phone, socket.id);
        let sessionId = localStorage.getItem('sessionId') || socket.id;
        localStorage.setItem('sessionId', sessionId);
        try {
            const response = await fetch('http://localhost:8000/api/device/connect/startSession', {
                method: 'POST',
    
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, phoneNumber: phone }),
            });
            const data = await response.json();
            if (data.success) {
                 router.push({
                        pathname: '/startsession',
                        query: { phone: phone },
                    });
                setIsConnected(true);

            }
        }
        catch (error) {
            console.error('Error starting session:', error);
        }
    };


    const handleSendMessage = async () => {
        const sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            setStatusMessage('Session not started. Please start the session first.');
            return;
        }
           if (!phone || !message) {
           setStatusMessage('Please enter both phone number and message.');
           return;
        }

        const deptType = "67823f62488dc80b1dd316ee";
        try {
            const response = await fetch('/api/device/connect/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId, phoneNumber: phone, message, deptType }),
            });
            const data = await response.json();
            setStatusMessage(data.message);
        } catch (error) {
            console.error('Error sending message:', error);
            setStatusMessage('Failed to send message.');
        }
    };


     const handleLogout = async () => {
        const sessionId = localStorage.getItem('sessionId');
        if(!sessionId){
            console.log('No session ID found in local storage.');
            return;
        }
        try{
            const response = await fetch('/api/device/connect/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });

            const data = await response.json();
            console.log(data.message);
              onLogout();
        }
        catch (error) {
             console.error('Error during logout:', error);
        }
    };


    const handleFetchGroups = async () => {
        const sessionId = localStorage.getItem('sessionId');
        if(!sessionId){
            setStatusMessage('Session not started. Please start the session first.');
            return;
        }
        try {
            const response = await fetch('/api/device/connect/fetch-groups', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sessionId }),
            });
            const data = await response.json();
            setGroups(data.groups);
        }
        catch(error) {
            console.error('Error during fetching groups:', error);
        }
    };

    return (
        <div className="mb-6 p-4 bg-white/50 dark:bg-gray-700/30 rounded-lg flex flex-col gap-2">
            {statusMessage && (
                <div className="text-gray-800 dark:text-white">{statusMessage}</div>
            )}
            {qrCode && (
                  <pre className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">
                    {qrCode}
                  </pre>
            )}
            <div id="profileContainer" className={`flex flex-col gap-2 ${isConnected ? 'block' : 'hidden'}`}>
            <input
                    type="text"
                    id="phone-number"
                     value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                     placeholder="Phone Number"
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                    <input
                       type="text"
                      id="message"
                      placeholder="Message"
                      value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                    />
                <div className="flex gap-4 mt-4">
                    <button id="send-message"
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                        disabled={!isConnected}
                    >
                        Send Message
                    </button>
                    <button id="fetch-groups"
                        onClick={handleFetchGroups}
                           className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                         disabled={!isConnected}
                     >
                        Fetch Groups
                    </button>
                    <button id="logout"
                           onClick={handleLogout}
                       className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                       >
                       Logout
                   </button>
                </div>
                <div className="mt-4" id="groups">
                    {groups.map((group) => (
                         <div key={group.id} className="p-2 bg-white/50 dark:bg-gray-700/30 rounded-lg mb-2">
                         {group.name} ({group.id})
                         </div>
                    ))}
                </div>
            </div>
                    {!isConnected && (
                        <button
                             onClick={handleStartSession}
                             className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
                           >
                            Start Session
                        </button>
                    )}
        </div>
    );
};
export default SessionManager;