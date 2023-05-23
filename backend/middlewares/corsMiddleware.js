// 'https://tomson.students.nomoredomains.monster',
// 'http://tomson.students.nomoredomains.monster',

const allowedCors = [
  'localhost',
  'localhost:3001',
  'http://localhost',
  'http://localhost:3001',
  'http://localhost:3001/',
];

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
    }

    return res.end();
  }

  return next();
};

module.exports = {
  allowedCors,
  corsMiddleware,
};
