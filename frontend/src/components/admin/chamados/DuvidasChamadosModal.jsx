export default function DuvidasChamadosModal() {

    return (
        <div>
            {/* Botão para abrir o modal */}
            <button
                type="button"
                style={{ all: 'unset', cursor: 'pointer' }}
                data-bs-toggle="modal"
                data-bs-target="#helpModal"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-question-circle text-muted cursor-pointer"
                    viewBox="0 0 16 16"
                >
                    <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16" />
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.074m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.533-.42-.927-1.029-.927-.584 0-1.009.394-1.009.927" />
                </svg>

            </button>

            {/* Modal */}
            <div className="modal fade" id="helpModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content p-4 rounded-4 shadow-lg border-0">

                        {/* Cabeçalho */}
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
                                aria-label="Close">
                            </button>
                        </div>

                        {/* Corpo */}
                        <p className="mb-4 text-secondary">
                            Se você tiver dúvidas de como funciona cada botão integrado na tabela, veja abaixo suas funcionalidades.
                        </p>

                        <div className="mt-2">
                            {/* Item 1 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-eye-fill"></i>
                                <span className="ms-3 fw-semibold">Redireciona para uma página com todos os detalhes do chamado.</span>
                            </div>
                            {/* Item 2 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-tools text-danger"></i>
                                <span className="ms-3 fw-semibold">Atribui o chamado a um técnico.</span>
                            </div>

                            {/* Item 3 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <span className="ms-3 fw-semibold">Edita o chamado desejado.</span>
                            </div>

                            {/* Item 4 */}
                            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
                                <i className="bi bi-check-square-fill text-success"></i>
                                <span className="ms-3 fw-semibold">Marca o chamado como concluído, quando tem uma resolução.</span>
                            </div>
                        </div>

                        {/* Rodapé */}
                        <div className="text-end mt-3">
                            <img src="/img/logoOficial.png" alt="Logo" width="90" className="img-fluid opacity-75" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}