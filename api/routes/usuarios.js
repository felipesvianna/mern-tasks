const express = require('express');
const { check } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.put(
  '/',
  [
    check('nome', 'nome is required').trim().not().isEmpty(),
    check('email', 'email is invalid').isEmail(),
    check('senha', 'minimo 6 caracteres').isLength({ min: 6 }),
  ],
  usuarioController.cadastrarUsuario
);

router.get('/', isAuthenticated, usuarioController.getDadosUsuarioAutenticado);

module.exports = router;
