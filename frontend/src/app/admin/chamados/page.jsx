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

    return (
        <>
            <div className="seçãoChamados"></div>
            <div className="dc-outer d-flex container my-5">
                <i className="bi bi-card-list fs-2"></i>
                <div className="fs-4 fw-bold ms-2">Chamados e</div>
                <div className="fs-4 fw-bold ms-2 text-danger">categorização:</div>
            </div>

            {/* Filtros */}
            {/* ... seu código dos filtros continua igual ... */}

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
                            {chamadosPaginados.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-muted">Nenhum chamado encontrado</td>
                                </tr>
                            ) : (
                                chamadosPaginados.map((c) => (
                                    <tr key={c.id}>
                                        <td>{c.id}</td>
                                        <td>{c.titulo}</td>
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
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* paginação */}
                <div className="d-flex justify-content-center mt-3">
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
