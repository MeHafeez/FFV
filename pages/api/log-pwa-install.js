export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const logData = req.body;
    
    // You can store this in your database or send to a logging service
    console.log('PWA Installation Log:', JSON.stringify(logData, null, 2));

    // If you're using Vercel, this will appear in your deployment logs
    res.status(200).json({ message: 'OK' });
  } catch (error) {
    console.error('Error logging PWA installation:', error);
    res.status(500).json({ message: 'Error recording log' });
  }
}