"use client"

import { API_URL } from "@/utils/api";
import { getDecodedToken, getToken } from "@/utils/auth";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FecharChamadoModal } from ".";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import styles from "./ChamadosList.css"
import useWindowWidth from '@/hooks/useWindowWidth';
import { CardChamadosResponsivoTec } from '@/components/tecnico';


export default function ChamadosList() {
    const [chamados, setChamados] = useState([]);
    const [chamadosOrigem, setChamadosOrigem] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filtros, setFiltros] = useState({
        status: "",
        dataInicio: "",
        palavra: "",
    });

    // paginação
    const [current, setCurrent] = useState(1);
    const pageSize = 5;

    const token = getToken();
    const decoded = getDecodedToken();

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/tecnico/${decoded.id}/chamados`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                setChamados(res.data);
                setChamadosOrigem(res.data);
            })
            .catch((err) => {
                console.log(err);
                setChamados([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const buscarChamados = () => {
        let filtrados = [...chamadosOrigem];

        if (filtros.status) {
            filtrados = filtrados.filter(c => c.status === filtros.status);
        }
        if (filtros.dataInicio) {
            filtrados = filtrados.filter(c => new Date(c.criado_em) >= new Date(filtros.dataInicio));
        }
        if (filtros.palavra) {
            const palavraLower = filtros.palavra.toLowerCase();
            filtrados = filtrados.filter(c =>
                c.titulo.toLowerCase().includes(palavraLower) ||
                c.descricao?.toLowerCase().includes(palavraLower)
            );
        }

        setChamados(filtrados);
        setCurrent(1);
    };

    // paginação
    const startIndex = (current - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const chamadosPaginados = chamados.slice(startIndex, endIndex);

    const width = useWindowWidth();

    return (
        <div className="row my-5 w-100">
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-card-list mx-2 my-2"></i>
                    <span className="text-danger">
                        Lista <span className="text-dark">dos chamados:</span>
                    </span>
                </h4>
            </div>

            {/* Filtros */}
            <div className="container mb-4">
                <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label fw-bold">Status:</label>
                        <select
                            className="form-control text-secondary fw-bold rounded py-2 "
                            name="status"
                            value={filtros.status}
                            onChange={handleChange}
                            style={{ backgroundColor: "#b3b3b371" }}
                        >
                            <option value="">Todos</option>
                            <option value="pendente">Pendente</option>
                            <option value="andamento">Em andamento</option>
                            <option value="concluído">Concluído</option>
                        </select>
                    </div>

                    <div className="col-md-3">
                        <label className="form-label fw-bold">Data inicial:</label>
                        <input
                            type="date"
                            className="form-control text-secondary fw-bold rounded py-2"
                            name="dataInicio"
                            value={filtros.dataInicio}
                            onChange={handleChange}
                            style={{ backgroundColor: "#b3b3b371" }}
                        />
                    </div>

                    <div className="col-md-4">
                        <label className="form-label fw-bold">Palavra-chave:</label>
                        <input
                            type="text"
                            className="form-control text-secondary fw-bold rounded py-2"
                            placeholder="Ex: impressora"
                            name="palavra"
                            value={filtros.palavra}
                            onChange={handleChange}
                            style={{ backgroundColor: "#b3b3b371" }}
                        />
                    </div>

                    <div className="col-md-2">
                        <button className="btn w-100 fw-bold" onClick={buscarChamados} style={{ backgroundColor: "#70232371" }}>
                            Pesquisar
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-12">
                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) : chamadosPaginados.length > 0 ? (
                    <>
                        {width >= 992 ? (
                            <>
                                <table className="table table-hover  mt-3 border ">
                                    <thead className="bg-dark text-white text-center ">
                                        <tr className="titulo-da-tabela">
                                            <th>ID</th>
                                            <th>Tipo de chamado</th>
                                            <th>Título</th>
                                            <th>Patrimônio</th>
                                            <th>Status</th>
                                            <th>Usuário</th>
                                            <th>Data de Abertura</th>
                                            <th>Última Atualização</th>
                                            <th className="text-center">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {chamadosPaginados.map((chamado) => (
                                            <tr key={chamado.id}>
                                                <td className="text-center">{chamado.id}</td>
                                                <td>{chamado.pool}</td>
                                                <td>{chamado.titulo}</td>
                                                <td className="text-center">{chamado.patrimonio ?? "--"}</td>
                                                <td
                                                    className={`fw-bold text-${chamado.status === "concluído"
                                                        ? "success"
                                                        : chamado.status === "pendente"
                                                            ? "danger"
                                                            : "warning"
                                                        } text-center`}
                                                >
                                                    {chamado.status}
                                                </td>
                                                <td>{chamado.usuario ?? "--"}</td>
                                                <td>{format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                                <td>{format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                                <td className="text-center">
                                                    <Link
                                                        href={`/tecnico/chamados/${chamado.id}`}
                                                        className="text-dark text-decoration-none fw-bold"
                                                    >
                                                        Ver Detalhes
                                                    </Link>
                                                    {chamado.status === "concluído" ? (
                                                        <p className="py-1 m-0">
                                                            <i className="bi bi-check-all text-success me-1"></i>
                                                            Concluído
                                                        </p>
                                                    ) : (
                                                        <FecharChamadoModal
                                                            chamado={chamado}
                                                            buttonStyle="btn btn-danger py-1 px-2 small w-100"
                                                            modalId={`FecharModal${chamado.id}`}
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Paginação */}
                                <div className="d-flex justify-content-center my-3">
                                    <Pagination
                                        current={current}
                                        pageSize={pageSize}
                                        total={chamados.length}
                                        onChange={setCurrent}
                                        showSizeChanger={false}
                                    />
                                </div>
                            </>
                        ) : (
                            chamadosPaginados.map((chamado) => (
                                <CardChamadosResponsivoTec key={chamado.id} chamado={chamado} />
                            ))
                        )}
                    </>
                ) : (
                    <h3 className="text-center">Nenhum chamado encontrado</h3>
                )}
            </div>
        </div>
    );
}
