"use client";
import React from "react";

export default function AtribuirFuncionarioModal({ ativo }) {
    return (
        <div>
            {/* Botão/ícone que abre o modal */}
            <button
                type="button"
                className={`btn p-0 border-0 bg-transparent`}
                data-bs-toggle="modal"
                data-bs-target="#atribuirFuncionarioModal"
                disabled={!ativo} 
            >
                <i
                    className={`bi bi-person-down ${ativo ? "text-black" : "text-secondary"}`}
                    style={{ fontSize: "19px" }}
                ></i>
            </button>


            {/* Modal */}
            <div
                className="modal fade"
                id="atribuirFuncionarioModal"
                tabIndex="-1"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered p-5">
                    <div
                        className="modal-content p-3 rounded-2 shadow-lg border-0"
                        style={{ background: "#f5f5f5ff" }}
                    >
                        {/* Cabeçalho */}
                        <div className="d-flex align-items-center mb-2">
                            <h3 className="fw-bold mb-0 me-2" style={{ color: "#b42727bd" }}>
                                Atribuir funcionário
                            </h3>
                            <img
                                src="/img/admIcone1.png"
                                width={70}
                                height={70}
                                className="ms-auto"

                            />
                        </div>

                        {/* Nome do usuário */}
                        <div className="text-start mb-2">
                            <p className="fw-bold mb-0">Nome do usuário:</p>
                            <p className="text-muted text-secondary fw-bold small">
                                João da Silva Mendes
                            </p>
                        </div>

                        {/* Select técnico */}
                        <div className="text-start mb-2">
                            <label className="form-label fw-bold mb-1">
                                Selecione um técnico:
                            </label>
                            <select className="form-select inputParte1 form-select-sm">
                                <option value="">Clique aqui</option>
                                <option value="tecnico1">Técnico 1</option>
                                <option value="tecnico2">Técnico 2</option>
                                <option value="tecnico3">Técnico 3</option>
                            </select>
                        </div>

                        {/* Botões */}
                        <div className="mt-3 d-grid gap-2">
                            <button
                                className="btn fw-bold text-white py-2"
                                style={{
                                    background: "linear-gradient(90deg, #9b2929ff, #ff0000)",
                                }}
                            >
                                Atribuir <i className="bi bi-send-fill ms-1"></i>
                            </button>

                            <button
                                className="btn fw-bold text-white py-2"
                                style={{ background: "#000" }}
                                data-bs-dismiss="modal"
                            >
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
