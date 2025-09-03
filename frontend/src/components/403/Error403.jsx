"use client";

import styles from "./Error403.module.css";

export default function Error403() {
  return (
    <div className={styles.containerError403}>
      <div className={styles.contentError403}>
        <div className={styles.img403}>
          <img src="./img/403img.png" alt="Erro 403" className={styles.imgError403} />
        </div>

        <p className={styles.messageError403}>
          Essa rota não foi encontrada <br /> em nosso manual técnico.
        </p>

        <button className={`${styles.buttonError} ${styles.botaoVoltarHome}`}><i className="bi bi-arrow-left-short"></i> Voltar para a home</button>
      </div>
    </div>
  );
}