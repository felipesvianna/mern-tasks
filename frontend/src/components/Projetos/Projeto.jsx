import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ProjetoContext from '../../context/Projetos/projetoContext';
import TarefasContext from '../../context/Tarefas/tarefasContext';

export default function Projeto({ projeto }) {
  const projetoContext = useContext(ProjetoContext);
  const { selecionarProjeto } = projetoContext;

  const tarefasContext = useContext(TarefasContext);
  const { getTarefasDeProjeto } = tarefasContext;

  function onClickNomeProjeto(idProjeto) {
    selecionarProjeto(idProjeto);
    getTarefasDeProjeto(idProjeto);
  }

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => onClickNomeProjeto(projeto.id)}
      >
        {projeto.nome}
      </button>
    </li>
  );
}

Projeto.propTypes = {
  projeto: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }),
};

Projeto.defaultProps = {
  projeto: PropTypes.shape({ nome: '' }),
};
