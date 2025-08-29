import AtribuirModal from "./AtribuirModal";
import styles from "./ChamadoCard.module.css";

export default function ChamadoCard({ chamado }) {
    return (
        <div className={`card ${styles.card}`}>
            <div className="card-body">
                <h5 className={styles.title}>{chamado.titulo}</h5>
                <p className={styles.text}>{chamado.descricao}</p>
                <div className="d-flex justify-content-end">
                    <AtribuirModal chamado={chamado} className={styles.button} />
                </div>
            </div>
        </div>

    )
}