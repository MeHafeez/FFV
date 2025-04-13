export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const deviceInfo = req.body;
    const timestamp = new Date().toISOString();
    
    // Enhanced logging with timestamp and structured data
    console.log(JSON.stringify({
      timestamp,
      type: 'PWA_INSTALLATION',
      data: deviceInfo
    }, null, 2));

    return res.status(200).json({ message: 'Data logged successfully' });
  } catch (error) {
    console.error('Error logging device info:', error);
    return res.status(500).json({ message: 'Error logging data' });
  }
}