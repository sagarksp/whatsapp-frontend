'use client';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import PaginationControls from './devices/PaginationControls';
import { useRouter } from 'next/navigation';
import { io } from 'socket.io-client';

const Devices = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    deviceName: '',
    devicePhone: '',
  });
  const [socket, setSocket] = useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [deviceDetails, setDeviceDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Please start a session.');
  const [qrCode, setQrCode] = useState(null);
  const [groups, setGroups] = useState([]);
  const [phone, setPhone] = useState('');
  const [connectedDevicePhone, setConnectedDevicePhone] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const devicesPerPage = 10;
  const [showSessionExists, setShowSessionExists] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchDevices();

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedDevice(null);
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const socketRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8000', {
      credentials: 'include',
      // autoConnect : false,
    });

    socketRef.current = newSocket;

    console.log('Connecting to WebSocket server...', socketRef.current.id);

    // Check localStorage for existing sessions
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');

    // Find the first connected session (if any)
    const connectedSession = Object.entries(sessions).find(
      ([phone, data]) => data.isConnected,
    );

    if (connectedSession) {
      const [devicePhone, sessionData] = connectedSession;
      setIsConnected(true);
      setStatusMessage('You are connected!');
      setConnectedDevicePhone(devicePhone);
      console.log('Restored connection for:', devicePhone);
    }

    newSocket.on('connect', (message, devicePhone) => {
      console.log(
        'Connected to WebSocket server with socket ID:',
        newSocket.id,
      );
      const sessions = JSON.parse(localStorage.getItem("sessions") || "{}");
      if (sessions[devicePhone]) {
        sessions[devicePhone].isConnected = true;
        localStorage.setItem("sessions", JSON.stringify(sessions));
      }
      setStatusMessage(message);
      setQrCode(null);
      setIsConnected(true);
      setConnectedDevicePhone(devicePhone);
    });

    newSocket.on('device-mismatch', (data) =>{
      console.log('Device mismatch detected:', data.message);
      setStatusMessage(data.message);
      setIsConnected(false);
      setConnectedDevicePhone(null);
    })

    newSocket.on('qr-code', (qr) => {
      console.log('Received QR code from server:', qr);
      setQrCode(qr);
    });

    newSocket.on('connected', (message,devicePhone) => {
      // Update specific device's connection status
      const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
      if (connectedDevicePhone && sessions[connectedDevicePhone]) {
        sessions[connectedDevicePhone].isConnected = true;
        localStorage.setItem('sessions', JSON.stringify(sessions));
      }
      setStatusMessage(message);
      setQrCode(null);
      setIsConnected(true);
      setConnectedDevicePhone(devicePhone);

    });

    newSocket.on('logout-success', (devicePhone) => {
      // Update specific device's connection status
      const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
      if (sessions[devicePhone]) {
        delete sessions[devicePhone];
        localStorage.setItem('sessions', JSON.stringify(sessions));
      }
      setIsConnected(false);
      setStatusMessage(`Logged out from device: ${devicePhone}`);
      // refresh the page forcefully
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      console.log('Disconnected from socket');
      socketRef.current.off('device-mismatch');
    };
  }, []);

  useEffect(() => {
    const filtered = devices.filter(
      (device) =>
        device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.devicePhone.includes(searchTerm),
    );
    setCurrentPage(1);
  }, [searchTerm]);

  const fetchDevices = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/device', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch devices');
      setDevices(data.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceDetails = async (deviceId) => {
    try {
      setDetailsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/device/show/${deviceId}`,
        {
          method: 'GET',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to fetch device details');
      setDeviceDetails(data.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleCreateDevice = async () => {
    try {
      setError(null);
      setSuccess(null);
      const response = await fetch('http://localhost:8000/api/device/create', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(newDevice),
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || 'Failed to create device');

      setSuccess('Device created successfully!');
      await fetchDevices();
      setIsModalOpen(false);
      setNewDevice({ deviceName: '', devicePhone: '' });
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  const filteredDevices = devices.filter(
    (device) =>
      device.deviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.devicePhone.includes(searchTerm),
  );

  const indexOfLastDevice = currentPage * devicesPerPage;
  const indexOfFirstDevice = indexOfLastDevice - devicesPerPage;
  const currentDevices = filteredDevices.slice(
    indexOfFirstDevice,
    indexOfLastDevice,
  );
  const handleStartSession = async (phoneNumber) => {
    console.log(
      'Starting session with phone:',
      phoneNumber,
      socketRef.current?.id,
    );

    // let sessionId = localStorage.getItem("sessionId") || socket.id;
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');

    const sessionId = sessions[phoneNumber]?.sessionId || socketRef.current?.id;
    console.log('sessionId>>', sessionId);

    const newSessions = {
      ...sessions,
      [phoneNumber]: {
        sessionId,
        isConnected: false,
        lastUsed: new Date().toISOString(),
      },
    };

    localStorage.setItem('sessions', JSON.stringify(newSessions));

    try {
      const response = await fetch(
        'http://localhost:8000/api/device/connect/startSession',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, devicePhone: phoneNumber }),
        },
      );
      const data = await response.json();
      if (data?.success) {
        // setIsConnected(true);
        const newSessions = JSON.parse(localStorage.getItem('sessions'));
        newSessions[phoneNumber].isConnected = true;
        localStorage.setItem('sessions', JSON.stringify(newSessions));

        setConnectedDevicePhone(phoneNumber);
      }
    } catch (error) {
      console.error('Error starting session:', error);
    }
  };

  const handleNavigateToDevice = (phoneNumber) => {
    router.push(`/devices/${phoneNumber}`);
  };

  const handleSendMessage = async (devicePhone) => {
    const sessions = JSON.parse(localStorage.getItem('sessions'));
    const sessionData = sessions[devicePhone];

    if (!sessionData?.isConnected) {
      setStatusMessage('Session not active for this device');
      return;
    }

    const message = document.getElementById('message')?.value;

    if (!phone || !message) {
      setStatusMessage('Please enter both phone number and message.');
      return;
    }

    const sessionId = sessionData.sessionId;
    try {
      const response = await fetch(
        'http://localhost:8000/api/device/connect/send-message',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            phoneNumber: phone,
            message,
            devicePhone: devicePhone, // Sender's number
          }),
        },
      );
      const data = await response.json();
      setStatusMessage(data.message);
    } catch (error) {
      console.error('Error sending message:', error);
      setStatusMessage('Failed to send message.');
    }
  };

  const handleLogout = async (devicePhone) => {
    const sessions = JSON.parse(localStorage.getItem('sessions'));
    const sessionId = sessions[devicePhone]?.sessionId;

    if (!sessionId) {
      console.log('No session ID found in local storage.');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8000/api/device/connect/logout',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, devicePhone }),
        },
      );

      const newSessions = { ...sessions };
      delete newSessions[devicePhone];
      localStorage.setItem('sessions', JSON.stringify(newSessions));

      const data = await response.json();
      console.log(data.message);
      setStatusMessage(`Logged out from device: ${devicePhone}`);
      setIsConnected(false);
      setConnectedDevicePhone('');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const getSessionForDevice = (devicePhone) => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
    return sessions[devicePhone]?.sessionId;
  };

  // Helper to check connection status
  const isDeviceConnected = (devicePhone) => {
    const sessions = JSON.parse(localStorage.getItem('sessions') || '{}');
    return sessions[devicePhone]?.isConnected || false;
  };

  const handleFetchGroups = async (devicePhone) => {
    const sessions = JSON.parse(localStorage.getItem('sessions'));
    const sessionId = sessions[devicePhone]?.sessionId;

    if (!sessionId) {
      setStatusMessage('Session not started. Please start the session first.');
      return;
    }
    try {
      const response = await fetch(
        'http://localhost:8000/api/device/connect/fetch-groups',
        {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, devicePhone }),
        },
      );
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error during fetching groups:', error);
    }
  };

  const DeviceDetailsModal = ({ deviceId, onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-2xl animate-slideUp">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Device Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
          >
            ×
          </button>
        </div>

        {detailsLoading ? (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          </div>
        ) : (
          deviceDetails && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem
                label="Device Name"
                value={deviceDetails.deviceName}
              />
              <DetailItem
                label="Phone Number"
                value={deviceDetails.devicePhone}
              />
              <DetailItem
                label="Status"
                value={deviceDetails.status}
                status={deviceDetails.status === 'online'}
              />
              <DetailItem label="API Token" value={deviceDetails.apiToken} />
              <DetailItem
                label="Created At"
                value={new Date(deviceDetails.createdAt).toLocaleString()}
              />
              <DetailItem
                label="Last Updated"
                value={new Date(deviceDetails.updatedAt).toLocaleString()}
              />
            </div>
          )
        )}

        <div className="mt-6">
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-lg font-semibold transition-all duration-300"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden max-w-full -mt-20">
      <div className="container mx-auto p-4 min-h-screen flex items-center justify-center">
        <div className="bg-white/30 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl w-full max-w-6xl p-8 border border-white/20 dark:border-gray-700/50">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Device Management
            </h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02]"
            >
              Add New Device
            </button>
          </div>

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg">
              Error: {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg">
              {success}
            </div>
          )}
          <div className="mb-6 p-4 bg-white/50 dark:bg-gray-700/30 rounded-lg flex flex-col gap-2">
            {statusMessage && (
              <div className="text-gray-800 dark:text-white">
                {statusMessage}
              </div>
            )}
            {qrCode && (
              <pre className="text-gray-800 dark:text-white whitespace-pre-wrap break-words">
                {qrCode}
              </pre>
            )}
          </div>
          <div
            id="profileContainer"
            className={`mb-6 p-4 bg-white/50 dark:bg-gray-700/30 rounded-lg flex flex-col gap-2 ${
              isConnected ? 'block' : 'hidden'
            }`}
          >
            <input
              type="text"
              id="phone-number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Receiver's Phone Number" // Update placeholder
              className="..."
            />
            <input
              type="text"
              id="message"
              placeholder="Message"
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            />
            <div className="mt-4" id="groups">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="p-2 bg-white/50 dark:bg-gray-700/30 rounded-lg mb-2"
                >
                  {group.name} ({group.id})
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/50 dark:bg-gray-700/30 rounded-xl backdrop-blur-lg">
            {loading ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-300">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
              </div>
            ) : filteredDevices.length === 0 ? (
              <div className="p-4 text-center text-gray-600 dark:text-gray-300">
                No devices found{searchTerm && ` matching "${searchTerm}"`}
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                      <tr>
                        {[
                          'Device Name',
                          'Phone',
                          'Status',
                          'API Token',
                          'Actions',
                        ].map((header) => (
                          <th
                            key={header}
                            className="p-4 text-left text-gray-600 dark:text-gray-300"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentDevices.map((device) => (
                        <tr
                          key={device._id}
                          className="border-t border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                        >
                          <td className="p-4 text-gray-800 dark:text-gray-200">
                            {device.deviceName}
                          </td>
                          <td className="p-4 text-gray-800 dark:text-gray-200">
                            {device.devicePhone}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                device.status.toLowerCase() === 'online'
                                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                              }`}
                            >
                              {device.status}
                            </span>
                          </td>
                          <td className="p-4 text-blue-600 dark:text-blue-400 break-all">
                            {device.apiToken}
                          </td>
                          <td className="p-4">
                            <button
                              onClick={() => {
                                setSelectedDevice(device._id);
                                fetchDeviceDetails(device._id);
                              }}
                              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-colors"
                            >
                              View
                            </button>

                            <button
                              onClick={() => {
                                handleStartSession(device.devicePhone);
                                setPhone(device.devicePhone);
                              }}
                              hidden={isDeviceConnected(device.devicePhone)}
                              className={`text-teal-500 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 transition-colors ml-8 ${
                                isDeviceConnected(device.devicePhone)
                                  ? 'opacity-50 cursor-not-allowed'
                                  : ''
                              }`}
                            >
                              {isDeviceConnected(device.devicePhone)
                                ? 'Session Active'
                                : 'Start Session'}
                            </button>

                            <button
                              onClick={() =>
                                handleSendMessage(device.devicePhone)
                              }
                              className="text-green-500 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors ml-8"
                            >
                              Send Message
                            </button>

                            <button
                              onClick={() =>
                                handleFetchGroups(device.devicePhone)
                              }
                              className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors ml-8"
                            >
                              Fetch Groups
                            </button>

                            <button
                              onClick={() => handleLogout(device.devicePhone)}
                              className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors ml-8"
                            >
                              Logout
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredDevices.length > devicesPerPage && (
                  <PaginationControls />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedDevice && (
        <DeviceDetailsModal
          deviceId={selectedDevice}
          onClose={() => {
            setSelectedDevice(null);
            setDeviceDetails(null);
          }}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-6 w-full max-w-md animate-slideUp">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                New Device
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Device Name
                </label>
                <input
                  type="text"
                  value={newDevice.deviceName}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, deviceName: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter device name"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={newDevice.devicePhone}
                  onChange={(e) =>
                    setNewDevice({ ...newDevice, devicePhone: e.target.value })
                  }
                  className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="Enter phone number"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleCreateDevice}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white p-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Create Device
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white p-3 rounded-lg font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

const DetailItem = ({ label, value, status }) => (
  <div className="bg-white/50 dark:bg-gray-700/30 p-4 rounded-lg transition-colors hover:bg-white/70 dark:hover:bg-gray-700/50">
    <dt className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
      {label}
    </dt>
    <dd className="mt-1">
      {status !== undefined ? (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            status
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}
        >
          {value}
        </span>
      ) : (
        <span className="text-gray-800 dark:text-gray-200 break-all">
          {value}
        </span>
      )}
    </dd>
  </div>
);

export default Devices;