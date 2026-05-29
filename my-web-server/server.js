
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const server = http.createServer((req, res) => {

    let filePath = '';

    // Routing
    if ( req.url === '/home') {
        filePath = path.join(__dirname, 'public', 'index.html');

    } else if (req.url === '/about') {
        filePath = path.join(__dirname, 'public', 'about.html');

    } else if (req.url === '/contact') {
        filePath = path.join(__dirname, 'public', 'contact.html');

    } else if (req.url === '/style.css') {

        // Serve CSS file
        filePath = path.join(__dirname, 'public', 'style.css');

        fs.readFile(filePath, (err, content) => {
            if (err) {
                res.writeHead(500);
                res.end('Server Error');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(content);
            }
        });

        return;

    } else {

        // 404 page
        filePath = path.join(__dirname, 'public', '404.html');
    }

    fs.readFile(filePath, (err, content) => {

        if (err) {
            res.writeHead(500);
            res.end('Server Error');
        } else {

            if (filePath.includes('404.html')) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
            }

            res.end(content);
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

