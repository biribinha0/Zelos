"use client";

import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import CardDepoimentos from "./CardDepoimentos";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styles from "./Depoimentos.module.css";

export default function Depoimentos() {
    const swiperRef = useRef(null);

    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}/publico/feedbacks`)
        .then((res) => {
            console.log(res.data);
            setFeedbacks(res.data || []);
        }).catch((err) => {
            console.error("Erro ao buscar feedbacks:", err);
        });
    }, []);

    return (
        <div className={`${styles.principaisDiv}`}>
            <div className="col-12 d-flex flex-column justify-content-center align-items-center p-5 pb-0">
                <img src="/img/feedbacksImg.png" className={`img-fluid ${styles.equipeZelosImg}`} alt="..." />
                <h1 className={`${styles.tituloProfissionaisHome}`}>que reafirmam nosso propósito</h1>
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
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 }
                    }}
                    className={`p-5 pb-0 ${styles.espacoProfissionaisHome}`}
                >
                    {feedbacks.length === 0 ? (
                        <h5>Nenhuma mensagem de feedback encontrada</h5>
                    ) : (
                        feedbacks.map((f, index) => (
                            <SwiperSlide key={index} className="d-flex justify-content-center">
                                <CardDepoimentos item={f} />
                            </SwiperSlide>
                        ))
                    )}
                </Swiper>
            </div>
        </div>
    );
}
