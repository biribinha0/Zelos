"use client"

import { getDecodedToken, isAuthenticated } from "@/utils/auth"
import Link from "next/link";

export default function ItemChamado(chamadoData) {
    const isAuth = isAuthenticated();
    let decoded = null;
    if (isAuth) {
        decoded = getDecodedToken();
    }

    const chamado = chamadoData.chamado
    return (
        <Link href={isAuth && decoded.funcao === 'usuario' ? '/usuario/criar' : '/login/usuario'} className="list-group-item-chamados list-group-item-action" style={{cursor: "pointer" }}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{chamado.titulo}</h5>
            </div>

            <p className="mb-1" dangerouslySetInnerHTML={{ __html: chamado.descricao }} />
            <small className="text-body-secondary">{chamado.tipo}</small>
            {chamado.pool}
        </Link>
    )
}