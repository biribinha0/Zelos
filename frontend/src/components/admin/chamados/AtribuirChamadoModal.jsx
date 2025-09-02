"use client";
import React, { useState } from "react";
import ModalPortal from "./ModalPortal";
import axios from "axios";
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function AtribuirChamadoModal({ ativo, chamado, tecnicoId, tecnico, modalId }) {
    const [mensagem, setMensagem] = useState(null);
    const router = useRouter();
    const handleAtribuir = () => {
        const token = getToken()
        axios.post(`${API_URL}/admin/chamados/${chamado.id}/atribuir`, { tecnicoId: tecnicoId }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMensagem("✅ Técnico atribuído com sucesso! Você será redirecionado para a página de chamados");

                // Fecha o modal
                const modalElement = document.getElementById(modalId);
                const modal = bootstrap.Modal.getInstance(modalElement);

                setTimeout(() => {
                    modal?.hide();
                    router.push('/admin/chamados/');
                }, 3000);

            })
            .catch(() => {
                setMensagem("❌ Erro ao atribuir técnico.");
            });
    }
    return (
        <>
            {/* Botão que abre o modal (fica dentro do card/slide) */}
            <button
                className="btn fw-bold text-white py-2 w-100"
                style={{ background: "linear-gradient(90deg, #9b2929ff, #ff0000)" }}
                type="button"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                disabled={!ativo}
            >
                <i className="bi bi-send-fill" style={{ fontSize: 19 }} />
                {" "}Atribuir
            </button>

            {/* O modal é renderizado no body via Portal */}
            <ModalPortal>
                <div className="modal fade" id={modalId} tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered p-5">
                        <div
                            className="modal-content p-3 rounded-2 shadow-lg border-0"
                            style={{ background: "#f5f5f5ff" }}
                        >
                            {/* Cabeçalho */}
                            <div className="d-flex align-items-center mb-2">
                                <h3 className="fw-bold mb-0 me-2" style={{ color: "#b42727bd" }}>
                                    Atribuir funcionário
                                </h3>
                                <img src="/img/admIcone1.png" width={70} height={70} className="ms-auto" />
                            </div>

                            {/* Nome do usuário */}
                            <div className="text-start mb-2">
                                <p className="mb-0">
                                    Atribuir o chamado <span className="fw-bold">{chamado.titulo}</span>,
                                    do usuário <span className="fw-bold">{chamado.usuario}, </span>
                                    ao técnico <span className="fw-bold"> {tecnico}</span>?</p>
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
                                    style={{ background: "linear-gradient(90deg, #9b2929ff, #ff0000)" }}
                                    onClick={handleAtribuir}
                                    disabled={mensagem}
                                >
                                    Atribuir <i className="bi bi-send-fill ms-1" />
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
            </ModalPortal>
        </>
    );
}
