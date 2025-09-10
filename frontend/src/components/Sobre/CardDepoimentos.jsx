import styles from "./CardDepoimentos.module.css";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function CardDepoimentos({ item }) {
    return (
        <div key={item?.id} className="d-flex">
            <div className="card rounded-3 shadow-sm p-3 bg-white d-flex flex-column">
                <div className="d-flex align-items-center mb-2">
                    <div
                        className="rounded-circle bg-light d-flex align-items-center justify-content-center"
                        style={{ width: "50px", height: "50px" }}
                    >
                        <i className="bi bi-person fs-3 text-secondary"></i>
                    </div>
                    <div className="ms-2">
                        <p className="m-0 text-uppercase small text-muted fw-bold">
                            {item?.titulo}
                        </p>
                        <h6 className="m-0 fw-bold text-danger">{item?.nome}</h6>
                        <p className="m-0 text-dark fw-semibold small">{item?.email}</p>
                    </div>
                </div>

                {/* Mensagem cresce para alinhar data no fim */}
                <p className="text-muted small mb-3 flex-grow-1">{item?.mensagem}</p>

                <p className="d-flex align-items-center gap-2 m-0 mt-auto small fw-bold text-dark">
                    <i className="bi bi-calendar text-danger"></i>
                    {item?.criado_em && format(new Date(item.criado_em), "dd/MM/yyyy", { locale: ptBR })}
                </p>
            </div>
        </div>
    );
}
