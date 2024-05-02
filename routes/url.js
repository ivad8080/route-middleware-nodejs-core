const fs = require('fs');
const path = require('path');

function servePage(pageName, response) {
  fs.readFile(
    path.join(__dirname, `../public/${pageName}/${pageName}.html`),
    (error, htmlData) => {
      if (error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('Internal Server Error');
      } else {
        fs.readFile(
          path.join(__dirname, `../public/${pageName}/${pageName}.css`),
          (error, cssData) => {
            if (error) {
              response.writeHead(500, { 'Content-Type': 'text/plain' });
              response.end('Internal Server Error');
            } else {
              response.writeHead(200, { 'Content-Type': 'text/html' });
              response.write(`<style>${cssData}</style>`);
              response.write(htmlData);
              response.end();
            }
          }
        );
      }
    }
  );
}

module.exports = {
  servePage,
};
