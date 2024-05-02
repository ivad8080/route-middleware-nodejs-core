const http = require('http');

const { servePage } = require('./routes/url');

const logMiddleware = require('./middleware/log');
const sanitizeMiddleware = require('./middleware/sanitize');

const server = http.createServer((request, response) => {
  const url = request.url;

  if (url === '/') {
    servePage('home', response);
  } else if (url === '/about') {
    servePage('about', response);
  } else {
    servePage('notfound', response);
  }
});

server.on('request', (request, response) => {
  logMiddleware(request, response, () => {
    sanitizeMiddleware(request, response, () => {
      server.emit('middleware:done', request, response);
    });
  });
});

const port = 3001;

server.listen(port, () => {
  console.log(`Listening Port ${port}`);
});
