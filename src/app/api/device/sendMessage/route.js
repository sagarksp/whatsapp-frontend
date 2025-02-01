export default async function handler(req, res) {
    const { sessionId, phoneNumber, message, devicePhone } = req.body;
  
    try {
      const response = await fetch('http://localhost:8000/api/device/connect/sendMessage', {
        method: 'POST',
        credentials:"include",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, phoneNumber, message, devicePhone }),
      });
  
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
      console.error('Error forwarding request:', error);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    }
  }