export default function CardProfissional () {
    return (
        <>
            <div className="card" style={{ width: "18rem" }}>
                <img src="./img/profissionalUm.png" className="img-fluid card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title"><img src="./img/nomeProfissionalUm.png" className="img-fluid card-img-top" alt="..." /></h5>
                    <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of
                        the card’s content.
                    </p>
                    {/* <a href="#" className="btn btn-primary">
                        Go somewhere
                    </a> */}
                </div>
            </div>
        </>
    )
}