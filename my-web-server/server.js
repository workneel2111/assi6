const http = require('http'); // Module to create the server
const fs = require('fs');     // Module to read files from your computer
const path = require('path'); // Module to handle file paths

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Get the URL requested by the user
    const url = req.url;

    // These variables will store the file we want to show and the status code
    let fileName = '';
    let statusCode = 200;

    // 1. Routing Logic: Determine which file to show based on the URL path
    if (url === '/' || url === '/home') {
        fileName = 'index.html';
    } else if (url === '/about') {
        fileName = 'about.html';
    } else if (url === '/contact') {
        fileName = 'contact.html';
    } else {
        // If the URL doesn't match any of the above, use the 404 file
        fileName = '404.html';
        statusCode = 404;
    }

    // Construct the full path to the HTML file
    // __dirname refers to the folder where this server.js file is located
    const filePath = path.join(__dirname, fileName);

    // 2. File Serving Logic: Read the file content from the disk
    fs.readFile(filePath, (err, data) => {
        if (err) {
            // If there's an error (like the file is missing), send a 500 error
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal Server Error');
        } else {
            // If successful, send the content of the HTML file
            res.writeHead(statusCode, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

// Start the server on port 3000
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});