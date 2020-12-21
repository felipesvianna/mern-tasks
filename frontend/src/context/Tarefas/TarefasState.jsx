import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import tarefasReducer from './tarefasReducer';
import TarefasContext from './tarefasContext';

import {
  GET_TAREFAS_PROJETO,
  ADICIONAR_TAREFA,
  SET_ERRO_FORMULARIO_TAREFA,
  EXCLUIR_TAREFA,
  SELECIONAR_TAREFA,
  EDITAR_DADOS_TAREFA,
  ERRO_STATUS_TAREFA,
} from '../../actionTypes';

import createClientAxios from '../../util/axios';

export default function TarefasState(props) {
  const { children } = props;

  const initialState = {
    listaDeTarefasDoProjeto: [],
    erroDadosTarefa: false,
    tarefaSelecionada: null,
    mensagemDeErro: null,
  };

  const [state, dispatch] = useReducer(tarefasReducer, initialState);

  async function getTarefasDeProjeto(idProjeto) {
    try {
      const response = await createClientAxios.get(
        `/api/${process.env.REACT_APP_API_VERSION}/tarefas/${idProjeto}`
      );

      dispatch({
        type: GET_TAREFAS_PROJETO,
        payload: response.data.listaDeTarefas,
      });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao listar as tarefas',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_TAREFA, payload: alertaErro });
    }
  }

  async function adicionarTarefa(tarefa) {
    try {
      const response = await createClientAxios.post(
        `/api/${process.env.REACT_APP_API_VERSION}/tarefas/`,
        tarefa
      );

      dispatch({ type: ADICIONAR_TAREFA, payload: tarefa });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao adicionar tarefa',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_TAREFA, payload: alertaErro });
    }
  }

  function setErroFormTarefa() {
    dispatch({ type: SET_ERRO_FORMULARIO_TAREFA });
  }

  async function excluirTarefa(idTarefa) {
    try {
      const response = await createClientAxios.delete(
        `/api/${process.env.REACT_APP_API_VERSION}/tarefas/${idTarefa}`
      );

      dispatch({ type: EXCLUIR_TAREFA, payload: idTarefa });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao excluir a tarefa',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_TAREFA, payload: alertaErro });
    }
  }

  function selecionarTarefa(idTarefa) {
    dispatch({ type: SELECIONAR_TAREFA, payload: idTarefa });
  }

  async function editarDadosTarefa(dadosTarefa) {
    try {
      const response = await createClientAxios.patch(
        `/api/${process.env.REACT_APP_API_VERSION}/tarefas/${dadosTarefa.id}`,
        dadosTarefa
      );

      dispatch({ type: EDITAR_DADOS_TAREFA, payload: response.data });
    } catch (err) {
      const alertaErro = {
        msg: 'Ocorreu um erro ao alterar os dados da tarefa',
        categoria: 'alerta-error',
      };

      dispatch({ type: ERRO_STATUS_TAREFA, payload: alertaErro });
    }
  }

  return (
    <TarefasContext.Provider
      value={{
        listaDeTarefas: state.listaDeTarefas,
        listaDeTarefasDoProjeto: state.listaDeTarefasDoProjeto,
        erroDadosTarefa: state.erroDadosTarefa,
        tarefaSelecionada: state.tarefaSelecionada,
        mensagemDeErro: state.mensagemDeErro,
        getTarefasDeProjeto,
        adicionarTarefa,
        setErroFormTarefa,
        excluirTarefa,
        selecionarTarefa,
        editarDadosTarefa,
      }}
    >
      {children}
    </TarefasContext.Provider>
  );
}

TarefasState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

TarefasState.defaultProps = {
  children: null,
};
