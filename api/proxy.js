const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const target = req.query.target;
  if (!target) {
    return res.status(400).send('Missing target URL');
  }

  try {
    // Collect headers from the incoming request to forward to the target
    const forwardHeaders = {
      ...req.headers,
      'host': new URL(target).host // Set host header to the target host
    };

    // Remove headers that should not be forwarded
    delete forwardHeaders.cookie;
    delete forwardHeaders['content-length']; // This will be set automatically by fetch
    
    // Create a new request body from the incoming request
    const body = req.method !== 'GET' && req.method !== 'HEAD' ? req.body : undefined;

    const upstream = await fetch(target, {
      method: req.method,
      headers: forwardHeaders,
      body: body,
      redirect: 'follow'
    });

    // Forward the status and headers from the upstream response
    res.status(upstream.status);
    upstream.headers.forEach((value, key) => {
      if (key.toLowerCase() !== 'content-length') {
        res.setHeader(key, value);
      }
    });

    // Send the response body
    const buffer = await upstream.buffer();
    res.send(buffer);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error: ' + err.message);
  }
};
