const express = require('express');
const { check } = require('express-validator');
const tarefaController = require('../controllers/tarefaController');
const isAuthenticated = require('../middlewares/isAuthenticated');

const router = express.Router();

router.post(
  '/',
  isAuthenticated,
  [
    check('nome', 'nome is required').trim().not().isEmpty(),
    check('idProjeto', 'idProjeto is required').trim().not().isEmpty(),
    check('nome', 'minimo 6 caracteres').isLength({ min: 6 }),
  ],
  tarefaController.adicionarTarefa
);

router.get(
  '/:idProjeto',
  isAuthenticated,
  tarefaController.getListaDeTarefasDeProjeto
);

router.patch(
  '/:idTarefa',
  isAuthenticated,
  [
    check('nome', 'nome is required').trim().not().isEmpty(),
    check('nome', 'minimo 6 caracteres').isLength({ min: 6 }),
    check('idProjeto', 'idProjeto is required').trim().not().isEmpty(),
  ],
  tarefaController.editarTarefa
);

router.delete('/:idTarefa', isAuthenticated, tarefaController.excluirTarefa);

module.exports = router;
