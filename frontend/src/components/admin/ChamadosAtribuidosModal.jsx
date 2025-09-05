"use client";
import React, { useState } from "react";
import { API_URL } from "@/utils/api";
import axios from "axios";
import { getToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import styles from "./ChamadosAtribuidosModal.module.css"

export default function ChamadosAtribuidosModal({
  usuario,
  modalId = "chamadosUsuarioModal",
}) {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const token = getToken();
  const router = useRouter();

  const carregarChamados = () => {
    if (!usuario) return;
    setLoading(true);
    setErro("");

    axios
      .get(`${API_URL}/admin/chamados/usuario/${usuario.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setChamados(res.data))
      .catch((error) => {
        console.error("Erro ao buscar chamados:", error.response?.data || error);
        setErro("Erro ao carregar chamados.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {/* Botão que abre o modal */}
      <button
        type="button"
        style={{ all: "unset", cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
        onClick={carregarChamados}
      >
        <i className="bi bi-clipboard2-data text-secondary" title="Chamados"></i>
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
          <div className="modal-content rounded-4 shadow-lg border-0">
            {/* Header */}
            <div
              className="modal-header text-white"
              style={{ backgroundColor: "#9A1915" }}
            >
              <h5 className="modal-title fw-bold" id={`${modalId}Label`}>
                <i className="bi bi-clipboard2-check me-2"></i>
                Chamados atribuídos a {usuario?.nomeFormatado}
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
              {loading && (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-2 text-muted">Carregando chamados...</p>
                </div>
              )}

              {erro && <div className="alert alert-danger">{erro}</div>}

              {!loading && !erro && (
                <>
                  {chamados.length > 0 ? (
                    <div className="d-flex flex-column gap-3">
                      {chamados.map((c) => (
                        <div
                          key={c.id}
                          className="card border-0 shadow-sm rounded-3"
                        >
                          <div className="card-body d-flex flex-column">

                            <div className={`d-flex justify-content-between align-items-center mb-2`}>
                              <h5
                                className={`card-title mb-0 text-start text-secondary
                              ${styles.tituloLinha}
                              ${c.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}
                              >
                                {c.urgencia === 'Urgente' ?
                                  (<i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>) 
                                  : <i className="bi bi-journal-text text-secondary me-2"></i>}{c?.titulo}</h5>
                              <span
                                className={`badge px-3 py-2 rounded-pill d-none d-md-block ${c.status === "concluído"
                                  ? "bg-success"
                                  : c.status === "pendente" ? "bg-danger" : "bg-warning text-dark"
                                  } ${styles.statusChamadoUm}`}
                              >
                                {c.status}
                              </span>

                              <span
                                className={`d-block d-md-none rounded-circle bg-success ps-4 ${c.status === "concluído"
                                  ? "bg-success"
                                  : "bg-warning text-dark"
                                  } ${styles.statusChamadoUm}`}
                                style={{
                                  width: "12px",
                                  height: "24px",
                                  display: "inline-block",
                                }}
                              ></span>

                            </div>


                            <p dangerouslySetInnerHTML={{ __html: c.descricao }} className="card-text text-start text-muted mb-3" />



                            <button
                              role="link"
                              onClick={() =>
                                router.push(`/admin/chamados/${c.id}`)
                              }
                              className="btn text-white rounded-pill w-100 mt-2"
                              style={{ backgroundColor: "#9A1915" }}
                              data-bs-dismiss="modal"
                            >
                              <i className="bi bi-box-arrow-up-right me-1"></i>
                              Ver detalhes
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted text-center">
                      Nenhum chamado atribuído a este usuário.
                    </p>
                  )}
                </>
              )}
            </div>


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
