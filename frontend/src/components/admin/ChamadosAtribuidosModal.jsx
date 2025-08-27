"use client"
import React, { useState } from "react";
import { API_URL } from "@/utils/api";
import axios from "axios";
import { getToken } from "@/utils/auth";
import Link from "next/link";

export default function ChamadosAtribuidosModal({ usuario, modalId = "chamadosUsuarioModal" }) {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState("");
    const token = getToken();

    const carregarChamados = () => {
        if (!usuario) return;
        setLoading(true);
        setErro("");

        axios.get(`${API_URL}/admin/chamados/usuario/${usuario.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setChamados(res.data || []);
            })
            .catch((error) => {
                console.error("Erro ao buscar chamados:", error.response?.data || error);
                setErro("Erro ao carregar chamados.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <>
            {/* Botão que abre o modal */}
            <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                onClick={carregarChamados}
            >
                <i className="bi bi-clipboard2-data text-secondary"></i>

            </button>

            {/* Modal */}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>
                                Chamados atribuídos a {usuario?.nomeFormatado}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        {JSON.stringify(chamados)}
                        <div className="modal-body">
                            {loading && <p>Carregando chamados...</p>}
                            {erro && <div className="alert alert-danger">{erro}</div>}
                            {!loading && !erro && (
                                chamados.length > 0 ? (
                                    <div className="d-flex flex-column gap-3">
                                        {chamados.map((c) => (
                                            <div key={c.id} className="card shadow-sm">
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <h5 className="card-title mb-0">{c.titulo}</h5>
                                                        <span className={`badge bg-${c.status === "Fechado" ? "secondary" : "success"}`}>
                                                            {c.status}
                                                        </span>
                                                    </div>
                                                    <p className="card-text text-muted mt-2">
                                                        {c.descricao?.length > 100 ? c.descricao.slice(0, 100) + "..." : c.descricao}
                                                    </p>
                                                    <Link href={`/chamados/${c.id}`} className="btn btn-sm btn-primary">
                                                        Ver detalhes
                                                    </Link>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">Nenhum chamado atribuído a este usuário.</p>
                                )
                            )}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
