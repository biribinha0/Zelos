"use client"
import { useRouter } from "next/navigation"
const router = useRouter()
export default function AlertModel(titulo, descricao, textoBotao, linkBotao) {
    return (
        <>
            {/* Button trigger modal */}
            <button
                type="button"
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
            >
                Launch static backdrop modal
            </button>
            {/* Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                {titulo}
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">{descricao}</div>
                        <div className="modal-footer">
                            <button onClick={() => router.push(linkBotao)} className="btn btn-primary">
                                {textoBotao}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}