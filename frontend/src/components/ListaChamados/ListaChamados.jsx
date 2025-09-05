"use client";
import { useState, useEffect } from "react";
import { ItemChamado } from "../common";
import axios from "axios";
import { API_URL } from "@/utils/api";

export default function ListaChamados() {
    const [chamados, setChamados] = useState({});
    const [loading, setLoading] = useState(false);
    const [quantidade, setQuantidade] = useState(5)
    useEffect(() => {
        setLoading(true)
        axios.get(`${API_URL}/publico/chamados`)
            .then(function (response) {
                console.log(response.data); // The data returned by the server
                setChamados(response.data)
                console.log(response.status); // HTTP status code (e.g., 200)
                setLoading(false)
            })
            .catch(function (error) {
                console.error(error);
            });
        setLoading(false)
    }, []);

    if (loading) return (<h1>Carregando...</h1>)
    return (
        <div className="list-group">
            {Array.isArray(chamados) && chamados.length > 0 ?

                chamados.slice(0, quantidade).map((chamado, index) => {
                    return (
                        <ItemChamado chamado={chamado} key={index} />
                    )
                })
                : ''
            }
            {chamados.length > quantidade && <button onClick={() => setQuantidade(quantidade + 5)}>Ver mais</button>}
        </div>
    )
}