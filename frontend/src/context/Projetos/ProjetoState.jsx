import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import projetoContext from './projetoContext';
import projetoReducer from './projetoReducer';
import {
  EXIBIR_FORMULARIO_PROJETO,
  GET_PROJETOS,
  ADICIONAR_PROJETO,
  SET_ERRO_FORMULARIO_PROJETO,
  SELECIONAR_PROJETO,
  EXCLUIR_PROJETO,
  ERRO_STATUS_PROJETO,
} from '../../actionTypes';

import createClientAxios from '../../util/axios';

export default function ProjetoState(props) {
  const { children } = props;

  const initialState = {
    listaDeProjetos: [],
    formulario: false,
    hasErrosFormulario: false,
    projetoSelecionado: null,
    mensagemDeErro: null,
  };

  const [state, dispatch] = useReducer(projetoReducer, initialState);

  function exibirFormulario() {
    dispatch({ type: EXIBIR_FORMULARIO_PROJETO });
  }

  async function getProjetos() {
    try {
      const response = await createClientAxios.get(
        `/api/${process.env.REACT_APP_API_VERSION}/projetos/`
      );

      dispatch({ type: GET_PROJETOS, payload: response.data.listaDeProjetos });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao listar os projetos',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_PROJETO, payload: alertaErro });
    }
  }

  async function adicionarProjeto(projeto) {
    try {
      const response = await createClientAxios.post(
        `/api/${process.env.REACT_APP_API_VERSION}/projetos/`,
        projeto
      );

      dispatch({ type: ADICIONAR_PROJETO, payload: response.data });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao adicionar o projeto',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_PROJETO, payload: alertaErro });
    }
  }

  function exibirErroFormulario() {
    dispatch({ type: SET_ERRO_FORMULARIO_PROJETO });
  }

  function selecionarProjeto(idProjeto) {
    dispatch({ type: SELECIONAR_PROJETO, payload: idProjeto });
  }

  async function excluirProjeto(idProjeto) {
    try {
      const response = await createClientAxios.delete(
        `/api/${process.env.REACT_APP_API_VERSION}/projetos/${idProjeto}`
      );

      if (response.status === 200) {
        dispatch({ type: EXCLUIR_PROJETO, payload: idProjeto });
      }
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao excluir o projeto',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_PROJETO, payload: alertaErro });
    }
  }

  return (
    <projetoContext.Provider
      value={{
        listaDeProjetos: state.listaDeProjetos,
        formulario: state.formulario,
        hasErrosFormulario: state.hasErrosFormulario,
        mensagemErroFormulario: state.mensagemErroFormulario,
        projetoSelecionado: state.projetoSelecionado,
        mensagemDeErro: state.mensagemDeErro,
        exibirFormulario,
        getProjetos,
        adicionarProjeto,
        exibirErroFormulario,
        selecionarProjeto,
        excluirProjeto,
      }}
    >
      {children}
    </projetoContext.Provider>
  );
}

ProjetoState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

ProjetoState.defaultProps = {
  children: null,
};
