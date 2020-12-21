import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './components/Auth/Login';
import NovaConta from './components/Auth/NovaConta';
import Projetos from './components/Projetos';
import RotaPrivada from './components/RotaPrivada';

import ProjetoState from './context/Projetos/ProjetoState';
import TarefasState from './context/Tarefas/TarefasState';
import AlertaState from './context/Alertas/AlertaState';
import AutenticacaoState from './context/Autenticacao/AutenticacaoState';

import { setHeaderAuthorizationComToken } from './util/tokenHelper';

// eslint-disable-next-line no-undef
const token = localStorage.getItem('token');
if (token) {
  setHeaderAuthorizationComToken(token);
}

export default function App() {
  return (
    <ProjetoState>
      <TarefasState>
        <AlertaState>
          <AutenticacaoState>
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nova-conta" component={NovaConta} />
                <RotaPrivada exact path="/projetos" component={Projetos} />
              </Switch>
            </BrowserRouter>
          </AutenticacaoState>
        </AlertaState>
      </TarefasState>
    </ProjetoState>
  );
}
