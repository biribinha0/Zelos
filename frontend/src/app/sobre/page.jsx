import Image from "next/image";
import styles from './page.module.css';
import CardDepoimentos from "@/components/cardDepoimentos/cardDepoimentos";


export default function Sobre() {
  return (
    <>


      <div className={styles.fundoSobre}>
        <div className={styles.containersobre}>
          <img className={styles.senaizelos} src="/img/sobre-senai-zelos.png" alt="" />
           </div>
           <p className={styles.sobretexto}>
            O <strong>SENAI-SP</strong> tem a missão de impulsionar o aumento da
            competitividade da indústria por meio de ações de educação profissional,
            inovação, tecnologia, e empreendedorismo industrial. Com mais de 80 anos
            de atuação, o SENAI-SP supera 1 milhão de matrículas anuais, abrangendo
            desde cursos para a formação inicial profissional até a pós-graduação.
            São 90 unidades de formação profissional distribuídas em todo o estado
            de São Paulo, além de 78 escolas móveis, que levam soluções
            customizadas para a indústria. O SENAI-SP também se destaca na oferta de
            soluções em inovação e tecnologia, desenvolvendo projetos de pesquisa,
            desenvolvimento e inovação (PD&I) e programas voltados para a melhoria
            da produtividade e competitividade das empresas. Na área de
            empreendedorismo, o SENAI-SP promove programas de aceleração de
            startups, inovação aberta, intraempreendedorismo.
          </p>
          <h2 className={styles.titulo}>
            <i className="bi bi-people-fill"></i>
            <span className={styles.preto}>Nossos</span>{" "}
            <span className={styles.vermelho}>Depoimentos</span>
          </h2>
       
        <CardDepoimentos />
        <CardDepoimentos />
        <CardDepoimentos />
      </div >

    </>
  );
}





