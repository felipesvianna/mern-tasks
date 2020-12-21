import { EXIBIR_ALERTAS, OCULTAR_ALERTAS } from '../../actionTypes';

export default (state, action) => {
  switch (action.type) {
    case EXIBIR_ALERTAS:
      return { ...state, alerta: action.payload };
    case OCULTAR_ALERTAS:
      return { ...state, alerta: null };
    default:
      return state;
  }
};
