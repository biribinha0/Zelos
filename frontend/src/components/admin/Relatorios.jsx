"use client";
import { useEffect, useState, useRef } from "react";
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
    const [historico, setHistorico] = useState([]);

    // carregar histórico do localStorage
    useEffect(() => {
        const saved = localStorage.getItem("historicoRelatorios");
        if (saved) {
            setHistorico(JSON.parse(saved));
        }
    }, []);
    // salvar histórico no localStorage
    useEffect(() => {
        localStorage.setItem("historicoRelatorios", JSON.stringify(historico));
    }, [historico]);

    const token = getToken();

    // refs para gráficos
    const barChartRef = useRef();
    const pieChartRef = useRef();

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

        // salva no histórico
        const novoItem = {
            id: historico.length + 1,
            data: format(new Date(), "dd/MM/yyyy HH:mm"),
            usuario: "Você",
            status: "Ativo",
            tipo: "CSV",
            filename,
        };
        setHistorico((prev) => [...prev, novoItem]);
    };

    const addChartImage = (doc, base64, x, y, maxWidth = 180, maxHeight = 100) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64;
            img.onload = () => {
                let { width, height } = img;

                // escala proporcional
                const ratio = Math.min(maxWidth / width, maxHeight / height);
                width *= ratio;
                height *= ratio;

                doc.addImage(base64, "PNG", x, y, width, height);
                resolve(height); // retorna a altura ocupada pra poder somar no currentY
            };
        });
    };

    const exportToPDF = async (data, tipo = "relatorio") => {
        if (!data || !data.length) return;

        const doc = new jsPDF();
        let currentY = 20;

        doc.setFontSize(16);
        doc.text(`Relatório: ${tipo}`, 14, currentY);
        currentY += 10;

        // Captura gráficos
        const barImage = barChartRef.current?.toBase64Image();
        const pieImage = pieChartRef.current?.toBase64Image();

        if (barImage) {
            const barHeight = await addChartImage(doc, barImage, 14, currentY, 180, 90);
            currentY += barHeight + 10;
        }

        if (pieImage) {
            const pieHeight = await addChartImage(doc, pieImage, 14, currentY, 180, 90);
            currentY += pieHeight + 10;
        }

        // Tabela
        currentY += 5;
        autoTable(doc, {
            startY: currentY,
            head: [Object.keys(data[0]).map((k) => k.replace(/_/g, " ").toUpperCase())],
            body: data.map((obj) => Object.values(obj)),
            theme: "grid",
            headStyles: { fillColor: [33, 37, 41] },
        });

        const dateStr = format(new Date(), "dd-MM-yyyy-HH'h'mm");
        const filename = `relatorio_${tipo}_${dateStr}.pdf`;
        doc.save(filename);

        // salva no histórico
        const novoItem = {
            id: historico.length + 1,
            data: format(new Date(), "dd/MM/yyyy HH:mm"),
            usuario: "Você",
            status: "Ativo",
            tipo: "PDF",
            filename,
        };
        setHistorico((prev) => [...prev, novoItem]);
    };

    const openModalB = () => setShowModalB(true);
    const closeModalB = () => setShowModalB(false);
    const openModalHistorico = () => setHistoricoModal(true);
    const closeModalHistorico = () => setHistoricoModal(false);

    return (
        <div className="container my-5">
            {/* Cabeçalho */}
            <div className="dc-outer d-flex mb-4">
                <i className="bi bi-file-earmark-bar-graph-fill fs-2 "></i>
                <div className="fs-4 fw-bold ms-2">Emissão de</div>
                <div className="fs-4 fw-bold ms-2 text-danger">relatórios:</div>
            </div>

            {/* Filtros */}
            <div className="row align-items-end g-3 mb-4">
                <div className="col-md-3">
                    <label className="form-label fw-bold">Tipo de relatório</label>
                    <select
                        className="form-select input-vermelho"
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
                        className="form-control input-vermelho"
                        name="dataInicio"
                        value={filtros.dataInicio}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label fw-bold">Data de fim</label>
                    <input
                        type="date"
                        className="form-control input-vermelho"
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
                            className="form-select input-vermelho"
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
            {relatorio?.length > 0 && (
                <>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <BarChart
                                ref={barChartRef}
                                labels={relatorio.map((r) => r.status || r.tipo_chamado || r.usuario)}
                                values={relatorio.map((r) => r.total || r.total_chamados)}
                                title={`Gráfico de Barras - ${filtros.tipoRelatorio}`}
                            />
                        </div>
                        <div className="col-md-6 mb-3">
                            <PieChart
                                ref={pieChartRef}
                                labels={relatorio.map((r) => r.status || r.tipo_chamado || r.usuario)}
                                values={relatorio.map((r) => r.total || r.total_chamados)}
                                title={`Gráfico de Pizza - ${filtros.tipoRelatorio}`}
                            />
                        </div>
                    </div>
                    <Table
                        data={relatorio}
                        columns={Object.keys(relatorio[0]).map((key) => ({
                            key,
                            label: key.replace(/_/g, " ").toUpperCase(),
                        }))}
                        title={`Tabela - ${filtros.tipoRelatorio}`}
                    />
                </>
            )}

            {/* Botões de download */}
            <div className="col-md-3 mt-4 d-flex align-items-end">
                <button className="btn w-100 button2 d-flex align-items-center justify-content-center" onClick={openModalB}> <i className="bi bi-download me-3 fs-5"></i> Baixar Relatório </button>
                {showModalB && (
                    <>
                        {/* Backdrop */}
                        <div
                            className={`modal-backdrop fade ${showModalB ? "show" : ""}`}
                            onClick={closeModalB}
                            style={{ zIndex: 1040 }}
                        ></div>

                        {/* Modal */}
                        <div
                            className={`modal fade ${showModalB ? "show" : ""} d-block`}
                            tabIndex="-1"
                            style={{ zIndex: 1050 }}
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content p-4 rounded-2 shadow-lg border-0">
                                    <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                                        <h5 className="fw-bold mb-1">Escolha o formato do relatório</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            aria-label="Close"
                                            onClick={closeModalB}
                                        ></button>
                                    </div>
                                    <p className="text-secondary mb-2">
                                        Selecione o formato desejado para baixar o relatório:
                                    </p>
                                    <div className="m-2 mb-4 p-3">
                                        <button
                                            className="btn btn-vermelho rounded-2 px-5 d-flex align-items-center Brelatorio"
                                            onClick={() =>
                                                exportToPDF(relatorio, filtros.tipoRelatorio)
                                            }
                                        >
                                            <i className="bi bi-filetype-pdf me-2 fs-4"></i>
                                            Baixar relatório em PDF
                                        </button>
                                        <button
                                            className="btn btn-vermelho rounded-2 px-5 d-flex align-items-center Brelatorio mt-3"
                                            onClick={() =>
                                                exportToCSV(
                                                    relatorio,
                                                    `relatorio_${filtros.tipoRelatorio}_${format(
                                                        new Date(),
                                                        "dd-MM-yyyy-HH'h'mm"
                                                    )}.csv`
                                                )
                                            }
                                        >
                                            <i className="bi bi-filetype-csv me-2 fs-4"></i>
                                            Baixar relatório em CSV
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

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
                                                <th>Arquivo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {historico.length === 0 && (
                                                <tr>
                                                    <td colSpan="6">Nenhum relatório baixado ainda.</td>
                                                </tr>
                                            )}
                                            {historico.map((h) => (
                                                <tr key={h.id}>
                                                    <td>{h.id}</td>
                                                    <td>{h.data}</td>
                                                    <td>{h.usuario}</td>
                                                    <td>
                                                        <span className={`badge ${h.status === "Ativo" ? "bg-success" : "bg-danger"}`}>
                                                            {h.status}
                                                        </span>
                                                    </td>
                                                    <td>{h.tipo}</td>
                                                    <td>{h.filename}</td>
                                                </tr>
                                            ))}
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
