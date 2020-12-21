const express = require('express');
const { check } = require('express-validator');
const projetoController = require('../controllers/projetoController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  [
    check('nome', 'nome is required').trim().not().isEmpty(),
    check('nome', 'minimo 3 caracteres').isLength({ min: 3 }),
  ],
  projetoController.adicionarProjeto
);

router.patch(
  '/:idProjeto',
  isAuthenticated,
  [
    check('nome', 'nome is required').trim().not().isEmpty(),
    check('nome', 'minimo 6 caracteres').isLength({ min: 6 }),
  ],
  projetoController.editarProjeto
);

router.get('/', isAuthenticated, projetoController.getListaDeProjetosDoUsuario);

router.delete('/:idProjeto', isAuthenticated, projetoController.excluirProjeto);

module.exports = router;
