/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import TarefasContext from '../../context/Tarefas/tarefasContext';
import ProjetoContext from '../../context/Projetos/projetoContext';

export default function Tarefa({ tarefa }) {
  const tarefasContext = useContext(TarefasContext);
  const {
    getTarefasDeProjeto,
    excluirTarefa,
    selecionarTarefa,
    editarDadosTarefa,
  } = tarefasContext;

  const projetoContext = useContext(ProjetoContext);
  const { projetoSelecionado } = projetoContext;

  function onClickExcluirTarefa(idTarefa) {
    excluirTarefa(idTarefa);
    getTarefasDeProjeto(projetoSelecionado.id);
  }

  function onClickAlterarStatusTarefa(tarefa) {
    // tarefa.idProjeto = projetoSelecionado.id;

    if (tarefa.concluida) {
      tarefa.concluida = false;
    } else {
      tarefa.concluida = true;
    }
    editarDadosTarefa(tarefa);
  }

  function onClickEditarTarefa(idTarefa) {
    selecionarTarefa(idTarefa);
  }

  return (
    <li className="tarea sombra">
      <p>{tarefa.nome}</p>
      <div className="estado">
        {tarefa.concluida ? (
          <button type="button" className="completo">
            Concluída
          </button>
        ) : (
          <button type="button" className="incompleto">
            Não concluída
          </button>
        )}
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => onClickAlterarStatusTarefa(tarefa)}
        >
          Alterar status
        </button>
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={() => onClickEditarTarefa(tarefa.id)}
        >
          Editar
        </button>
      </div>

      <div className="acciones">
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => onClickExcluirTarefa(tarefa.id)}
        >
          Excluir
        </button>
      </div>
    </li>
  );
}

Tarefa.propTypes = {
  tarefa: PropTypes.shape({
    id: PropTypes.string,
    nome: PropTypes.string,
    concluida: PropTypes.bool,
    idProjeto: PropTypes.string,
  }),
};

Tarefa.defaultProps = {
  tarefa: PropTypes.shape({ nome: '', concluida: false, idProjeto: null }),
};
