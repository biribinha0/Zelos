"use client";
import { API_URL } from "@/utils/api";
import axios from "axios";
import { useEffect, useState } from "react";
import { getToken } from "@/utils/auth";
import { format, subDays } from 'date-fns';
import Chart from 'chart.js/auto';



export default function Relatorios() {
    const [relatorio, setRelatorio] = useState();
    const [filtros, setFiltros] = useState({
        tipoRelatorio: "status",
        dataInicio: "",
        dataFim: "",
        tecnicoId: null
    });
    const [tecnicos, setTecnicos] = useState(null)
    const [loading, setLoading] = useState(false)
    const token = getToken();

    const handleFiltrar = (e) => {
        e.preventDefault()
        setLoading(true)

        axios.get(`${API_URL}/admin/relatorios`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                tipoRelatorio: filtros.tipoRelatorio,
                dataInicio: filtros.dataInicio,
                dataFim: filtros.dataFim,
                ...(filtros.tecnicoId && { tecnicoId: filtros.tecnicoId })
            }
        })
            .then(function (response) {
                console.log(response)
                setRelatorio(response.data)
            })
            .catch(function (error) {
                console.log(error)
                setRelatorio({ error: error.response?.data })
            })
            .finally(function () {
                setLoading(false)
            });
    }

    useEffect(() => {
        setLoading(true)
        const now = new Date();

        const dataFim = format(now, "yyyy-MM-dd");
        const dataInicio = format(subDays(now, 30), "yyyy-MM-dd");
        setFiltros({
            tipoRelatorio: "status",
            dataInicio: dataInicio,
            dataFim: dataFim,
            tecnicoId: ""
        })

        axios.get(`${API_URL}/admin/usuarios?funcao=tecnico`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setTecnicos(response.data)
            })
            .catch(function (error) {
                setTecnicos({ error: error.response.data })
            })
            .finally(function () {
                setLoading(false)
            });

        handleFiltrar
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    return (
        <div className="row my-5">
            <h1 className="mb-3">Relatórios</h1>
            <form onSubmit={handleFiltrar} id="filtroForm">

                <div className="input-group mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-default">
                        Filtros
                    </span>

                    <div className="form-floating">
                        <select
                            className="form-select"
                            aria-label="Tipo de relatório"
                            name="tipoRelatorio"
                            value={filtros.tipoRelatorio}
                            onChange={handleChange}
                            required
                        >
                            <option value="status">Status</option>
                            <option value="tipo">Tipo de Chamado</option>
                            <option value="atividades-tecnicos">Atividades dos Técnicos</option>
                        </select>
                        <label htmlFor="floatingInput">Tipo de relatório *</label>
                    </div>
                    <div className="form-floating">

                        <input
                            className="form-control"
                            id="inicio-date"
                            type="date"
                            name="dataInicio"
                            value={filtros.dataInicio}
                            onChange={handleChange}
                            min="2025-08-01"
                            max={new Date().toISOString().slice(0, 16)}
                            required
                        />
                        <label htmlFor="floatingInput">Início *</label>
                    </div>
                    <div className="form-floating">
                        <input
                            className="form-control"
                            id="fim-date"
                            type="date"
                            name="dataFim"
                            value={filtros.dataFim}
                            onChange={handleChange}
                            min={filtros.dataInicio}
                            max={new Date().toISOString().slice(0, 16)}
                            required
                        />
                        <label htmlFor="floatingInput">Fim *</label>
                    </div>
                    <div className="form-floating">
                        < select
                            className="form-select"
                            aria-label="Tecnico"
                            name="tecnicoId"
                            // value={filtros.tecnicoId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            {loading ? 'Carregando ...' : (tecnicos?.length > 0) ? (
                                tecnicos?.map((tecnico) => {
                                    return (
                                        <option key={tecnico.id} value={tecnico.id}>{tecnico.nomeFormatado} - {tecnico.pools[0].nome_formatado} </option>
                                    )
                                })
                            ) : ''}
                        </select>
                        <label htmlFor="floatingInput">Técnico</label>
                    </div>


                    <button type="submit" form="filtroForm" className="input-group-text btn btn-vermelho" id="inputGroup-sizing-default">
                        Filtrar
                    </button>

                </div>
            </form>

            {JSON.stringify(relatorio)}
            {/* <Chart 
            type=' bar'
            /> */}
        </div >

    )
}