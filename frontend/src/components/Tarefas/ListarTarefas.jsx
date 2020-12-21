import React, { useContext } from 'react';
import Tarefa from './Tarefa';

import ProjetoContext from '../../context/Projetos/projetoContext';
import TarefasContext from '../../context/Tarefas/tarefasContext';

export default function ListarTarefas() {
  const projetoContext = useContext(ProjetoContext);
  const { projetoSelecionado, excluirProjeto } = projetoContext;

  const tarefasContext = useContext(TarefasContext);
  const { listaDeTarefasDoProjeto } = tarefasContext;

  if (!projetoSelecionado) return <h2>Selecione um projeto</h2>;

  function onClickExcluirProjeto() {
    excluirProjeto(projetoSelecionado.id);
  }

  return (
    <>
      <h2>Projeto: {projetoSelecionado.nome}</h2>
      <ul className="listado-tareas">
        {listaDeTarefasDoProjeto.length === 0 ? (
          <li className="tarea">
            <p>Não há tarefas.</p>
          </li>
        ) : (
          listaDeTarefasDoProjeto.map((tarefa) => (
            <Tarefa key={tarefa.id} tarefa={tarefa} />
          ))
        )}
      </ul>
      <button
        type="button"
        className="btn btn-eliminar"
        onClick={() => onClickExcluirProjeto()}
      >
        Excluir Projeto &times;
      </button>
    </>
  );
}
