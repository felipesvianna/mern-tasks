import React, { useContext, useEffect } from 'react';
import Projeto from './Projeto';
import ProjetoContext from '../../context/Projetos/projetoContext';
import AlertaContext from '../../context/Alertas/alertaContext';

export default function ListarProjetos() {
  const projetoContext = useContext(ProjetoContext);
  const { listaDeProjetos, getProjetos, mensagemDeErro } = projetoContext;

  const alertaContext = useContext(AlertaContext);
  const { exibirAlerta } = alertaContext;

  useEffect(() => {
    if (mensagemDeErro) {
      exibirAlerta(mensagemDeErro.msg, mensagemDeErro.categoria);
    }
    getProjetos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mensagemDeErro]);

  if (listaDeProjetos.length === 0) return <p>Não há projetos.</p>;

  return (
    <ul className="listado-proyectos">
      {listaDeProjetos.map((projeto) => (
        <Projeto key={projeto.id} projeto={projeto} />
      ))}
    </ul>
  );
}
