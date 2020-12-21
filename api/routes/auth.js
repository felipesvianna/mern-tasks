const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/',
  [
    check('email', 'email is invalid').isEmail(),
    check('senha', 'minimo 6 caracteres').isLength({ min: 6 }),
  ],
  authController.autenticarUsuario
);

module.exports = router;
