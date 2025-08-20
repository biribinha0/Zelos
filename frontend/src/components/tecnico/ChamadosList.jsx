"use client"

import { API_URL } from "@/utils/api";
import { getDecodedToken, getToken } from "@/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FecharChamadoModal } from ".";

export default function ChamadosList() {
    const [chamados, setChamados] = useState();
    const [loading, setLoading] = useState(false)
    const token = getToken();
    const decoded = getDecodedToken();

    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/tecnico/${decoded.id}/chamados`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setChamados(response.data)
            })
            .catch(function (error) {
                setChamados({ error: error.data })
            })
            .finally(function () {
                setLoading(false)
            });
    }, [])

    if (loading) return (
        <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Carregando...</span>
        </div>
    )
    return (
        <div className="row my-5">
            <h3 className="text-center mb-5">Lista de chamados</h3>
            <div className="col-12">

                {chamados?.length > 0 ? (
                    <table className="table  mt-3">
                        <thead className="thead-custom">
                            <tr>
                                <th>ID</th>
                                <th>Tipo de chamado</th>
                                <th>Título</th>
                                <th>Patrimônio</th>
                                <th>Status</th>
                                <th>Usuário</th>
                                <th>Data de Abertura</th>
                                <th>Última Atualização</th>
                                <th>Ações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {chamados.map((chamado, index) => (
                                <tr key={chamado.id} className={index % 2 !== 0 ? 'tr-cinza' : ''} >

                                    <td className="textTabela text-black-75">{chamado.id}</td>
                                    <td className="textTabela text-black-75">{chamado.pool}</td>
                                    <td className="textTabela text-black-75 ">{chamado.titulo}</td>
                                    <td className="textTabela text-black-75">{chamado.patrimonio ?? "--"}</td>
                                    <td className={`fw-bold text-${chamado.status === 'concluído' ? 'success' : chamado.status === 'pendente' ? 'danger' : 'warning'}`}>
                                        {chamado.status}
                                    </td>
                                    <td className="textTabela text-black-75">{chamado.usuario ?? "--"}</td>
                                    <td className="textTabela text-black-75">{format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                    <td className="textTabela text-black-75">{format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                    <td className="textTabela ">
                                        <Link className='text-decoration-underline text-primary' key={chamado.id} href={`/tecnico/chamados/${chamado.id}`}>Ver Detalhes</Link>

                                        <FecharChamadoModal chamado={chamado}/>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    loading ? (
                        <div className="text-center my-5">
                            <div className="spinner-border text-danger" role="status">
                                <span className="visually-hidden">Carregando...</span>
                            </div>
                        </div>
                    ) :
                        <h3 colSpan="4" className="text-center">Nenhum chamado encontrado</h3>
                )}
            </div>
        </div>
    )
}