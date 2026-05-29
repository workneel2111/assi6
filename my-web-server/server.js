const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    let url = req.url.split('?')[0].toLowerCase();

    if (url.length > 1 && url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    let filePath = '';
    let contentType = 'text/html';
    let statusCode = 200;

    // Routes
    if (url === '/' || url === '/home' || url === '/index.html') {
        filePath = path.join(__dirname, 'public', 'index.html');

    } else if (url === '/about' || url === '/about.html') {
        filePath = path.join(__dirname, 'public', 'about.html');

    } else if (url === '/contact' || url === '/contact.html') {
        filePath = path.join(__dirname, 'public', 'contact.html');

    } else if (url === '/style.css') {
        filePath = path.join(__dirname, 'public', 'style.css');
        contentType = 'text/css';

    } else {
        filePath = path.join(__dirname, 'public', '404.html');
        statusCode = 404;
    }

    fs.readFile(filePath, (err, content) => {

        if (err) {
            console.error(err);

            res.writeHead(500, {
                'Content-Type': 'text/plain'
            });

            res.end('Server Error');

        } else {

            res.writeHead(statusCode, {
                'Content-Type': contentType
            });

            res.end(content);
        }
    });

});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});