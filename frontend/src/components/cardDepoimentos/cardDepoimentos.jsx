import styles from "./cardDepoimentos.module.css";

export default function CardDepoimentos({ title = "título padrão", text = "texto padrão lalala", src, link}) {
  return (
    <div className={`card ${styles.cardDepoimentos}`} style={{ width: "18rem" }}>
      <div className={`cardDepoimentosbody ${styles.cardDepoimentosBody}`}>
        <h5 className={`cardDepoimentostitle ${styles.cardDepoimentosTitle}`}>{title}</h5>
        <h6 className={`cardDepoimentossubtitle mb-2 text-body-secondary ${styles.cardDepoimentosSubtitle}`}>
          Card subtitle
        </h6>
        <p className={`cardDepoimentostext ${styles.cardText}`}>
          {text}
        </p>
        <a href="#" className={`cardDepeoimentoslink ${styles.carddepoimentosLink}`}>
          {link}
        </a>
        <a href="#" className={`cardDepoimentos2link ${styles.carddepoimentosLink}`}>
          Another link
        </a>
      </div>
    </div>
  );
}
