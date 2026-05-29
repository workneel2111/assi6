# Node.js Routing Assignment

## Project Overview
This is a simple web server built using Node.js for my college assignment. The project demonstrates how to create a server from scratch without using any external frameworks like Express. It uses core Node.js modules to handle routing and serve HTML files to the browser.

## Features
*   Built using only core Node.js modules (`http`, `fs`, and `path`).
*   Custom routing logic to handle different page requests.
*   Serves static HTML files and a CSS stylesheet.
*   Includes a custom 404 page for invalid links.

## Routes Available
*   `/` or `/home`: The main landing page (`index.html`).
*   `/about`: Information about this assignment (`about.html`).
*   `/contact`: A simple contact form page (`contact.html`).
*   Any other URL: Displays the 404 error page (`404.html`).

## How to Run the Server
1.  Make sure you have Node.js installed on your computer.
2.  Open your terminal or command prompt in the project folder.
3.  Run the following command:
    ```bash
    node server.js
    ```

## How to Visit
Once the server is running, open your web browser and go to:
**http://localhost:3000**