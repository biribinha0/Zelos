import AtribuirModal from "./AtribuirModal";

export default function ChamadoCard({ chamado }) {
    return (
        <div className="card" style={{ width: "100%" }}>
            <div className="card-body">
                <h5 className="card-title">{chamado.titulo}</h5>
                <p className="card-text">
                    {chamado.descricao}
                </p>
                <AtribuirModal chamado={chamado} />
            </div>
        </div>

    )
}