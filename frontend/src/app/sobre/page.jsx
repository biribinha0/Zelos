"use client";
import { useRef } from "react";
import styles from './page.module.css';
import { Depoimentos } from "@/components/Sobre";



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
          className={`img-fluid w-100 ${styles.bannersobrenos}`}
          src="/img/bannersobredefinitivo.png"
          alt="banner desktop"
        />
      </div>

      <div className={styles.bannerSobreta}>
        <img
          className={`img-fluid ${styles.smPersonalizado}`}
          src="/img/bannerSobreDesktop.png"
          alt="banner tablet"
        />
      </div>

      <div className={styles.xs}>
        <img
          className="img-fluid w-100"
          src="/img/bannerSobreMobile.png"
          alt="banner mobile"
        />
      </div>
      <div />

      <div className={styles.fundoSobre}>
        <div className={styles.containersobre}>
          <div className={styles.principaisDiv}>
         <div className="col-12 d-flex flex-column justify-content-center align-items-center p-5 pb-0">
                <img src="/img/tituloSobrePrincipal.png" className={`img-fluid ${styles.equipeZelosImg}`}/>
                <h1 className={`${styles.tituloSobrePrincipal}`}>VEJA UM POUCO SOBRE A ZELOS</h1>
            </div>
            </div>
        </div>
        <p className={styles.TextoSobre}>A Zelos nasceu com o propósito de transformar a gestão de manutenção nas instituições de ensino em um processo mais eficiente, organizado e confiável. Sabemos que o bom funcionamento do ambiente escolar é determinante para a qualidade do ensino e para o bem-estar de toda a comunidade acadêmica.

          Nossa plataforma foi desenvolvida para atender às necessidades específicas das escolas, oferecendo um sistema completo de abertura e acompanhamento de chamados. Cada solicitação é registrada de forma clara, monitorada em tempo real e conduzida até a sua resolução, garantindo transparência, agilidade e rastreabilidade em cada etapa do processo.

          Mais do que uma ferramenta tecnológica, a Zelos é um parceiro estratégico das instituições de ensino. Nosso compromisso é apoiar gestores, coordenadores e equipes técnicas a manterem a infraestrutura escolar sempre em condições ideais, possibilitando que o foco principal permaneça na missão essencial: educar com qualidade. Com a Zelos, cada detalhe é tratado com seriedade. Nosso trabalho é zelar pelos espaços de aprendizagem, promovendo ambientes seguros, funcionais e preparados para inspirar o futuro.</p>


        <section>
          <div className={styles.containerEstatisticas}>
            <div className={styles.textoEstatisticas}>
              <h4>SOBRE NÓS</h4>
              <h2 className="tituloEstatisticas">Estatísticas de uso de chamados</h2>
            </div>

            <div className={styles.statsEstatisticas}>
              <div className={styles.statItemEstatisticas}>
                <i className="bi-plus-slash-minus"></i>
                <h3>1.735+</h3>
                <p>registros de chamados</p>
              </div>
              <div className={styles.statItemEstatisticas}>
                <i className="bi bi-gear"></i>
                <h3>364+</h3>
                <p>chamados concluídos</p>
              </div>
              <div className={styles.statItemEstatisticas}>
                <i className="bi bi-bell"></i>
                <h3>2.264+</h3>
                <p>de contas criadas</p>
              </div>
            </div>
          </div>
        </section>
        <div className="my-5"><Depoimentos /></div>


      </div>
    </>
  );
}






