import styles from "./CategoriasServicos.module.css";

export default function CategoriasServicos() {
    return (
        <>
            <div className="container-fluid m-0 p-0">
                <div className={`row ${styles.categoriasBg}`}>
                    <div className={`col-sm-8 col-md-6 justify-content-center align-itens-center p-5 ${styles.alinhamento}`}>

                        <div className={`pb-0 mb-0 gap-5 pt-4 ${styles.categoriasUm}`}>
                            <a href="#ServicosUm">
                                <div className={`card ${styles.cardCategoriasServicos}`}>
                                    <img src="/img/categoriaUm.png" className={`img-fluid ${styles.cardCategoriasServicosImg}`} alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title">Reparo físico</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#ServicosDois">
                                <div className={`card ${styles.cardCategoriasServicos}`}>
                                    <img src="/img/categoriaDois.png" className={`img-fluid ${styles.cardCategoriasServicosImg}`} alt="..." />
                                    <div className="card-body">
                                        <h6 className="card-title">Apoio técnico</h6>
                                    </div>
                                </div>
                            </a>
                        </div>

                        <div className={`pt-0 mt-0 gap-5 ${styles.categoriasDois}`}>
                            <a href="#ServicosTres">
                                <div className={`card ${styles.cardCategoriasServicos}`}>
                                    <img src="/img/categoriaTres.png" className={`img-fluid ${styles.cardCategoriasServicosImg}`} alt="..." />
                                    <div className="card-body pb-0">
                                        <h6 className="card-title">Externos</h6>
                                    </div>
                                </div>
                            </a>
                            <a href="#ServicosQuatro">
                                <div className={`card ${styles.cardCategoriasServicos}`}>
                                    <img src="/img/categoriaQuatro.png" className={`img-fluid ${styles.cardCategoriasServicosImg}`} alt="..." />
                                    <div className="card-body pb-0">
                                        <h6 className="card-title">Limpeza</h6>
                                    </div>
                                </div>
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}