import Image from "next/image";
import './page.module.css';

export default function Sobre() {
  return (
    <>
    
      <div className="d-flex flex-column align-items-center justify-content-center h-100 ">
        <img className="img-fluid"
        src="/img/sobreBanner.jpeg" alt=""
        
        />
        <img
          className="p-3 img-fluid"
          src="/img/sobre-senai-zelos.jpeg"
          width={400}
        />

        <p className="mt-3 text-center p-5">
          O SENAI-SP tem a missão de impulsionar o aumento da competitividade da indústria por meio de ações de educação profissional, inovação, tecnologia, e empreendedorismo industrial. Com mais de 80 anos de atuação, o SENAI-SP supera 1 milhão de matrículas anuais, abrangendo desde cursos para a formação inicial profissional até a pós-graduação. São 90 unidades de formação profissional distribuídas em todo o estado de São Paulo, além de 78 escolas móveis, que levam soluções customizadas para a indústria. o também se destaca na oferta de soluções em inovação e tecnologia, desenvolvendo projetos de pesquisa, desenvolvimento e inovação (PD&I) e programavoltados para a melhoria da produtividade e competitividade das empresas. Na área de empreendedorismo, o SENAI-SP promove programas de aceleração de startups, inovação aberta, intraempreendedorismo.
        </p>
      </div>

      <img className="img-fluid"
      src="/img/bannerSobre3.jpeg"
      />
<section className="testimonials-section">
  <div className="testimonials-header">
    <h2 className="section-title">
      <span className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          width={24}
          height={24}
        >
          <path d="M480 32C480 14.33 465.7 0 448 0C430.3 0 416 14.33 416 32V64H320C143.3 64 0 207.3 0 384C0 422.3 22.84 456.9 57.5 478.4C69.34 485.4 83.16 484.7 94.27 477.3C105.4 469.9 111.4 457.1 110.8 444.2C108.3 400.1 144.9 368 189.6 368H448C465.7 368 480 353.7 480 336V32z" />
        </svg>
      </span>
      nossos <span className="highlight">depoimentos</span>
    </h2>
  </div>
  <div className="testimonials-container">
    <div className="testimonial-card">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar de Lídia Matos"
          className="avatar"
        />
        <div className="user-details">
          <p className="user-name">Lídia Matos</p>
          <p className="user-email">lidMatos@gmail.com</p>
        </div>
      </div>
      <p className="testimonial-text">
        nada melhor do que fazer chamadas rapidas por esse site depoimentos 100%
        reais convertem muito mais
      </p>
      <div className="card-footer">
        <p className="date">15.02.2025</p>
        <div className="logo">ZELOS</div>
      </div>
    </div>
    <div className="testimonial-card">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar de Lídia Matos"
          className="avatar"
        />
        <div className="user-details">
          <p className="user-name">Lídia Matos</p>
          <p className="user-email">lidMatos@gmail.com</p>
        </div>
      </div>
      <p className="testimonial-text">
        nada melhor do que fazer chamadas rapidas por esse site depoimentos 100%
        reais convertem muito mais
      </p>
      <div className="card-footer">
        <p className="date">15.02.2025</p>
        <div className="logo">ZELOS</div>
      </div>
    </div>
    <div className="testimonial-card">
      <div className="user-info">
        <img
          src="https://via.placeholder.com/40"
          alt="Avatar de Lídia Matos"
          className="avatar"
        />
        <div className="user-details">
          <p className="user-name">Lídia Matos</p>
          <p className="user-email">lidMatos@gmail.com</p>
        </div>
      </div>
      <p className="testimonial-text">
        nada melhor do que fazer chamadas rapidas por esse site depoimentos 100%
        reais convertem muito mais
      </p>
      <div className="card-footer">
        <p className="date">15.02.2025</p>
        <div className="logo">ZELOS</div>
      </div>
    </div>
  </div>
</section>

      <img className="w-100 py-3 img-fluid"
        src="/img/sobreBanner2.png"
      />
<div className="container my-5">
      <div className="row p-5 row-cols-1 row-cols-md-3 g-4 ">
        <div className="col">
          <div className="card h-100">
            <img src="/img/sobre-usuario.jpeg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title fw-bold fst-italic text-center" id="tituloCard">Atendimento</h5>
              <p className="card-text">
                O sistema permite que os alunos registrem problemas na escola, como falhas na 
                estrutura ou equipamentos. A equipe responsável recebe os chamados e resolve 
                as questões de forma rápida e organizada.
              </p>
            </div>
          </div>
        </div>

        <div  className="col">
          <div className="card h-100 positio-relative">
            <img  src="/img/sobre-sino.jpeg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title fw-bold fst-italic text-center ">Chamados</h5>
              <p className="card-text">
                Os chamados são solicitações feitas por alunos para informar problemas na escola, como objetos quebrados, salas sujas, falta de iluminação, entre outros. Para registrar um chamado, o aluno deve acessar o site, preencher o formulário com a descrição do problema, selecionar a categoria correspondente e enviar. A equipe responsável será notificada e dará andamento à solução o mais rápido possível.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/img/sobre-engrenagem.jpeg" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title fw-bold fst-italic text-center ">Manutenção</h5>
              <p className="card-text">
                A manutenção dos patrimônios danificados da escola será feita pela equipe técnica responsável, após o recebimento e análise dos chamados. Cada item com problema, como cadeiras, mesas, lâmpadas ou equipamentos, será avaliado, reparado ou substituído conforme a necessidade, garantindo a conservação dos bens e o bom funcionamento do ambiente escolar.
              </p>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}





