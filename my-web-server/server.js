const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    // Normalize URL
    let urlPath = req.url.split('?')[0];

    // Remove trailing slash except root
    if (urlPath.length > 1 && urlPath.endsWith('/')) {
        urlPath = urlPath.slice(0, -1);
    }

    // Convert to lowercase
    urlPath = urlPath.toLowerCase();

    let fileName = '';
    let contentType = 'text/html';
    let statusCode = 200;

    switch (urlPath) {
        case '/':
        case '/home':
            fileName = 'index.html';
            break;

        case '/about':
            fileName = 'about.html';
            break;

        case '/contact':
            fileName = 'contact.html';
            break;

        case '/style.css':
            fileName = 'style.css';
            contentType = 'text/css';
            break;

        default:
            fileName = '404.html';
            statusCode = 404;
    }

    const filePath = path.join(__dirname, fileName);

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 Internal Server Error');
            return;
        }

        res.writeHead(statusCode, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});