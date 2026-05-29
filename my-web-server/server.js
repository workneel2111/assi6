
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    let filePath = '';
    let contentType = 'text/html';
    let statusCode = 200;

    // Routing
    if (req.url === '/' || req.url === '/home' || req.url === '/index.html') {
        filePath = path.join(__dirname, 'index.html');
    } else if (req.url === '/about' || req.url === '/about.html') {
        filePath = path.join(__dirname, 'about.html');
    } else if (req.url === '/contact' || req.url === '/contact.html') {
        filePath = path.join(__dirname, 'contact.html');
    } else if (req.url === '/style.css') {
        filePath = path.join(__dirname, 'style.css');
        contentType = 'text/css';
    } else {
        // 404 page
        filePath = path.join(__dirname, '404.html');
        statusCode = 404;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
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
