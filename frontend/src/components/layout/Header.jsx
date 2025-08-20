'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./header.module.css";
import { getDecodedToken, getToken, isAuthenticated, removeToken } from "@/utils/auth";
import { useState, useEffect } from "react";

export default function Header() {
    const router = useRouter()
    const pathName = usePathname();

    const itensNav = [
        { href: '/', label: 'Home' },
        { href: '/sobre', label: 'Sobre nós' },
        { href: '/servicos', label: 'Serviços' },
        { href: '/chamados', label: 'Chamados' },
        { href: '/contato', label: 'Contato' }
    ];

    // {
    //     itensNav.map((item) => (
    //         <li className={`nav-item fst-italic ${styles.itens}`} key={item.href}>
    //             <Link
    //                 className={`nav-link ${pathName === item.href ? styles.ativo : ''}`}
    //                 aria-current="page"
    //                 href={item.href}
    //             >
    //                 {item.label}
    //             </Link>
    //         </li>
    //     ))
    // }

    const [isAuth, setIsAuth] = useState(false);
    const [decoded, setDecoded] = useState(null);

    useEffect(() => {
        const checkAuth = () => {
            setIsAuth(isAuthenticated());
            setDecoded(getDecodedToken());
        };

        // Chama já na primeira renderização
        checkAuth();

        // Escuta mudanças no localStorage (inclusive de outros tabs)
        window.addEventListener("storage", checkAuth);

        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, []);


    const handleLogout = () => {
        removeToken();
        router.push('/')
    }
    return (
        <nav className={`navbar navbar-expand-lg ${styles.Header}`}>
            <div className={`container-fluid ${styles.espacamentoNav}`}>
                <div className="row">
                    <div className="col-md-2 d-flex align-items-center">
                        <Link className="navbar-brand d-flex align-items-center justify-content-end m-0" href={'/'}>
                            <img
                                className={`img-fluid w-75 ${styles.logo}`}
                                src="/img/logoBranco.png"
                                alt="logo"
                            />
                        </Link>
                    </div>
                    <div className="col-md-10 d-flex justify-content-end align-items-center">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNavDropdown"
                            aria-controls="navbarNavDropdown"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarNavDropdown">

                            <ul className="navbar-nav column-gap-4 me-auto d-flex flex-wrap justify-content-center align-items-center">
                                {itensNav.map((item) => (
                                    <li className={`nav-item fst-italic ${styles.itens}`} key={item.href}>
                                        <Link
                                            className={`nav-link ${pathName === item.href ? styles.ativo : ''}`}
                                            aria-current="page"
                                            href={item.href}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            {!isAuth ?
                                (
                                    <div className={`d-flex px-4 ${styles.iconsHeader}`}>
                                        <Link href={'/login/profissional'} className={`m-3 ${styles.iconTecnicoNav}`}>
                                            <i className={`bi bi-person-fill-gear ${styles.iconNav}`}></i>
                                            <p className={`${styles.noMargin} ${styles.pLoginNav}`}>Profissionais</p>
                                        </Link>
                                        <Link href={'/login/usuario'} className={`m-3 ${styles.iconUsuarioNav}`}>
                                            <i className={`bi bi-person-fill ${styles.iconNav}`}></i>
                                            <p className={`${styles.noMargin} ${styles.pLoginNav}`}>Usuário</p>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="dropdown">
                                        <button
                                            className="btn btn-outline-light dropdown-toggle"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="bi bi-person-circle"></i> {decoded?.nome}
                                        </button>
                                        <ul className="dropdown-menu shadow">
                                            <li>
                                                <Link className="dropdown-item" href={`/${decoded?.funcao}`}>
                                                    Painel de Controle
                                                </Link>
                                            </li>
                                            <li>
                                                <button className="dropdown-item" onClick={handleLogout}>
                                                    <i className="bi bi-box-arrow-left"></i> Sair
                                                </button>
                                            </li>
                                        </ul>
                                    </div>

                                )
                            }

                            <a className="d-flex align-items-center justify-content-center text-decoration-none flex-column"
                                href="#"
                                role="button">

                                <button className={`${styles.botaoChamadoNav}`}>
                                    Solicite um <span className="text-decoration-underline text-center">chamado de manutenção</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}