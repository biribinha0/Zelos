import styles from "./CardAtribuicoes.module.css";

export default function CardAtribuicoes({ item }) {
    return (
        <>
            <div className="card" style={{ width: "40rem" }}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-7">
                            <h6 className="card-text">
                                {item?.title}
                            </h6>
                            <p className="card-text">
                                {item?.user}
                            </p>
                        </div>
                        <div className="col">
                            <img src={item?.icon} className="card-img-top" alt="..." />
                        </div>
                    </div>
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