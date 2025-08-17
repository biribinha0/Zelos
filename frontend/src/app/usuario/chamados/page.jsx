"use client";

import { useState, useEffect } from 'react';
import './meusChamados.css';
import { getDecodedToken } from '@/utils/auth';
import { API_URL } from '@/utils/api';
import axios from 'axios';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from 'next/link';

export default function MeusChamados() {
  const [chamados, setChamados] = useState({});
  const [loading, setLoading] = useState(false);

  const decoded = getDecodedToken();

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/usuario/${decoded.id}/chamados`)
      .then(function (response) {
        console.log(response.data); // The data returned by the server
        setChamados(response.data)
        console.log(response.status); // HTTP status code (e.g., 200)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);


  const [tipoChamado, setTipoChamado] = useState('todos');
  const [status, setStatus] = useState('todos');


  const handleTipoChange = (e) => {
    setTipoChamado(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // gerar lista filtrada
  const chamadosFiltrados = Array.isArray(chamados)
    ? chamados.filter((chamado) => {
      // filtro por tipo
      const tipoOk =
        tipoChamado === "todos" ||
        String(chamado.tipo_id) === String(tipoChamado);

      // filtro por status
      const statusOk =
        status === "todos" ||
        chamado.status.toLowerCase() === status.toLowerCase();

      return tipoOk && statusOk;
    })
    : [];


  return (
    <>
      <div className="dc-outer d-flex container my-5 chamados-background">
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-lines-fill mt-1" viewBox="0 0 16 16">
          <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
        </svg>
        <div className=" fs-4 fw-bold ms-2">Meus</div>
        <div className=" fs-4 fw-bold ms-2 text-danger">chamados</div>
      </div>
      <div className="container my-5 ">

        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="tipo-chamado fw-bold">Tipo de chamado:</label>
              <select
                className="form-control input-custom"
                id="tipo-chamado"
                value={tipoChamado}
                onChange={handleTipoChange}
              >
                <option value="todos">Todos</option>
                <option value="1">Apoio Técnico</option>
                <option value="2">Manutenção</option>
                <option value="3">Limpeza</option>
                <option value="4">Externo</option>
              </select>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="status fw-bold">Status:</label>
              <select
                className="form-control input-custom"
                id="status"
                value={status}
                onChange={handleStatusChange}
              >
                <option value="todos">Todos</option>
                <option value="em andamento">Em andamento</option>
                <option value="pendente">Pendente</option>
                <option value="concluído">Concluído</option>
              </select>
            </div>
          </div>
        </div>
        <h4 className="resultados-title mt-4">Resultados:</h4>

        {chamadosFiltrados.length > 0 ? (
          <table className="table  mt-3">
            <thead className="thead-custom">
              <tr>
                <th>ID</th>
                <th>Tipo de chamado</th>
                <th>Título</th>
                <th>Descrição</th>
                <th>Patrimônio</th>
                <th>Status</th>
                <th>Técnico</th>
                <th>Data de Abertura</th>
                <th>Última Atualização</th>
              </tr>
            </thead>

            <tbody>
              {chamadosFiltrados.map((chamado, index) => (
                <tr key={chamado.id} className={index % 2 !== 0 ? 'tr-cinza' : ''} >

                  <td className="textTabela text-black-75">{chamado.id}</td>
                  <td className="textTabela text-black-75">{chamado.pool}</td>
                  <td className="textTabela text-black-75 ">
                    <Link className='link-titulo' key={chamado.id} href={`/usuario/chamados/${chamado.id}`}>
                      {chamado.titulo}
                    </Link>
                  </td>
                  <td className="textTabela text-black-75">{chamado.descricao}</td>
                  <td className="textTabela text-black-75">{chamado.patrimonio ?? "--"}</td>
                  <td className={`fw-bold text-${chamado.status === 'concluído' ? 'success' : chamado.status === 'pendente' ? 'danger' : 'warning'}`}>
                    {chamado.status}
                  </td>
                  <td className="textTabela text-black-75">{chamado.tecnico ?? "--"}</td>
                  <td className="textTabela text-black-75">{format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                  <td className="textTabela text-black-75">{format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          loading ? (
            <div className="text-center my-5">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) :
            <h3 colSpan="4" className="text-center">Nenhum chamado encontrado</h3>
        )}

      </div>
    </>
  );
}