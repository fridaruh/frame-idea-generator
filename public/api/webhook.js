export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Handle webhook requests
  if (req.method === 'POST') {
    try {
      const { body } = req;
      
      // Log the webhook data for debugging
      console.log('Webhook received:', body);
      
      // Return a success response
      res.status(200).json({
        success: true,
        message: 'Webhook received successfully',
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error'
      });
    }
  } else {
    // Handle GET requests
    res.status(200).json({
      success: true,
      message: 'Frame Idea Generator Webhook Endpoint',
      version: '1.0.0',
      timestamp: new Date().toISOString()
    });
  }
} 