"use client"
import { API_URL } from "@/utils/api";
import { getDecodedToken, getToken } from "@/utils/auth"
import axios from "axios"
import { useState } from "react";
import Link from "next/link";

export default function AtribuirModal({ chamado }) {
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null)
    const decoded = getDecodedToken();
    const token = getToken();
    const handleAtribuir = () => {
        setLoading(true);
        axios.post(`${API_URL}/tecnico/chamados/${chamado.id}/atribuir/`,
            { tecnico_id: decoded.id },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(function (response) {
                setMensagem(response.data.mensagem);
            })
            .catch(function (error) {
                setMensagem(error.response?.data?.error || "Erro ao atribuir chamado");
            })
            .finally(function () {
                setLoading(false);
            });
    }

    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-vermelho"
                data-bs-toggle="modal"
                data-bs-target="#atribuirModal"
            >
                Me Atribuir
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="atribuirModal"
                tabIndex={-1}
                aria-labelledby="atribuirModalLabel"
                aria-hidden="true"
                data-bs-backdrop={mensagem ? "static" : 'true'}
                data-bs-keyboard={mensagem ? "false" : 'true'}
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* HEADER */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="atribuirModalLabel">
                                Auto Atribuição
                            </h1>
                            {!mensagem && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            )}
                        </div>

                        {/* BODY */}
                        <div className="modal-body">
                            {!mensagem && (
                                <>
                                    Me atribuir ao chamado{" "}
                                    <span className="fst-italic">"{chamado.titulo}"</span>
                                    {loading && (
                                        <div className="spinner-border text-danger ms-2" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    )}
                                </>
                            )}

                            {mensagem && (
                                <div className="text-center">
                                    <p className="mt-3 fw-bold">{mensagem}</p>
                                    <Link
                                        href={`/tecnico/chamados/${chamado.id}`}
                                        className="btn btn-vermelho mt-3"
                                    >
                                        Ver Detalhes do Chamado
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* FOOTER */}
                        {!mensagem && (
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Fechar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-vermelho"
                                    onClick={handleAtribuir}
                                    disabled={loading}
                                >
                                    {loading ? "Atribuindo..." : "Confirmar"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </>

    )
}