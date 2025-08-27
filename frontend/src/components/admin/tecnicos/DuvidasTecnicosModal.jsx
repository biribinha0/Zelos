export default function DuvidasTecnicosModal() {
  return (
    <div
      className="modal fade"
      id="helpModal"
      tabIndex="-1"
      aria-labelledby="helpModalLabel"
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
              aria-label="Close"
            ></button>
          </div>
          <p className="mb-4 text-secondary">
            Se você tiver dúvidas de como funciona cada botão integrado na
            tabela, veja abaixo suas funcionalidades.
          </p>
          <div className="mt-2">
            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
             <i className="bi bi-clipboard2-data text-secondary"></i>
              <span className="ms-3 fw-semibold">
                Visualiza os chamados atribuídos ao registro selecionado.
              </span>
            </div>

            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
              <i className="bi bi-eye text-secondary"></i>
              <span className="ms-3 fw-semibold">
                Permite a visualização dos dados relacionados ao registro.
              </span>
            </div>

            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
              <i className="bi bi-x-lg text-danger" ></i>
              <span className="ms-3 fw-semibold">
                Remove o registro da tabela, garantindo informações atualizadas.
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
  );
}