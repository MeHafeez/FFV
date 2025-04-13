export default async function handler(req, res) {
  // Enable CORS for local development
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const logData = req.body;
    
    // Enhanced logging with more details
    console.log('PWA Installation Log:', {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      host: req.headers.host,
      userAgent: req.headers['user-agent'],
      ...logData
    });

    // Store logs in Vercel
    const storedLog = {
      timestamp: new Date().toISOString(),
      data: logData,
      headers: req.headers,
      environment: process.env.NODE_ENV
    };

    console.log('Stored Log:', JSON.stringify(storedLog, null, 2));

    return res.status(200).json({ 
      success: true,
      message: 'Log recorded successfully',
      data: storedLog
    });
  } catch (error) {
    console.error('Detailed Error:', {
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    
    return res.status(500).json({ 
      success: false,
      message: error.message,
      timestamp: new Date().toISOString()
    });
  }
}