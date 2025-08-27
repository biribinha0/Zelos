'use client'
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { useState } from "react";

export default function AtivarUsuarioModal({ usuario, modalId = `ativarUsuario` }) {
    const [mensagem, setMensagem] = useState('');
    const token = getToken();
    const handleAtivar = () => {
        axios.post(`${API_URL}/admin/usuarios/${usuario.id}/status`, {
            status: 'ativo'
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMensagem("✅ Usuário ativado com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch(() => {
                setMensagem("❌ Erro ao ativar o usuário.");
            });
    }

    return (
        <>
            <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
            >
                <i class="bi bi-person-check text-success" title="ativar"></i>
            </button>

            <div
                className="modal fade"
                id={`${modalId}`}
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 rounded-4 shadow-lg border-0">
                        <h5 className="fw-bold">Ativar Usuário</h5>
                        <p className="m-0">
                            Deseja realmente ativar a conta do {usuario.funcaoFormatada.toLowerCase()}{" "}
                            <b>{usuario?.nome || "este usuário"}</b>?
                        </p>
                        <p className="mb-2">Ele poderá ser reativado a qualquer momento.</p>
                        {/* Mensagem de feedback */}
                        {mensagem && (
                            <div className="alert alert-info text-center py-2">
                                {mensagem}
                            </div>
                        )}
                        <div className="d-flex justify-content-end gap-2">
                            <button className="btn btn-secondary" data-bs-dismiss="modal">
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn btn-vermelho"
                                onClick={handleAtivar}
                            >
                                Ativar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
