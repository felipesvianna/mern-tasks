import React, { useContext, useEffect } from 'react';
import Sidebar from '../Layout/Sidebar';
import Barra from '../Layout/Barra';
import FormTarefa from '../Tarefas/FormTarefa';
import ListarTarefas from '../Tarefas/ListarTarefas';

import AutenticacaoContext from '../../context/Autenticacao/autenticacaoContext';
import AlertaContext from '../../context/Alertas/alertaContext';

export default function Projetos() {
  const autenticacaoContext = useContext(AutenticacaoContext);
  const { getDadosUsuarioAutenticado } = autenticacaoContext;

  const alertaContext = useContext(AlertaContext);
  const { alerta } = alertaContext;

  useEffect(() => {
    getDadosUsuarioAutenticado();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.mensagem}</div>
      ) : null}
      <div className="contenedor-app">
        <Sidebar />
        <div className="seccion-principal">
          <Barra />
          <main>
            <FormTarefa />
            <div className="contenedor-tareas">
              <ListarTarefas />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
