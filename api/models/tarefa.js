const mongoose = require('mongoose');

const { Schema } = mongoose;

const tarefaSchema = new Schema({
  nome: {
    type: String,
    req: true,
    trim: true,
  },
  concluida: {
    type: Boolean,
    default: false,
    req: true,
  },
  idProjeto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projeto',
  },
  idUsuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
  },
  data_inclusao: {
    type: Date,
    default: Date.now,
    req: true,
  },
  data_ultima_atu: {
    type: Date,
    req: true,
  },
  data_exclusao: {
    type: Date,
    default: null,
  },
  indicador_exclusao: {
    type: Boolean,
    default: null,
  },
});

module.exports = mongoose.model('Tarefa', tarefaSchema);
