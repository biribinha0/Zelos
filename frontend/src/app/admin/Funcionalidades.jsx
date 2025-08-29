import styles from "./Funcionalidades.module.css";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useState, useEffect, useRef } from "react";
import CardFuncionalidade from "./CardFuncionalidade";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Funcionalidades() {

    const swiperRef = useRef(null);

    const funcoesAdm = [
        {
            imagemItem: '/img/funcaoAdmUm.png',
            descricao: 'Estatísticas',
            link: '#AdmEstatistica'
        },
        {
            imagemItem: '/img/funcaoAdmDois.png',
            descricao: 'Chamados',
            link: '/admin/chamados'
        },
        {
            imagemItem: '/img/funcaoAdmTres.png',
            descricao: 'Funcionários',
            link: '/admin/tecnicos'
        },
        {
            imagemItem: '/img/funcaoAdmSete.png',
            descricao: 'Usuários',
            link: '/admin/usuarios'
        },
        {
            imagemItem: '/img/funcaoAdmQuatro.png',
            descricao: 'Atribuições',
            link: '/admin/atribuicoes'
        },
        {
            imagemItem: '/img/funcaoAdmCinco.png',
            descricao: 'Relatórios',
            link: '/admin/relatorios'
        },
        {
            imagemItem: '/img/funcaoAdmSeis.png',
            descricao: 'Categorias',
            link: '/admin/pools'
        },
    ];

    return (
        <>
            <div className={`container-fluid ${styles.FuncoesAdm}`}>
                <div className="row">
                    <div className="col-12">
                        <h1 className={`${styles.tituloFuncoesAdm}`}>Ferramentas de administração:</h1>
                    </div>
                </div>
                <div>
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
                            450: { slidesPerView: 2 },
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 5 },
                            1085: { slidesPerView: 6 }
                        }}
                        className={`p-5 ${styles.carrosselAdm}`}
                    >
                        {funcoesAdm.map((item, index) => (
                            <SwiperSlide key={index} className="d-flex justify-content-center col-12 col-md-4 col-lg-4">
                                <CardFuncionalidade item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}