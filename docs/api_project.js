define({
  "name": "User Auth Service",
  "version": "0.1.0",
  "description": "This is a service for managing user roles and access levels.",
  "title": "Koot Framework",
  "url": "https://localhost:3000/v1",
  "header": {
    "title": "Setup",
    "content": "<p>This repo contains the code for the User Auth Module.</p>\n<h2>Prerequisites</h2>\n<ul>\n<li>\n<p>Install NodeJS, if not installed</p>\n<pre><code>  * wget -qO- https://deb.nodesource.com/setup_8.x | bash -\n  * sudo apt-get install -y nodejs\n</code></pre>\n</li>\n<li>\n<p>Install npm, if not installed</p>\n<pre><code>  * sudo apt-get install npm\n</code></pre>\n</li>\n</ul>\n<h2>To run the project</h2>\n<p>Steps to run it as a service.</p>\n<pre><code>Step 0: start notification service on port 3001 / configured port using .env file \n\nStep 1: npm install\n\nStep 2: npm start\n</code></pre>\n<h2>To lint the project</h2>\n<p>Steps to lint the project before commiting.</p>\n<pre><code>* npm run lint\n</code></pre>\n<h2>Development info</h2>\n<p>The connection is managed in /model/db.js. It is opened at application start, and closed on application termination. In this file we also monitor the connected, error and disconnected events.</p>\n"
  },
  "footer": {
    "title": "Cleanup"
  },
  "sampleUrl": false,
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2018-07-26T05:32:18.041Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
