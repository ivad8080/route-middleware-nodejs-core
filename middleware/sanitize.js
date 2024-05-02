function sanitize(request, response, next) {
  request.url = request.url.replace(/[^\w\s]/gi, '');
  next();
}

module.exports = sanitize;
