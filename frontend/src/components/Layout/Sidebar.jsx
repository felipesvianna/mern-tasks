import React from 'react';
import FormNovoProjeto from '../Projetos/FormNovoProjeto';
import ListarProjetos from '../Projetos/ListarProjetos';

export default function Sidebar() {
  return (
    <aside>
      <h1>
        MERN<span>Tasks</span>
      </h1>
      <FormNovoProjeto />
      <div className="proyectos">
        <h2>Seus Projetos</h2>
        <ListarProjetos />
      </div>
    </aside>
  );
}
