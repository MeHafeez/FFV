export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, message, timestamp, deviceInfo } = req.body;
    
    // Log to Vercel's server logs
    console.log(JSON.stringify({
      type,
      message,
      timestamp,
      deviceInfo,
      environment: process.env.VERCEL_ENV || 'development'
    }, null, 2));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Logging error:', error);
    return res.status(500).json({ error: 'Failed to log' });
  }
}