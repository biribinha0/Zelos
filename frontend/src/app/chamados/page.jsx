import './styleChamados.css';
import ListaChamados from '@/components/ListaChamados/ListaChamados';

export default function Chamados() {
    return (
        <>

         <div className="position-relative bannerChamados">
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/imgBannerChamados.png"
                    className="img-fluid d-none d-md-block bannerDesktop"
                    alt="Banner Desktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/bannerChamadosMobile.png"
                    className="img-fluid d-block d-md-none w-100 px-20 bannerChamadosMobile"
                    alt="Banner Mobile"
                />
            </div>

            <div className="fundo">
                <h1 className="tituloChamados">Chamados</h1>
                <ListaChamados />

            </div>
        </>
    )
}