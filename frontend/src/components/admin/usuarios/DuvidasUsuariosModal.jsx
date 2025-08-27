export default function DuvidasUsuariosModal() {
    return (
        <div>
            <button
                type="button"
                style={{all: 'unset', cursor: 'pointer'}}
                data-bs-toggle="modal"
                data-bs-target="#duvidasUsuariosModal"
            >
                <i className="bi bi-question-circle text-muted fs-5"></i>
            </button>

            <div className="modal fade" id="duvidasUsuariosModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-4 rounded-4 shadow-lg border-0">
                        <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                            <h4 className="fw-bold mb-0">Saiba gerenciar cada ação</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <ul className="list-unstyled">
                            <li className="mb-3">
                                <i className="bi bi-clipboard2-data me-2 text-secondary"></i>
                                Visualiza chamados atribuídos ao usuário.
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-eye me-2 text-secondary"></i>
                                Visualiza os dados detalhados do usuário.
                            </li>
                            <li className="mb-3">
                                <i className="bi bi-x-lg me-2 text-danger"></i>
                                Exclui o usuário permanentemente.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
