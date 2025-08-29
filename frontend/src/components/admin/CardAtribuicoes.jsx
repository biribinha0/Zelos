import styles from "./CardAtribuicoes.module.css";

export default function CardAtribuicoes({ chamado }) {
    return (
        <div
            className="card rounded-2 border-0 p-3"
            style={{ width: "100%", maxWidth: "700px", height: "19rem", background: "rgba(220, 220, 220, 1)", justifyContent: "center"}} // Aumentando a largura máxima
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <p
                    className="fw-bold mb-0"
                    style={{ color: "#b42727bd" }}
                >
                    {chamado?.titulo}
                </p>
                <img
                    src={chamado?.icon}
                    width={42}
                    height={42}
                    className="img-fluid"
                />
            </div>

            <div className="text-start mb-2">
                <p className="fw-bold mb-0" style={{ fontSize: "0.85rem" }}>Nome do usuário</p>
                <p className="text-muted text-secondary fw-bold small">
                    {chamado?.usuario?.nome}
                </p>
            </div>

            <div className="text-start mb-3">
                <label className="form-label fw-bold mb-1" style={{ fontSize: "0.85rem" }}>
                    Selecione um técnico:
                </label>
                <select
                    className="form-select form-select-sm fw-bold py-2"
                    style={{
                        backgroundColor: "#a0a0a057",
                        color: "gray",
                    }}
                >
                    <option value="">Clique aqui</option>
                    <option value="1">Técnico 1</option>
                    <option value="2">Técnico 2</option>
                    <option value="3">Técnico 3</option>
                </select>
            </div>

            <div className="d-grid gap-2">
                <button
                    className="btn fw-bold text-white py-2"
                    style={{
                        background: "linear-gradient(90deg, #9b2929ff, #ff0000)",
                    }}
                >
                    Atribuir <i className="bi bi-send-fill ms-1"></i>
                </button>
            </div>
        </div>
    );
}
