"use client";

import { format, subMinutes } from 'date-fns';
import { useState, useEffect } from "react";
import { getDecodedToken, getToken } from '@/utils/auth';
import axios from 'axios';
import { API_URL } from '@/utils/api';
import Link from "next/link";

export default function FecharChamadoModal({ chamado, buttonStyle }) {
    const [apontamento, setApontamento] = useState({
        descricao: "",
        comeco: '',
        fim: '',
        chamado_id: null,
        tecnico_id: null
    });
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null);

    useEffect(() => {
        const decoded = getDecodedToken();
        const now = new Date();

        const fim = format(now, "yyyy-MM-dd'T'HH:mm");
        const comeco = format(subMinutes(now, 30), "yyyy-MM-dd'T'HH:mm");

        setApontamento({
            descricao: "",
            chamado_id: chamado.id,
            tecnico_id: decoded?.id,
            fim,
            comeco
        });
    }, [chamado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setApontamento((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = getToken();

        try {
            const response = await axios.post(
                `${API_URL}/tecnico/chamados/${chamado.id}/apontamento`,
                apontamento,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMensagem(response.data.mensagem);
            setTimeout(() => {
                window.location.reload()
            }, 2000)
        } catch (error) {
            setMensagem(error.response?.data?.error || "Erro ao criar apontamento");
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
            <button
                type="button"
                className={buttonStyle}
                data-bs-toggle="modal"
                data-bs-target="#ApontamentoModal"
            >
                <i className="bi bi-plus-circle me-2"></i>
                <span className="small">Apontamento</span>
            </button>

            <div
                className="modal fade p-0"
                id="ApontamentoModal"
                tabIndex={-1}
                aria-labelledby="ApontamentoModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        {/* HEADER */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="ApontamentoModalLabel">
                                Criar Apontamento
                            </h1>
                            {/* Sempre permite fechar */}
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        {/* BODY */}
                        <div className="modal-body">
                            {!mensagem ? (
                                <form id="criarChamadoForm" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">
                                            Apontamento:
                                        </label>
                                        <textarea
                                            className="form-control input-vermelho"
                                            id="message-text"
                                            name="descricao"
                                            value={apontamento.descricao}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3 row">
                                        <div className="col-12 col-md-6">
                                            <label htmlFor="inicio-datetime" className="col-form-label">
                                                Início:
                                            </label>
                                            <input
                                                className="form-control input-vermelho"
                                                id="inicio-datetime"
                                                type="datetime-local"
                                                name="comeco"
                                                value={apontamento.comeco}
                                                onChange={handleChange}
                                                min="2025-08-01T00:00"
                                                max={apontamento.fim}
                                                required
                                            />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <label htmlFor="fim-datetime" className="col-form-label">
                                                Fim:
                                            </label>
                                            <input
                                                className="form-control input-vermelho"
                                                id="fim-datetime"
                                                type="datetime-local"
                                                name="fim"
                                                value={apontamento.fim}
                                                onChange={handleChange}
                                                min={apontamento.comeco}
                                                max={new Date().toISOString().slice(0, 16)}
                                                required
                                            />
                                        </div>
                                        <div id="dateTimeHelp" className="form-text">
                                            Insira a data e horário de início e término do serviço.
                                        </div>
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
                                        "Criar"
                                    )}
                                </button>
                            )}
                            {mensagem && (
                                <button
                                    type="button"
                                    className="btn btn-vermelho"
                                    disabled
                                >
                                    Criado
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
