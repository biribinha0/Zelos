'use client'
import React, { useState, useEffect } from 'react';
import './detalhesChamado.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'next/navigation';
import { getDecodedToken, getToken } from '@/utils/auth';
import axios from 'axios';
import { API_URL } from '@/utils/api';

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


    if (loading) return <p className="text-center mt-4">Carregando...</p>;
    if (!chamado) return <p className="text-center mt-4">Chamado não encontrado.</p>;
    if (chamado.tecnico_id !== decoded.id) return <p className="text-center mt-4">403</p>
    return (
        <div className="dc-outer d-flex justify-content-center bg-detalhes">
            <div className="dc-inner p-4 shadow rounded bg-white" style={{ width: cardWidth }}>
                {/* Cabeçalho */}
                <div className="dc-header d-flex align-items-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" color="#4a4a4a">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                    </svg>
                    <div className="dc-title fs-4 fw-bold ms-2">Detalhes do</div>
                    <p className="m-2 dc-title2">chamado</p>
                </div>

                {/* Informações */}
                <div className="dc-grid row g-4">
                    <div className="col-12 col-md-6">
                        <label className="dc-label">Título:</label>
                        <p className="dc-info">{chamado.titulo}</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Status atual:</label>
                        <p className={`dc-info status-${chamado.status?.toLowerCase()}`}>
                            {chamado.status}
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
                        <p className="dc-info">{decoded.nomeCompleto}</p>
                    </div>

                    <div className="col-12 col-md-6">
                        <label className="dc-label">Técnico responsável:</label>
                        <p className="dc-info">{chamado.tecnico?.nome || "Não atribuído"}</p>
                    </div>

                    <div className="col-12">
                        <label className="dc-label">Apontamentos:</label>
                        {chamado.apontamentos?.length > 0 ? (
                            <ul className="list-group">
                                {chamado.apontamentos.map((apontamento, idx) => (
                                    <li key={idx} className="list-group-item">
                                        <strong>{apontamento.descricao}</strong><br />
                                        <small>
                                            {new Date(apontamento.comeco).toLocaleString()} → {new Date(apontamento.fim).toLocaleString()}
                                        </small>
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
