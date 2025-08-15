'use client'
import { removeToken } from '@/utils/auth';
import Link from 'next/link';
import './styleSideBarUsuario.css';
import { useRouter } from 'next/navigation';

export default function SideBarUsuario({ decoded }) {
    const router = useRouter();
    const handleLogout = () => {
        removeToken();
        router.push('/');
    }
    return (
        <>
            <aside className="sidebar bg-dark text-light d-flex flex-column align-items-stretch">

                {/* LOGO (crossfade 1->2 no hover) */}
                <div className="logo-container">
                    <div className="logo-swap">
                        {/* imagem 1 (fechado) */}
                        <img src="/img/logoSimples.png" alt="Logo" className="logo-img img-1" />
                        {/* imagem 2 (expandido) */}
                        <img src="/img/logoComprida.png" alt="Logo expandida" className="logo-img img-2" />
                    </div>
                </div>

                {/* MENU */}
                <ul className="nav flex-column flex-grow-1 w-100 px-2 gap-1" id="icones">
                    <li className="nav-item">
                        <Link className="nav-link sidebar-link text-light" href="/usuario">
                            <i className="bi bi-house-door sidebar-icon"></i>
                            <span className="link-text">Home</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link sidebar-link text-light" href={'/usuario/criar'}>
                            <i className="bi bi-plus-circle sidebar-icon"></i>
                            <span className="link-text">Criar Chamado</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link sidebar-link text-light" href={'/usuario/chamados'}>
                            <i className="bi bi-card-list sidebar-icon"></i>
                            <span className="link-text">Meus Chamados</span>
                        </Link>
                    </li>
                </ul>

                {/* SAIR */}
                <div className="px-2">
                    <a className="nav-link sidebar-link text-light" role='button' onClick={handleLogout}>
                        <i className="bi bi-box-arrow-left sidebar-icon"></i>
                        <span className="link-text">Sair</span>
                    </a>
                </div>

                {/* USUÁRIO */}
                <div className="user-block border-top border-secondary d-flex align-items-center px-2 py-3">
                    <i className="bi bi-person-circle sidebar-icon justify-content-center"></i>
                    <div className="link-text">
                        <strong className="nomeUsuario">{decoded.displayName}</strong>
                        <div className="small opacity-75 emailUsuario">{decoded.email}</div>
                    </div>
                </div>
            </aside>
        </>
    )
}