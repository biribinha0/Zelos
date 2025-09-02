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

        {/* Logo e botão mobile */}
        <div className="d-flex d-lg-none w-100 justify-content-between align-items-center">
          <Link href="/" className="navbar-brand m-0 p-0 mx-auto">
            <img src="/img/logoBranco.png" alt="logo" style={{ maxWidth: "150px" }} />
          </Link>

          <button
            className={`navbar-toggler bg-light border-none ${styles.hamburguer}`}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        {/* Desktop */}
        <div className="row w-100 d-none d-lg-flex">
          <div className="col-6 col-sm-4 col-md-2 align-items-center d-flex">
            <Link
              className="navbar-brand d-flex align-items-center justify-content-end m-0"
              href={"/"}
            >
              <img
                className={`img-fluid w-75 ${styles.logo}`}
                src="/img/logoBranco.png"
                alt="logo"
              />
            </Link>
          </div>

          <div className="col-6 col-sm-8 col-md-10 d-flex justify-content-end align-items-center">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              {/* Links */}
              <ul className="navbar-nav column-gap-4 me-auto d-flex flex-wrap justify-content-center align-items-center">
                {itensNav.map((item) => (
                  <li
                    className={`nav-item fst-italic ${styles.itens}`}
                    key={item.href}
                  >
                    <Link
                      className={`nav-link ${pathName === item.href ? styles.ativo : ""
                        }`}
                      aria-current="page"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Bloco login e botão chamado */}
              {!isAuth ? (
                <div className={`d-flex px-4 ${styles.iconsHeader}`}>
                  <Link
                    href={"/login/profissional"}
                    className={`m-3 ${styles.iconTecnicoNav}`}
                  >
                    <i className={`bi bi-person-fill-gear ${styles.iconNav}`}></i>
                    <p className={`${styles.noMargin} ${styles.pLoginNav}`}>
                      Profissionais
                    </p>
                  </Link>
                  <Link
                    href={"/login/usuario"}
                    className={`m-3 ${styles.iconUsuarioNav}`}
                  >
                    <i className={`bi bi-person-fill ${styles.iconNav}`}></i>
                    <p className={`${styles.noMargin} ${styles.pLoginNav}`}>
                      Usuário
                    </p>
                  </Link>
                </div>
              ) : (
                <div className="d-flex justify-content-center px-3 pt-2">
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
                        <Link
                          className="dropdown-item"
                          href={`/${decoded?.funcao}`}
                        >
                          Meu perfil 
                        </Link>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={handleLogout}>
                          <i className="bi bi-box-arrow-left"></i> Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {(!isAuth || decoded.funcao === "usuario") && (
                <Link
                  className="d-flex align-items-center justify-content-center text-decoration-none flex-column"
                  href={isAuth ? "/usuario/criar" : "/login/usuario"}
                  role="button"
                >
                  <button className={`${styles.botaoChamadoNav}`}>
                    Solicite um{" "}
                    <span className="text-decoration-underline text-center">
                      chamado de manutenção
                    </span>
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>

  );
}