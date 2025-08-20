"use client";

import "./ProfissionaisHome.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function ProfissionaisHome() {
    const swiperRef = useRef(null);

    const profissionaisHome = [
        {
            imagemProfissional: './nomeProfissionalUm',
            imagemNome: './nomeProfissionalUm',
            descricao: 'Home'
        },
        {
            imagemProfissional: './nomeProfissionalDois',
            imagemNome: './nomeProfissionalUm',
            descricao: 'Sobre nós'
        },
        {
            imagemProfissional: './nomeProfissionalTres',
            imagemNome: './nomeProfissionalUm',
            descricao: 'Serviços'
        },
        {
            imagemProfissional: './nomeProfissionalQuatro',
            imagemNome: './nomeProfissionalUm',
            descricao: 'Chamados'
        },
    ];

    return (
        <div className="principaisDiv">
            {/* Carrossel */}
            <div className="carrosselDiv">
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    speed={1200}
                    scrollbar={{ draggable: true }}
                    loop={true}
                    spaceBetween={20}
                    centeredSlides={true}
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
                    className="p-5"
                >
                    {/* {profissionaisHome.map((item) => (
                        <SwiperSlide key={item.id} className="d-flex justify-content-center">
                            <Card item={item} />
                        </SwiperSlide>
                    ))} */}
                </Swiper>
            </div>
        </div>
    );
}
