"use client";
import { useState } from "react";
import "./styleFooter.css";
import Link from "next/link";
import { getDecodedToken, getToken, isAuthenticated } from "@/utils/auth";

export default function Footer() {
  const [rating, setRating] = useState(0);
  const senaiUrl = "https://share.google/V4dHjbqxeBWD8p8wO";

  const handleStarClick = (star) => {
    if (rating === star) {
      setRating(0); // desmarca se clicar na mesma estrela
    } else {
      setRating(star);
    }
  };

  const isAuth = isAuthenticated();
  const decoded = getDecodedToken() || null;


  return (
    <>
      {/* CDN do Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
      />

      <footer className="footer">
        <div className="footer-top fst-italic d-flex flex-wrap">
          <ul className="footer-menu d-flex flex-wrap">
            <li className="text-break Link"><Link href={'/'} >Home</Link></li>
            <li className="text-break Link"><Link href={'/sobre'} >Sobre nós</Link></li>
            <li className="text-break Link"><Link href={'/servicos'} >Serviços</Link></li>
            <li className="text-break Link"><Link href={'/chamados'} >Chamados</Link></li>
            <li className="text-break Link"><Link href={'/contato'} >Contato</Link></li>
            <li className="text-break Link"><Link href={'/login/profissional'} className="loginCor">Login Profissional</Link></li>
            <li className="text-break Link"><Link href={'/login/usuario'} className="loginCor">Login Usuário</Link></li>
          </ul>
          <div className="footer-logo py-2 ">
            <Link href={'/'}><img className="logo-footer img-fluid" src="/img/logoZelosSenai.png" alt="SENAI" /></Link>
          </div>
        </div>

        <div className="footer-middle">
          <div className="contact-info">
            <p className="text-break"><i className="bi bi-telephone-fill"></i> (11) 4227-7450</p>
            <p className="text-break"><i className="bi bi-envelope-fill"></i> senai@sp.senai.br</p>
            <p className="text-break"><i className="bi bi-whatsapp"></i> (11) 9876-5432</p>
            <p className="text-break"><i className="bi bi-geo-alt-fill"></i> R. Boa Vista, 825 - Boa Vista, São Caetano do Sul</p>
          </div>

          <div className="footer-actions">
            {(!isAuth || decoded.funcao === 'usuario') && <Link href={isAuth ? '/usuario/criar' : '/login/usuario'}>
              <button className="chamado-btn text-break">Solicite um chamado de manutenção</button>
            </Link>
            }
            {(isAuth && decoded.funcao !== 'usuario') && <Link href={`/${decoded.funcao}`}>
              <button className="chamado-btn text-break">Acessar {decoded.funcao === 'admin' ?'painel de administração' : 'página de técnico'}</button>
            </Link>}

            <div className="avaliacao">
              <span className="text-break">Avalie-nos no Google:</span>
              {[1, 2, 3, 4, 5].map(star => (
                <a
                  key={star}
                  href={senaiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStarClick(star);
                  }}
                >
                  <i
                    className={`fa-star ${rating >= star ? "fa-solid active" : "fa-regular"}`}
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-bottom text-break">
          Sistema desenvolvido em 2025, ZELOS. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
