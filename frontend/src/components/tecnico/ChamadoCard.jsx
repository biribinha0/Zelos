import AtribuirModal from "./AtribuirModal";
import styles from "./ChamadoCard.module.css";

export default function ChamadoCard({ chamado }) {
    return (

        <div className={styles.cardsContainer}>
            <div className={`card ${styles.card}`}>
                <div className="card-body d-flex flex-column">
                    <h5 className={`card-title pt-1 ${styles.title} ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>
                        {chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}
                        {chamado?.titulo}
                    </h5>
                    <p className={`${styles.text} flex-grow-1`} dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
                    <div className="d-flex justify-content-end mt-auto">
                        <AtribuirModal chamado={chamado} modalId={`AtribuirModal${chamado.id}`} className={styles.button} />
                    </div>
                </div>
            </div>
        </div>


    )
}