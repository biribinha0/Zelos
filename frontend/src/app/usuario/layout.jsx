'use client'
import { getDecodedToken, isAuthenticated } from "@/utils/auth";
import dynamic from 'next/dynamic';

const SideBarUsuario = dynamic(() => import("@/components/sideBarUsuario/SideBarUsuario"), {
    ssr: false
});

import AlertModal from "@/components/common/AlertModal";

export default function UserLayout({ children }) {
    const isAuth = isAuthenticated()
    if (!isAuth) {
        return (
            <div className={'bgModal'}>
                < AlertModal titulo={"Aviso"} descricao={"Você não está logado"} textoBotao={'Fazer Login'} linkBotao={'/login/usuario'} />
            </div>
        )
    }

    const decoded = getDecodedToken();
    return (
        <div>
            <SideBarUsuario decoded={decoded} />
            <div className="ms-5">
                {children}
            </div>
        </div>

    );
}
