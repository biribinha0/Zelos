"use client";
import { useState, useEffect } from "react";
import "../adm.css";
import axios from "axios";
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import { DuvidasChamadosModal, EditarChamadoModal } from "@/components/admin";
import Link from "next/link";
import { AdminFecharChamadoModal } from "@/components/admin";

export default function ChamadosPage() {
    const [statusList, setStatusList] = useState([]);
    const [tiposList, setTiposList] = useState([]);
    const [tecnicosList, setTecnicosList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [filtros, setFiltros] = useState({
        status: "",
        tipo: "",
        tecnico: "",
        dataInicio: "",
        dataFim: "",
        palavra: "",
    });

    const [chamados, setChamados] = useState([]);
    const [chamadosOrigem, setChamadosOrigem] = useState([])

    const token = getToken();
    useEffect(() => {
        axios.get(`${API_URL}/meta/pools`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setTiposList(res.data))
            .catch(() => setTiposList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/meta/status`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setStatusList(res.data.status))
            .catch(() => setStatusList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/admin/usuarios?funcao=tecnico`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setTecnicosList(res.data))
            .catch(() => setTecnicosList([]))
            .finally(() => setLoading(false));

        axios.get(`${API_URL}/admin/chamados`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => { setChamados(res.data), setChamadosOrigem(res.data) })
            .catch(() => setChamados([]))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const buscarChamados = () => {
        let filtrados = [...chamadosOrigem];
        console.log(chamados)

        if (filtros.status) {
            filtrados = filtrados.filter(c => c.status === filtros.status);
        }

        if (filtros.tipo) {
            filtrados = filtrados.filter(c => c.pool === filtros.tipo);
        }

        if (filtros.tecnico) {
            filtrados = filtrados.filter(c => c.tecnico_id == filtros.tecnico);
        }

        if (filtros.dataInicio) {
            filtrados = filtrados.filter(c => new Date(c.criado_em) >= new Date(filtros.dataInicio));
        }

        if (filtros.palavra) {
            const palavraLower = filtros.palavra.toLowerCase();
            filtrados = filtrados.filter(c => c.titulo.toLowerCase().includes(palavraLower) || c.descricao.toLowerCase().includes(palavraLower));
        }

        setChamados(filtrados);
    };


    return (
        <>
            {/* Chamados e categorização */}
            <div className="seçãoChamados"></div>
            <div className="dc-outer d-flex container my-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-megaphone-fill mt-2" viewBox="0 0 16 16">
                    <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0zm-1 .724c-2.067.95-4.539 1.481-7 1.656v6.237a25 25 0 0 1 1.088.085c2.053.204 4.038.668 5.912 1.56zm-8 7.841V4.934c-.68.027-1.399.043-2.008.053A2.02 2.02 0 0 0 0 7v2c0 1.106.896 1.996 1.994 2.009l.496.008a64 64 0 0 1 1.51.048m1.39 1.081q.428.032.85.078l.253 1.69a1 1 0 0 1-.983 1.187h-.548a1 1 0 0 1-.916-.599l-1.314-2.48a66 66 0 0 1 1.692.064q.491.026.966.06" />
                </svg>
                <div className="fs-4 fw-bold ms-2">Chamados e</div>
                <div className="fs-4 fw-bold ms-2 text-danger">categorização:</div>
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
                        <label className="form-label fw-bold">Tipo:</label>

                        {/* Tipo de chamado */}
                        <select
                            className="form-control inputParte1"
                            value={filtros.tipo}
                            name="tipo"
                            onChange={handleChange}
                        >
                            <option value="">Todos</option>
                            {tiposList.map((t) => (
                                <option key={t.id} value={t.id}>{t.titulo}</option>
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
                    <table className="table">
                        <thead className="table-dark text-center">
                            <tr>
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
                            {chamados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-muted">Nenhum chamado encontrado</td>
                                </tr>
                            ) : (
                                chamados.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.titulo}</td>
                                        <td>{c.pool}</td>
                                        <td>{c.status}</td>
                                        <td>{c.tecnico?.nome || "—"}</td>
                                        <td>{new Date(c.criado_em).toLocaleDateString()}</td>
                                        <td>{new Date(c.atualizado_em).toLocaleDateString()}</td>
                                        <td>
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link href={`/admin/chamados/${c.id}`}><i className="bi bi-eye-fill" style={{ transition: '0.2s' }}></i></Link>

                                                <i className="bi bi-tools text-danger"></i>
                                                <EditarChamadoModal
                                                    chamado={c}
                                                    tipos={tiposList}
                                                    statusList={statusList}
                                                    tecnicos={tecnicosList}

                                                />
                                                <AdminFecharChamadoModal chamado={c} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </>
    );
}
