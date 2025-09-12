"use client";
import { useState, useEffect } from "react";
import "../adm.css";
import axios from "axios";
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import { DuvidasChamadosModal, EditarChamadoModal, AdminFecharChamadoModal, AtribuirFuncionario } from "@/components/admin";
import Link from "next/link";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import useWindowWidth from '@/hooks/useWindowWidth';
import { CardChamadosResponsivoAdm } from "@/components/admin";

export default function AdminChamadosPage() {
    const [statusList, setStatusList] = useState([]);
    const [tiposList, setTiposList] = useState([]);
    const [tecnicosList, setTecnicosList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        status: "",
        tipo: "",
        tecnico: "",
        dataInicio: "",
        dataFim: "",
        palavra: "",
    });

    const [chamados, setChamados] = useState([]);
    const [chamadosOrigem, setChamadosOrigem] = useState([]);

    // paginação
    const [current, setCurrent] = useState(1);
    const pageSize = 8; // quantos chamados por página

    const token = getToken();
    useEffect(() => {
        axios.get(`${API_URL}/meta/pools`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setTiposList(res.data))
            .catch(() => setTiposList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/meta/status`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setStatusList(res.data.status))
            .catch(() => setStatusList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/admin/usuarios?funcao=tecnico`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setTecnicosList(res.data))
            .catch(() => setTecnicosList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/admin/chamados`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => { setChamados(res.data); setChamadosOrigem(res.data); })
            .catch(() => setChamados([]))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const buscarChamados = () => {
        let filtrados = [...chamadosOrigem];

        if (filtros.status) {
            filtrados = filtrados.filter(c => c.status === filtros.status);
        }
        if (filtros.tipo) {
            filtrados = filtrados.filter(c => c.tipo_id == filtros.tipo);
        }
        if (filtros.tecnico) {
            filtrados = filtrados.filter(c => c.tecnico_id == filtros.tecnico);
        }
        if (filtros.dataInicio) {
            filtrados = filtrados.filter(c => new Date(c.criado_em) >= new Date(filtros.dataInicio));
        }
        if (filtros.palavra) {
            const palavraLower = filtros.palavra.toLowerCase();
            filtrados = filtrados.filter(c =>
                c.titulo.toLowerCase().includes(palavraLower) ||
                c.descricao.toLowerCase().includes(palavraLower)
            );
        }

        setChamados(filtrados);
        setCurrent(1); // resetar para página 1 ao aplicar filtros
    };

    // paginação: calcular fatia
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const chamadosPaginados = chamados.slice(startIndex, endIndex);

    const width = useWindowWidth();

    return (
        <>

            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-card-list mx-2 my-2"></i>
                    <span className="text-dark">
                        Chamado e <span className="text-danger">categorização:</span>
                    </span>
                </h4>
            </div>

            {/* Filtros de chamados */}
            <div className="container my-5">
                <div className="row align-items-end g-3">
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Status:</label>
                        {/* Status */}
                        <select
                            className="form-control inputParte1"
                            value={filtros.status}
                            name="status"
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>

                            {statusList.length > 0 && statusList?.map((s) => (
                                <option key={s} value={s}>{s}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Tipo: </label>
                        {/* Tipo de chamado */}
                        <select
                            className="form-control inputParte1"
                            value={filtros.tipo}
                            name="tipo"
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {tiposList.map((t) => (
                                < option key={t.id} value={t.id} > {t.titulo} </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Técnico atribuído:</label>
                        {filtros.tecnico}
                        <select
                            className="form-select form-control inputParte1"
                            name="tecnico"
                            value={filtros.tecnico}
                            onChange={handleChange}

                        >
                            <option value="">Selecione</option>
                            {loading ? (
                                <option>Carregando...</option>
                            ) : (
                                tecnicosList.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.nomeFormatado} - {t.pools[0]?.nome_formatado || ""}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Data de criação:</label>

                        {/* Data de criação */}
                        <input
                            type="date"
                            className="form-control inputParte1"
                            value={filtros.dataInicio}
                            name="dataInicio"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2">
                        <label className="form-label fw-bold">Palavra-chave:</label>
                        {/* Palavra-chave */}
                        <input
                            type="text"
                            className="form-control inputParte1"
                            placeholder="ex: defeito"
                            value={filtros.palavra}
                            name="palavra"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="col-md-2 d-flex align-items-end">
                        <button className="btn w-100 button2" onClick={buscarChamados}>Pesquisar</button>
                    </div>
                </div>
            </div>


            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="resultados-title">Resultados:</h4>
                    <DuvidasChamadosModal />
                </div>

                <div className="table-responsive mt-3">
                    {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) : chamadosPaginados.length > 0 ? (
                    <>
                        {width >= 992 ? (
                            <>
                    <table className="table table-hover mt-3 border">
                        <thead className="bg-dark text-white text-center">
                            <tr className="titulo-da-tabela" >
                                <th>ID</th>
                                <th>Título</th>
                                <th>Tipo de chamado</th>
                                <th>Status</th>
                                <th>Técnico atribuído</th>
                                <th>Data de criação</th>
                                <th>Última atualização</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {chamadosPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-muted">Nenhum chamado encontrado</td>
                                </tr>
                            ) : (
                                chamadosPaginados.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td className={`textTabela text-black-75 ${c.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{c.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{c.titulo}</td>
                                        <td>{c.pool}</td>
                                        <td className={`text-capitalize fw-bold text-${c.status === 'concluído' ? 'success' : c.status === 'pendente' ? 'danger' : 'warning'}`}>
                                            {c.status}
                                        </td>
                                        <td>{c.tecnico?.nome || "—"}</td>
                                        <td>{new Date(c.criado_em).toLocaleDateString()}</td>
                                        <td>{new Date(c.atualizado_em).toLocaleDateString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link className="d-flex align-items-center red-link" href={`/admin/chamados/${c.id}`}>
                                                    <i className="bi bi-eye-fill" style={{ transition: '0.2s' }}></i>
                                                </Link>

                                                <AtribuirFuncionario
                                                    ativo={c.status !== 'concluído' && c.tecnico == null}
                                                    tecnicos={tecnicosList}
                                                    modalId={`atribuirFuncionarioModal${c.id}`}
                                                    chamado={c}
                                                />

                                                <EditarChamadoModal
                                                    chamado={c}
                                                    tipos={tiposList}
                                                    statusList={statusList}
                                                    tecnicos={tecnicosList}
                                                    ativo={c.status !== 'concluído'}
                                                    modalId={`editChamadoModal${c.id}`}
                                                />

                                                <AdminFecharChamadoModal
                                                    chamado={c}
                                                    modalId={`fecharChamadoModal${c.id}`}
                                                    ativo={c.status !== 'concluído'}
                                                    buttonStyle={'btn p-0 border-0 bg-transparent'}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    </>
                        ) : (
                            chamadosPaginados.map((chamado) => (
                                <CardChamadosResponsivoAdm key={chamado.id} chamado={chamado} tecnicosList={tecnicosList} />
                            ))
                        )}
                    </>
                ) : (
                    <h3 className="text-center">Nenhum chamado encontrado</h3>
                )}
                </div>

                {/* paginação */}
                <div className="d-flex justify-content-center my-3">
                    <Pagination
                        current={current}
                        pageSize={pageSize}
                        total={chamados.length}
                        onChange={setCurrent}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </>
    );
}
