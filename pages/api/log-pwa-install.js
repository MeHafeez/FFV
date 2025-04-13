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
    
    // Log to Vercel console
    console.log('PWA Installation Log:', {
      timestamp: new Date().toISOString(),
      ...logData
    });

    return res.status(200).json({ 
      success: true,
      message: 'Log recorded successfully',
      data: logData 
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
}