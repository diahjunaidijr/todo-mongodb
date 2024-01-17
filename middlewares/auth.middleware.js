// auth.middleware.js
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;
    return next(error);
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;
    next();
  } catch (error) {
    error.statusCode = 401;
    next(error);
  }
};

module.exports = { authenticateUser };
