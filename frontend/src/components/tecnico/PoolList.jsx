"use client"

import { API_URL } from "@/utils/api";
import { getDecodedToken, getToken } from "@/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react"
import ChamadoCard from "./ChamadoCard";

export default function PoolList() {
    const [chamados, setChamados] = useState();
    const [loading, setLoading] = useState(false)
    const token = getToken();
    const decoded = getDecodedToken();

    useEffect(() => {
        setLoading(true)
        axios.post(`${API_URL}/tecnico/${decoded.id}/pool-chamadas`, {}, {
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
            <h3 className="text-center mb-5">Chamados Disponíveis para o Técnico se Atribuir</h3>
            {chamados?.length > 0 ? (
                chamados.map((chamado) => {
                    return (
                        <div key={chamado.id} className="col-12 col-md-3">
                            <ChamadoCard chamado={chamado} />
                        </div>
                    )
                })
            ) : 'Nenhum chamado disponível'}
        </div>
    )
}