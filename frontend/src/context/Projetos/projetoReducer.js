import {
  EXIBIR_FORMULARIO_PROJETO,
  GET_PROJETOS,
  ADICIONAR_PROJETO,
  SET_ERRO_FORMULARIO_PROJETO,
  SELECIONAR_PROJETO,
  EXCLUIR_PROJETO,
  ERRO_STATUS_PROJETO,
} from '../../actionTypes';

export default (state, action) => {
  switch (action.type) {
    case EXIBIR_FORMULARIO_PROJETO:
      return { ...state, formulario: true };
    case GET_PROJETOS:
      return { ...state, listaDeProjetos: action.payload };
    case ADICIONAR_PROJETO:
      return {
        ...state,
        listaDeProjetos: [action.payload, ...state.listaDeProjetos],
        formulario: false,
        hasErrosFormulario: false,
      };
    case SET_ERRO_FORMULARIO_PROJETO:
      return {
        ...state,
        hasErrosFormulario: true,
      };
    case SELECIONAR_PROJETO:
      return {
        ...state,
        projetoSelecionado: state.listaDeProjetos.find(
          (projeto) => projeto.id === action.payload
        ),
      };
    case EXCLUIR_PROJETO:
      return {
        ...state,
        listaDeProjetos: state.listaDeProjetos.filter(
          (projeto) => projeto.id !== action.payload
        ),
        projetoSelecionado: null,
      };
    case ERRO_STATUS_PROJETO:
      return { ...state, mensagemDeErro: action.payload };
    default:
      return state;
  }
};
