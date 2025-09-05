"use client"
import { API_URL } from "@/utils/api"
import { getToken } from "@/utils/auth"
import axios from "axios"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import styles from "./AdminMensagens.module.css"

export default function AdminMensagens() {
  const [feedbacks, setFeedbacks] = useState([])
  const [contatos, setContatos] = useState([])
  const [errosTipo, setErrosTipo] = useState([])

  useEffect(() => {
    axios.get(`${API_URL}/admin/mensagens`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then((res) => {
      setFeedbacks(res.data.feedbacks)
      setContatos(res.data.contatos)
      setErrosTipo(res.data.errosTipo)
    })
  }, [])

  return (
    <div className="container my-5">
      <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
        <h4 className="fw-bold text-break">
          <i className="bi bi-chat-dots mx-2 my-2"></i>
          <span className="text-dark">
            Mensagens de contato e <span className="text-danger">feedback</span> dos usuários:
          </span>
        </h4>
      </div>

      {/* Avisos de tipo errado */}
      <div className="d-flex align-items-center mt-5">
        <h4 className={`${styles.line}`}>Chamados com tipo errado:</h4>
      </div>
      <div className="row d-flex g-4 py-3">
        {errosTipo.length === 0 ? (
          <h5>Nenhuma mensagem de tipo errado encontrada</h5>
        ) : (
          errosTipo.map((et) => (
            <div key={et.id} className="col-12 col-md-6 col-lg-4 d-flex fade-in">
              <div className="card w-100 h-100 rounded-3 shadow-sm p-3 bg-white d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-person fs-3 text-secondary"></i>
                  </div>
                  <div className="ms-2 overflow-hidden">
                    <h6
                      className="m-0 fw-bold text-danger text-truncate"
                      title={et.nome}
                    >
                      {et.nome}
                    </h6>
                    <p
                      className="m-0 text-dark fw-semibold small text-truncate"
                      title={et.email}
                    >
                      {et.email}
                    </p>
                  </div>
                </div>
                <p
                  className="m-0 text-uppercase small text-muted fw-bold mb-1 text-truncate"
                  title={et.titulo}
                >
                  {et.titulo}
                </p>
                <p
                  className="text-muted small mb-3 flex-grow-1 overflow-hidden text-truncate"
                  title={et.mensagem}
                  style={{ maxHeight: "100px", whiteSpace: "nowrap" }}
                >
                  {et.mensagem}
                </p>
                <p className="d-flex align-items-center gap-2 m-0 mt-auto small fw-bold text-dark">
                  <i className="bi bi-calendar text-danger"></i>
                  {format(et.criado_em, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Contato */}
      <div className="d-flex align-items-center mt-5">
        <h4 className={`${styles.line}`}>Contato:</h4>
      </div>
      <div className="row d-flex g-4 py-3 mb-5">
        {contatos.length === 0 ? (
          <h5>Nenhuma mensagem de contato encontrada</h5>
        ) : (
          contatos.map((c) => (
            <div key={c.id} className="col-12 col-md-6 col-lg-4 d-flex fade-in">
              <div className="card w-100 h-100 rounded-3 shadow-sm p-3 bg-white d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-person fs-3 text-secondary"></i>
                  </div>
                  <div className="ms-2 overflow-hidden">
                    <p
                      className="m-0 text-uppercase small text-muted fw-bold text-truncate"
                      title={c.titulo}
                    >
                      {c.titulo}
                    </p>
                    <h6
                      className="m-0 fw-bold text-danger text-truncate"
                      title={c.nome}
                    >
                      {c.nome}
                    </h6>
                  </div>
                </div>
                <p
                  className="text-muted small mb-3 flex-grow-1 overflow-hidden text-truncate"
                  title={c.mensagem}
                  style={{ maxHeight: "100px", whiteSpace: "nowrap" }}
                >
                  {c.mensagem}
                </p>
                <p className="d-flex align-items-center gap-2 m-0">
                  <i className="bi bi-envelope text-danger"></i>
                  <a
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}&su=Contato%20Zelos:%20${c.titulo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-dark fw-semibold small text-decoration-none text-truncate"
                    title={c.email}
                  >
                    {c.email}
                  </a>
                </p>
                <p className="d-flex align-items-center gap-2 m-0 mt-1 small text-muted">
                  <i className="bi bi-calendar text-danger"></i>
                  {format(c.criado_em, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Feedbacks */}
      <div className="d-flex align-items-center">
        <h4 className={`${styles.line}`}>Feedbacks:</h4>
      </div>
      <div className="row d-flex g-4 py-3">
        {feedbacks.length === 0 ? (
          <h5>Nenhuma mensagem de feedback encontrada</h5>
        ) : (
          feedbacks.map((f) => (
            <div key={f.id} className="col-12 col-md-6 col-lg-4 d-flex fade-in">
              <div className="card w-100 h-100 rounded-3 shadow-sm p-3 bg-white d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i className="bi bi-person fs-3 text-secondary"></i>
                  </div>
                  <div className="ms-2 overflow-hidden">
                    <p
                      className="m-0 text-uppercase small text-muted fw-bold text-truncate"
                      title={f.titulo}
                    >
                      {f.titulo}
                    </p>
                    <h6
                      className="m-0 fw-bold text-danger text-truncate"
                      title={f.nome}
                    >
                      {f.nome}
                    </h6>
                    <p
                      className="m-0 text-dark fw-semibold small text-truncate"
                      title={f.email}
                    >
                      {f.email}
                    </p>
                  </div>
                </div>
                <p
                  className="text-muted small mb-3 flex-grow-1 overflow-hidden text-truncate"
                  title={f.mensagem}
                  style={{ maxHeight: "100px", whiteSpace: "nowrap" }}
                >
                  {f.mensagem}
                </p>
                <p className="d-flex align-items-center gap-2 m-0 mt-auto small fw-bold text-dark">
                  <i className="bi bi-calendar text-danger"></i>
                  {format(f.criado_em, "dd/MM/yyyy", { locale: ptBR })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
