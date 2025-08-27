"use client";
import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function DetalhesUsuarioModal({
  usuario,
  modalId = "detalhesUsuarioModal",
}) {
  return (
    <>
      {/* Botão que abre o modal */}
      <button
        type="button"
        style={{ all: "unset", cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <i className="bi bi-eye text-secondary" title="Detalhes"></i>
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`${modalId}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content rounded-2 shadow-lg border-0">
            {/* Header */}
            <div
              className="modal-header text-white"
              style={{ backgroundColor: "#9A1915" }} 
            >
              <h5 className="modal-title fw-bold" id={`${modalId}Label`}>
                <i className="bi bi-person-circle me-2"></i>
                Detalhes do Usuário
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Fechar"
              ></button>
            </div>

            {/* Body */}
            <div className="modal-body p-4">
              <div className="row g-3">
                <div className="col-12">
                  <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                    <i className="bi bi-person-fill  me-2"></i>
                    <strong>Nome:</strong>&nbsp; {usuario.nome}
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                    <i className="bi bi-envelope-fill me-2"></i>
                    <strong>Email:</strong>&nbsp; {usuario.email}
                  </div>
                </div>

                <div className="col-12">
                  <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                    <i className="bi bi-briefcase-fill me-2"></i>
                    <strong>Função:</strong>&nbsp; {usuario.funcaoFormatada}
                  </div>
                </div>

                {usuario.funcao === "tecnico" && (
                  <div className="col-12">
                    <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                      <i className="bi bi-tools me-2"></i>
                      <strong>Atribuição:</strong>&nbsp;
                      {usuario.pools[0].nome_formatado}
                    </div>
                  </div>
                )}

                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                    <i className="bi bi-calendar-event-fill  me-2"></i>
                    <strong>Criado em:</strong>&nbsp;
                    {format(usuario.criado_em, "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </div>
                </div>

                <div className="col-12 col-md-6">
                  <div className="p-3 border rounded-3 bg-light d-flex align-items-center">
                    <i className="bi bi-arrow-repeat me-2"></i>
                    <strong>Atualizado em:</strong>&nbsp;
                    {format(usuario.atualizado_em, "dd/MM/yyyy HH:mm", {
                      locale: ptBR,
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-dark rounded-pill px-5"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
