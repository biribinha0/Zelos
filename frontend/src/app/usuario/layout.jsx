'use client'
import SideBarUsuario from "@/components/sideBarUsuario/SideBarUsuario";
import { getDecodedToken } from "@/utils/auth";
// import  AlertModal  from "@/components/common/AlertModal";

export default function UserLayout({ children }) {
    // const isAuth = isAuthenticated()
    // if (!isAuth) {
    //     return (
    //         < AlertModal titulo={"Erro"} descricao={"Você não está logado"} textoBotao={'sair'} linkBotao={'/login/usuario'} />
    //     )
    // }

    const decoded = getDecodedToken();
    return (
        <div>
            <SideBarUsuario decoded={decoded} />
            <div className="m-3">
                {children}
            </div>
        </div>

    );
}
