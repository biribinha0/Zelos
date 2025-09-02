export default function DuvidasUsuariosModal() {
    return (
        <div>
            {/* Botão para abrir o modal */}
            <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target="#duvidasUsuariosModal"
            >
                <i className="bi bi-question-circle text-muted fs-5"></i>
            </button>

            {/* Modal */}
            <div
                className="modal fade"
                id="duvidasUsuariosModal"
                tabIndex="-1"
                aria-labelledby="duvidasUsuariosModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-4 rounded-4 shadow-lg border-0">
                        <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
                            <div>
                                <h4 className="fw-bold mb-1">Saiba gerenciar cada ação</h4>
                                <p className="text-muted small">
                                    Entenda como cada botão da tabela funciona
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Fechar"
                            ></button>
                        </div>

                        <p className="mb-4 text-secondary">
                            Se você tiver dúvidas sobre como funciona cada botão integrado na tabela, veja abaixo suas funcionalidades.
                        </p>

                        <div className="mt-2">
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-eye text-secondary fs-5"></i>
                                <span className="ms-3 fw-semibold">
                                    Permite a visualização dos dados detalhados do usuário.
                                </span>
                            </div>

                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-clipboard2-data text-secondary fs-5"></i>
                                <span className="ms-3 fw-semibold">
                                    Visualiza todos os chamados atribuídos ao usuário selecionado.
                                </span>
                            </div>

                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-person-x text-danger fs-5"></i>
                                <span className="ms-3 fw-semibold">
                                    Desativa o perfil do usuário temporariamente, com possibilidade de reativação.
                                </span>
                            </div>
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-person-check text-success fs-5"></i>
                                <span className="ms-3 fw-semibold">
                                    Ativa o perfil do usuário, concedendo acesso ao sistema.
                                </span>
                            </div>
                        </div>

                        <div className="text-end mt-3">
                            <img
                                src="/img/logoOficial.png"
                                width="90"
                                className="img-fluid opacity-75"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
