// Cleaned up Server Logic for Laundry Assignment

const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 5500;

/**
 * Helper function to serve HTML/CSS files
 * @param {object} res - Response object
 * @param {string} fileName - File to serve
 * @param {number} statusCode - HTTP status code
 */
async function serveFile(res, fileName, statusCode = 200) {

    // Correct file locations
    const possibleLocations = [
        path.resolve(__dirname, fileName),           // current folder
        path.resolve(__dirname, 'public', fileName), // public folder
        path.resolve(process.cwd(), fileName),       // working directory
        path.resolve(process.cwd(), 'public', fileName)
    ];

    let fileData = null;
    let successfulPath = '';

    // Search file in all possible locations
    for (const location of possibleLocations) {
        console.log(`-- Checking: ${location}`);

        try {
            fileData = await fs.readFile(location);
            successfulPath = location;
            break;
        } catch (err) {
            continue;
        }
    }

    // If file found
    if (fileData) {

        console.log(`[OK] Served ${fileName} from: ${successfulPath}`);

        const ext = path.extname(fileName).toLowerCase();

        let contentType = 'text/html';

        if (ext === '.css') {
            contentType = 'text/css';
        } else if (ext === '.js') {
            contentType = 'application/javascript';
        }

        res.writeHead(statusCode, {
            'Content-Type': contentType,
            'Cache-Control': 'no-store'
        });

        res.end(fileData);

    } else {

        // File not found
        console.error(`[404] Could not find ${fileName} anywhere.`);

        res.writeHead(404, {
            'Content-Type': 'text/html'
        });

        res.end(`
            <h1>404 Not Found</h1>
            <p>Server could not locate ${fileName}</p>
        `);
    }
}

// Create server
const server = http.createServer(async (req, res) => {

    // Remove query string and convert to lowercase
    const rawUrl = req.url.split('?')[0].toLowerCase();

    // Remove trailing slash
    const cleanPath =
        (rawUrl.endsWith('/') && rawUrl.length > 1)
            ? rawUrl.slice(0, -1)
            : rawUrl;

    // Ignore favicon request
    if (cleanPath === '/favicon.ico') {
        res.writeHead(204);
        return res.end();
    }

    console.log(`[${new Date().toLocaleTimeString()}] Request for: ${cleanPath}`);

    // Routing
    switch (cleanPath) {

        case '/':
        case '/home':
            await serveFile(res, 'index.html');
            break;

        case '/about':
            await serveFile(res, 'about.html');
            break;

        case '/contact':
            await serveFile(res, 'contact.html');
            break;

        case '/style.css':
            await serveFile(res, 'style.css');
            break;

        default:
            await serveFile(res, '404.html', 404);
            break;
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
});