export default function ItemChamado(chamadoData) {
    const chamado = chamadoData.chamado
    return (
        <a className="list-group-item-chamados list-group-item-action">
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{chamado.titulo}</h5>
            </div>

            <p className="mb-1" dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
            <small className="text-body-secondary">{chamado.tipo}</small>
            {chamado.pool}
        </a>
    )
}