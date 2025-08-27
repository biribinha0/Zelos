"use client";
import React, { useState } from 'react';
import { DuvidasCriacaoModal } from '@/components/admin';

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
                {/* icone de duvida que abre modal explicando as categorias do formulário */}
                <DuvidasCriacaoModal/>
                

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