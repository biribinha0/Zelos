"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { CardLM } from "."
import { getDecodedToken, isAuthenticated } from "@/utils/auth";
import Link from "next/link";


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./ServicosQuatro.module.css";

export default function ServicosQuatro() {
    const swiperRef = useRef(null);
    const decoded = getDecodedToken()
    const isUserAuth = isAuthenticated() && decoded.funcao === 'usuario';


    const categoriasLM = [
        {
            imagemItem: '/img/itemUmLM.png',
            descricao: 'Vidros e acrílicos'
        },
        {
            imagemItem: '/img/itemDoisLM.png',
            descricao: 'Limpeza de líquidos'
        },
        {
            imagemItem: '/img/itemTresLM.png',
            descricao: 'Fragmentos'
        },
        {
            imagemItem: '/img/itemQuatroLM.png',
            descricao: 'Limpeza ambiente'
        },
        {
            imagemItem: '/img/itemCincoLM.png',
            descricao: 'Estofados'
        },
        {
            imagemItem: '/img/itemSeisLM.png',
            descricao: 'Reposição de papel'
        },
        {
            imagemItem: '/img/itemSeteLM.png',
            descricao: 'Reposição sabonete'
        },
    ];


    return (
        <div id="ServicosQuatro" className={`${styles.servicosUmDiv}`}>
            <div className={`row d-flex justify-content-center align-items-center text-center p-5 ${styles.divPrincipalServicos}`}>
                <div className="col-sm-10 col-md-4">
                    <div className={`card text-center ${styles.hoverTransition}`}>
                        <div className={`card-body py-4 ${styles.cardCategoriasServicos}`}>
                            <img src="/img/servicoQuatroIconImg.png" className={`img-fluid pb-3 ${styles.servicosCategoriaImg}`} alt="..." />
                            <h3 className={`card-title ${styles.cardTitleServicosUm}`}>Limpeza</h3>
                            <p className="card-text fst-italic fw-bolder">
                                Manutenção de ambientes por meio da higienização
                            </p>
                            <Link href={isUserAuth ? '/usuario/criar?tipo_id=3' : 'login/usuario'} className={`btn ${styles.btnAcionarChamadoUm}`}>
                                Acionar um chamado
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`col-sm-10 col-md-5 text-start ${styles.textosServicosDiv}`}>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.funcaoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Função:</span> Refere-se à higienização completa de ambientes e objetos, garantindo segurança e conforto. Exemplos: limpeza de salas, corredores e áreas comuns, higienização de mesas e equipamentos, remoção de sujeiras acumuladas, polimento de superfícies e desinfecção de áreas de uso coletivo.
                        </h5>
                    </div>
                    <div className={`p-2 pe-0 ps-4 ${styles.clampText} ${styles.prazoEstimadoDiv}`}>
                        <h5 className="lh-base">
                            <span className="fst-italic text-danger fw-bolder">Prazo estimado:</span> execução geralmente no mesmo dia da solicitação ou em até 24 horas, de acordo com o tamanho da área.
                        </h5>
                    </div>
                </div>
            </div>

            <div className={`col-12 d-flex flex-column justify-content-center align-items-center pt-2 ${styles.tituloServicosUmTablet}`}>
                <h3 className={`${styles.tituloServicosQuatro}`}>Explore alguns itens dessa categoria:</h3>
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
                    className={`p-5 pb-0 pt-0 ${styles.espacoServicoUmServicos} ${styles.carrosselQuatro}`}
                >
                    {categoriasLM.map((item, index) => (
                        <SwiperSlide key={index} className="d-flex justify-content-center">
                            <CardLM item={item} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}