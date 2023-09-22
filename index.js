"use strict";

const { createServer } = require("./lib/server"); // Import the createServer function from your server.js file

const PORT = process.env.PORT || 3001; // Define the port for the server to listen on

const server = createServer(); // Create the server using the createServer function

server.start(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
