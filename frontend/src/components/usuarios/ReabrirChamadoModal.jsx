"use client";

import { useState } from "react";
import { getDecodedToken, getToken } from '@/utils/auth';
import axios from 'axios';
import { API_URL } from '@/utils/api';
import styles from "./ReabrirChamado.module.css";

export default function ReabrirChamadoModal({ chamado, buttonStyle, modalId = 'ReabrirChamado' }) {
    const [motivo, setMotivo] = useState('');
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = getToken();

        try {
            const response = await axios.post(
                `${API_URL}/usuario/chamados/${chamado.id}/reabrir`,
                { motivo },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMensagem(response.data.mensagem);
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            setMensagem(error.response?.data?.error || "Erro ao reabrir chamado");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        if (mensagem) {
            window.location.reload();
        }
    };

    return (
        <>
            {/* BOTÃO QUE ABRE O MODAL */}

            <button
                className={`me-2 ${styles.buttonStyle}`}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
            >
                <span>
                    <i className="bi bi-arrow-clockwise me-2">
                        <path d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z" fill="currentColor"></path>
                    </i>
                    Reabrir
                </span>
            </button>

            {/* MODAL */}
            <div
                className="modal fade p-0"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={`${modalId}Label`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* HEADER */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}Label`}>
                                Reabrir chamado
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>

                        {/* BODY */}
                        <div className="modal-body">
                            {!mensagem ? (
                                <form id="criarChamadoForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <h5>{chamado.titulo}</h5>
                                        <p dangerouslySetInnerHTML={{ __html: chamado.descricao }} />

                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Motivo:
                                        </label>
                                        <textarea
                                            className="form-control input-vermelho"
                                            id="message-text"
                                            required
                                            placeholder="Explique o motivo pelo qual você está reabrindo este chamado"
                                            value={motivo}
                                            onChange={(e) => setMotivo(e.target.value)}
                                        ></textarea>
                                    </div>
                                </form>
                            ) : (
                                <div className="text-center">
                                    <p className="mt-3 fw-bold">{mensagem}</p>
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                disabled={loading}
                                onClick={handleClose}
                            >
                                Fechar
                            </button>

                            {!mensagem && (
                                <button
                                    type="submit"
                                    className="btn btn-vermelho"
                                    form="criarChamadoForm"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span
                                                className="spinner-border spinner-border-sm me-2"
                                                role="status"
                                                aria-hidden="true"
                                            ></span>
                                            Enviando...
                                        </>
                                    ) : (
                                        "Reabrir"
                                    )}
                                </button>
                            )}

                            {mensagem && (
                                <button
                                    type="button"
                                    className="btn btn-vermelho"
                                    disabled
                                >
                                    Reaberto
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
