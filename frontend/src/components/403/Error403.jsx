"use client";

import styles from "./Error403.module.css";
import Link from 'next/link';

export default function Error403({mensagem="Somente técnicos autorizados podem entrar.", textoBotao=" Voltar para a home", linkbotao='/'}) {
  return (
    <div className={styles.containerError403}>
      <div className={styles.contentError403}>
        <div className={styles.img403}>
          <img src="/img/403.img.png" alt="Erro 403" className={styles.imgError403} />
        </div>

        <div className={styles.messageError403}>
          <p className="m-0"> Área restrita! </p>
          <p>{mensagem}</p>
        </div>

        <Link href={linkbotao}>
          <button className={`${styles.buttonError} ${styles.botaoVoltarHome}`}><i className="bi bi-arrow-left-short"></i> {textoBotao}</button>
        </Link>
      </div>
    </div>
  );
}