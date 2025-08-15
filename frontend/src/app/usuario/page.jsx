"use client"
import styles from "./usuario.module.css";
import { getDecodedToken } from "@/utils/auth";
import Link from 'next/link';

export default function Usuario() {
    const decoded = getDecodedToken();
    return (
        <>
            <div className={`px-8 ${styles.tituloNome}`}>
                <h1 className={styles.nomeComeco}>Seja bem vindo(a),<span className={styles.nomeComeco1}> {decoded.givenName}!</span></h1>
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

            {/* lista dos chamados recentes  */}
            <div className={styles.listaChamados}>

                <div className={styles.chamado}>
                    <div className={styles.chamadoHeader}>
                        <span className={styles.local}>Laboratório de Informática</span>
                        <Link href="/detalhes/1">
                            <i className={`bi bi-tools ${styles.statusIcon} ${styles.andamento}`}></i>                        </Link>
                    </div>
                    <p className={styles.descricao}>
                        Computadores não estão ligando e alguns cabos estão danificados.
                    </p>
                </div>

                <div className={styles.chamado}>
                    <div className={styles.chamadoHeader}>
                        <span className={styles.local}>Quadra de Esportes</span>
                        <Link href="/detalhes/2">
                            <i className={`bi bi-tools ${styles.statusIcon} ${styles.andamento}`}></i>
                        </Link>
                    </div>
                    <p className={styles.descricao}>
                        Fiação da iluminação da quadra precisa ser trocada.
                    </p>
                </div>

                <div className={styles.chamado}>
                    <div className={styles.chamadoHeader}>
                        <span className={styles.local}>Biblioteca</span>
                        <Link href="/detalhes/3">
                            <i className={`bi bi-tools ${styles.statusIcon} ${styles.andamento}`}></i>                        </Link>
                    </div>
                    <p className={styles.descricao}>
                        Troca de lâmpadas queimadas e reparo de tomadas.
                    </p>
                </div>
            </div>


        </>
    )
}