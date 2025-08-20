"use client";
import { useState } from "react";
import "./styleFooter.css";

export default function Footer() {
  const [rating, setRating] = useState(0);
  const senaiUrl = "https://share.google/V4dHjbqxeBWD8p8wO"; // link que você passou

  const handleStarClick = (star) => {
    if (rating === star) {
      setRating(0); // desmarca se clicar na mesma estrela
    } else {
      setRating(star);
    }
  };

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
            <li><a href="#">Home</a></li>
            <li><a href="#">Sobre nós</a></li>
            <li><a href="#">Serviços</a></li>
            <li><a href="#">Chamados</a></li>
            <li><a href="#">Contato</a></li>
            <li><a href="#">Login</a></li>
            <li><a href="#">Cadastro</a></li>
          </ul>
          <div className="footer-logo py-2 ">
            <img className="logo-footer img-fluid" src="/img/logoZelosSenai.png" alt="SENAI" />
          </div>
        </div>

        <div className="footer-middle">
          <div className="contact-info">
            <p><i className="bi bi-telephone-fill"></i> (11) 4227-7450</p>
            <p><i className="bi bi-envelope-fill"></i> senai@sp.senai.br</p>
            <p><i className="bi bi-whatsapp"></i> (11) 9876-5432</p>
            <p><i className="bi bi-geo-alt-fill"></i> R. Boa Vista, 825 - Boa Vista, São Caetano do Sul</p>
          </div>

          <div className="footer-actions">
            <button className="chamado-btn">Solicite um chamado de manutenção</button>

            <div className="avaliacao">
              <span>Avalie-nos no Google:</span>
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

        <div className="footer-bottom">
          Sistema desenvolvido em 2024, ZELOS. Todos os direitos reservados.
        </div>
      </footer>
    </>
  );
}
