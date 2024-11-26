const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const mongoose = require('mongoose');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.NEXT_PUBLIC_URL;
const port = process.env.PORT || process.env.DEV_SERVER_PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

// Remove the mongoose.set('tls', ...) line

// Instead, set up MongoDB connection here
mongoose.connect(process.env.MONGODB_URI, {
  // useNewUrlParser: true,
  // Add any other options you need
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.err(`> Ready on ${hostname}:${port}`);
    console.err('NODE_ENV:', process.env.NODE_ENV);
  });
});