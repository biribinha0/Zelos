'use client'
import React, { useState, useEffect } from 'react';
import './detalhesChamado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { getDecodedToken, getToken } from '@/utils/auth';
import axios from 'axios';
import { API_URL } from '@/utils/api';
import { intervalToDuration } from 'date-fns';
import { CriarApontamentoModal, FecharChamadoModal } from '@/components/tecnico';

export default function DetalhesChamadoTecnico() {
    const params = useParams();
    const [chamado, setChamado] = useState(null);
    const [loading, setLoading] = useState(false);

    const token = getToken();
    const decoded = getDecodedToken();
    const chamadoId = params.id;

    useEffect(() => {

        setLoading(true);
        axios.get(`${API_URL}/tecnico/chamados/${chamadoId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setChamado(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [chamadoId]);

    const cardWidth = 'min(800px, 98vw)';


    const formatDuracaoAbreviada = (segundos) => {
        const duracao = intervalToDuration({ start: 0, end: segundos * 1000 });

        const partes = [];
        if (duracao.hours) partes.push(`${duracao.hours}h`);
        if (duracao.minutes) partes.push(`${duracao.minutes}min`);
        if (duracao.seconds || partes.length === 0) partes.push(`${duracao.seconds}s`);

        return partes.join(" ");
    }


    if (loading) return <p className="text-center mt-4">Carregando...</p>;
    if (!chamado) return <p className="text-center mt-4">Chamado não encontrado.</p>;
    if (chamado.tecnico_id !== decoded.id) return <p className="text-center mt-4">403</p>
    return (
        <div className="dc-outer d-flex justify-content-center bg-detalhes">
            <div className="dc-inner p-4 shadow rounded bg-white" style={{ width: cardWidth }}>
                {/* Cabeçalho */}
                <div className="dc-header d-flex align-items-center justify-content-between mb-4 row">
                    <div className="left d-flex col-12 col-md-6">

                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" color="#4a4a4a">
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                        </svg>
                        <div className="dc-title fs-4 fw-bold m-0 ms-2">Detalhes do</div>
                        <p className="m-0 ms-2 dc-title2">chamado</p>
                    </div>
                    <div className="right col-12 col-md-6 d-flex justify-content-end gap-1">
                        {chamado.status === 'concluído' ?
                            <p className="py-1 m-0 text-black">
                                <i className="bi bi-check-all text-success me-1"></i>
                                Concluído
                            </p> :
                            <>
                                <CriarApontamentoModal chamado={chamado} buttonStyle={"btn btn-vermelho py-2 px-3 small w-100"} />
                                <FecharChamadoModal chamado={chamado} buttonStyle={"btn btn-vermelho py-2 px-3 small w-100"} />
                            </>}
                    </div>
                </div>

                {/* Informações */}
                <div className="dc-grid row g-4">
                    <div className="col-12 col-md-6">
                        <label className="dc-label">Título:</label>
                        <p className="dc-info">{chamado.titulo}</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Status atual:</label>
                        <p className={`dc-info status status-${chamado.status === 'concluído' ? 'sucesso' : chamado.status === 'pedente' ? 'perigo' : 'andamento'}`}>
                            {(chamado.status)}
                        </p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Patrimônio:</label>
                        {chamado.patrimonio ? (
                            <>
                                <p className='dc-info'>{chamado.patrimonio.EQUIPAMENTO}</p>
                                <p className='dc-info'>Nº{chamado.patrimonio.PATRIMONIO}</p>
                                <p className='dc-info'>Sala {chamado.patrimonio.SALA}</p>
                            </>
                        ) : (
                            <p className="dc-info text-muted">Nenhum patrimônio vinculado</p>
                        )}
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Tipo de chamado:</label>
                        <p className="dc-info">{chamado.pool}</p>
                    </div>

                    <div className="col-12">
                        <label className="dc-label">Descrição:</label>
                        <p className="dc-info">{chamado.descricao}</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Usuário:</label>
                        <p className="dc-info">{chamado.usuario}</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Técnico responsável:</label>
                        <p className="dc-info">{chamado.tecnico?.nome || "Não atribuído"}</p>
                    </div>

                    <div className="col-12">
                        <label className="dc-label">Apontamentos:</label>

                        {chamado.apontamentos?.length > 0 ? (
                            <ul className="list-group list-group-flush">
                                {chamado.apontamentos.map((apontamento, index) => (
                                    <li key={index} className="list-group-item border-0 px-0">
                                        <div className="d-flex">
                                            {/* Linha da timeline */}
                                            <div className="d-flex flex-column align-items-center me-3">
                                                <div className="bg-danger rounded-circle" style={{ width: "12px", height: "12px" }}></div>
                                                {index < chamado.apontamentos.length - 1 && (
                                                    <div className="flex-grow-1 border-start border-2 border-secondary opacity-50"></div>
                                                )}
                                            </div>

                                            {/* Conteúdo */}
                                            <div>
                                                <p className="mb-1 fw-semibold">{apontamento.descricao}</p>
                                                <small className="text-muted d-block">
                                                    <i className="bi bi-person me-1"></i> {chamado.tecnico.nome}
                                                </small>
                                                <small className="text-muted d-block">
                                                    <i className="bi bi-clock me-1"></i>
                                                    {new Date(apontamento.comeco).toLocaleString()} → {new Date(apontamento.fim).toLocaleString()}
                                                </small>
                                                <small className="text-muted d-block">
                                                    <i className="bi bi-calendar-event me-1"></i>
                                                    Criado em {new Date(apontamento.criado_em).toLocaleString()}
                                                </small>
                                                <small className="text-muted d-block">
                                                    <i className="bi bi-hourglass-split me-1"></i>
                                                    Duração: {formatDuracaoAbreviada(apontamento.duracao)}
                                                </small>

                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="dc-info text-muted">Sem apontamentos ainda</p>
                        )}
                    </div>

                </div>

            </div>

        </div>
    );
}
