"use client";
import { useState } from "react";
import styles from "./CardResponsivoTecAdm.module.css";
import Link from 'next/link';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DuvidasUsuariosModal, DeleteUsuarioModal, ChamadosAtribuidosModal, DetalhesUsuarioModal, DesativarUsuarioModal, AtivarUsuarioModal } from "@/components/admin";

export default function CardResponsivoTecAdm({ tec }) {

    const [secao, setSecao] = useState(1);

    const statusColors = {
        "ativo": "btn-success",
        "inativo": "btn-danger"
    };

    const statusClass = statusColors[tec?.status] || "btn-secondary";

    return (
        <>
            <div className={`card text-center ${styles.estilizacaoPastinha}`}>
                <div className="card-header">
                    <ul className={`nav nav-tabs card-header-tabs ${styles.navItemPastinha}`}>
                        <li className={`nav-item`}>
                            <button
                                className={`nav-link ${secao === 1 ? "active" : "text-white"} ${styles.navItemPastinhaLi}`}
                                aria-current="true"
                                onClick={() => setSecao(1)}
                            >
                                Perfil
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${secao === 2 ? "active" : "text-white"} ${styles.navItemPastinhaLi}`}
                                onClick={() => setSecao(2)}
                            >
                                Ações
                            </button>
                        </li>
                    </ul>
                </div>
                {secao === 1 && <div className="card-body p-4 pb-3">
                    <h3 className={`card-title pt-1 ${styles.tituloLinha}`}>{tec?.nome}</h3>
                    <p className="pb-2"><span>Registro:</span> {tec?.id}</p>
                    <div className="mt-2">

                        <div className="row align-items-center justify-content-evenly">
                            <div className="col-sm-11 col-md-11">
                                <div className={`justify-content-evenly ${styles.alinhamentoPatrimonio}`}>
                                    {/* Item 1 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Email:</p>
                                    </div>

                                    {/* Item 1 */}
                                    <div className="mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-envelope-at text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{tec?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center justify-content-evenly">
                            <div className="col-sm-11 col-md-3">
                                <div className="justify-content-evenly">
                                    {/* Item 1 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Chamados em andamento:</p>
                                    </div>

                                    {/* Item 1 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-screwdriver text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{tec?.chamadosEmAndamento}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-11 col-md-3">
                                <div className="justify-content-evenly">
                                    {/* Item 2 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Chamados finalizados:</p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-check2-circle text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{tec.chamadosConcluidos}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-11 col-md-4">
                                <div className="justify-content-evenly">
                                    {/* Item 2 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Tempo médio:</p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-check2-circle text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{tec.tempoMedio || "-"}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex align-items-center justify-content-center p-3">
                                <p className="card-text pb-0 mb-0 pe-3">Status:</p>
                                <a href="#" className={`btn ${statusClass}`}>
                                    {tec.status === "ativo" ? "Ativo" : "Inativo"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>}

                {secao === 2 && <div className="card-body p-4 pb-3">
                    <h3 className={`card-title pt-1 ${styles.tituloLinha}`}>{tec?.nome}</h3>
                    <p className="pb-2"><span>Registro: </span>{tec?.id}</p>
                    <div className="mt-2">

                        <div className="d-flex fs-3 justify-content-center gap-5">
                            {tec.status === "ativo" ? (
                                <>
                                    <DetalhesUsuarioModal
                                        usuario={tec}
                                        modalId={`detalhesUsuarioModal${tec.id}`}
                                    />
                                    <ChamadosAtribuidosModal
                                        usuario={tec}
                                        modalId={`chamadosUsuarioModal${tec.id}`}
                                    />
                                    <DesativarUsuarioModal
                                        usuario={tec}
                                        modalId={`desativarUsuario${tec.id}`}
                                    />
                                </>
                            ) : (
                                <AtivarUsuarioModal
                                    usuario={tec}
                                    modalId={`ativarUsuario${tec.id}`}
                                />
                            )}
                        </div>
                    </div>
                </div>}

            </div>
        </>
    )
}