"use client";
import { useRef } from "react";
import styles from './page.module.css';

const perfilImg = "/img/perfil.png"; // Coloque sua imagem em public
const depoimentos = [
  { nome: "Lidia Matos", email: "lidMatos@gmail.com", data: "15.02.2025" },
  { nome: "João Pedro", email: "joaopedro@gmail.com", data: "10.01.2025" },
  { nome: "Ana Souza", email: "ana.souza@gmail.com", data: "02.02.2025" },
  { nome: "Carlos Silva", email: "carlos.silva@gmail.com", data: "25.01.2025" },
];

export default function Sobre() {
  const containerRef = useRef(null);

  const scroll = (direction) => {
    if (containerRef.current) {
      const scrollAmount = 320; // largura aproximada do card + gap
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className={styles.bannerSobre}>
        <img
          className={styles.bannersobrenos}
          src="/img/bannersobredefinitivo.png"
          alt=""
        />

        <img
          src="/img/bannersobremobile.png"
          className={styles.bannersobremobile}
          alt="Banner Mobile"
        />
        <h1 className={styles.textoBanner}>SOBRE NÓS</h1>
      </div>

      <div className={styles.fundoSobre}>
        <div className={styles.containersobre}>
          <img
            className={styles.senaizelos}
            src="/img/sobre-senai-zelos.png"
            alt=""
          />
        </div>

        <p className={styles.sobretexto}>
          O <strong>SENAI-SP</strong> O SENAI-SP tem a missão de impulsionar 
          o aumento da competitividade da indústria por meio de ações de educação profissional,
           inovação, tecnologia, e empreendedorismo industrial. Com mais de 80 anos de atuação, 
           o SENAI-SP supera 1 milhão de matrículas anuais, abrangendo desde cursos para a formação
            inicial profissional até a pós-graduação. São 90 unidades de formação profissional distribuídas 
            em todo o estado de São Paulo, além de 78 escolas móveis, que levam soluções customizadas para 
            a indústria. o também se destaca na oferta de soluções em inovação e tecnologia, desenvolvendo 
            projetos de pesquisa, desenvolvimento e inovação (PD&I) e programavoltados para a melhoria da 
            produtividade e competitividade das empresas. Na área de empreendedorismo, o SENAI-SP promove
             programas de
           aceleração de startups, inovação aberta, intraempreendedorismo.
        </p>

        <section>
          <div className={styles.containerEstatisticas}>
            <div className={styles.textoEstatisticas}>
              <h4>SOBRE NÓS</h4>
              <h2>Estatísticas de uso de chamadas</h2>
            </div>

            <div className={styles.statsEstatisticas}>
              <div className={styles.statItemEstatisticas}>
                <i className="bi-plus-slash-minus"></i>
                <h3>1.735+</h3>
                <p>registros de chamadas</p>
              </div>
              <div className={styles.statItemEstatisticas}>
                <i className="bi bi-gear"></i>
                <h3>364+</h3>
                <p>chamados de manutenção</p>
              </div>
              <div className={styles.statItemEstatisticas}>
                <i className="bi bi-bell"></i>
                <h3>2.264+</h3>
                <p>de contas criadas</p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.NossosDepoimentos}>
          <h2 className={styles.titulo}>
            <i className="bi bi-people-fill"></i>
            <span className={styles.preto}>Nossos</span>{" "}
            <span className={styles.vermelho}>Depoimentos</span>
          </h2>
        </div>

        <div className={styles.cardSection}>
          <div className={styles.depoimentos}>
            <button
              className={styles.seta}
              onClick={() => scroll("left")}
              aria-label="Anterior"
            >
              ⮜
            </button>

            <div className={styles.cardsContainer} ref={containerRef}>
              <div className={styles.cards}>
                {depoimentos.map((dep, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.perfil}>
                      <img
                        src={perfilImg}
                        className={styles.perfilIcon}
                        alt={`Foto de ${dep.nome}`}
                      />
                      <div className={styles.perfilInfo}>
                        <strong>{dep.nome}</strong>
                        <span>{dep.email}</span>
                      </div>
                    </div>
                    <p className={styles.texto}>
                      Nada melhor do que fazer chamadas rápidas por esse site,
                      depoimentos 100% reais convertem muito mais.
                    </p>
                    <div className={styles.footerCard}>
                      <span className={styles.data}>{dep.data}</span>
                      <span className={styles.estrelas}>★★★★★</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={styles.seta}
              onClick={() => scroll("right")}
              aria-label="Próximo"
            >
              ⮞
            </button>
          </div>
        </div>
      </div>
    </>
  );
}






