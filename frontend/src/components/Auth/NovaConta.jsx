/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/Alertas/alertaContext';
import AutenticacaoContext from '../../context/Autenticacao/autenticacaoContext';

export default function NovaConta(props) {
  const { history } = props;

  const alertaContext = useContext(AlertaContext);
  const { exibirAlerta } = alertaContext;

  const autenticacaoContext = useContext(AutenticacaoContext);
  const { registrarUsuario, mensagem, autenticado } = autenticacaoContext;

  useEffect(() => {
    if (autenticado) {
      // eslint-disable-next-line react/prop-types
      history.push('/projetos');
    }

    if (mensagem) {
      exibirAlerta(mensagem.msg, mensagem.categoria);
    }
  }, [mensagem, autenticado, history]);

  const [usuario, setUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });

  const { nome, email, senha, confirmarSenha } = usuario;

  function onChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitForm(e) {
    let existeErros = false;

    e.preventDefault();
    if (
      nome.trim() === '' ||
      email.trim() === '' ||
      senha.trim() === '' ||
      confirmarSenha.trim() === ''
    ) {
      exibirAlerta('Todos os campos são obrigatórios', 'alerta-error');
      existeErros = true;
    }

    if (senha.length < 6) {
      exibirAlerta(
        'A senha precisa ter no mínimo 6 caracteres',
        'alerta-error'
      );
      existeErros = true;
    }

    if (senha !== confirmarSenha) {
      exibirAlerta('As senhas informadas são diferentes', 'alerta-error');
      existeErros = true;
    }

    if (existeErros) return true;

    registrarUsuario({ nome, email, senha });
  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Criar conta</h1>

        <form onSubmit={onSubmitForm}>
          <div className="campo-form">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              value={nome}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="EMail"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              value={senha}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="confirmarSenha">Confirmar senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={confirmarSenha}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Cadastrar"
            />
          </div>
        </form>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        <Link to={'/'} className="enlace-cuenta">
          Voltar
        </Link>
      </div>
    </div>
  );
}

NovaConta.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
