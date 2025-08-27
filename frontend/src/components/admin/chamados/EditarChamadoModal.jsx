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
    modalId = "editChamadoModal"
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
        console.log("Salvar chamado:", form);
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
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target={`#${modalId}`}
            >
                <i className="bi bi-pencil-square text-primary"></i>
            </button>

            {/* Modal */}
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id={`${modalId}Label`}>Editar Chamado</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                        </div>
                        <div className="modal-body">
                            {/* Mensagem de feedback */}
                            {mensagem && (
                                <div className="alert alert-info text-center py-2">
                                    {mensagem}
                                </div>
                            )}

                            <div className="mb-3">
                                <label className="form-label">Título</label>
                                <input
                                    type="text"
                                    className="form-control input-vermelho"
                                    name="titulo"
                                    value={form.titulo}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descrição</label>
                                <textarea
                                    className="form-control input-vermelho"
                                    name="descricao"
                                    value={form.descricao}
                                    onChange={handleChange}
                                    rows={3}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Tipo de Chamado</label>
                                <select
                                    className="form-select input-vermelho"
                                    name="tipo_id"
                                    value={form.tipo_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    {tipos.map((t, i) => (
                                        <option key={i} value={t.id}>{t.titulo}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Status</label>
                                <select
                                    className="form-select input-vermelho"
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    {statusList.map((s, i) => (
                                        <option key={i} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Técnico</label>
                                <select
                                    className="form-select input-vermelho"
                                    name="tecnico_id"
                                    value={form.tecnico_id}
                                    onChange={handleChange}
                                >
                                    <option value="">Selecione</option>
                                    {tecnicos.map((t, i) => (
                                        <option key={i} value={t.id}>
                                            {t.nomeFormatado} - {t.pools[0]?.nome_formatado || ""}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="button" className="btn btn-vermelho" onClick={handleSubmit}>
                                Salvar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
