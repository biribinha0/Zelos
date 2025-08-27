import styles from "./Funcionalidades.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Funcionalidades() {
    return (
        <>
            <div className={`container-fluid ${styles.categoriasHome}`}>
                <div className="row">
                    <div className="col-12 divTituloCategoriasHome">
                        <h1 className={`${styles.tituloCategoriasHome}`}>Qual manutenção você precisa hoje?</h1>
                    </div>
                </div>
                <div className={`row d-flex ${styles.itensCategoriasHome}`}>
                    <div className="col-sm-4 col-md-2">
                        <div className={`card ${styles.cardCategoriasHome}`}>
                            <img src="/img/equipamentoUm.png" className={`img-fluid ${styles.cardCategoriasHome}`} alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Rede</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <div className={`card ${styles.cardCategoriasHome}`}>
                            <img src="/img/equipamentoDois.png" className={`img-fluid ${styles.cardCategoriasHome}`} alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Eletrônicos</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <div className={`card ${styles.cardCategoriasHome}`}>
                            <img src="/img/equipamentoTres.png" className={`img-fluid ${styles.cardCategoriasHome}`} alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Máquinas</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <div className={`card ${styles.cardCategoriasHome}`}>
                            <img src="/img/equipamentoQuatro.png" className={`img-fluid ${styles.cardCategoriasHome}`} alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Equipamentos</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-2">
                        <div className={`card ${styles.cardCategoriasHome}`}>
                            <img src="/img/equipamentoCinco.png" className={`img-fluid ${styles.cardCategoriasHome}`} alt="..." />
                            <div className="card-body">
                                <h4 className="card-title">Elétrica</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}