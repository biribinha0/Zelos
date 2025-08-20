"use client";

import { format, subMinutes } from 'date-fns';
import { useState, useEffect } from "react";
import { getDecodedToken } from '@/utils/auth';
export default function FecharChamadoModal({ chamado }) {
    const [apontamento, setApontamento] = useState({
        descricao: "",
        comeco: '',
        fim: '',
        chamado_id: null,
        tecnico_id: null
    })

    useEffect(() => {
        const decoded = getDecodedToken();
        setApontamento({
            ...apontamento,
            chamado_id: chamado.id,
            tecnico_id: decoded.id

        })
        const now = new Date();

        const fim = format(now, "yyyy-MM-dd'T'HH:mm")
        const comeco = format(subMinutes(now, 30), "yyyy-MM-dd'T'HH:mm")
        setApontamento({ ...apontamento, fim: fim, comeco: comeco })
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setApontamento(apontamento => ({
            ...apontamento,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        console.log(apontamento)
    }
    return (
        <>
            <button
                type="button"
                className="btn btn-vermelho py-0 px-2 small w-100"
                data-bs-toggle="modal"
                data-bs-target="#FecharModal"   
            >
                <i className="bi bi-clipboard-check"></i> <span className="small">Concluir</span>
            </button>

            <div
                className="modal fade p-0"
                id="FecharModal"
                tabIndex={-1}
                aria-labelledby="FecharModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="FecharModalLabel">
                                Fechar Chamado
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="message-text" className="col-form-label">
                                        Último apontamento:
                                    </label>
                                    <textarea
                                        className="form-control input-vermelho"
                                        id="message-text"
                                        name="descricao"
                                        defaultValue={apontamento.descricao}
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
                                            name="inicio"
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
                                            min="2025-07-01T00:00"
                                            max={apontamento.fim}
                                            required
                                        />
                                    </div>
                                    <div id="dateTimeHelp" className="form-text">Insira a data e horário de início e término do serviço.</div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Fechar
                            </button>
                            <button  type="button" className="btn btn-vermelho" onClick={handleSubmit}>
                                Concluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}