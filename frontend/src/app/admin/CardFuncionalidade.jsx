import styles from "./CardFuncionalidade.module.css";
import Link from "next/link";

export default function CardFuncionalidade({ item }) {
    return (
        <>
            <Link href={item?.link}>
                <div className={`card text-center ${styles.cardFuncionalidadesAdm}`}>
                    <div className={`card-body py-4 ${styles.paddingZero}`}>
                        <img src={item?.imagemItem} className={`img-fluid pb-3`} alt="..." />
                        <h6 className={`card-text fst-italic fw-bolder ${styles.textClamp}`}>
                            {item?.descricao}
                        </h6>
                    </div>
                </div>
            </Link>
        </>
    )
}