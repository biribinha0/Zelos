"use client"
import { AtribuirChamadoModal } from ".";
import styles from "./CardAtribuicoes.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CardAtribuicoes({ chamado }) {
    const [tecnico, setTecnico ] = useState({
        nome: "",
        id: ""
    });

    const [chamadoImg, setChamadoImg] = useState("");

    useEffect(() => {
        switch (chamado?.tipo_id) {
            case 1:
                setChamadoImg("/img/categoriaDois.png");
                break;
            case 2:
                setChamadoImg("/img/categoriaUm.png");
                break;
            case 3:
                setChamadoImg("/img/categoriaQuatro.png");
                break;
            case 4:
                setChamadoImg("/imgs/categoriaTres.png");
        }
    }, [chamado?.tipo_id]);


    return (

        <div
            className="card rounded-2 border-0 p-3"
            style={{ width: "100%", maxWidth: "750px", height: "auto", background: "rgba(220, 220, 220, 1)", justifyContent: "center" }} // Aumentando a largura máxima
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p
                    className="fw-bold mb-0 d-flex flex-column fs-6"
                    style={{ color: "#b42727bd" }}
                >
                    {chamado?.titulo}
                    <span className="small text-secondary"> {chamado.pool}</span>
                    <Link
                        className="d-flex align-items-center red-link small opacity-75 mt-2"
                        href={`/admin/chamados/${chamado.id}`}
                        target="_blank"
                    >
                        <i className="bi bi-info-circle me-2"></i>
                        Ver detalhes
                    </Link>
                </p>

                <img
                    src={chamadoImg}
                    width={42}
                    height={42}
                    className="img-fluid"
                    alt="Ícone do chamado"
                />
            </div>


            <div className="text-start mb-2">
                <p className="fw-bold mb-0" style={{ fontSize: "0.85rem" }}>Nome do usuário</p>
                <p className="text-muted text-secondary fw-bold small">
                    {chamado?.usuario}
                </p>
            </div>

            <div className="text-start mb-3">
                <label className="form-label fw-bold mb-1" style={{ fontSize: "0.85rem" }}>
                    Selecione um técnico:
                </label>
                <select
                    className="form-select input-vermelho form-select-sm fw-bold py-2"
                    style={{
                        backgroundColor: "#a0a0a057",
                        color: "gray",
                    }}
                    value={JSON.stringify(tecnico)} // precisa ser string
                    onChange={(e) => setTecnico(JSON.parse(e.target.value))}
                >
                    <option value="">Selecione *</option>
                    {chamado.tecnicos.map((t, index) => (
                        <option
                            key={t.id || index}
                            value={JSON.stringify({ id: t.id, nome: t.nome })}
                        >
                            {t.nome}
                        </option>
                    ))}
                </select>

            </div>

            <div className="d-grid gap-2">
                <AtribuirChamadoModal
                    chamado={chamado}
                    ativo={tecnico.id !== ''}
                    modalId={`AtribuirChamado${chamado.id}`}
                    tecnicoId={tecnico.id}
                    tecnico={tecnico.nome}
                />

            </div>
        </div>

    );
}
