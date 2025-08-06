    'use client'
    import Link from "next/link";
    import { usePathname } from "next/navigation";
    import styles from "./header.module.css"

    export default function Header() {
        const pathName = usePathname()

        const itensNav = [
            {
                href: '/',
                label: 'Home'
            },
            {
                href: '/chamados',
                label: 'Chamados'
            },
            {
                href: '/sobre',
                label: 'Sobre Nós'
            },
            {
                href: '/contato',
                label: 'Contato'
            },
            {
                href: '/login',
                label: 'Login'
            }
        ]

        return (
            <nav className="navbar navbar-expand-lg bg-vermelho">
                <div className="container-fluid">
                    <Link className="navbar-brand" href={'/'}>Zelos</Link>
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
                        <ul className="navbar-nav">
                            {itensNav.map((item) => {
                                return (
                                    <li className="nav-item" key={item.href}>
                                        <Link
                                            className={`nav-link ${pathName === item.href ? styles.ativo : ''}`} aria-current="page" href={item.href}>
                                            {item.label}
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </nav>

        )
    }