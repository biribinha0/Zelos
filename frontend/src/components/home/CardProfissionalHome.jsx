import styles from "./CardProfissionais.module.css";

export default function CardProfissional ({item}) {
    return (
        <>

            <div className={`card ${styles.cardProfissionalHome}`} style={{ width: "18rem" }}>
                {/* {JSON.stringify(item?.imagemProfissional)}   */}
                <img src={item?.imagemProfissional} className="img-fluid card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"><img src={item?.imagemNome} className="img-fluid card-img-top" alt="..." /></h5>
                    <p className="card-text text-center">
                       Área: {item?.descricao}
                    </p>
                    {/* <a href="#" className="btn btn-primary">
                        oiii escreva aqui
                    </a> */}
                </div>
            </div>
        </>
    )
}