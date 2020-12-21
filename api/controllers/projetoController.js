/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Projeto = require('../models/projeto');

exports.adicionarProjeto = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('erro na validacao');
    err.statusCode = 422;
    err.data = errors.array();
    res.status(422).json({ status: 422, errors });
    throw err;
  }

  try {
    const projeto = new Projeto(req.body);
    projeto.idUsuario = req.idUsuario;
    projeto.data_ultima_atu = new Date();

    await projeto.save();

    return res
      .status(201)
      .json({ id: projeto._id.toString(), nome: projeto.nome });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.editarProjeto = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('erro na validacao');
    err.statusCode = 422;
    err.data = errors.array();
    res.status(422).json({ status: 422, errors });
    throw err;
  }

  const { nome } = req.body;

  try {
    const dadosProjeto = await Projeto.findOneAndUpdate(
      {
        _id: req.params.idProjeto,
        idUsuario: req.idUsuario,
      },
      { $set: { nome, data_ultima_atu: new Date() } },
      { new: true }
    );

    return res
      .status(201)
      .json({ _id: dadosProjeto._id.toString(), nome: dadosProjeto.nome });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 404;
      res.status(404).json({ status: 404, msg: 'Not Found' });
    }
    next(err);
  }
};

exports.getListaDeProjetosDoUsuario = async (req, res, next) => {
  try {
    const listaDeProjetos = await Projeto.aggregate([
      {
        $match: {
          idUsuario: mongoose.Types.ObjectId(req.idUsuario),
          indicador_exclusao: null,
        },
      },
      { $sort: { data_inclusao: -1 } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          nome: 1,
        },
      },
    ]);

    if (listaDeProjetos) {
      return res
        .status(200)
        .json({ idUsuario: req.idUsuario, listaDeProjetos });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.excluirProjeto = async (req, res, next) => {
  try {
    await Projeto.findOneAndUpdate(
      {
        _id: req.params.idProjeto,
        idUsuario: req.idUsuario,
      },
      { $set: { data_exclusao: new Date(), indicador_exclusao: true } },
      { new: true }
    );
    return res.status(200).json({ id: req.params.idProjeto });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 401;
      res.status(401).json({ status: 401, msg: 'Not Authorized' });
    }
    next(err);
  }
};
