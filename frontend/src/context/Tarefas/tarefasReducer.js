import {
  GET_TAREFAS_PROJETO,
  ADICIONAR_TAREFA,
  SET_ERRO_FORMULARIO_TAREFA,
  EXCLUIR_TAREFA,
  SELECIONAR_TAREFA,
  EDITAR_DADOS_TAREFA,
  ERRO_STATUS_TAREFA,
} from '../../actionTypes';

export default (state, action) => {
  switch (action.type) {
    case GET_TAREFAS_PROJETO:
      return {
        ...state,
        listaDeTarefasDoProjeto: action.payload,
      };
    case ADICIONAR_TAREFA:
      return {
        ...state,
        listaDeTarefasDoProjeto: [
          action.payload,
          ...state.listaDeTarefasDoProjeto,
        ],
        erroDadosTarefa: false,
      };
    case SET_ERRO_FORMULARIO_TAREFA:
      return {
        ...state,
        erroDadosTarefa: true,
      };
    case EXCLUIR_TAREFA:
      return {
        ...state,
        listaDeTarefasDoProjeto: state.listaDeTarefasDoProjeto.filter(
          (tarefa) => tarefa.id !== action.payload
        ),
      };
    case EDITAR_DADOS_TAREFA:
      return {
        ...state,
        listaDeTarefasDoProjeto: state.listaDeTarefasDoProjeto.map((tarefa) =>
          tarefa.id === action.payload.id ? action.payload : tarefa
        ),
        tarefaSelecionada: null,
      };
    case SELECIONAR_TAREFA:
      return {
        ...state,
        tarefaSelecionada: state.listaDeTarefasDoProjeto.find(
          (tarefa) => tarefa.id === action.payload
        ),
      };
    case ERRO_STATUS_TAREFA:
      return { ...state, mensagemDeErro: action.payload };
    default:
      return state;
  }
};
