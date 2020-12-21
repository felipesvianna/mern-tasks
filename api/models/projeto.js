const mongoose = require('mongoose');

const { Schema } = mongoose;

const projetoSchema = new Schema({
  nome: {
    type: String,
    req: true,
    trim: true,
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

module.exports = mongoose.model('Projeto', projetoSchema);
