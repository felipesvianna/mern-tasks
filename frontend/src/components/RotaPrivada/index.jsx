/* eslint-disable react/jsx-curly-newline */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

import AutenticacaoContext from '../../context/Autenticacao/autenticacaoContext';

export default function RotaPrivada({ component: Component, ...props }) {
  const autenticacaoContext = useContext(AutenticacaoContext);
  const {
    autenticado,
    getDadosUsuarioAutenticado,
    carregando,
  } = autenticacaoContext;

  useEffect(() => {
    getDadosUsuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        !autenticado && !carregando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

RotaPrivada.propTypes = {
  component: PropTypes.elementType,
};

RotaPrivada.defaultProps = {
  component: null,
};
