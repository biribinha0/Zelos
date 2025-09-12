"use client";
import { useState } from "react";
import styles from "./CardChamadosResponsivoAdm.module.css";
import Link from 'next/link';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FecharChamadoModal } from "../tecnico";

import { DuvidasChamadosModal, EditarChamadoModal, AdminFecharChamadoModal, AtribuirFuncionario } from "@/components/admin";

export default function CardChamadosResponsivoAdm({ chamado, tecnicosList }) {

    const [secao, setSecao] = useState(1)

    const statusColors = {
        "em andamento": "btn-warning",
        "concluído": "btn-success",
        "pendente": "btn-danger"
    };

    const statusClass = statusColors[chamado?.status] || "btn-secondary";

    ///BERNARDO OLHA ESSA PARTE AQUI/////
    const [ativo, setAtivo] = useState(null);

    const handleClick = (tipo) => {
        setAtivo(tipo);

        fetch("/api/selecao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ opcao: tipo }),
        });
    };

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
                            <div className="col-sm-11 col-md-11">
                                <div className={`justify-content-evenly ${styles.alinhamentoPatrimonio}`}>
                                    {/* Item 1 titulo */}
                                    <div className="d-flex align-items-center">
                                        <p>Nome do solicitante:</p>
                                    </div>

                                    {/* Item 1 */}
                                    <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                        <i className="bi bi-person-add text-danger"></i>
                                        <span className="text-dark ms-3 fw-semibold">{chamado.usuario.nome ?? "--"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

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
                                        <span className="text-dark ms-3 fw-semibold">{chamado?.tecnico?.nome ?? "--"}</span>
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
                                        <p>Data de abertura:</p>
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

                            <div className={`col-9 col-sm-7 col-md-9 p-2 border border-white rounded ${styles.hoverBotao}`}>
                                <Link className={`align-items-center red-link`} href={`/admin/chamados/${chamado.id}`}>
                                    <i className="bi bi-eye-fill" style={{ transition: '0.2s' }}></i>
                                    <p className={`card-text pb-0 mb-0 text-white ${styles.textBotao}`}>Detalhes e edição</p>
                                </Link>
                            </div>

                            {/* <div className={`col-9 col-sm-7 col-md-9 p-2 border border-white rounded ${styles.hoverBotao}`}>
                                <AtribuirFuncionario
                                    ativo={chamado.status !== 'concluído' &&chamado.tecnico == null}
                                    tecnicos={tecnicosList}
                                    modalId={`atribuirFuncionarioModal${chamado.id}`}
                                    chamado={chamado}
                                />
                            </div> */}

                            {chamado.status === "concluído" ? (
                                <p className="py-1 m-0">
                                    <i className="bi bi-check-all text-success me-1"></i>
                                    Concluído
                                </p>
                            ) : (
                                <AdminFecharChamadoModal
                                    chamado={chamado}
                                    buttonStyle="col-9 col-sm-7 col-md-9 p-2 border border-white rounded"
                                    modalId={`FecharModal${chamado.id}`}
                                    ativo={true}
                                    texto={'Fechar'}
                                />
                            )}

                        </div>

                    </div>
                </div>}
            </div>
        </>
    )
}