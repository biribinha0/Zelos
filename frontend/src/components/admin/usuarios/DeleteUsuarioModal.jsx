export default function DeleteUsuarioModal({ usuario }) {
    return (
        <div
            className="modal fade"
            id="deleteUsuarioModal"
            tabIndex="-1"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-4 rounded-4 shadow-lg border-0">
                    <h5 className="fw-bold">Confirma exclusão?</h5>
                    <p>
                        Deseja realmente excluir{" "}
                        <b>{usuario?.nome || "este usuário"}</b>?
                    </p>
                    <div className="d-flex justify-content-end gap-2">
                        <button className="btn btn-secondary" data-bs-dismiss="modal">
                            Cancelar
                        </button>
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                console.log("Excluir usuário:", usuario?.id);
                                // api delete
                            }}
                            data-bs-dismiss="modal"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
