"use client";
import React, { useState, useEffect } from 'react';
import "../adm.css";
import { ChamadosAtribuidosModal, DetalhesUsuarioModal, DuvidasTecnicosModal, DesativarUsuarioModal, AtivarUsuarioModal } from '@/components/admin';
import axios from 'axios';
import { API_URL } from '@/utils/api';
import { getToken } from '@/utils/auth';

export default function TecnicosPage() {
    // 🔹 States
    const [tecnicos, setTecnicos] = useState([]);
    const [tecnicosOrigem, setTecnicosOrigem] = useState([]);
    const [nome, setNome] = useState("");
    const [registro, setRegistro] = useState("");
    const [loading, setLoading] = useState(false)

    const token = getToken()

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/admin/usuarios?funcao=tecnico`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                setTecnicos(res.data);
                setTecnicosOrigem(res.data);
            })
            .catch(() => setTecnicos([]))
            .finally(() => setLoading(false));
    }, []);


    // 🔹 Filtro
    const tecnicosFiltrados = tecnicos.filter((t) => {
        return (
            (nome ? t.nome.toLowerCase().includes(nome.toLowerCase()) : true) &&
            (registro
                ? (t.registro?.toString().includes(registro) || t.id?.toString().includes(registro))
                : true
            )
        );
    });

    return (
        <>
            {/* Cabeçalho */}
            <div className="dc-outer d-flex container my-5">
            <i className="bi bi-wrench-adjustable-circle-fill fs-2"></i>
                <div className="fs-4 fw-bold ms-2">Gerenciamento</div>
                <div className="fs-4 fw-bold ms-2 text-danger">de funcionários:</div>
                {/* Modal de ajuda */}
                <DuvidasTecnicosModal />
            </div>

            {/* Filtros */}
            <div className="container my-5">
                <div className="row align-items-end g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Nome:</label>
                        <input
                            type="text"
                            className="form-control inputParte1"
                            placeholder="ex: Vinicius"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Número de registro:</label>
                        <input
                            type="text"
                            className="form-control inputParte1"
                            placeholder="ex: id 5"
                            value={registro}
                            onChange={(e) => setRegistro(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Resultados */}
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h4 className="resultados-title">Resultados:</h4>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="bi bi-question-circle text-muted"
                        viewBox="0 0 16 16"
                        data-bs-toggle="modal"
                        data-bs-target="#helpModal"
                        style={{ cursor: "pointer" }}
                    >
                        <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.074m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.533-.42-.927-1.029-.927-.584 0-1.009.394-1.009.927" />
                    </svg>
                </div>

                {/* Tabela */}
                <div className="table-responsive mt-3">
                    <table className="table">
                        <thead className="table-dark text-center">
                            <tr>
                                <th>Nome</th>
                                <th>E-mail</th>
                                <th>Chamados em andamento</th>
                                <th>Chamados finalizados</th>
                                <th>Tempo médio de atendimento</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {tecnicosFiltrados.map((tec) => (
                                <tr key={tec.id}>
                                    <td className="TextTabela">{tec.nome}</td>
                                    <td className="TextTabela">{tec.email}</td>
                                    <td className="TextTabela">{tec.chamadosEmAndamento}</td>
                                    <td className="TextTabela">{tec.chamadosConcluidos}</td>
                                    <td className="TextTabela">{tec.tempoMedio || "-"}</td>
                                    <td className="TextTabela">
                                        {tec.status === "ativo" ? "Ativo" : "Inativo"}
                                    </td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            {tec.status === "ativo" ? (
                                                <>
                                                    <DetalhesUsuarioModal
                                                        usuario={tec}
                                                        modalId={`detalhesUsuarioModal${tec.id}`}
                                                    />
                                                    <ChamadosAtribuidosModal
                                                        usuario={tec}
                                                        modalId={`chamadosUsuarioModal${tec.id}`}
                                                    />
                                                    <DesativarUsuarioModal
                                                        usuario={tec}
                                                        modalId={`desativarUsuario${tec.id}`}
                                                    />
                                                </>
                                            ) : (
                                                <AtivarUsuarioModal
                                                    usuario={tec}
                                                    modalId={`ativarUsuario${tec.id}`}
                                                />
                                            )}
                                        </div>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>


        </>
    );
}