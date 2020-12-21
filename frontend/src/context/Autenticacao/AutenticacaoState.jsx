import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import {
  REGISTRADO_COM_SUCESSO,
  ERRO_AO_REGISTRAR,
  GET_USUARIO,
  LOGIN_COM_SUCESSO,
  ERRO_LOGIN,
  ENCERRAR_SESSAO,
} from '../../actionTypes';

import createClientAxios from '../../util/axios';

import {
  setHeaderAuthorizationComToken,
  removerHeaderAuthorization,
} from '../../util/tokenHelper';

import autenticacaoContext from './autenticacaoContext';
import autenticacaoReducer from './autenticacaoReducer';

export default function AutenticacaoState(props) {
  const { children } = props;

  const initialState = {
    // eslint-disable-next-line no-undef
    token: localStorage.getItem('token'),
    autenticado: null,
    dadosUsuario: null,
    mensagem: null,
    carregando: true,
  };

  const [state, dispatch] = useReducer(autenticacaoReducer, initialState);

  async function getDadosUsuarioAutenticado() {
    // eslint-disable-next-line no-undef
    const token = localStorage.getItem('token');

    if (token) {
      setHeaderAuthorizationComToken(token);
    } else {
      removerHeaderAuthorization();
    }

    try {
      const response = await createClientAxios.get(
        `/api/${process.env.REACT_APP_API_VERSION}/usuarios/`
      );

      dispatch({ type: GET_USUARIO, payload: response.data });
    } catch (err) {
      dispatch({ type: ERRO_LOGIN, payload: {} });
    }
  }

  async function registrarUsuario(dadosUsuario) {
    try {
      const response = await createClientAxios.put(
        `/api/${process.env.REACT_APP_API_VERSION}/usuarios`,
        dadosUsuario
      );

      dispatch({ type: REGISTRADO_COM_SUCESSO, payload: response.data });

      await getDadosUsuarioAutenticado();
    } catch (err) {
      let alertaErro;

      if (err.response.status === 400) {
        alertaErro = {
          msg: 'Este email já está em uso',
          categoria: 'alerta-error',
        };
      }
      dispatch({ type: ERRO_AO_REGISTRAR, payload: alertaErro });
    }
  }

  async function iniciarSessaoUsuario(dadosUsuario) {
    try {
      const response = await createClientAxios.post(
        `/api/${process.env.REACT_APP_API_VERSION}/auth`,
        dadosUsuario
      );

      dispatch({ type: LOGIN_COM_SUCESSO, payload: response.data });

      await getDadosUsuarioAutenticado();
    } catch (err) {
      let alertaErro;

      if (err.response.status === 401) {
        alertaErro = {
          msg: 'Credenciais inválidas',
          categoria: 'alerta-error',
        };
      }

      dispatch({ type: ERRO_LOGIN, payload: alertaErro });
    }
  }

  function encerrarSessao() {
    dispatch({ type: ENCERRAR_SESSAO });
  }

  return (
    <autenticacaoContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        dadosUsuario: state.dadosUsuario,
        mensagem: state.mensagem,
        carregando: state.carregando,
        registrarUsuario,
        iniciarSessaoUsuario,
        getDadosUsuarioAutenticado,
        encerrarSessao,
      }}
    >
      {children}
    </autenticacaoContext.Provider>
  );
}

AutenticacaoState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AutenticacaoState.defaultProps = {
  children: null,
};
