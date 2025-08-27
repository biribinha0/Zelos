"use client"

import styles from "./atribuicoes.module.css";
import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useState, useEffect, useRef } from "react";
import { CardAtribuicoes } from "@/components/admin";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function atribuicoes() {

    const swiperRef = useRef(null);

    const feedbacks = [
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaDois.png',
        },
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaUm.png',
        },
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaTres.png',
        },
        {
            title: 'Faxina',
            user: 'Nome do usuário',
            icon: '/img/categoriaQuatro.png',
        },
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaDois.png',
        },
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaUm.png',
        },
        {
            title: 'Manutenção',
            user: 'Nome do usuário',
            icon: '/img/categoriaTres.png',
        },
        {
            title: 'Faxina',
            user: 'Nome do usuário',
            icon: '/img/categoriaQuatro.png',
        }];

    return (
        <>
            <div className={`container-fluid ${styles.atribuicoesAdm}`}>
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
                            576: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                        }}
                        className={`p-5 ${styles.carrosselAtribuicoesAdm}`}
                    >
                        {feedbacks.map((item, index) => (
                            <SwiperSlide key={index} className="d-flex justify-content-center">
                                <CardAtribuicoes item={item} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}