'use client'
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { useState } from "react";

export default function DesativarUsuarioModal({ usuario, modalId = `desativarUsuario` }) {
    const [mensagem, setMensagem] = useState('');
    const token = getToken();

    const handleDesativar = () => {
        axios.post(`${API_URL}/admin/usuarios/${usuario.id}/status`, {
            status: 'inativo'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setMensagem("✅ Usuário desativado com sucesso!");
            setTimeout(() => window.location.reload(), 2500);
        })
        .catch(() => {
            setMensagem("❌ Erro ao desativar o usuário.");
        });
    }

    return (
        <>
            {/* Botão que abre o modal */}
            <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
            >
                <i className="bi bi-person-x text-danger" title="Desativar"></i>
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 rounded-2 shadow-lg border-0">

                        {/* Cabeçalho */}
                        <div className="d-flex align-items-center mb-3">
                            <i className="bi bi-person-x-fill text-danger fs-3 me-2"></i>
                            <h5 className="fw-bold text-dark m-0">Desativar Usuário</h5>
                        </div>

                        {/* Texto */}
                        <p className="mb-1 text-secondary">
                            Deseja realmente desativar a conta do <b>{usuario.funcaoFormatada.toLowerCase()}</b>{" "}
                            <b className="text-dark">{usuario?.nome || "este usuário"}</b>?
                        </p>
                        <p className="text-muted mb-3">
                            Ele poderá ser reativado a qualquer momento.
                        </p>

                        {/* Mensagem de feedback */}
                        {mensagem && (
                            <div className="alert alert-info text-center py-2">
                                {mensagem}
                            </div>
                        )}

                        {/* Botões */}
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button
                                className="btn btn-outline-secondary fw-semibold"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger fw-semibold"
                                onClick={handleDesativar}
                            >
                                Desativar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
