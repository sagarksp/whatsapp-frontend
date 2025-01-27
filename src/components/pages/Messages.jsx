"use client"

import { useEffect, useState } from "react";

const SendMessage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data fallback
  const dummyData = {
    devices: ["8-Vinay Badola (7457819144)"],
    phonebooks: [
      { name: "Upcoming flaty", details: "Sir/Madam,phone:917017928324", total: 6 },
      { name: "ML PROJECT 🤓", details: "Sir/Madam,phone:917457819144", total: 2 },
    ],
  };

  useEffect(() => {
    // Simulate fetching API data
    setTimeout(() => {
      setData(dummyData); // Replace this with fetched API data
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-4 shadow rounded-lg">
        <h1 className="text-xl font-bold mb-4">Send Message</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Device Selector */}
          <div>
            <label className="block font-medium mb-1">Device</label>
            <select
              className="w-full border rounded-lg p-2"
              defaultValue={data?.devices[0] || ""}
            >
              {isLoading
                ? <option>Loading...</option>
                : data.devices.map((device, idx) => (
                    <option key={idx}>{device}</option>
                  ))}
            </select>
          </div>

          {/* Single Receiver */}
          <div>
            <label className="block font-medium mb-1">Single Receiver</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              placeholder="Phone with country code"
            />
          </div>

          {/* Message Template */}
          <div>
            <label className="block font-medium mb-1">Message Text</label>
            <textarea
              className="w-full border rounded-lg p-2"
              placeholder="Message text here..."
            />
          </div>

          {/* Emoji Selector */}
          <div className="col-span-2 lg:col-span-1">
            <label className="block font-medium mb-1">Emoji</label>
            <div className="border rounded-lg p-2 h-32 overflow-y-scroll">
              {/* Emoji list can be extended */}
              😊😂🥰😍😎😜
            </div>
          </div>

          {/* Media Upload */}
          <div>
            <label className="block font-medium mb-1">Media File</label>
            <input
              type="file"
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Schedule */}
          <div>
            <label className="block font-medium mb-1">Schedule Time</label>
            <input
              type="datetime-local"
              className="w-full border rounded-lg p-2"
            />
          </div>
        </div>

        {/* Random String and Send Button */}
        <div className="mt-4 flex items-center space-x-4">
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="Insert random string"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Send
          </button>
        </div>
      </div>

      {/* Phonebook Table */}
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-bold mb-4">Phonebook</h2>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2 text-left">Phonebook</th>
              <th className="border p-2 text-left">Name & Receiver Number</th>
              <th className="border p-2 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? <tr><td colSpan="3" className="text-center p-4">Loading...</td></tr>
              : data.phonebooks.map((book, idx) => (
                  <tr key={idx} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-2">{book.name}</td>
                    <td className="border p-2">{book.details}</td>
                    <td className="border p-2">{book.total}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SendMessage;
