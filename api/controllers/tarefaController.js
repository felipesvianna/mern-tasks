/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Projeto = require('../models/projeto');
const Tarefa = require('../models/tarefa');

exports.adicionarTarefa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('erro na validacao');
    err.statusCode = 422;
    err.data = errors.array();
    res.status(422).json({ status: 422, errors });
    throw err;
  }

  const { nome, idProjeto } = req.body;

  try {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) {
      return res.status(404).json({ status: 404, msg: 'Not Found' });
    }

    if (projeto.idUsuario.toString() !== req.idUsuario) {
      return res.status(401).json({ status: 401, msg: 'Not Authorized' });
    }

    const novaTarefa = new Tarefa({
      nome,
      idProjeto,
      idUsuario: req.idUsuario,
    });
    await novaTarefa.save();
    return res.status(201).json({
      id: novaTarefa._id.toString(),
      nome: novaTarefa.nome,
      concluida: novaTarefa.concluida,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.getListaDeTarefasDeProjeto = async (req, res, next) => {
  const { idProjeto } = req.params;

  try {
    const projeto = await Projeto.findById(idProjeto);
    if (!projeto) {
      return res.status(404).json({ status: 404, msg: 'Not Found' });
    }

    if (projeto.idUsuario.toString() !== req.idUsuario) {
      return res.status(401).json({ status: 401, msg: 'Not Authorized' });
    }

    const listaDeTarefas = await Tarefa.aggregate([
      {
        $match: {
          idProjeto: mongoose.Types.ObjectId(idProjeto),
          indicador_exclusao: null,
        },
      },
      { $sort: { data_inclusao: -1 } },
      {
        $project: {
          _id: 0,
          id: '$_id',
          nome: 1,
          concluida: 1,
          idProjeto: 1,
        },
      },
    ]);
    return res
      .status(200)
      .json({ idUsuario: req.idUsuario, idProjeto, listaDeTarefas });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.editarTarefa = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const err = new Error('erro na validacao');
    err.statusCode = 422;
    err.data = errors.array();
    res.status(422).json({ status: 422, errors });
    throw err;
  }

  const { idTarefa } = req.params;
  const { idProjeto, nome, concluida } = req.body;

  try {
    let tarefaConcluida = false;
    if (concluida) {
      tarefaConcluida = true;
    }

    const dadosTarefa = await Tarefa.findOneAndUpdate(
      {
        _id: idTarefa,
        idProjeto,
        idUsuario: req.idUsuario,
      },
      {
        $set: { nome, concluida: tarefaConcluida, data_ultima_atu: new Date() },
      },
      { new: true }
    );

    if (!dadosTarefa) {
      return res.status(404).json({ status: 404, msg: 'Not Found' });
    }

    return res.status(200).json({
      id: dadosTarefa._id.toString(),
      nome: dadosTarefa.nome,
      concluida: dadosTarefa.concluida,
      idProjeto: dadosTarefa.idProjeto,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
      res.status(500).json({ status: 500, msg: 'Internal Server Error' });
    }
    next(err);
  }
};

exports.excluirTarefa = async (req, res, next) => {
  try {
    await Tarefa.findOneAndUpdate(
      {
        _id: req.params.idTarefa,
        idUsuario: req.idUsuario,
      },
      { $set: { data_exclusao: new Date(), indicador_exclusao: true } },
      { new: true }
    );
    return res.status(200).json({ id: req.params.idTarefa });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 401;
      res.status(401).json({ status: 401, msg: 'Not Authorized' });
    }
    next(err);
  }
};
