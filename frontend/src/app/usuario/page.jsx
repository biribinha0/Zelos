'use client'
import styles from "./usuario.module.css";
import { getDecodedToken, getToken } from "@/utils/auth";
import Link from 'next/link';
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "@/utils/api";

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

        const token = getToken();
        axios.get(`${API_URL}/usuario/${decoded.id}/chamados`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
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
            {/* nome do usuário e boas vindas */}
            <div className={`px-8 ${styles.tituloNome}`}>
                <h1 className={styles.nomeComeco}>
                    Seja bem vindo(a),{' '}
                    <span className={styles.nomeComeco1}>
                        {decoded?.nome || 'Usuário'}!
                    </span>
                </h1>
            </div>

            {/* banner */}
            <div className={`position-relative ${styles.bannerUsuario}`}>
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/imgBannerUsuario.png"
                    className={`img-fluid px-20 d-none d-md-block ${styles.bannerRelate}`}
                    alt="Banner Desktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/imgBannerUsuarioMobile.png"
                    className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerUsuarioMobile}`}
                    alt="Banner Mobile"
                />
            </div>

            {/* título últimos chamados */}
            <div className={styles.ultimosChamados}>
                <h2 className="text-center">
                    <i className="bi bi-card-checklist"></i> Confira seus{' '}
                    <span className={styles.textoVermelho}>últimos</span> chamados:
                </h2>
            </div>

            {/* últimos chamados */}
            {chamadosOrdenados.length > 0 ? (
                <div className={styles.listaChamados}>
                    {chamadosOrdenados.slice(0, 3).map((chamado) => (
                        <Link key={chamado.id} href={`/usuario/chamados/${chamado.id}`}>
                            <div className={styles.chamado}>
                                <div className={styles.chamadoHeader}>
                                    <span className={styles.local}>{chamado.titulo}</span>

                                    <i className={`bi bi-tools ${styles.statusIcon} ${styles.andamento} ${styles.iconRed}`}></i>
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

            {/* formulário "nos ajude a melhorar!" */}
            <div className={styles.page}>
                <div className={styles.container}>
                    {/* Lado esquerdo (imagem pronta) */}
                    <div className={styles.left}>
                        <img src="/img/imgFormularioUsuario.png" className={`img-fluid ${styles.leftImg}`} alt="" />
                    </div>

                    {/* Lado direito (formulário) */}
                    <div className={styles.right}>
                        <h2 className={styles.title}>
                            Dê o seu <span className={styles.feedbackHighlight}>feedback</span>
                        </h2>
                        <p className={styles.subtitle}>
                            diga como está sendo o nosso serviço!
                        </p>

                        <form className={styles.form}>
                            <label>Nome:</label>
                            <input type="text" placeholder="Digite seu nome" />

                            <label>Email:</label>
                            <input type="email" placeholder="Digite seu email" />

                            <label>Mensagem:</label>
                            <textarea placeholder="Digite a mensagem"></textarea>

                            <button type="submit">ENVIAR</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}