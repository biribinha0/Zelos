"use client";

import styles from "./Error404.module.css";
import Link from 'next/link';

export default function Error404({mensagem = 'Essa rota não foi encontrada em nosso manual técnico.', linkHref = '/', textoBotao= 'Voltar para a home'}) {
  return (
    <div className={styles.containerError}>
      <div className={styles.contentError}>
        <div className={styles.img404}>
          <img src="/img/404img.png" alt="Erro 404" className={styles.imgError} />
        </div>

        <p className={`fs-5 text ${styles.messageError}`}>
          {mensagem}
        </p>

        <Link href={linkHref}>
          <button className={`${styles.buttonError} ${styles.botaoVoltarHome}`}><i className="bi bi-arrow-left-short"></i>{textoBotao}</button>
        </Link>
      </div>
    </div>
  );
}
