"use client";

import styles from "./Error404.module.css";
import Link from 'next/link';

export default function Error404() {
  return (
    <div className={styles.containerError}>
      <div className={styles.contentError}>
        <div className={styles.img404}>
          <img src="/img/404img.png" alt="Erro 404" className={styles.imgError} />
        </div>

        <p className={styles.messageError}>
          Essa rota não foi encontrada em nosso manual técnico.
        </p>

        <Link href={'/'}>
          <button className={`${styles.buttonError} ${styles.botaoVoltarHome}`}><i className="bi bi-arrow-left-short"></i> Voltar para a home</button>
        </Link>
      </div>
    </div>
  );
}
