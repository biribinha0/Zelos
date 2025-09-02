"use client"
import React, { useState, useEffect } from "react";
import { API_URL } from "@/utils/api";
import axios from "axios";
import { getToken } from "@/utils/auth";

export default function EditarChamadoModal({
    chamado,
    tipos,
    statusList,
    tecnicos,
    modalId = "editChamadoModal",
    ativo
}) {
    const [form, setForm] = useState({
        titulo: "",
        descricao: "",
        tipo_id: "",
        status: "",
        tecnico_id: ""
    });

    const [mensagem, setMensagem] = useState("");

    // Preencher formulário com os dados atuais do chamado
    useEffect(() => {
        if (chamado) {
            setForm({
                titulo: chamado.titulo || "",
                descricao: chamado.descricao || "",
                tipo_id: chamado.tipo_id || "",
                status: chamado.status || "",
                tecnico_id: chamado.tecnico_id || ""
            });
        }
    }, [chamado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };
    const token = getToken()
    const handleSubmit = () => {
        axios.put(`${API_URL}/admin/chamados/${chamado.id}`, form, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(() => {
                setMensagem("✅ Chamado atualizado com sucesso!");
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            })
            .catch(() => {
                setMensagem("❌ Erro ao atualizar o chamado.");
            });
    }


    return (
        <>
            {/* Botão que abre o modal */}
            <button
                type="button"

                className={`btn p-0 border-0 bg-transparent`}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
                disabled={!ativo}
            >
                <i className={`bi bi-pencil-square ${ativo ? "text-black" : "text-secondary"}`}></i>
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id={modalId}
                tabIndex="-1"
                aria-labelledby={`${modalId}Label`}
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content rounded-2 shadow-lg border-0">
                        <div className="modal-header d-flex align-items-center">
                            {/* Ícone */}
                            <i className="bi bi-gear-fill text-danger me-2 fs-4"></i>
                            <div>
                                <h5 className="modal-title fw-bold text-dark m-0">
                                    Editar Chamado
                                </h5>

                            </div>
                            <button
                                type="button"
                                className="btn-close ms-auto"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3 text-start">
                                <label className="form-label input-vermelho fw-semibold">Título</label>
                                <input
                                    type="text"
                                    className="form-control input-vermelho bg-light text-secondary border-0"
                                    name="titulo"
                                    value={form.titulo}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label input-vermelho fw-semibold">Descrição</label>
                                <textarea
                                    className="form-control input-vermelho bg-light text-secondary border-0"
                                    name="descricao"
                                    value={form.descricao}
                                    onChange={handleChange}
                                    rows={3}
                                    required
                                />
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label input-vermelho fw-semibold">Tipo de Chamado</label>
                                <select
                                    className="form-select input-vermelho bg-light text-secondary border-0"
                                    name="tipo_id"
                                    value={form.tipo_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {tipos.map((t, i) => (
                                        <option key={i} value={t.id}>
                                            {t.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label input-vermelho fw-semibold">Status</label>
                                <select
                                    className="form-select input-vermelho bg-light text-secondary border-0"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {statusList.map((s, i) => (
                                        <option key={i} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3 text-start">
                                <label className="form-label input-vermelho fw-semibold">Técnico</label>
                                
                                <select
                                    className="form-select input-vermelho bg-light text-secondary border-0"
                                    name="tecnico_id"
                                    value={form.tecnico_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecione</option>
                                    {tecnicos.map((t, i) => {
                                        const temPoolComum = t.pool_tecnico.some(pool => pool.id_pool === chamado.tipo_id);
                                        if (!temPoolComum) return null; 

                                        return (
                                            <option key={i} value={t.id}>
                                                {t.nomeFormatado} - {t.pools[0]?.nome_formatado || ""}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {/* Mensagem de feedback */}
                            {mensagem && (
                                <div className="alert alert-info text-center py-2">
                                    {mensagem}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-dark"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                className="btn fw-bold text-light"
                                onClick={handleSubmit}
                                style={{
                                    background: "linear-gradient(90deg, #9b2929ff, #ff0000)",
                                }}
                            >
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
}
