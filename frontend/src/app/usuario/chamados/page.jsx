"use client";

import { useState, useEffect } from 'react';
import './meusChamados.css';
import { getDecodedToken, getToken } from '@/utils/auth';
import { API_URL } from '@/utils/api';
import axios from 'axios';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from 'next/link';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css"
import useWindowWidth from '@/hooks/useWindowWidth';
import { CardChamadosResponsivo } from '@/components/usuarios';


export default function MeusChamados() {
  const [chamados, setChamados] = useState({});
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const decoded = getDecodedToken();
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    setLoading(true)
    axios.get(`${API_URL}/usuario/${decoded.id}/chamados`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(function (response) {
        setChamados(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const [tipoChamado, setTipoChamado] = useState('todos');
  const [status, setStatus] = useState('todos');
  const [palavraChave, setPalavraChave] = useState('');

  const handleTipoChange = (e) => setTipoChamado(e.target.value);
  const handleStatusChange = (e) => setStatus(e.target.value);
  const handlePalavraChange = (e) => setPalavraChave(e.target.value);

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

      // filtro por palavra-chave
      const palavraOk =
        palavraChave.trim() === "" ||
        chamado.titulo.toLowerCase().includes(palavraChave.toLowerCase()) ||
        chamado.descricao?.toLowerCase().includes(palavraChave.toLowerCase());

      return tipoOk && statusOk && palavraOk;
    })
    : [];

  const startIndex = (current - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const chamadosPaginados = chamadosFiltrados.slice(startIndex, endIndex);

  const width = useWindowWidth();

  return (
    <>
      
      <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
        <h4 className="fw-bold text-break">
          <i className="bi bi-person-lines-fill mx-2 my-2"></i>
          <span className="text-dark">
            Meus <span className="text-danger">chamados:</span>
          </span>
        </h4>
      </div>
      
      <div className="container my-5 ">

        <div className="row">
          <div className="col-md-4">
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

          <div className="col-md-4">
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

          <div className="col-md-4">
            <div className="form-group">
              <label className="tipo-chamado fw-bold">Palavra-chave:</label>
              <input
                className="form-control input-custom"
                type="text"
                placeholder='Escreva aqui!'
                value={palavraChave}
                onChange={handlePalavraChange}
              />
            </div>
          </div>
        </div>

        <h4 className="resultados-title mt-4">Resultados:</h4>

        {(chamadosFiltrados.length > 0) ? (
          width >= 992 ? (
            <div className="table-responsive mt-3">
              <table className="table table-bordered-custom">
                <thead className="thead-custom">
                  <tr className="titulosTabela">
                    <th>ID</th>
                    <th>Tipo de chamado</th>
                    <th>Título</th>
                    <th>Patrimônio</th>
                    <th>Status</th>
                    <th>Técnico</th>
                    <th>Data de Abertura</th>
                    <th>Última Atualização</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {chamadosPaginados.map((chamado, index) => (
                    <tr key={chamado.id} className={index % 2 !== 0 ? 'tr-cinza' : ''} >
                      <td className="textTabela text-black-75">{chamado.id}</td>
                      <td className="textTabela text-black-75">{chamado.pool}</td>
                      <td className={`textTabela text-black-75 ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{chamado.titulo}</td>
                      <td className="textTabela text-black-75">{chamado?.patrimonio?.EQUIPAMENTO ?? "--"}</td>
                      <td className={`fw-bold text-${chamado.status === 'concluído' ? 'success' : chamado.status === 'pendente' ? 'danger' : 'warning'}`}>
                        {chamado.status}
                      </td>
                      <td className="textTabela text-black-75">{chamado.tecnico ?? "--"}</td>
                      <td className="textTabela text-black-75">
                        {format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </td>
                      <td className="textTabela text-black-75">
                        {format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}
                      </td>
                      <td>
                        <Link className='link-titulo' key={chamado.id} href={`/usuario/chamados/${chamado.id}`}>Ver Detalhes</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                current={current}
                pageSize={pageSize}
                total={chamadosFiltrados.length}
                onChange={setCurrent}
                showSizeChanger={true}
              />

            </div>) : chamadosFiltrados.map((chamado) => {
              return (
                <CardChamadosResponsivo key={chamado.id} chamado={chamado} />
              )
            })


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
