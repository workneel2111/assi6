
const http = require('http');
const fs = require('fs');
const path = require('path');

// Use process.env.PORT for deployment compatibility
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    // Normalize URL: Remove query strings and convert to lowercase
    // This ensures /home?query=1 or /Home works correctly
    let url = req.url.split('?')[0].toLowerCase();

    // Remove trailing slash (e.g., /home/ becomes /home)
    if (url.length > 1 && url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    let filePath = '';
    let contentType = 'text/html';
    let statusCode = 200;

    // Routing
    if (url === '/' || url === '/home' || url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (url === '/about' || url === '/about.html') {
        filePath = path.join(__dirname, 'about.html');
    } else if (url === '/contact' || url === '/contact.html') {
        filePath = path.join(__dirname, 'contact.html');
    } else if (url === '/style.css') {
        filePath = path.join(__dirname, 'style.css');
        contentType = 'text/css';
    } else {
        // 404 page
        filePath = path.join(__dirname, '404.html');
        statusCode = 404;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            console.error(`Error reading file ${filePath}:`, err);
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(statusCode, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
