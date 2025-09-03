export default function DuvidasChamadosModal() {
  return (
    <div>
     
      <button
        type="button"
        style={{ all: "unset", cursor: "pointer" }}
        data-bs-toggle="modal"
        data-bs-target="#helpModal"
      >
        <i className="bi bi-question-circle text-muted" style={{ fontSize: 20 }}></i>
      </button>

      
      <div className="modal fade" id="helpModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content p-4 rounded-3 shadow-lg border-0">
            <div className="d-flex justify-content-between align-items-start border-bottom pb-3 mb-3">
              <div>
                <h4 className="fw-bold mb-1">
                  Saiba gerenciar <span className="text-danger">cada ação</span>
                </h4>
                <p className="text-muted small">
                  Entenda para que serve cada botão da tabela
                </p>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

           
            <div className="row">
              
              <div className="col-6 border-end">
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-eye-fill text-danger fs-4"></i>
                  <span className="ms-2">Página com todos os detalhes</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-person-fill-down fs-4 text-dark"></i>
                  <span className="ms-2">Atribui o chamado a um técnico.</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-pencil-square fs-4 text-dark"></i>
                  <span className="ms-2">Edita o chamado.</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-check-square-fill fs-4 text-dark"></i>
                  <span className="ms-2">Concluir chamado.</span>
                </div>
              </div>

              
              <div className="col-6">
                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-eye-fill text-secondary fs-4"></i>
                  <span className="ms-2">Chamado inativo ou concluído</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-person-fill-down text-secondary fs-4"></i>
                  <span className="ms-2">Funcionário já atribuído</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-pencil-square text-secondary fs-4"></i>
                  <span className="ms-2">Editar desativado ou concluído</span>
                </div>

                <div className="d-flex align-items-center mb-4">
                  <i className="bi bi-check-square-fill text-secondary fs-4"></i>
                  <span className="ms-2">Chamado já concluído</span>
                </div>
              </div>
            </div>

            
            <div className="text-end mt-3">
              <img
                src="/img/logoOficial.png"
                alt="Logo"
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
