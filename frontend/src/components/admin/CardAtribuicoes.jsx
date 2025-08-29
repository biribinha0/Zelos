import styles from "./CardAtribuicoes.module.css";

export default function CardAtribuicoes({ chamado }) {
    return (
        <>
            <div className="card" style={{ width: "40rem" }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-7">
                            <h6 className="card-text">
                                {chamado?.titulo}
                            </h6>
                            <p className="card-text">
                                {chamado?.usuario?.nome}
                            </p>
                        </div>
                        <div className="col">
                            <img src={chamado?.icon} className="card-img-top" alt="..." />
                        </div>
                    </div>
                    {JSON.stringify(chamado.tecnicos)}
                    <div className="row">
                        <div className="col">
                            <label className="fw-bold">Selecione um técnico:</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <select className="card-select">
                                <option>Clique aqui</option>
                                <option>Técnico 1</option>
                                <option>Técnico 2</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="assign-btn">Atribuir</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}