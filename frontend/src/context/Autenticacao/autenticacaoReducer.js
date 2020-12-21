import {
  REGISTRADO_COM_SUCESSO,
  ERRO_AO_REGISTRAR,
  GET_USUARIO,
  LOGIN_COM_SUCESSO,
  ERRO_LOGIN,
  ENCERRAR_SESSAO,
} from '../../actionTypes';

export default (state, action) => {
  switch (action.type) {
    case LOGIN_COM_SUCESSO:
    case REGISTRADO_COM_SUCESSO:
      // eslint-disable-next-line no-undef
      localStorage.setItem('token', action.payload.token);
      return { ...state, autenticado: true, mensagem: null, carregando: false };
    case GET_USUARIO:
      return {
        ...state,
        autenticado: true,
        dadosUsuario: action.payload,
        carregando: false,
      };
    case ENCERRAR_SESSAO:
    case ERRO_LOGIN:
    case ERRO_AO_REGISTRAR:
      // eslint-disable-next-line no-undef
      localStorage.removeItem('token');
      return {
        ...state,
        autenticado: false,
        dadosUsuario: null,
        token: null,
        mensagem: action.payload,
        carregando: false,
      };
    default:
      return state;
  }
};
