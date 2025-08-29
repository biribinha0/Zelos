import { PoolList } from "@/components/tecnico";
import styles from "./pool.module.css"

export default function PoolTecnico() {
    return (
        <>

            {/* título para mostrar os chamados disponíveis */}
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-megaphone-fill me-2"></i>
                    <span className="text-dark">
                        Chamados <span className="text-danger">disponíveis </span>para atendimento:
                    </span>
                </h4>
            </div>

            <div className="container">
                <PoolList />
            </div>
            
        </>
    )
}