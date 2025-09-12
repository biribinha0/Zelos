
// Arrumar 
"use client";
import { useState } from "react";
import styles from "./CardChamadosResponsivo.module.css";
import Link from 'next/link';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReabrirChamadoModal } from ".";

export default function CardChamadosResponsivo({ chamado }) {
    const [secao, setSecao] = useState(1)

    const statusColors = {
        "em andamento": "btn-warning",
        "concluído": "btn-success",
        "pendente": "btn-danger"
    };

    const statusClass = statusColors[chamado?.status] || "btn-secondary";

    const [ativo, setAtivo] = useState(null);

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
                                Solicitação
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${secao === 2 ? "active" : "text-white"} ${styles.navItemPastinhaLi}`}
                                onClick={() => setSecao(2)}
                            >
                                Andamento
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link ${secao === 3 ? "active" : "text-white"} ${styles.navItemPastinhaLi}`}
                                onClick={() => setSecao(3)}
                            >
                                Edição
                            </button>
                        </li>
                        {/* <div className={`d-flex align-items-center px-2 ${styles.infosPastinha}`}>
                            <i className="bi bi-question-circle"></i>
                        </div> */}
                    </ul>
                </div>
                {secao === 1 && <div className="card-body p-4 pb-3">
                    <h3 className={`card-title pt-1 ${styles.tituloLinha} ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{chamado?.titulo}</h3>
                    <p className="pb-2"><span>ID:</span> {chamado?.id}</p>
                    <div className="mt-2">

                        <div className="row align-items-center justify-content-evenly">
                            <div className="col-sm-11 col-md-5">
                                <div className="justify-content-evenly">
                                    {/* Item 1 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Tipo de manutenção:</p>
                                    </div>

                                    {/* Item 1 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-nut text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{chamado?.pool}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-11 col-md-5">
                                <div className="justify-content-evenly">
                                    {/* Item 2 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Técnico responsável:</p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-person-down text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{chamado?.tecnico ?? "--"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row align-items-center justify-content-evenly">
                            <div className="col-sm-11 col-md-11">
                                <div className={`justify-content-evenly ${styles.alinhamentoPatrimonio}`}>
                                    {/* Item 2 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Número de patrimônio:</p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-pencil-square text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{chamado?.patrimonio?.EQUIPAMENTO ?? "--"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center p-3">
                        <p className="card-text pb-0 mb-0 pe-3">Status:</p>
                        {/* ARRUMAR BOTAO STATUS TOPO */}
                        <a href="#" className={`btn ${statusClass}`}>
                            {chamado?.status}
                        </a>
                    </div>
                </div>}

                {secao === 2 && <div className="card-body p-4 pb-0">
                    <h3 className={`card-title pt-1 ${styles.tituloLinha} ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{chamado?.titulo}</h3>
                    <p className="pb-2"><span>ID:</span> {chamado?.id}</p>
                    <div className="mt-2">

                        <div className="row align-items-center justify-content-evenly pb-2">
                            <div className="col-sm-11 col-md-5">
                                <div className="justify-content-evenly">
                                    {/* Item 1 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Solicitado em:</p>
                                    </div>

                                    {/* Item 1 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-calendar-event text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-11 col-md-5">
                                <div className="justify-content-evenly">
                                    {/* Item 2 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Última atualização:</p>
                                    </div>

                                    {/* Item 2 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-calendar-event text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>}


                {secao === 3 && <div className="card-body p-4 pb-3">
                    <h3 className={`card-title pt-1 ${styles.tituloLinha} ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{chamado?.titulo}</h3>
                    <p className="mb-0"><span>ID:</span> {chamado?.id}</p>
                    <div className="mt-2">

                        <div className="row d-flex align-items-center justify-content-center p-3 gap-3 row-gap-3">

                            <div className={`col-9 col-sm-4 col-md-5 p-2 border border-white rounded ${styles.hoverBotao}`}>
                                <Link
                                    className="text-decoration-none"
                                    key={chamado.id}
                                    href={`/usuario/chamados/${chamado.id}`}>
                                    <i className={`bi bi-file-earmark-text-fill text-danger p-2 ${styles.decorationNone}`}></i>
                                    <p className={`card-text text-decoration-none pb-0 mb-0 ${styles.decorationNone}`}>Ver Detalhes</p>
                                </Link>
                            </div>

                            {/* <a className={`col-9 col-sm-4 col-md-5 p-2 border border-white rounded ${styles.hoverBotao} ${ativo === "urgencia" ? styles.ativo : ""}`} onClick={() => handleClick("urgencia")}>
                                <i className="bi bi-exclamation-triangle-fill text-danger p-2"></i>
                                <p className="card-text pb-0 mb-0">Urgência</p>
                            </a>
                            
                            Urgência no próprio criar chamado
                            
                            */}
                            {chamado.status === 'concluído' && (
                                <>
                                {/* Rever botão funcional vs bonito */}
                                    <ReabrirChamadoModal
                                        chamado={chamado}
                                        buttonStyle={`col-9 col-sm-4 col-md-5 p-2 border border-white rounded ${styles.hoverBotao} ${ativo === "reabertura" ? styles.ativo : ""}`}
                                        modalId={`ReabrirChamado${chamado.id}`}
                                    />
                                    <a className={`col-9 col-sm-4 col-md-5 p-2 border border-white rounded ${styles.hoverBotao} ${ativo === "reabertura" ? styles.ativo : ""}`}
                                    >
                                        <i className="bi bi-bell-fill text-danger p-2"></i>
                                        <p className="card-text pb-0 mb-0">Reabertura</p>
                                    </a>
                                </>
                            )}
                        </div>

                    </div>
                </div>}
            </div>
        </>
    )
}