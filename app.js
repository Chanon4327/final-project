const express = require('express');
const app = express();
const path = require('path');

const PORT = 3000; // You can choose any port number

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});