"use client";

import styles from "./Error403.module.css";
import Link from 'next/link';

export default function Error403() {
  return (
    <div className={styles.containerError403}>
      <div className={styles.contentError403}>
        <div className={styles.img403}>
          <img src="/img/403.img.png" alt="Erro 403" className={styles.imgError403} />
        </div>

        <p className={styles.messageError403}>
          Área restrita! <p> somente técnicos autorizados podem entrar.</p>
        </p>
        
        <Link href={'/'}>
          <button className={`${styles.buttonError} ${styles.botaoVoltarHome}`}><i className="bi bi-arrow-left-short"></i> Voltar para a home</button>
        </Link>
      </div>
    </div>
  );
}