import AtribuirModal from "./AtribuirModal";
import styles from "./ChamadoCard.module.css";

export default function ChamadoCard({ chamado }) {
    return (
        <div className={`card ${styles.card}`}>
            <div className="card-body">
                <h5 className={styles.title}>{chamado.titulo}</h5>
                <p className={styles.text} dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
                <div className="d-flex justify-content-end">
                    <AtribuirModal chamado={chamado} modalId={`AtribuirModal${chamado.id}`} className={styles.button} />
                </div>
            </div>
        </div>

    )
}