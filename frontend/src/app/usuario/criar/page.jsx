"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./criarChamado.css";
import { getDecodedToken } from "@/utils/auth";
import axios from "axios";
import { API_URL } from "@/utils/api";

export default function CriarChamado() {
  const [chamadoData, setChamadoData] = useState({
    titulo: "",
    descricao: "",
    tipo_id: "",
    usuario_id: null,
    patrimonio: "",
  });
  const [pools, setPools] = useState(null)

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLoading(true)
    const decoded = getDecodedToken();
    if (decoded?.id) {
      setChamadoData((prev) => ({ ...prev, usuario_id: decoded.id }));
    }

    axios.get(`${API_URL}/meta/pools`)
      .then((response) => {
        setPools(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamadoData({ ...chamadoData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await axios.post(`${API_URL}/usuario/chamados/`, chamadoData);
      setMessage({ type: "success", text: "Chamado criado com sucesso!" });
      setChamadoData({
        titulo: "",
        descricao: "",
        tipo_id: "",
        usuario_id: chamadoData.usuario_id, // mantém o usuário
        patrimonio: "",
      });
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erro ao criar chamado, tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  // evita renderizar o form antes de carregar o usuario_id
  if (chamadoData.usuario_id === null) {
    return <div className="text-white p-4">Carregando...</div>;
  }

  return (
    <div className="container-fluid position-relative criar-background">
      <div className="row position-relative" style={{ zIndex: 1 }}>
        <div className="col-md-6">
          <form style={{ padding: "40px", marginTop: "60px" }} onSubmit={handleSubmit}>
            <h5 className="chamado">CHAMADOS</h5>
            <h1 className="titulo">Solicitar chamado</h1>
            <p className="subtitulo text-white">
              crie um chamado para sua necessidade
            </p>

            {message && (
              <div
                className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"
                  }`}
              >
                {message.text}
              </div>
            )}

            <h6 className="tituloInput">Tipo de chamado</h6>
            {pools?.length > 0 ? (
              <select
                className="form-control mb-3 inputCriar"
                name="tipo_id"
                value={chamadoData.tipo_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                {pools.map(pool => {
                  return (<option key={pool.id} value={pool.id}>{pool.titulo}</option>)
                }) }
              </select>
            ) : (
              <p>Nenhum Pool Encontrado</p>
            )}



            <h6 className="tituloInput">Título:</h6>
            <input
              className="form-control mb-3 inputCriar"
              name="titulo"
              value={chamadoData.titulo}
              onChange={handleChange}
              required
            />

            <h6 className="tituloInput">Descrição do problema:</h6>
            <textarea
              className="form-control mb-3 inputCriar"
              name="descricao"
              value={chamadoData.descricao}
              onChange={handleChange}
              required
            ></textarea>

            <h6 className="tituloInput">Número de patrimônio:</h6>
            <input
              type="text"
              className="form-control mb-3 inputCriar"
              placeholder="ex: 1234567894"
              name="patrimonio"
              value={chamadoData.patrimonio}
              onChange={handleChange}
            />

            <button type="submit" className="btn buttonC" disabled={loading}>
              {loading ? "Enviando..." : "Solicitar"}
            </button>
          </form>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div >
  );
}
