"use client"
import { API_URL } from "@/utils/api";
import { getDecodedToken, getToken } from "@/utils/auth"
import axios, { all } from "axios"
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

export default function TipoErradoModal({ chamado, modalId = 'tipoErradoModal' }) {
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null)
    const decoded = getDecodedToken();
    const token = getToken();
    const router = useRouter();

    const [formData, setFormData] = useState({
        tipo: 'erro_tipo',
        nome: '',
        email: '',
        titulo: '',
        mensagem: ''
    })

    useEffect(() => {
        const decoded = getDecodedToken();

        if (decoded) {
            setFormData({
                ...formData,
                nome: decoded.nomeCompleto,
                email: decoded.email,
                titulo: `O chamado "${chamado?.titulo}" com ID ${chamado?.id} está com a categoria errada.`
            })
        }
    }, [])


    const handleTipoErrado = () => {
        setLoading(true);
        axios.post(`${API_URL}/tecnico/chamados/${chamado.id}/tipo-errado/`,
            formData,
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then(function (response) {
                setMensagem(response.data.mensagem);
                // Fecha o modal
                const modalElement = document.getElementById(modalId);
                const modal = bootstrap.Modal.getInstance(modalElement);

                setTimeout(() => {
                    modal?.hide();
                    router.push(`/tecnico/chamados/${chamado.id}`);
                }, 3000);
            })
            .catch(function (error) {
                setMensagem(error.response?.data?.error || "Erro ao tipoErrado chamado");
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
                style={{ all: "unset", cursor: "pointer" }}
                className="m-0 p-0 text-start"
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}

            >
                <i className="bi bi-exclamation-triangle-fill me-1 text-danger"></i>
                O tipo de chamado está errado? Clique Aqui!
            </button>

            <div
                className="modal fade"
                id={modalId}
                tabIndex={-1}
                aria-labelledby={`${modalId}Label`}
                aria-hidden="true"
                data-bs-backdrop={mensagem ? "static" : true}
                data-bs-keyboard={mensagem ? false : true}

            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* HEADER */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}Label`}>
                                Tipo do chamado está errado
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
                                    <span className="fst-italic mb-2">{formData.titulo}</span>
                                    <div className="mb-3 mt-3 text-dark d-flex flex-column">
                                        <span className="form-label small">Escreva uma mensagem para o administrador </span>
                                        <textarea
                                            name="mensagem"
                                            id="mensagem"
                                            value={formData.mensagem}
                                            placeholder="Acho que o tipo de chamado está errado porque..."
                                            onChange={(e) => {
                                                setFormData({
                                                    ...formData,
                                                    mensagem: e.target.value
                                                })
                                            }}
                                            className="w-100 mt-1 p-2 input-vermelho form-control"
                                            required
                                        ></textarea>
                                    </div>
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
                                    <p className="mt-3 fw-bold small">Essa página será recarregada em instantes...</p>
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
                                    onClick={handleTipoErrado}
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : "Enviar"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>

    )
}