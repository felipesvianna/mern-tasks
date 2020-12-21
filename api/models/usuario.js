const mongoose = require('mongoose');

const { Schema } = mongoose;

const usuarioSchema = new Schema({
  nome: {
    type: String,
    req: true,
  },
  email: {
    type: String,
    req: true,
    unique: true,
  },
  hash_senha: {
    type: String,
    req: true,
  },
  data_inclusao: {
    type: Date,
    default: Date.now,
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

module.exports = mongoose.model('Usuario', usuarioSchema);
