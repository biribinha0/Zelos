import styles from "./cardDepoimentos.module.css";

export default function CardDepoimentos({ title = "título padrão", text = "texto padrão lalala", src, link }) {
  return (
    <div className={styles.containerCardDepoimentos}>
      {Array(3).fill().map((_, index) => (
        <div key={index} className={`card ${styles.cardDepoimentos}`}>
          <div className={`${styles.cardDepoimentosBody}`}>
            <h5 className={`${styles.cardDepoimentosTitle}`}>{title}</h5>
            <h6 className={`mb-2 text-body-secondary ${styles.cardDepoimentosSubtitle}`}>
              Card subtitle
            </h6>
            {src && <img src={src} alt="Imagem do depoimento" className="card-img-top" />}
            <p className={`${styles.cardText}`}>
              {text}
            </p>
            <a className={`${styles.cardDepoimentosLink}`}>
              {link}
            </a>
            <a className={`${styles.cardDepoimentosLink}`}>
              Another link
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
