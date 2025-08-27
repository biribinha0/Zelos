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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-clipboard2-data"
                viewBox="0 0 16 16"
              >
                <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
                <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                <path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1" />
              </svg>
              <span className="ms-3 fw-semibold">
                Visualiza os chamados atribuídos ao registro selecionado.
              </span>
            </div>

            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="grey"
                className="bi bi-eye"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
              <span className="ms-3 fw-semibold">
                Permite a visualização dos dados relacionados ao registro.
              </span>
            </div>

            <div className="d-flex align-items-center mb-4 p-3 bg-light rounded-3 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="red"
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
              <span className="ms-3 fw-semibold">
                Remove o registro da tabela, garantindo informações atualizadas.
              </span>
            </div>
          </div>

          <div className="text-end mt-3">
            <img
              src="./img/help.png"
              alt="Logo"
              width="90"
              className="img-fluid opacity-75"
            />
          </div>
        </div>
      </div>
    </div>
  );
}