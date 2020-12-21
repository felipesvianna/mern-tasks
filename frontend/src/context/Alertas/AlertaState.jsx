import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { EXIBIR_ALERTAS, OCULTAR_ALERTAS } from '../../actionTypes';

import alertaContext from './alertaContext';
import alertaReducer from './alertaReducer';

export default function AlertaState(props) {
  const { children } = props;

  const initialState = { alerta: null };

  const [state, dispatch] = useReducer(alertaReducer, initialState);

  function exibirAlerta(mensagem, categoria) {
    dispatch({ type: EXIBIR_ALERTAS, payload: { mensagem, categoria } });

    setTimeout(() => {
      dispatch({ type: OCULTAR_ALERTAS });
    }, 5000);
  }

  return (
    <alertaContext.Provider value={{ alerta: state.alerta, exibirAlerta }}>
      {children}
    </alertaContext.Provider>
  );
}

AlertaState.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

AlertaState.defaultProps = {
  children: null,
};
