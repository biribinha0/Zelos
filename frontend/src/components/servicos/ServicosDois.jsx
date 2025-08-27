"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CardAT } from "."

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./ServicosDois.module.css";

export default function ServicosDois() {
    const swiperRef = useRef(null);

    const categoriasAT = [
        {
            imagemItem: '/img/itemUmAT.png',
            descricao: 'Roteador Wi-fi'
        },
        {
            imagemItem: '/img/itemDoisAT.png',
            descricao: 'Computador'
        },
        {
            imagemItem: '/img/itemTresAT.png',
            descricao: 'Mouse'
        },
        {
            imagemItem: '/img/itemQuatroAT.png',
            descricao: 'CPU'
        },
        {
            imagemItem: '/img/itemCincoAT.png',
            descricao: 'Teclado'
        },
        {
            imagemItem: '/img/itemSeisAT.png',
            descricao: 'Mal-funcionamento'
        },
        {
            imagemItem: '/img/itemSeteAT.png',
            descricao: 'Telefone'
        },
    ];

    return (
        <div id="ServicosDois" className={`${styles.servicosUmDiv}`}>
            <div className={`row d-flex justify-content-center align-items-center text-center p-5 ${styles.divPrincipalServicos}`}>
                <div className="col-sm-10 col-md-4">
                    <div className={`card text-center ${styles.hoverTransition}`}>
                        <div className={`card-body py-4 ${styles.cardCategoriasServicos}`}>
                            <img src="/img/servicoDoisIconImg.png" className={`img-fluid pb-3 ${styles.servicosCategoriaImg}`} alt="..." />
                            <h3 className={`card-title ${styles.cardTitleServicosUm}`}>Assistência técnica</h3>
                            <p className="card-text fst-italic fw-bolder">
                                Suporte para manutenção e vistoria de equipamentos
                            </p>
                            <a href="#" className={`btn ${styles.btnAcionarChamadoUm}`}>
                                Acionar um chamado
                            </a>
                        </div>
                    </div>
                </div>
                <div className={`col-sm-10 col-md-5 text-start ${styles.textosServicosDiv}`}>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.funcaoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Função:</span> Inclui todo o suporte relacionado a equipamentos eletrônicos e sistemas de rede. Exemplos: restauração da conexão Wi-Fi, configuração correta de computadores, ajustes de impressoras, atualização de softwares, instalação de programas autorizados, diagnóstico de falhas em dispositivos.
                        </h5>
                    </div>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.prazoEstimadoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Prazo estimado:</span> resolução de 1 a 2 dias úteis para ajustes simples; até 5 dias úteis para casos que exijam substituição de peças ou análise mais profunda.
                        </h5>
                    </div>
                </div>
            </div>

            <div className={`col-12 d-flex flex-column justify-content-center align-items-center pt-2 ${styles.tituloServicosUmTablet}`}>
                <h3 className={`${styles.tituloServicosUm}`}>Explore alguns itens dessa categoria:</h3>
            </div>
            
            <div className={`${styles.carrosselDivServicos}`}>
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
                        1024: { slidesPerView: 6 }
                    }}
                    className={`p-5 pb-0 pt-0 ${styles.espacoServicoUmServicos} ${styles.carrosselDois}`}
                >
                    {categoriasAT.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center">
                            <CardAT item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}