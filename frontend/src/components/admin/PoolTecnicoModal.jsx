'use client'
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import axios from "axios";
import { useState, useEffect } from "react";

export default function PoolTecnicoModal({ tec, poolId, modalId = `PoolTecnico` }) {
    const token = getToken();
    const [mensagem, setMensagem] = useState('');
    const [tipos, setTipos] = useState([])
    const [pool, setPool] = useState('');

    useEffect(() => {
        console.log(tec, poolId)
        axios.get(`${API_URL}/meta/pools`, { headers: { Authorization: `Bearer ${token}` } })
            .then((res) => setTipos(res.data))
            .catch(() => setTipos([]))

    }, [])

    useEffect(() => {
        if (poolId) {
            setPool(poolId);
        }
    }, [poolId]);



    const handleSubmit = () => {
        axios.put(`${API_URL}/admin/usuarios/${tec.id}/pool`, {
            poolId: pool
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                console.log(res)
                setMensagem("✅ Relacionamento de pool e técnico registrado com sucesso");
                setTimeout(() => window.location.reload(), 2500);
            })
            .catch((err) => {
                console.log(err)
                setMensagem("❌ Erro ao relacionar o técnico a um pool.");
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
                <i className="bi bi-pencil-fill text-danger" title="Editar"></i>
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
                            <i className="bi bi-pencil-fill fs-3 me-2"></i>
                            <h5 className="fw-bold text-dark m-0">Editar relação pool técnico</h5>
                        </div>

                        <div className="col-12 my-2">
                            <label className="form-label fw-bold">Tipo de chamado: </label>
                            {/* Tipo de chamado */}
                            <select
                                className="form-control inputParte1"
                                value={pool}
                                name="tipoId"
                                onChange={(e) => { setPool(e.target.value) }}
                            >
                                <option value="">Todos</option>
                                {tipos.map((t) => (
                                    < option key={t.id} value={t.id} > {t.titulo} </option>
                                ))}
                            </select>
                        </div>

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
                                onClick={handleSubmit}
                            >
                                Enviar
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
