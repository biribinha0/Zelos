"use client"

import styles from "./Error404.module.css";

export default function Error404() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.code}>
          4<span className={styles.hexagon}></span>4
        </h1>
        <p className={styles.message}>
          Essa rota não foi encontrada <br /> em nosso manual técnico.
        </p>
        <button className={styles.button}>Acionar um chamado</button>
      </div>
    </div>
  );
}
