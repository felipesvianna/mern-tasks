import React, { useContext } from 'react';
import AutenticacaoContext from '../../context/Autenticacao/autenticacaoContext';

export default function Barra() {
  const autenticacaoContext = useContext(AutenticacaoContext);
  const { dadosUsuario, encerrarSessao } = autenticacaoContext;

  function onClickEncerrarSessao() {
    encerrarSessao();
  }

  return (
    <header className="app-header">
      {dadosUsuario ? (
        <p className="nombre-usuario">
          Olá! <span>{dadosUsuario.nome}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          type="button"
          className="btn btn-blank cerrar-sesion"
          onClick={() => onClickEncerrarSessao()}
        >
          Encerrar Sessão
        </button>
      </nav>
    </header>
  );
}
