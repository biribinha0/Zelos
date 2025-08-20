import "./Card.css";
import Link from 'next/link';

export default function Card({ item }) {
    return (
        <>
            <Link href={`/especiarias/${item.id}`} className="card-link">
                <div className="card-custom">
                    <img src={`${item.imagens[0]}.png`} className="imagem-card" alt={item.nome} />
                    <div className="subirDiv"><div className="card-body-custom">
                        <p className="card-titulo">{item.nome}</p>
                        <button className="principalBotao">Conheça esse sabor!</button></div>
                    </div>
                </div>
            </Link>
        </>
    );
}
