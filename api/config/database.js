/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.set('debug', !!process.env.NODE_ENV === 'dev');

function conectarMongoDb(callback) {
  console.log('Conectando MongoDB');
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    // eslint-disable-next-line no-unused-vars
    .then((client) => {
      console.log('MongoDB conectado');
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
}

module.exports = conectarMongoDb;
