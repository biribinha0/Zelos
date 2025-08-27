"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CardRF } from "."

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./ServicosUm.module.css";

export default function ServicosUm() {
    const swiperRef = useRef(null);

    const categoriasRF = [
        {
            imagemItem: '/img/itemUmRF.png',
            descricao: 'Ar-condicionado'
        },
        {
            imagemItem: '/img/itemDoisRF.png',
            descricao: 'Ventilador'
        },
        {
            imagemItem: '/img/itemTresRF.png',
            descricao: 'Lâmpada'
        },
        {
            imagemItem: '/img/itemQuatroRF.png',
            descricao: 'Interruptor'
        },{
            imagemItem: '/img/itemCincoRF.png',
            descricao: 'Maçaneta eletrônica'
        },
        {
            imagemItem: '/img/itemSeisRF.png',
            descricao: 'Catraca'
        },{
            imagemItem: '/img/itemSeteRF.png',
            descricao: 'Bebedouro'
        },
    ];

    return (
        <div id="ServicosUm" className={`${styles.servicosUmDiv}`}>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center p-5 pb-0">
                <h1 className={`${styles.tituloServicosUm}`}>Manutenção em um</h1>
                <img src="/img/cliqueServicos.png" className={`img-fluid ${styles.servicosCliqueImg}`} alt="..." />
            </div>
            <div className={`row d-flex justify-content-center align-items-center text-center p-5 ${styles.divPrincipalServicos}`}>
                <div className="col-sm-10 col-md-4">
                    <div className={`card text-center ${styles.hoverTransition}`}>
                        <div className={`card-body py-4 ${styles.cardCategoriasServicos}`}>
                            <img src="/img/servicoUmIconImg.png" className={`img-fluid pb-3 ${styles.servicosCategoriaImg}`} alt="..." />
                            <h3 className={`card-title ${styles.cardTitleServicosUm}`}>Reparo físico</h3>
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
                            <span className="fst-italic text-danger fw-bolder">Função:</span> Abrange o conserto ou substituição de equipamentos e estruturas físicas do local. Exemplos: reparo de mesas ou cadeiras danificadas, manutenção ou troca de ar-condicionado, ajuste ou substituição de maçanetas eletrônicas, troca de lâmpadas e iluminação em geral, correção de portas emperradas ou fechaduras.
                        </h5>
                    </div>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.prazoEstimadoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Prazo estimado:</span> de 1 a 3 dias úteis, dependendo da disponibilidade de peças e da complexidade do reparo.
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
                    className={`p-5 pb-0 pt-0 ${styles.espacoServicoUmServicos} ${styles.carrosselUm}`}
                >
                    {categoriasRF.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center">
                            <CardRF item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}