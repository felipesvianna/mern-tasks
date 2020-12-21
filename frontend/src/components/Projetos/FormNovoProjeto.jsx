import React, { useState, useContext } from 'react';

import ProjetoContext from '../../context/Projetos/projetoContext';

export default function FormNovoProjeto() {
  const projetoContext = useContext(ProjetoContext);

  const {
    formulario,
    exibirFormulario,
    hasErrosFormulario,
    adicionarProjeto,
    exibirErroFormulario,
  } = projetoContext;

  const initialState = {
    nome: '',
  };

  const [camposFormProjeto, setCamposFormProjeto] = useState(initialState);

  const { nome } = camposFormProjeto;

  function onChangeProjeto(e) {
    setCamposFormProjeto({
      ...camposFormProjeto,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitProjeto(e) {
    e.preventDefault();

    if (nome.length > 3) {
      adicionarProjeto(camposFormProjeto);
      setCamposFormProjeto(initialState);
    } else {
      exibirErroFormulario();
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={() => exibirFormulario()}
      >
        Novo Projeto
      </button>

      {formulario ? (
        <form onSubmit={onSubmitProjeto} className="formulario-nuevo-proyecto">
          <input
            type="text"
            name="nome"
            id="nome"
            className="input-text"
            placeholder="Nome do Projeto"
            value={nome}
            onChange={onChangeProjeto}
          />
          <input
            type="submit"
            value="Adicionar Projeto"
            className="btn btn-block btn-primario"
          />
        </form>
      ) : null}

      {hasErrosFormulario ? (
        <p className="mensaje error">
          O campo nome precisa ter no minimo 3 caracteres
        </p>
      ) : null}
    </>
  );
}
