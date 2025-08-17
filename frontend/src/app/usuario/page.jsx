'use client'
import styles from "./usuario.module.css";
import { getDecodedToken } from "@/utils/auth";
import Link from 'next/link';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/api";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Usuario() {
    const [decoded, setDecoded] = useState(null);
    const [loading, setLoading] = useState(false);
    const [chamados, setChamados] = useState([]);

    useEffect(() => {
        setDecoded(getDecodedToken());
    }, [])

    useEffect(() => {
        if (!decoded) return;

        setLoading(true);
        axios.get(`${API_URL}/usuario/${decoded.id}/chamados`)
            .then((response) => {
                setChamados(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => setLoading(false));
    }, [decoded]);

    
    const chamadosOrdenados = chamados.sort((a, b) => {
        return new Date(b.criado_em) - new Date(a.criado_em);
    });

    return (
        <>
            <div className={`px-8 ${styles.tituloNome}`}>
                <h1 className={styles.nomeComeco}>
                    Seja bem vindo(a),{' '}
                    <span className={styles.nomeComeco1}>
                        {decoded?.nome || 'Usuário'}!
                    </span>
                </h1>

            </div>


            <div className={styles.bannerUsuario}>
                <img src="/img/imgBannerUsuario.png" className={`img-fluid px-10 ${styles.bannerRelate}`} alt="" />
            </div>

            <div>
                <h2 className="text-center">
                    <i className="bi bi-card-checklist"></i> Confira seus{' '}
                    <span className={styles.textoVermelho}>últimos</span> chamados:
                </h2>
            </div>


            {chamadosOrdenados.length > 0 ? (
                <div className={styles.listaChamados}>
                    {chamadosOrdenados.slice(0, 3).map((chamado) => (
                        <Link key={chamado.id} href={`/usuario/chamados/${chamado.id}`}>
                            <div className={styles.chamado}>
                                <div className={styles.chamadoHeader}>
                                    <span className={styles.local}>{chamado.titulo}</span>

                                    <i className={`bi bi-tools ${styles.statusIcon} ${styles.andamento}`}></i>
                                </div>
                                <p className={styles.descricao}>
                                    {chamado.descricao}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                    </div>
                ) :
                    <h3 colSpan="4" className="text-center">Nenhum chamado encontrado</h3>
            )}
        </>
    )
}