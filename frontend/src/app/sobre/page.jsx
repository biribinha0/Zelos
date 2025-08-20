import Image from "next/image";
import styles from './page.module.css';

export default function Sobre() {
  return (
    <> 
    <h2 className={styles.titulo}>
    <i className="bi-person-vcard"></i>
      <span className={styles.preto}>nossos </span>
      <span className={styles.vermelho}>depoimentos</span>
    </h2>
  
    <div className="m-5 row row-cols-1 row-cols-md-3 g-4">
  <div className="col">
    <div className={`card h-100 ${styles.cardSobre}`}>
      <div className={styles.cardTituloSobre}>
        <h5 className={styles.cardTitleSobre}>Card title</h5>
        <p className="card-text">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This content is a little bit longer.
        </p>
      </div>
      
    </div>
  </div>
  <div className="col">
    <div className={`card h-100 ${styles.cardSobre}`}>
      <div className={styles.cardTituloSobre}>
        <h5 className={styles.cardTitleSobre}>Card title</h5>
        <p className="styles.cardText">
          This card has supporting text below as a natural lead-in to additional
          content.
        </p>
      </div>
      
    </div>
  </div>
  <div className="col">
    <div className={`card h-100 ${styles.cardSobre}`}>
      <div className={styles.cardTituloSobre}>
        <h5 className={styles.cardTitleSobre}>Card title</h5>
        <p className="">
          This is a wider card with supporting text below as a natural lead-in
          to additional content. This card has even longer content than the
          first to show that equal height action.
        </p>
      </div>
    </div>
  </div>
</div>

    <img src="./img/bgDoisHome.png" alt="" />

    
    </>
  );
}





