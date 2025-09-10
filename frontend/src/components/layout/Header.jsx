'use client'
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./header.module.css";
import { getDecodedToken, getToken, isAuthenticated, removeToken } from "@/utils/auth";
import { useState, useEffect } from "react";

export default function Header() {
  const router = useRouter()
  const pathName = usePathname();
  const [altHeader, setAltHeader] = useState(false)

  const itensNav = [
    { href: '/', label: 'Home' },
    { href: '/sobre', label: 'Sobre nós' },
    { href: '/servicos', label: 'Serviços' },
    { href: '/chamados', label: 'Chamados' },
    { href: '/contato', label: 'Contato' }
  ];

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

  useEffect(()=> {
     if (pathName.startsWith('/usuario') ||
      pathName.startsWith('/tecnico') ||
      pathName.startsWith('/admin')) {
      setAltHeader(true)
    } else {
      setAltHeader(false)
    }
  }, [pathName])


  const handleLogout = () => {
    removeToken();
    router.push('/')
  }
  return (

    <nav className={`navbar navbar-expand-lg ${styles.Header} ${altHeader ? styles?.AltHeader : ''}`}>
      <div className={`container-fluid ${styles.espacamentoNav}  ${altHeader ? styles?.AltEspacamentoNav : ''}`}>
        <div className="row">
          <div className="col-12 col-lg-2 d-flex align-items-center">
            <div className="d-flex justify-content-between row">

              <Link className="col-6 col-sm-4 col-lg-12 navbar-brand d-flex align-items-center justify-content-center ps-4 m-0" href={'/'}>
                <img
                  className={`img-fluid w-75 ${styles.logo}`}
                  src="/img/logoBranco.png"
                  alt="logo"
                />
              </Link>
              <div className="col-4 col-sm-2 d-flex justify-content-center align-items-center">

                <button
                  className={`navbar-toggler  me-sm-4 bg-light border-none ${styles.hamburguer}`}
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
            </div>
          </div>
          <div className="col-12 px-5 p-lg-0 col-lg-10 d-flex justify-content-end align-items-center">

            <div className="collapse navbar-collapse" id="navbarNavDropdown">

              <ul className="navbar-nav column-gap-4 me-auto d-flex flex-wrap justify-content-center align-items-start align-items-lg-center">
                {itensNav.map((item) => (
                  <li className={`nav-item fst-italic ${styles.itens}`} key={item.href}>
                    <Link
                      className={`nav-link ${pathName === item.href ? styles?.ativo : ''}`}
                      aria-current="page"
                      href={item.href}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="row d-flex flex-column flex-sm-row">
                {!isAuth ?
                  (
                    <div className={`col-12 col-sm-6 d-flex flex-row m-0 justify-content-center align-items-center px-0 px-md-4 py-3 px-1 py-lg-0 row ${styles.iconsHeader}`}>
                      <Link href={'/login/profissional'} className={`col-6 p-0 ${styles.iconTecnicoNav}`}>
                        <i className={`bi bi-person-fill-gear ${styles.iconNav}`}></i>
                        <p className={`text-center ${styles.noMargin} ${styles.pLoginNav}`}>Profissionais</p>
                      </Link>
                      <Link href={'/login/usuario'} className={`col-6 p-0 ${styles.iconUsuarioNav}`}>
                        <i className={`bi bi-person-fill ${styles.iconNav}`}></i>
                        <p className={`text-center ${styles.noMargin} ${styles.pLoginNav}`}>Usuário</p>
                      </Link>
                    </div>
                  ) : (
                    <div className={`d-flex justify-content-center px-3 col-12 ${decoded.funcao === 'usuario' ? 'col-sm-6' : 'col-sm-12'} align-items-center`}>

                      <div className="dropdown">
                        <button
                          className={`btn btn-outline-light dropdown-toggle ${styles.usuarioBotao}`}
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <i className="bi bi-person-circle"></i> {decoded?.nome}
                        </button>
                        <ul className={`dropdown-menu shadow ${styles.activeTransicao}`}>
                          <li>
                            <Link className={`dropdown-item`} href={`/${decoded?.funcao}`}>
                              Painel de controle
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
                  )
                }

                {(!isAuth || decoded.funcao === 'usuario') && <Link className="col-12 col-sm-6 d-flex align-items-center justify-content-center text-decoration-none flex-column"
                  href={isAuth ? '/usuario/criar' : '/login/usuario'}
                  role="button">

                  <button className={`${styles.botaoChamadoNav}  `}>
                    Solicite um <span className="text-decoration-underline text-center">chamado de manutenção</span>
                  </button>
                </Link>}
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
}