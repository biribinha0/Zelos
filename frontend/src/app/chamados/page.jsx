import './styleChamados.css';
import ListaChamados from '@/components/ListaChamados/ListaChamados';

export default function Chamados() {
    return (
      <>
      {/* Mobile */}
      <div className="d-block d-sm-none">
        <img
          className="img-fluid w-100"
          src="/img/bannerManutencaoMobile.png"
          alt="bannerUmMobile"
        />
      </div>
    
      {/* Tablet */}
      <div className="d-none d-sm-block d-md-none">
        <img
          className="img-fluid w-100"
          src="/img/bannerManutencaoDesktop.png"
          alt="bannerUmTablet"
        />
      </div>
    
      {/* Desktop */}
      <div className="d-none d-md-block">
        <img
          className="img-fluid w-100"
          src="/img/imgBannerChamados.png"
          alt="bannerUmDesktop"
        />
      </div>
    
        

            <div className="fundoChamados">
                 <div  className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-gear-fill mx-2 my-2"></i>
                    <span className="tituloChamados">
                        Chamados <span className="tituloChamados2">atuais:</span>
                    </span>
                </h4>
            </div>
                <ListaChamados/>

            </div>
        </>
    )
}