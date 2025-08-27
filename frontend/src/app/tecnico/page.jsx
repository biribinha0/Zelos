'use client'

import styles from "./tecnico.module.css";
import Link from "next/link";

export default function Tecnico() {
    return (
        <>
            {/* banner 1 */}
            <div className={`position-relative ${styles.bannerTecnico}`}>
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/bannerTecnico.png"
                    className={`img-fluid px-20 d-none d-md-block ${styles.bannerTecnicoDesk}`}
                    alt="BannerDesktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/bannerTecnicoMobile.png"
                    className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerTecnicoMobile}`}
                    alt="Banner Mobile"
                />
            </div>

            {/* banner 2 */}
            <div className={`position-relative ${styles.banner2Tecnico}`}>
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/banner2Tecnico.png"
                    className={`img-fluid px-20 d-none d-md-block ${styles.banner2TecnicoDesktop}`}
                    alt="Banner Desktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/banner2TecnicoMobile.png"
                    className={`img-fluid d-block d-md-none w-100 px-20 ${styles.banner2TecnicoMobile}`}
                    alt="Banner Mobile"
                />
            </div>


            {/* título para mostrar os status dos chamados */}
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i class="bi bi-card-checklist mx-2 my-2"></i>
                    <span className="text-danger">
                        Status <span className="text-dark">dos chamados:</span>
                    </span>
                </h4>
            </div>


            <div className="container mx-auto my-5 d-flex flex-wrap gap-5 justify-content-center">
                <img src="/img/imgChamadosTecnicos.png" className={`img-fluid ${styles.iconeChamados}`} alt="" />
                <img src="/img/imgAndamentoTecnicos.png" className={`img-fluid ${styles.iconeChamados}`} alt="" />
                <img src="/img/imgConcluidoTecnicos.png" className={`img-fluid ${styles.iconeChamados}`} alt="" />
                <img src="/img/imgNaoIniciadoTecnicos.png" className={`img-fluid ${styles.iconeChamados}`} alt="" />
            </div>


        </>
    )
}