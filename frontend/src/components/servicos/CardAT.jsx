import styles from "./CardAT.module.css";

export default function CardAT({item}) {
    return (
        <>
            <div className={`card text-center ${styles.cardCategoriasServicos}`}>
                <div className={`card-body py-4 ${styles.paddingZero}`}>
                    <img src={item?.imagemItem} className={`img-fluid pb-3`} alt="..." />
                    <h6 className={`card-text fst-italic fw-bolder ${styles.textClamp}`}>
                        {item?.descricao}
                    </h6>
                </div>
            </div>
        </>
    )
}