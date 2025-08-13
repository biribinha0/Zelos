import './styleChamados.css';
import Link from 'next/link';
import ListaChamados from '@/components/ListaChamados/ListaChamados';

export default function Chamados() {

    return (
        <>

            <img src="/img/imgBannerChamados.png" className="banner img-fluid" alt="" />
            <div className="fundo">
                <h1 className="tituloChamados">Chamados</h1>
                <ListaChamados />

            </div>

        </>
    )
}