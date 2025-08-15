'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./header.module.css";

export default function Header() {
    const pathName = usePathname();

    const itensNav = [
        { href: '/', label: 'Home' },
        { href: '/sobre', label: 'Sobre nós' },
        { href: '/servicos', label: 'Serviços' },
        { href: '/chamados', label: 'Chamados' },
        { href: '/contato', label: 'Contato' }
    ];

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

                            <div className={`d-flex ${styles.iconsHeader} px-4`}>
                                <Link href={'/login/profissional'} className={`m-3 ${styles.iconTecnicoNav}`}>
                                    <i className={`bi bi-person-fill-gear ${styles.iconNav}`}></i>
                                    <p className={`${styles.noMargin} ${styles.pLoginNav}`}>Profissionais</p>
                                </Link>
                                <Link href={'/login/usuario'} className={`m-3 ${styles.iconUsuarioNav}`}>
                                    <i className={`bi bi-person-fill ${styles.iconNav}`}></i>
                                    <p className={`${styles.noMargin} ${styles.pLoginNav}`}>Usuário</p>
                                </Link>
                            </div>

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