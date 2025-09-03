"use client"

import styles from "./Error404.module.css";


export default function Error404() {
  return (
    <div className={styles.fundoError}>
    <div className={styles.containerError}>
      <div className={styles.contentError}>
        <h1 className={styles.codeError}>
          4<span className={styles.hexagonError}></span>4
        </h1>
        <p className={styles.messageError}>
          Essa rota não foi encontrada <br /> em nosso manual técnico.
        </p>
        <button className={styles.button}>Acionar um chamado</button>
      </div>

    </div>
    </div>
  );
}
