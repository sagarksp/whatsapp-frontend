// components/DevicesTable.jsx
export default function DevicesTable({ devices, onStartSession, onViewStatus }) {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left">Device Name</th>
              <th className="py-3 px-4 border-b text-left">Phone Number</th>
              <th className="py-3 px-4 border-b text-left">Status</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{device.deviceName}</td>
                <td className="py-3 px-4 border-b">{device.devicePhone}</td>
                <td className="py-3 px-4 border-b">
                  <span className={`inline-block px-2 py-1 rounded text-sm 
                    ${device.status === 'online' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}`}>
                    {device.status}
                  </span>
                </td>
                <td className="py-3 px-4 border-b space-x-2">
                  <button
                    onClick={() => onStartSession(device.devicePhone)}
                    className={`px-3 py-1 rounded text-white ${
                      device.status === 'online'
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    disabled={device.status === 'online'}
                  >
                    {device.status === 'online' ? 'Connected' : 'Start Session'}
                  </button>
                  <button
                    onClick={() => onViewStatus(device)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }