"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./criarChamado.css";
import { getDecodedToken, getToken } from "@/utils/auth";
import axios from "axios";
import { API_URL } from "@/utils/api";
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";


export default function CriarChamado() {
  const [chamadoData, setChamadoData] = useState({
    titulo: "",
    descricao: "",
    tipo_id: "",
    usuario_id: null,
    patrimonio: "",
    sala: "",
    equipamento: ""
  });
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [usarPatrimonio, setUsarPatrimonio] = useState(false);
  const [listaPatrimonio, setListaPatrimonio] = useState([]);
  const [buscandoPatrimonio, setBuscandoPatrimonio] = useState(false);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 3;

  useEffect(() => {
    setLoading(true);
    const decoded = getDecodedToken();
    if (decoded?.id) {
      setChamadoData(prev => ({ ...prev, usuario_id: decoded.id }));
    }
    const token = getToken();
    axios.get(`${API_URL}/meta/pools`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setPools(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setChamadoData(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscarPatrimonio = async () => {
    setBuscandoPatrimonio(true);
    setListaPatrimonio([]);
    setPaginaAtual(1);

    try {
      const token = getToken();
      const params = new URLSearchParams();
      if (chamadoData.patrimonio) params.append('patrimonio', chamadoData.patrimonio);
      if (chamadoData.sala) params.append('sala', chamadoData.sala);
      if (chamadoData.equipamento) params.append('equipamento', chamadoData.equipamento);

      const response = await axios.get(`${API_URL}/usuario/equipamentos?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setListaPatrimonio(response.data || []);
    } catch (error) {
      console.error(error);
      setListaPatrimonio([{ erro: "Patrimônio não encontrado" }]);
    } finally {
      setBuscandoPatrimonio(false);
    }
  };

  const handleSelectPatrimonio = (item) => {
    setChamadoData(prev => ({
      ...prev,
      patrimonio: item.PATRIMONIO,
      sala: item.SALA,
      equipamento: item.EQUIPAMENTO
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const token = getToken();
      await axios.post(`${API_URL}/usuario/chamados/`, chamadoData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ type: "success", text: "Chamado criado com sucesso!" });
      setChamadoData(prev => ({
        titulo: "",
        descricao: "",
        tipo_id: "",
        usuario_id: prev.usuario_id,
        patrimonio: "",
        sala: "",
        equipamento: ""
      }));
      setUsarPatrimonio(false);
      setListaPatrimonio([]);
    } catch (error) {
      console.error(error);
      setMessage({ type: "error", text: "Erro ao criar chamado, tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  if (chamadoData.usuario_id === null) return <div className="text-white p-4">Carregando...</div>;

  // Paginação
  const indexUltimo = paginaAtual * itensPorPagina;
  const indexPrimeiro = indexUltimo - itensPorPagina;
  const listaAtual = listaPatrimonio.slice(indexPrimeiro, indexUltimo);

  return (
    <div className="container-fluid position-relative criar-background">
      <div className="row position-relative" style={{ zIndex: 1 }}>
        {/* Formulário */}
        <div className="col-12 col-lg-6">
          <form style={{ padding: "40px", marginTop: "4px" }} onSubmit={handleSubmit}>
            <h5 className="chamado">CHAMADOS</h5>
            <h1 className="titulo">Solicitar chamado</h1>
            <p className="subtitulo text-white">Crie um chamado para sua necessidade</p>

            {message && <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"}`}>{message.text}</div>}

            <h6 className="tituloInput">Tipo de chamado</h6>
            <select className="form-control mb-3 inputCriar" name="tipo_id" value={chamadoData.tipo_id} onChange={handleChange} required>
              <option value="">Selecione</option>
              {pools.map(pool => <option key={pool.id} value={pool.id}>{pool.titulo}</option>)}
            </select>

            <h6 className="tituloInput">Título:</h6>
            <input className="form-control mb-3 inputCriar" name="titulo" value={chamadoData.titulo} onChange={handleChange} required />

            <h6 className="tituloInput">Descrição do problema:</h6>
            <textarea className="form-control mb-3 inputCriar" name="descricao" value={chamadoData.descricao} onChange={handleChange} required />

            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" id="usarPatrimonio" checked={usarPatrimonio} onChange={e => setUsarPatrimonio(e.target.checked)} />
              <label className="form-check-label text-white" htmlFor="usarPatrimonio">Adicionar patrimônio</label>
            </div>

            <button type="submit" className="btn buttonC" disabled={loading}>
              {loading ? "Enviando..." : "Solicitar"}
            </button>
          </form>
        </div>
        {/* Patrimônio */}
        <div className="col-12 col-lg-6 patrimonioPai">
          {usarPatrimonio && (
            <div className="d-flex flex-column input-group patrimonioMae">
              <h5 className="tituloInput">Busque o Patrimônio</h5>
              <p className="tituloInput text-break d-flex flex-wrap">
                Insira as informações do patrimônio que deseja associar ao chamado. Caso não encontre, desmarque a checkbox e envie sem patrimônio.
              </p>

              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control inputCriar col-md-3"
                  placeholder="Número do Patrimônio"
                  name="patrimonio"
                  value={chamadoData.patrimonio}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control inputCriar col-md-3"
                  placeholder="Sala"
                  name="sala"
                  value={chamadoData.sala}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  className="form-control inputCriar col-md-3"
                  placeholder="Equipamento"
                  name="equipamento"
                  value={chamadoData.equipamento}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="btn btn-outline-light col-md-2"
                  onClick={handleBuscarPatrimonio}
                  disabled={buscandoPatrimonio}
                >
                  {buscandoPatrimonio ? "Buscando..." : "Buscar"}
                </button>
              </div>

              {listaPatrimonio.length > 0 && !listaPatrimonio[0].erro && (
                <div className="lista-patrimonio mt-3">
                  {listaAtual.map((item) => (
                    <div
                      key={item.PATRIMONIO}
                      className="alert alert-light d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSelectPatrimonio(item)}
                    >
                      <div>
                        <p><b>Patrimônio:</b> {item.PATRIMONIO}</p>
                        <p><b>Sala:</b> {item.SALA}</p>
                        <p><b>Equipamento:</b> {item.EQUIPAMENTO}</p>
                      </div>
                      {chamadoData.patrimonio === item.PATRIMONIO && <span className="badge bg-success">Selecionado</span>}
                    </div>
                  ))}

                  {/* Paginação com rc-pagination */}
                  <Pagination
                    current={paginaAtual}
                    total={listaPatrimonio.length}
                    pageSize={itensPorPagina}
                    onChange={(page) => setPaginaAtual(page)}
                    showTitle={false}
                    showLessItems
                    className="mt-3"
                  />
                </div>
              )}

              {listaPatrimonio.length > 0 && listaPatrimonio[0].erro && (
                <div className="alert alert-warning mt-3">{listaPatrimonio[0].erro}</div>
              )}

              {listaPatrimonio.length === 0 && !buscandoPatrimonio && (
                <div className="alert alert-warning mt-3">Patrimônio não encontrado</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
