"use client";
import React, { useState } from 'react';

import "../adm.css";

export default function AdminPools() {
    



    const [tagsCategoria, setTagsCategoria] = useState([]);
    const [categoriaInput, setCategoriaInput] = useState("");
    const addCategoria = (e) => {
        if (e.key === "Enter" && categoriaInput.trim() !== "") {
            e.preventDefault();
            if (!tagsCategoria.includes(categoriaInput.trim())) {
                setTagsCategoria([...tagsCategoria, categoriaInput.trim()]);
            }
            setCategoriaInput("");
        }
    };
    const removeCategoria = (index) => {
        setTagsCategoria(tagsCategoria.filter((_, i) => i !== index));
    };

    
    return (
        <div className="container my-5">
            {/* Cabeçalho */}
            <div className="dc-outer d-flex align-items-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    className="bi bi-plus-square-fill mt-1"
                    viewBox="0 0 16 16"
                >
                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
                </svg>
                <div className="fs-4 fw-bold ms-2">Criação de</div>
                <div className="fs-4 fw-bold ms-2 text-danger">nova categoria</div>
                <div className="fs-4 fw-bold ms-2">de chamados:</div>
                <div className="ms-auto">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="gray"
                        className="bi bi-question-circle text-muted mt-3"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                        <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.074m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.533-.42-.927-1.029-.927-.584 0-1.009.394-1.009.927" />
                    </svg>
                </div>
            </div>

            {/* Inputs */}
            <div className="row align-items-end g-3">
                <div className="col-md-4">
                    <label className="form-label fw-bold">Nome da categoria:</label>
                    <input type="text" className="form-control inputParte1" placeholder="Nome da Categoria" />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Ícone representativo:</label>
                    <input type="text" className="form-control inputParte1" placeholder="Ícone representativo" />
                </div>
                <div className="col-md-4">
                    <label className="form-label fw-bold">Frase descritiva:</label>
                    <input type="text" className="form-control inputParte1" placeholder="Frase descritiva" />
                </div>
            </div>



            {/* Função da categoria */}
            <div className="row mt-4">
                <div className="col-md-12">
                    <label className="form-label fw-bold">Função dessa nova categoria:</label>
                    <input type="text" className="form-control inputParte1" placeholder="Escreva aqui a função da categoria" />
                </div>
            </div>

            {/* Explicação prazo estimado */}
            <div className="row mt-3">
                <div className="col-md-12">
                    <label className="form-label fw-bold">Explicação sobre o prazo estimado:</label>
                    <textarea className="form-control inputParte1 mt-1" ></textarea>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-md-12">
                    <label className="form-label fw-bold">Categoria:</label>
                    <input
                        type="text"
                        className="form-control inputParte1 mt-1"
                        placeholder="Digite a categoria e pressione Enter"
                        value={categoriaInput}
                        onChange={(e) => setCategoriaInput(e.target.value)}
                        onKeyDown={addCategoria}
                    />
                    <div className="mt-2 d-flex flex-wrap gap-2">
                        {tagsCategoria.map((cat, index) => (
                            <span key={index} className="badge bg-danger d-flex align-items-center">
                                {cat}
                                <button type="button" className="btn-close btn-close-white btn-sm ms-2" onClick={() => removeCategoria(index)}></button>
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-3 ms-auto d-flex justify-content-end">
                    <button className="btn w-100 buttonC">Criar</button>
                </div>
            </div>


        </div>
    )
}