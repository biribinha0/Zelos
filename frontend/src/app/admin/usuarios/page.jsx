"use client";
import React, { useState, useEffect } from "react";
import "../adm.css";
import axios from "axios";
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import { DuvidasUsuariosModal, DeleteUsuarioModal } from "@/components/admin";

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState([]);
    const [nome, setNome] = useState("");
    const [registro, setRegistro] = useState("");
    const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

    const token = getToken();

    useEffect(() => {
        axios
            .get(`${API_URL}/admin/usuarios?funcao=usuario`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => setUsuarios(res.data))
            .catch(() => setUsuarios([]));
    }, []);

    // 🔹 Filtros
    const usuariosFiltrados = usuarios.filter((u) => {
        return (
            (nome ? u.nome.toLowerCase().includes(nome.toLowerCase()) : true) &&
            (registro
                ? (u.registro?.toString().includes(registro) ||
                    u.id?.toString().includes(registro))
                : true
            )
        );
    });

    return (
        <>
            {/* Cabeçalho */}
            <div className="dc-outer d-flex container my-5 align-items-center">
                <i className="bi bi-person-square fs-3"></i>
                <div className="fs-4 fw-bold ms-2">Gerenciamento</div>
                <div className="fs-4 fw-bold ms-2 text-danger">de usuários:</div>
            </div>

            {/* Filtros */}
            <div className="container my-5">
                <div className="row align-items-end g-3">
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Nome:</label>
                        <input
                            type="text"
                            className="form-control inputParte1"
                            placeholder="ex: Bernardo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label fw-bold">Número de registro / ID:</label>
                        <input
                            type="text"
                            className="form-control inputParte1"
                            placeholder="ex: 123"
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
                    <DuvidasUsuariosModal />

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
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody className="text-center align-middle">
                            {usuariosFiltrados.map((u) => (
                                <tr key={u.id}>
                                    <td>{u.nome}</td>
                                    <td>{u.email}</td>
                                    <td>{u.chamadosEmAndamento}</td>
                                    <td>{u.chamadosConcluidos}</td>
                                    <td>{u.status === "ativo" ? "Ativo" : "Inativo"}</td>
                                    <td>
                                        <div className="d-flex justify-content-center gap-2">
                                            <i className="bi bi-clipboard2-data text-secondary" title="Chamados"></i>
                                            <i className="bi bi-eye text-secondary" title="Detalhes"></i>
                                            <i
                                                className="bi bi-x-lg text-danger"
                                                title="Excluir"
                                                style={{ cursor: "pointer" }}
                                                data-bs-toggle="modal"
                                                data-bs-target="#deleteUsuarioModal"
                                                onClick={() => setUsuarioSelecionado(u)}
                                            ></i>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modais */}
            <DeleteUsuarioModal usuario={usuarioSelecionado} />
        </>
    );
}
