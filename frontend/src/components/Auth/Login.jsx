/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/Alertas/alertaContext';
import AutenticacaoContext from '../../context/Autenticacao/autenticacaoContext';

export default function Login(props) {
  const { history } = props;

  const alertaContext = useContext(AlertaContext);
  const { exibirAlerta } = alertaContext;

  const autenticacaoContext = useContext(AutenticacaoContext);
  const { iniciarSessaoUsuario, mensagem, autenticado } = autenticacaoContext;

  useEffect(() => {
    if (autenticado) {
      // eslint-disable-next-line react/prop-types
      history.push('/projetos');
    }

    if (mensagem) {
      exibirAlerta(mensagem.msg, mensagem.categoria);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensagem, autenticado, history]);

  const [usuario, setUsuario] = useState({
    email: '',
    senha: '',
  });

  const { email, senha } = usuario;

  function onChange(e) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit(e) {
    e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      exibirAlerta('Todos os campos são obrigratórios', 'alerta-error');
    }

    iniciarSessaoUsuario(usuario);
    return true;
  }

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sessão</h1>

        <form onSubmit={onSubmit}>
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
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sessão"
            />
          </div>
        </form>
        {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
        <Link to={'/nova-conta'} className="enlace-cuenta">
          Criar conta
        </Link>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
