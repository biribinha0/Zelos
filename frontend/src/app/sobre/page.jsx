import Image from "next/image";


export default function Sobre() {
  return (
    <>
      <div className="container-fluid" >
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src="/"
              
          />
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center h-100" >
          <img className="p-3"
            src="/img/sobre-banner.jpeg"
            width={400}
          />
         
          <p className="mt-3 text-center">
            O SENAI-SP tem a missão de impulsionar o aumento da competitividade da indústria por meio de ações de educação profissional, inovação, tecnologia, e empreendedorismo industrial. Com mais de 80 anos de atuação, o SENAI-SP supera 1 milhão de matrículas anuais, abrangendo desde cursos para a formação inicial profissional até a pós-graduação. São 90 unidades de formação profissional distribuídas em todo o estado de São Paulo, além de 78 escolas móveis, que levam soluções customizadas para a indústria. o também se destaca na oferta de soluções em inovação e tecnologia, desenvolvendo projetos de pesquisa, desenvolvimento e inovação (PD&I) e programavoltados para a melhoria da produtividade e competitividade das empresas. Na área de empreendedorismo, o SENAI-SP promove programas de aceleração de startups, inovação aberta, intraempreendedorismo.
          </p> 
          <div>
            <img 
            src="/img/sobre-banner.jpeg"
            width={1150}
            />
          </div>
        </div>
      </div>






    </>
  );
}
