/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

exports.autenticarUsuario = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('erro na validacao');
    err.statusCode = 422;
    err.data = errors.array();
    res.status(422).json({ status: 422, errors });
    throw err;
  }

  const { email, senha } = req.body;

  try {
    const dadosUsuario = await Usuario.findOne({ email });

    if (
      !dadosUsuario ||
      !(await bcrypt.compare(senha, dadosUsuario.hash_senha))
    ) {
      const error = new Error('Invalid credentials');
      error.statusCode = 401;
      return res.status(401).json({ status: 401, error: 'Not Authorized' });
    }

    const token = jwt.sign(
      {
        email,
        _id: dadosUsuario._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // eslint-disable-next-line no-underscore-dangle
    res.status(200).json({
      id: dadosUsuario._id.toString(),
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
      token,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};
