/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

exports.cadastrarUsuario = async (req, res, next) => {
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
    const usuarioExiste = await Usuario.findOne({ email });

    if (usuarioExiste) {
      return res.status(400).json({ status: 400, msg: 'Bad Request' });
    }

    const usuario = new Usuario(req.body);
    usuario.hash_senha = await bcrypt.hash(senha, 12);

    const resultadoQuery = await usuario.save();

    const token = jwt.sign(
      {
        email,
        _id: resultadoQuery._id.toString(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    // eslint-disable-next-line no-underscore-dangle
    res.status(201).json({ id: resultadoQuery._id.toString(), token });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.getDadosUsuarioAutenticado = async (req, res, next) => {
  try {
    const dadosUsuario = await Usuario.findById(req.idUsuario);

    return res.status(200).json({
      id: dadosUsuario._id,
      nome: dadosUsuario.nome,
      email: dadosUsuario.email,
    });
  } catch (err) {
    if (!err.statusCode && err.statusCode !== 400) {
      err.statusCode = 404;
      res.status(404).json({ status: 404, msg: 'Not Found' });
    }
    next(err);
  }
};
