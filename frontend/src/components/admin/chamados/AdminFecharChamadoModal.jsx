"use client"
import React, { useState } from "react";
import { API_URL } from "@/utils/api";
import axios from "axios";
import { getToken } from "@/utils/auth";

export default function AdminFecharChamadoModal({
    chamado,
    buttonStyle,
    modalId = "fecharChamadoModal",
    ativo,
    texto = null
}) {
    const [mensagem, setMensagem] = useState("");
    const token = getToken();

    const handleFechar = () => {
        axios.post(`${API_URL}/admin/chamados/${chamado?.id}/fechar`,
            { status: "concluído" },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then(() => {
                setMensagem("✅ Chamado fechado com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch((error) => {
                console.error("Erro ao fechar chamado:", error.response?.data || error);
                setMensagem("❌ Erro ao fechar chamado.");
            });
    };

    return (
        <>
            {/* Botão que abre o modal */}
            <button
                type="button"
                className={buttonStyle}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                disabled={!ativo}
            >
                <i className={`bi bi-check-square-fill ${ativo ? "text-black" : "text-secondary"}`}></i>
                <span className="ms-2 small">{texto}</span>

            </button>

            {/* Modal */}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog text-dark">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>Fechar Chamado</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div className="modal-body">
                            {mensagem && (
                                <div className="alert alert-info text-center py-2">
                                    {mensagem}
                                </div>
                            )}
                            <p>Tem certeza que deseja <strong>fechar</strong> o chamado <span className="text-danger">#{chamado?.id}</span>?</p>
                            <p>Essa ação irá marcá-lo como concluído</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-vermelho" onClick={handleFechar}>
                                Fechar Chamado
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
