"use client";

import "./ProfissionaisHome.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import CardProfissional from "./CardProfissionalHome";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./ProfissionaisHome.module.css";

export default function ProfissionaisHome() {
    const swiperRef = useRef(null);

    const profissionaisHome = [
        {
            imagemProfissional: '/img/profissionalUm.png',
            imagemNome: '/img/nomeProfissionalUm.png',
            descricao: 'Assistência técnica.'
        },
        {
            imagemProfissional: '/img/profissionalDois.png',
            imagemNome: '/img/nomeProfissionalDois.png',
            descricao: 'Limpeza'
        },
        {
            imagemProfissional: '/img/profissionalTres.png',
            imagemNome: '/img/nomeProfissionalTres.png',
            descricao: 'Reparo físico'
        },
        {
            imagemProfissional: '/img/profissionalQuatro.png',
            imagemNome: '/img/nomeProfissionalQuatro.png',
            descricao: 'Serviço externo'
        },
    ];

    return (
        <div className={`${styles.principaisDiv}`}>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center p-5 pb-0">
                <h1 className={`${styles.tituloProfissionaisHome}`}>Nossa equipe</h1>
                <img src="/img/logoOficial.png" className={`img-fluid ${styles.equipeZelosImg}`} alt="..." />
            </div>
            {/* Carrossel */}
            <div className={`${styles.carrosselDiv}`}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    speed={1200}
                    loop={true}
                    spaceBetween={20}
                    observer={true}
                    observeParents={true}
                   
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 3 },
                        1024: { slidesPerView: 3 }
                    }}
                    className={`p-5 pb-0 ${styles.espacoProfissionaisHome}`}
                >
                    {profissionaisHome.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center">
                            <CardProfissional item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
