import Link from "next/link";
import AtribuirModal from "./AtribuirModal";
import styles from "./ChamadoCard.module.css";

export default function ChamadoCard({ chamado }) {
    return (

        <div className={`${styles.cardsContainer} w-100`}>
            <div className={`card ${styles.card} w-100`}>
                <div className="card-body d-flex flex-column">
                    <h5 className={`card-title pt-1 ${styles.title} ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>
                        {chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}
                        {chamado?.titulo}
                    </h5>
                    <p className={`${styles.text} flex-grow-1`} dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
                    <div className="d-flex flex-column align-items-end mt-auto">
                        <AtribuirModal
                            chamado={chamado}
                            modalId={`AtribuirModal${chamado.id}`}
                            className="btn btn-danger"
                        />
                        <Link
                            href={`/tecnico/chamados/${chamado.id}`}
                            className="text-danger small mt-2 text-decoration-underline"
                        >
                            Detalhes
                        </Link>
                    </div>

                </div>
            </div>
        </div>


    )
}