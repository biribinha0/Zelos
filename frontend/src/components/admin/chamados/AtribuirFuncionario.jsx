"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { API_URL } from "@/utils/api";

export default function AtribuirFuncionarioModal({ ativo, tecnicos, modalId, chamado }) {
    const [tecnico, setTecnico] = useState('')
    const [mensagem, setMensagem] = useState(null)
    const handleAtribuir = () => {
        const token = getToken()
        axios.post(`${API_URL}/admin/chamados/${chamado.id}/atribuir`, { tecnicoId: tecnico }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMensagem("✅ Técnico atribuído com sucesso! Essa página sera recarregada em instantes");

                // Fecha o modal
                const modalElement = document.getElementById(modalId);
                const modal = bootstrap.Modal.getInstance(modalElement);

                setTimeout(() => {
                    window.location.reload()
                }, 3000);

            })
            .catch(() => {
                setMensagem("❌ Erro ao atribuir técnico.");
            });
    }
    return (
        <div>
            {/* Botão/ícone que abre o modal */}
            <button
                type="button"
                className={`btn p-0 border-0 bg-transparent`}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                disabled={!ativo}
            >
                <i
                    className={`bi bi-person-down ${ativo ? "text-black" : "text-secondary"}`}
                    style={{ fontSize: "19px" }}
                ></i>
            </button>


            {/* Modal */}
            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg p-5">
                    <div
                        className="modal-content p-3 rounded-2 shadow-lg border-0"
                        style={{ background: "#f5f5f5ff" }}
                    >
                        {/* Cabeçalho */}
                        <div className="d-flex align-items-center mb-2">
                            <h3 className="fw-bold mb-0 me-2" style={{ color: "#b42727bd" }}>
                                Atribuir funcionário
                            </h3>
                            <img
                                src="/img/admIcone1.png"
                                width={70}
                                height={70}
                                className="ms-auto"

                            />
                        </div>
                        <div className="detalhes d-flex flex-row text-start mb-3">
                            <p
                                className="fw-bold mb-0 d-flex flex-column"

                            >
                                <span className="fs-5">{chamado?.titulo}</span>
                                <span className="small text-secondary"> {chamado?.pool}</span>
                                <Link
                                    className="d-flex  red-link small opacity-75 mt-1"
                                    href={`/admin/chamados/${chamado.id}`}
                                    target="_blank"
                                >
                                    <i className="bi bi-info-circle me-2"></i>
                                    Ver detalhes
                                </Link>
                            </p>
                        </div>

                        {/* Nome do usuário */}
                        <div className="text-start mb-2">
                            <p className="fw-bold mb-0">{chamado.usuario.nome}</p>
                            <p className="text-muted text-secondary fw-bold small">
                                Nome do usuário
                            </p>
                        </div>

                        {/* Select técnico */}
                        <div className="text-start mb-2">
                            <label className="form-label fw-bold mb-1">
                                Selecione um técnico:
                            </label>
                            <select className="form-select inputParte1 form-select-sm"
                                name="tecnico_id"
                                value={tecnico}
                                onChange={(e) => setTecnico(e.target.value)}
                                required
                            >
                                <option value="">Selecione</option>
                                {tecnicos.map((t, i) => {
                                    const temPoolComum = t.pool_tecnico.some(pool => pool.id_pool === chamado.tipo_id);
                                    if (!temPoolComum) return null;

                                    return (
                                        <option key={i} value={t.id}>
                                            {t.nomeFormatado} - {t.pools[0]?.nome_formatado || ""}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        {mensagem && (
                            <div className="alert alert-info text-center py-2">
                                {mensagem}
                            </div>
                        )}
                        {/* Botões */}
                        <div className="mt-3 d-grid gap-2">
                            <button
                                className="btn fw-bold text-white py-2"
                                style={{
                                    background: "linear-gradient(90deg, #9b2929ff, #ff0000)",
                                }}
                                disabled={tecnico == '' || mensagem}
                                onClick={handleAtribuir}

                            >
                                Atribuir <i className="bi bi-send-fill ms-1"></i>
                            </button>

                            <button
                                className="btn fw-bold text-white py-2"
                                style={{ background: "#000" }}
                                data-bs-dismiss="modal"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
