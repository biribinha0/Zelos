"use client";
import { useEffect, useState } from "react";
import { getDecodedToken, isAuthenticated, isExpired } from "@/utils/auth";
import "./globals.css";
import dynamic from "next/dynamic";

const SideBarTecnico = dynamic(() => import("@/components/sideBarTecnico/SideBarTecnico"), {
    ssr: false,
});

import AlertModal from "@/components/common/AlertModal";

export default function TecnicoLayout({ children }) {
    const [authChecked, setAuthChecked] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isExp, setIsExp] = useState(false);
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        setIsExp(isExpired());
        if (isExp) {
            setAuthChecked(true)
        }
        const auth = isAuthenticated();
        setIsAuth(auth);

        if (auth) {
            setDecoded(getDecodedToken());
        }

        setAuthChecked(true);


    }, []);


    if (!authChecked) {
        return (
            <div className="text-center my-5">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </div>
            </div>
        )
    }

    if (!isAuth) {
        return (
            <div className="bgModal">
                <AlertModal
                    titulo={"Aviso"}
                    descricao={"Você não está logado"}
                    textoBotao={"Fazer Login"}
                    linkBotao={"/login/profissional"}
                />
            </div>
        );
    }
    if (isExp) {
        return (
            <div className="bgModal">
                <AlertModal
                    titulo={"Aviso"}
                    descricao={"Seu Login Expirou"}
                    textoBotao={"Fazer Login Novamente"}
                    linkBotao={"/login/profissional"}
                />
            </div>
        )
    }
    if (decoded.funcao !== 'tecnico') {
        return (
            <div className="bgModal">
                <AlertModal
                    titulo={"Aviso"}
                    descricao={"Você não tem acesso à essa página"}
                    textoBotao={"Ir para Painel de Controle"}
                    linkBotao={`/${decoded.funcao}`}
                />
            </div>
        )
    }

    return (
        <div>
            <SideBarTecnico decoded={decoded} />
            <div className="ms-5">{children}</div>
        </div>
    );
}
