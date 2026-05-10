# DRM License Proxy

A simple serverless function to proxy Widevine DRM license requests to bypass CORS or add headers.

## 🚀 Deploy to Vercel

1. Create a [Vercel](https://vercel.com) account (GitHub login works).
2. Click **New Project** → **Import Git Repository**.
3. Select this repository from your GitHub.
4. Click **Deploy**.

The project will be automatically configured and deployed.

## 📡 Usage

Once deployed, your proxy will be available at:
```
https://your-project.vercel.app/proxy?target=YOUR_TARGET_URL
```

### Example Usage
```javascript
// Example: Proxy a license request
const proxyUrl = 'https://your-project.vercel.app/proxy?target=https://license-server.com/license';
fetch(proxyUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: licenseRequestBuffer
});
```

## 🔧 Local Development

1. Install dependencies:
```bash
npm install
```

2. Run locally (requires Vercel CLI):
```bash
npm install -g vercel
vercel dev
```

The proxy will be available at `http://localhost:3000/proxy`.

## 📁 Project Structure

```
├── api/
│   └── proxy.js          # Serverless proxy function
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## ⚙️ Features

- ✅ CORS enabled for cross-origin requests
- ✅ Supports GET, POST, and OPTIONS methods
- ✅ Forwards headers and request body
- ✅ Handles binary data (license requests)
- ✅ Serverless deployment on Vercel
