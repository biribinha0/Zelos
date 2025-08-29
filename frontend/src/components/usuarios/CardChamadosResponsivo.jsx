"use client";
import { useState } from "react";
import styles from "./CardChamadosResponsivo.module.css";
import Link from 'next/link';

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CardChamadosResponsivo({ chamado }) {
    const [secao, setSecao] = useState(1)

    return (
        <>
            <div className={`card text-center ${styles.estilizacaoPastinha}`}>
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <button className="nav-link active" aria-current="true" onClick={() => setSecao(1)} >
                                Solicitação
                            </button>
                        </li>
                        <li className={`nav-item`}>
                            <button className="nav-link" onClick={() => setSecao(2)}>
                                Andamento
                            </button>
                        </li>
                        <li className="nav-item">
                            <button className="nav-link" onClick={() => setSecao(3)} >
                                Edição
                            </button>
                        </li>
                    </ul>
                </div>
                {secao === 1 && <div className="card-body">
                    <h3 className="card-title pt-1">{chamado?.titulo}</h3>
                    <p className="pb-3"><span>ID:</span> {chamado?.id}</p>
                    <div className="mt-2">

                        <div className="row d-flex justify-content-evenly">
                            {/* Item 1 titulo */}
                            <div className="d-flex align-items-center col-5">
                                <p>Tipo de manutenção:</p>
                            </div>

                            {/* Item 2 titulo */}
                            <div className="d-flex align-items-center col-5">
                                <p>Número de patrimônio:</p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-evenly">
                            {/* Item 1 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm col-5">
                                <i className="bi bi-person-down text-danger"></i>
                                <span className="text-dark ms-3 fw-semibold">{chamado?.pool}</span>
                            </div>

                            {/* Item 2 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm col-5">
                                <i className="bi bi-pencil-square text-secondary"></i>
                                <span className="text-dark ms-3 fw-semibold">{chamado?.patrimonio?.EQUIPAMENTO ?? "--"}</span>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-evenly">
                            {/* Item 3 titulo */}
                            <div className="d-flex align-items-center col-5">
                                <p>Técnico responsável:</p>
                            </div>

                            {/* Item 4 titulo */}
                            <div className="d-flex align-items-center col-5">
                                <p>Abertura do chamado:</p>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-evenly">
                            {/* Item 3 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm col-5">
                                <i className="bi bi-person-down text-danger"></i>
                                <span className="text-dark ms-3 fw-semibold">{chamado?.tecnico ?? "--"}</span>
                            </div>

                            {/* Item 4 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm col-5">
                                <i className="bi bi-calendar-plus-fill text-danger"></i>
                                <span className="text-dark ms-3 fw-semibold">{format(chamado?.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center p-3">
                        <p className="card-text pb-0 mb-0 pe-3">
                            Status: 
                        </p>
                        <a href="#" className="btn btn-primary">
                            {chamado?.status}
                        </a>
                    </div>
                    <div className="d-flex align-items-center justify-content-center p-3">
                        <div className="px-3 fs-3">
                            <i className="bi bi-exclamation-triangle-fill text-danger"></i>
                        </div>
                        <div className="fs-3">
                            <i class="bi bi-bell-fill text-danger"></i>
                        </div>
                    </div>


                </div>}
                {secao === 2 && <div className="card-body">
                    <h5 className="card-title">{chamado?.titulo}</h5>
                    <p className="card-text">
                        With supporting text below as a natural lead-in to additional content.
                    </p>
                    <a href="#" className="btn btn-primary">
                        {chamado?.status}
                    </a>
                </div>}
                {secao === 3 && <div className="card-body">
                    <h5 className="card-title">{chamado?.titulo}</h5>
                    <p className="card-text">
                        <Link className='link-titulo' key={chamado?.id} href={`/usuario/chamados/${chamado.id}`}>Ver Detalhes</Link>
                    </p>
                    <a href="#" className="btn btn-primary">
                        {chamado?.status}
                    </a>
                </div>}
            </div>
        </>
    )
}