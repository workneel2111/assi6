const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Get the path, remove query strings (everything after ?), and convert to lowercase
    const urlPath = req.url.split('?')[0].toLowerCase();
    
    // Remove trailing slash if it's not the root path (e.g., "/home/" becomes "/home")
    const cleanedPath = (urlPath.length > 1 && urlPath.endsWith('/')) 
        ? urlPath.slice(0, -1) 
        : urlPath;

    let fileName = '';
    let contentType = 'text/html';
    let statusCode = 200;

    // Route mapping: decide which file to open based on the URL
    if (cleanedPath === '/' || cleanedPath === '/home') {
        fileName = 'index.html';
    } else if (cleanedPath === '/about') {
        fileName = 'about.html';
    } else if (cleanedPath === '/contact') {
        fileName = 'contact.html';
    } else if (cleanedPath === '/style.css') {
        // Handle CSS file requests so styles actually load in the browser
        fileName = 'style.css';
        contentType = 'text/css';
    } else {
        // Default to 404 if the page doesn't exist
        fileName = '404.html';
        statusCode = 404;
    }

    const filePath = path.join(__dirname, fileName);

    // Read the requested file and send the response
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error(`File read error: ${fileName} was not found.`);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(data);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});