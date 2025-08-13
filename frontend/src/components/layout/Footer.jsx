import './styleFooter.css';

export default function Footer() {
    return (
        <>
        <>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
  />
  <footer className="footer">
    <div className="footer-top">
      <ul className="footer-menu">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Sobre nós</a>
        </li>
        <li>
          <a href="#">Serviços</a>
        </li>
        <li>
          <a href="#">Chamados</a>
        </li>
        <li>
          <a href="#">Contato</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
        <li>
          <a href="#">Cadastro</a>
        </li>
      </ul>
      <div className="footer-logo">
        <span className="zelos">ZELOS</span>
        <img src="https://via.placeholder.com/60x25?text=SENAI" alt="SENAI" />
      </div>
    </div>
    <div className="footer-middle">
      <div className="contact-info">
        <p>
          <i className="fa-solid fa-phone" /> (11) 4227-7450
        </p>
        <p>
          <i className="fa-solid fa-envelope" /> senai@sp.senai.br
        </p>
        <p>
          <i className="fa-brands fa-whatsapp" /> (11) 9876-5432
        </p>
        <p>
          <i className="fa-solid fa-location-dot" /> R. Boa Vista, 825 - Boa
          Vista, São Caetano do Sul
        </p>
      </div>
      <div className="footer-actions">
        <button className="chamado-btn">
          Solicite um chamado de manutenção
        </button>
        <div className="avaliacao">
          <span>Avalie-nos no Google:</span>
          <i className="fa-regular fa-star" />
          <i className="fa-regular fa-star" />
          <i className="fa-regular fa-star" />
          <i className="fa-regular fa-star" />
          <i className="fa-regular fa-star" />
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      Sistema desenvolvido em 2024, MOLIERES. Todos os direitos reservados.
    </div>
  </footer>
</>

        </>
    )
}

