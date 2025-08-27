"use client";
import React, { useState, useEffect } from 'react';
import "../adm.css";
import { ChamadosAtribuidosModal, DuvidasTecnicosModal } from '@/components/admin';
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="33"
                    fill="currentColor"
                    className="bi bi-person-gear"
                    viewBox="0 0 16 16"
                >
                    <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0M8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m.256 7a4.5 4.5 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10q.39 0 .74.025c.226-.341.496-.65.804-.918Q8.844 9.002 8 9c-5 0-6 3-6 4s1 1 1 1zm3.63-4.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c-.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92-.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0" />
                </svg>
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
                                            <i className="bi bi-eye text-secondary"></i>
                                            <ChamadosAtribuidosModal usuario={tec}/>
                                            <i
                                                className="bi bi-x-lg text-danger"
                                                style={{ cursor: "pointer" }}
                                                onClick={() => console.log("Deletar", tec.id)}
                                            ></i>
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