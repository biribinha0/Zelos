"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "@/utils/auth";
import { format, subDays } from "date-fns";
import { BarChart, PieChart, Table } from "@/components/admin";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { API_URL } from "@/utils/api";

export default function Relatorios() {
    const [relatorio, setRelatorio] = useState([]);
    const [filtros, setFiltros] = useState({
        tipoRelatorio: "status",
        dataInicio: "",
        dataFim: "",
        tecnicoId: "",
    });
    const [tecnicos, setTecnicos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModalB, setShowModalB] = useState(false);
    const [historicoModal, setHistoricoModal] = useState(false);
    const token = getToken();

    useEffect(() => {
        setLoading(true);
        const now = new Date();
        const dataFim = format(now, "yyyy-MM-dd");
        const dataInicio = format(subDays(now, 30), "yyyy-MM-dd");
        setFiltros({ tipoRelatorio: "status", dataInicio, dataFim });

        axios.get(`${API_URL}/admin/usuarios?funcao=tecnico`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => setTecnicos(res.data))
            .catch(() => setTecnicos([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        if (!filtros.dataInicio || !filtros.dataFim) return;
        setLoading(true);
        axios
            .get(`${API_URL}/admin/relatorios`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    tipoRelatorio: filtros.tipoRelatorio,
                    dataInicio: filtros.dataInicio,
                    dataFim: filtros.dataFim,
                    ...(filtros.tecnicoId && { tecnicoId: filtros.tecnicoId }),
                },
            })
            .then((res) => setRelatorio(res.data.relatorio || []))
            .catch(() => setRelatorio([]))
            .finally(() => setLoading(false));
    }, [filtros]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const exportToCSV = (data, filename = "relatorio.csv") => {
        if (!data || !data.length) return;
        const headers = Object.keys(data[0]);
        const csvRows = [headers.join(";")];
        data.forEach((row) => {
            csvRows.push(headers.map((h) => `"${row[h]}"`).join(";"));
        });
        const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    };

    const exportToPDF = (data, filename = "relatorio.pdf") => {
        if (!data || !data.length) return;
        const doc = new jsPDF();
        const headers = [Object.keys(data[0])];
        const rows = data.map((obj) => Object.values(obj));
        autoTable(doc, { head: headers, body: rows });
        doc.save(filename);
    };

    const openModalB = () => setShowModalB(true);
    const closeModalB = () => setShowModalB(false);
    const openModalHistorico = () => setHistoricoModal(true);
    const closeModalHistorico = () => setHistoricoModal(false);

    return (
        <div className="container my-5">
            {/* Cabeçalho */}
            <div className="dc-outer d-flex mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    fill="currentColor"
                    className="bi bi-file-earmark-text-fill mt-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
                </svg>
                <div className="fs-4 fw-bold ms-2">Emissão de</div>
                <div className="fs-4 fw-bold ms-2 text-danger">relatórios:</div>
            </div>

            {/* Filtros */}
            <div className="row align-items-end g-3 mb-4">
                <div className="col-md-3">
                    <label className="form-label fw-bold">Tipo de relatório</label>
                    <select
                        className="form-select"
                        name="tipoRelatorio"
                        value={filtros.tipoRelatorio}
                        onChange={handleChange}
                    >
                        <option value="status">Status</option>
                        <option value="tipo">Tipo de Chamado</option>
                        <option value="atividades-tecnicos">Atividades dos Técnicos</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-bold">Data de início</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dataInicio"
                        value={filtros.dataInicio}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-bold">Data de fim</label>
                    <input
                        type="date"
                        className="form-control"
                        name="dataFim"
                        min={filtros.dataInicio}
                        value={filtros.dataFim}
                        onChange={handleChange}
                    />
                </div>
                {filtros.tipoRelatorio === "atividades-tecnicos" && (
                    <div className="col-md-3">
                        <label className="form-label fw-bold">Técnico</label>
                        <select
                            className="form-select"
                            name="tecnicoId"
                            value={filtros.tecnicoId}
                            onChange={handleChange}
                        >
                            <option value="">Selecione</option>
                            {loading ? (
                                <option>Carregando...</option>
                            ) : (
                                tecnicos.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.nomeFormatado} - {t.pools[0]?.nome_formatado || ""}
                                    </option>
                                ))
                            )}
                        </select>
                    </div>
                )}
            </div>

            {/* Resultados */}
            <div className="d-flex justify-content-between align-items-center mb-2">
                <h4 className="resultados-title">Resultados:</h4>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="gray"
                    className="bi bi-clock"
                    viewBox="0 0 16 16"
                    role="button"
                    style={{ cursor: "pointer" }}
                    onClick={openModalHistorico}
                >
                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                </svg>
            </div>

            {/* Renderização de gráficos e tabelas */}
            {relatorio?.length === 0 && <h5>Nenhum dado encontrado.</h5>}
            {relatorio?.length > 0 && filtros.tipoRelatorio === "status" && (
                <>
                    <div className="row">
                        <div className="col-md-6">
                            <BarChart
                                labels={relatorio.map((r) => r.status)}
                                values={relatorio.map((r) => r.total)}
                                title="Status"
                            />
                        </div>
                        <div className="col-md-6">
                            <PieChart
                                labels={relatorio.map((r) => r.status)}
                                values={relatorio.map((r) => r.total)}
                                title="Status"
                            />
                        </div>
                    </div>
                    <Table
                        data={relatorio}
                        columns={[
                            { key: "status", label: "Status" },
                            { key: "total", label: "Total" },
                        ]}
                        title="Tabela de Status"
                    />
                </>
            )}
            {filtros.tipoRelatorio === "tipo" && relatorio?.length > 0 && (
                <>
                    <h2 className="mb-3">Tipo de Chamado</h2>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <BarChart
                                labels={relatorio.map((r) => r.tipo_chamado)}
                                values={relatorio.map((r) => r.total)}
                                title="Gráfico de Barras - Tipo"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <PieChart
                                labels={relatorio.map((r) => r.tipo_chamado)}
                                values={relatorio.map((r) => r.total)}
                                title="Gráfico de Pizza - Tipo"
                            />
                        </div>
                    </div>
                    <Table
                        data={relatorio}
                        columns={[
                            { key: "tipo_chamado", label: "Tipo" },
                            { key: "total", label: "Total" },
                        ]}
                        title="Tabela de Tipo de Chamado"
                    />
                </>
            )}
            {filtros.tipoRelatorio === "atividades-tecnicos" && relatorio?.length > 0 && (
                <>
                    <h2 className="mb-3">Atividades dos Técnicos</h2>
                    <div className="row mb-3">
                        <div className="col-md-6 mb-3">
                            <BarChart
                                labels={relatorio.map((r) => r.usuario)}
                                values={relatorio.map((r) => r.total_chamados)}
                                title="Gráfico de Barras - Usuários"
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <PieChart
                                labels={relatorio.map((r) => r.usuario)}
                                values={relatorio.map((r) => r.total_chamados)}
                                title="Gráfico de Pizza - Usuários"
                            />
                        </div>
                    </div>
                    <Table
                        data={relatorio}
                        columns={[
                            { key: "usuario", label: "Usuário" },
                            { key: "total_chamados", label: "Total Chamados" },
                            { key: "tempo_medio_horas", label: "Tempo Médio (h)" },
                        ]}
                        title="Tabela de Usuários"
                    />
                </>
            )}
            {relatorio?.error ? <h3>{relatorio.error.error}</h3> : ""}

            {/* Botões de download */}
            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-success" onClick={() => exportToCSV(relatorio)}>
                    Baixar CSV
                </button>
                <button className="btn btn-danger" onClick={openModalB}>
                    Baixar PDF
                </button>
            </div>

            {/* Modal PDF */}
            {showModalB && (
                <>
                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: 1040 }}
                        onClick={closeModalB}
                    ></div>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{ zIndex: 1050 }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4 rounded-2 shadow-lg border-0">
                                <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                                    <h5 className="fw-bold mb-1">Escolha o formato do relatório</h5>
                                    <button type="button" className="btn-close" onClick={closeModalB}></button>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                            exportToPDF(relatorio);
                                            closeModalB();
                                        }}
                                    >
                                        PDF
                                    </button>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() => {
                                            exportToCSV(relatorio);
                                            closeModalB();
                                        }}
                                    >
                                        CSV
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Modal histórico */}
            {historicoModal && (
                <div>
                    <div
                        className="modal-backdrop fade show"
                        style={{ zIndex: 1040 }}
                        onClick={closeModalHistorico}
                    ></div>
                    <div
                        className="modal fade show d-block"
                        tabIndex="-1"
                        style={{ zIndex: 1050 }}
                    >
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                            <div className="modal-content rounded-4 shadow-lg border-0 p-4">
                                <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                                    <h4 className="fw-bold text-dark mb-1">Histórico de Relatórios</h4>
                                    <button className="btn-close" onClick={closeModalHistorico}></button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table align-middle text-center table-hover shadow-sm">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>ID</th>
                                                <th>Data</th>
                                                <th>Usuário</th>
                                                <th>Status</th>
                                                <th>Tipo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>01</td>
                                                <td>20/08/2025</td>
                                                <td>Yasmin</td>
                                                <td>
                                                    <span className="badge bg-danger">Expirado</span>
                                                </td>
                                                <td>PDF</td>
                                            </tr>
                                            <tr>
                                                <td>02</td>
                                                <td>10/08/2025</td>
                                                <td>Carlos</td>
                                                <td>
                                                    <span className="badge bg-success">Ativo</span>
                                                </td>
                                                <td>PDF</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
