import React, { useContext, useState, useEffect } from 'react';

import ProjetoContext from '../../context/Projetos/projetoContext';
import TarefasContext from '../../context/Tarefas/tarefasContext';
import AlertaContext from '../../context/Alertas/alertaContext';

export default function FormTarefa() {
  const projetoContext = useContext(ProjetoContext);
  const { projetoSelecionado } = projetoContext;

  const tarefasContext = useContext(TarefasContext);

  const alertaContext = useContext(AlertaContext);
  const { exibirAlerta } = alertaContext;

  const {
    tarefaSelecionada,
    adicionarTarefa,
    setErroFormTarefa,
    erroDadosTarefa,
    getTarefasDeProjeto,
    editarDadosTarefa,
    mensagemDeErro,
  } = tarefasContext;

  const initialState = {
    nome: '',
  };

  const [tarefa, setTarefa] = useState(initialState);

  useEffect(() => {
    if (mensagemDeErro) {
      exibirAlerta(mensagemDeErro.msg, mensagemDeErro.categoria);
    }

    if (tarefaSelecionada !== null) {
      setTarefa(tarefaSelecionada);
    } else {
      setTarefa(initialState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tarefaSelecionada, mensagemDeErro]);

  if (!projetoSelecionado) return null;

  function onChangeForm(e) {
    setTarefa({
      ...tarefa,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmitForm(e) {
    e.preventDefault();

    if (tarefa.nome.trim() === '') {
      setErroFormTarefa();
    } else {
      // eslint-disable-next-line no-lonely-if
      if (tarefaSelecionada === null) {
        tarefa.idProjeto = projetoSelecionado.id;
        tarefa.concluida = false;

        adicionarTarefa(tarefa);
        setTarefa(initialState);
      } else {
        editarDadosTarefa(tarefa);
      }
    }

    getTarefasDeProjeto(projetoSelecionado.id);
  }

  return (
    <div className="formulario">
      <form onSubmit={onSubmitForm}>
        <div className="contenedor-input">
          <input
            type="text"
            name="nome"
            id="nomeTarefa"
            className="input-text"
            value={tarefa.nome}
            placeholder="Nome da Tarefa"
            onChange={onChangeForm}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            value={tarefaSelecionada ? 'Editar tarefa' : 'Adicionar Tarefa'}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>

      {erroDadosTarefa ? (
        <p className="mensaje error">O nome da tarefa é obrigatório</p>
      ) : null}
    </div>
  );
}
