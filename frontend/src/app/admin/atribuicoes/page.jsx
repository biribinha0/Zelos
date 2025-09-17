"use client"

import styles from "./atribuicoes.module.css";
import "../adm.css"

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
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => setChamados(res.data))
            .catch((error) => setChamados(error))
            .finally(() => setLoading(false))
    }, [])

    return (
        <>

            <div className={`dc-outer d-flex container my-5 ${styles.tituloInicial}`}>
                <h4 className="fw-bold text-break">
                    <i className="bi bi-check2-circle mx-2 my-2"></i>
                    <span className="text-danger">
                        Atribuir <span className="text-dark">chamado a um técnico:</span>
                    </span>
                </h4>
            </div>

            <div className="text-secondary ms-5 ps-2 p-3">
                <i className="bi bi-lightbulb me-2"></i>
                Dica: Veja os detalhes do chamado antes de atribuir a um técnico.
            </div>

            <div className={`container-fluid ${styles.atribuicoesAdm}`}>
                <div className={styles.carrosselAdm}>
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
                            className={`p-5 d-flex ${styles.carrosselAtribuicoesAdm}`}

                            onSwiper={(swiper) => {
                                swiperRef.current = swiper;
                            }}
                            breakpoints={{
                                0: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                992: { slidesPerView: 3 },
                                1200: { slidesPerView: 4 }
                            }}

                        >
                            {chamados?.map((chamado) => (
                                <SwiperSlide key={chamado.id} className="d-flex justify-content-center">
                                    <CardAtribuicoes chamado={chamado} />
                                </SwiperSlide>

                            ))}
                        </Swiper>
                    }
                    {(chamados.length === 0 && !loading) && <h3>Nenhum chamado diponível</h3>}
                </div>
            </div>
        </>
    )
}