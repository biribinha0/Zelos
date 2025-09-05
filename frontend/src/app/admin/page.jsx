"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { getToken } from "@/utils/auth";
import { API_URL } from "@/utils/api";
import { format, subDays } from "date-fns";
import "./adm.css";

import styles from "./admin.module.css";
import Link from "next/link";
import Funcionalidades from "./Funcionalidades";

export default function HomePage() {
  const [filtros, setFiltros] = useState({
    dataInicio: "",
    dataFim: "",
    statusRelatorio: "pendente",
  });
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = getToken();

  useEffect(() => {
    // valores padrão: últimos 30 dias
    const now = new Date();
    const dataFim = format(now, "yyyy-MM-dd");
    const dataInicio = format(subDays(now, 30), "yyyy-MM-dd");
    setFiltros((prev) => ({ ...prev, dataInicio, dataFim }));
  }, []);

  // busca sempre que filtros mudarem
  useEffect(() => {
    if (!filtros.dataInicio || !filtros.dataFim || !filtros.statusRelatorio) return;

    setLoading(true);
    axios
      .get(`${API_URL}/admin/relatorios`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          tipoRelatorio: "tipo-por-status", // novo relatório criado no backend
          dataInicio: filtros.dataInicio,
          dataFim: filtros.dataFim,
          status: filtros.statusRelatorio,
        },
      })
      .then((res) => setDados(res.data.relatorio || []))
      .catch(() => setDados([]))
      .finally(() => setLoading(false));
  }, [filtros]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltros((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>

    <div className="container-fluid p-0">
        <div className="row">
          <div className={`d-md-none ${styles.xs}`}>
            <Link href="#">
              <img
                className="img-fluid w-100"
                src="/img/bannerUmCelularAdm.png"
                alt="bannerUmMobile"
              />
            </Link>
          </div>
          <div className={`d-md-none ${styles.smPersonalizado}`}>
            <Link href="#">
              <img
                className="img-fluid w-100"
                src="/img/bannerUmTabletAdm.png"
                alt="bannerUmMobile"
              />
            </Link>
          </div>
          <div className="d-none d-md-block">
            <Link href="#">
              <img
                className="img-fluid w-100"
                src="/img/bannerUmAdm.png"
                alt="bannerUm"
              />
            </Link>
          </div>
        </div>
      </div>

      <Funcionalidades/>

      {/* Estatísticas */}
      <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
        <h4 className="fw-bold">
          <i className="bi bi-activity"></i> <span className="text-danger">Estatísticas </span> de chamados:
        </h4>
      </div>

      {/* Filtros */}
      <div className="container my-5">
        <div className="row align-items-end g-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">Data de início:</label>
            <input
              type="date"
              className="form-control inputParte1"
              name="dataInicio"
              value={filtros.dataInicio}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Data de fim:</label>
            <input
              type="date"
              className="form-control inputParte1"
              name="dataFim"
              min={filtros.dataInicio}
              value={filtros.dataFim}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label className="form-label fw-bold">Status:</label>
            <select
              className="form-control inputParte1"
              name="statusRelatorio"
              value={filtros.statusRelatorio}
              onChange={handleChange}
            >
              <option value="pendente">Pendente</option>
              <option value="andamento">Em andamento</option>
              <option value="concluido">Concluído</option>
            </select>
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button
              className="btn w-100 buttonC"
              onClick={() => setFiltros({ ...filtros })}
            >
              Filtrar
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="row text-center mt-5">
          {loading && <h5>Carregando...</h5>}
          {!loading && dados.length === 0 && <h5>Nenhum dado encontrado.</h5>}
          {!loading &&
            dados.map((item, idx) => (
              <div className="col-md-3 mb-4" key={idx}>
                <img
                  src={`./img/admIcone${(idx % 4) + 1}.png`}
                  className="img-fluid mb-2"
                  alt={item.tipo_chamado}
                />
                <h2 className="numeroParte1">{item.total}</h2>
                <p className="textoParte1">{item.tipo_chamado}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
