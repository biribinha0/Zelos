"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CardSE } from "."

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./ServicosTres.module.css";

export default function ServicosTres() {
    const swiperRef = useRef(null);

    const categoriasSE = [
        {
            imagemItem: '/img/itemUmSE.png',
            descricao: 'Jardinagem'
        },
        {
            imagemItem: '/img/itemDoisSE.png',
            descricao: 'Reposição de água'
        },
        {
            imagemItem: '/img/itemTresSE.png',
            descricao: 'Vigilância'
        },
        {
            imagemItem: '/img/itemQuatroSE.png',
            descricao: 'Obras'
        },
        {
            imagemItem: '/img/itemCincoSE.png',
            descricao: 'Coleta de recicláveis'
        },
        {
            imagemItem: '/img/itemSeisSE.png',
            descricao: 'Prevenção'
        },
        {
            imagemItem: '/img/itemSeteSE.png',
            descricao: 'Encanamento'
        },
    ];

    return (
        <div id="ServicosTres" className={`${styles.servicosUmDiv}`}>
            <div className={`row d-flex justify-content-center align-items-center text-center p-5 ${styles.divPrincipalServicos}`}>
                <div className="col-sm-10 col-md-4">
                    <div className={`card text-center ${styles.hoverTransition}`}>
                        <div className={`card-body py-4 ${styles.cardCategoriasServicos}`}>
                            <img src="/img/servicoTresIconImg.png" className={`img-fluid pb-3 ${styles.servicosCategoriaImg}`} alt="..." />
                            <h3 className={`card-title ${styles.cardTitleServicosUm}`}>Serviço externo</h3>
                            <p className={`card-text fst-italic fw-bolder text-body-tertiary ${styles.color}`}>
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
                            <span className="fst-italic text-danger fw-bolder">Função:</span> Envolve serviços e manutenções realizadas em áreas externas ou em sistemas complementares. Exemplos: troca de filtros de água ou ar, inspeção e manutenção do sistema de vigilância, rega e cuidados periódicos com as plantas, pequenos reparos na fachada ou na área externa.
                        </h5>
                    </div>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.prazoEstimadoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Prazo estimado:</span> normalmente 2 a 4 dias úteis, podendo variar conforme a disponibilidade de prestadores externos ou fornecedores.
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
                    className={`p-5 pb-0 pt-0 ${styles.espacoServicoUmServicos} ${styles.carrosselTres}`}
                >
                    {categoriasSE.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center">
                            <CardSE item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}