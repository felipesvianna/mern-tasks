/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // console.log('isauth middle');
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    res.status(401).json({ status: 401, msg: 'Not authorized' });
    throw error;
  }

  let decodedToken;

  try {
    const token = authHeader.split(' ')[1];
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decodedToken) {
      const error = new Error('Not authorized');
      error.statusCode = 401;
      res.status(401).json({ status: 401, msg: 'Not authorized' });
      throw error;
    }

    req.idUsuario = decodedToken._id;
  } catch (err) {
    if (err.message === 'invalid token') {
      err.statusCode = 401;
      res.status(401).json({ status: 401, msg: 'Not authorized' });
    } else {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }

    throw err;
  }

  next();
};
