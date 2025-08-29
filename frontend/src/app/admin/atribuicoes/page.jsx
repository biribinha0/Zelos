"use client"

import styles from "./atribuicoes.module.css";
import Link from "next/link";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { useState, useEffect, useRef } from "react";
import { CardAtribuicoes } from "@/components/admin";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from "axios";
import { API_URL } from "@/utils/api";
import { getToken } from "@/utils/auth";

export default function atribuicoes() {
    const [chamados, setChamados] = useState([]);
    const [loading, setLoading] = useState(false)
    const swiperRef = useRef(null);

    useEffect(() => {
        setLoading(true)
        const token = getToken()
        axios.get(`${API_URL}/admin/chamados/disponiveis`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setChamados(res.data))
            .catch((error) => setChamados(error))
            .finally(() => setLoading(false))
    }, [])
    return (
        <>

<div className="dc-outer d-flex container my-5 align-items-center">
                <i className="bi bi-check2-circle fs-2"></i>
                <div className="fs-4 fw-bold ms-2">Atribuir</div>
                <div className="fs-4 fw-bold ms-2 text-danger">chamado</div>
                <div className="fs-4 fw-bold ms-2">ao tecnico:</div>
                <div className="ms-auto">
                </div>
            </div>
            <div className={`container-fluid ${styles.atribuicoesAdm}`}>
                <div>
                    {loading && <h3>Carregando chamados...</h3>}
                    {chamados.length > 0 &&
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
                            {chamados?.map((chamado) => (
                                <SwiperSlide key={chamado.id} className="d-flex justify-content-center">
                                    <CardAtribuicoes chamado={chamado} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    }
                    {chamados.length === 0 && <h3>Nenhum chamado diponível</h3>}
                </div>
            </div>
        </>
    )
}