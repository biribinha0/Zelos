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

            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-check2-circle mx-2 my-2"></i>
                    <span className="text-dark">
                        Atribuir <span className="text-danger">chamado</span> a um técnico:
                    </span>
                </h4>
            </div>

            <span className="text-secondary ms-5 ps-2">
                <i className="bi bi-lightbulb"></i>
                Dica: Veja os detalhes do chamado antes de atribuir a um técnico
            </span>

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
                                576: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                992: { slidesPerView: 4 }
                            }}
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