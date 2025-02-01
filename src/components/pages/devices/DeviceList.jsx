"use client"
import { useState, useEffect } from "react";

 function DeviceList({ onStartSession }) {
    const [devices, setDevices] = useState([]);
  
    useEffect(() => {
      const fetchDevices = async () => {
        const response = await fetch('http://localhost:8000/api/device/');
        const data = await response.json();
        if (data.success) {
          setDevices(data.data);
        }
      };
      fetchDevices();
    }, []);
  
    return (
      <div>
        {devices.map((device) => (
          <div key={device.devicePhone} className="device-card">
            <h3>{device.deviceName}</h3>
            <p>{device.devicePhone}</p>
            <p>Status: {device.status}</p>
            <button onClick={() => onStartSession(device.devicePhone)}>Start Session</button>
          </div>
        ))}
      </div>
    );
  }
  export default DeviceList