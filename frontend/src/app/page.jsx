import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className="col-12">
            <Link href={'/login/usuario'}>
              <img
                className={`img-fluid w-100`}
                src="/img/bannerUmHome.png"
                alt="logo"
              />
            </Link>
          </div>
        </div>
        <div className="row">
          <div className={`${styles.categoriasHome}`}>
            <div className={`${styles.tituloCategoriasHome}`}>
              <h1>
                QUAL MANUTENÇÃO VOCÊ PRECISA HOJE?
              </h1>
            </div>
            <div className={`d-flex justify-content-center align-items-center ${styles.itensCategoriasHome}`}>
              <div className={`card ${styles.cardCategoriasHome}`}>
                <img
                  className={`img-fluid card-img-top ${styles.itemCategoriasHome}`}
                  src="/img/equipamentoUm.png"
                  alt="logo"
                />
                <div className="card-body">
                  <p className={`card-text ${styles.textEquipamentosHome}`}>
                    Wifi
                  </p>
                </div>
              </div>
              <div className={`card ${styles.cardCategoriasHome}`}>
                <img
                  className={`img-fluid card-img-top ${styles.itemCategoriasHome}`}
                  src="/img/equipamentoDois.png"
                  alt="logo"
                />
                <div className="card-body">
                  <p className={`card-text ${styles.textEquipamentosHome}`}>
                    Wifi
                  </p>
                </div>
              </div>
              <div className={`card ${styles.cardCategoriasHome}`}>
                <img
                  className={`img-fluid card-img-top ${styles.itemCategoriasHome}`}
                  src="/img/equipamentoTres.png"
                  alt="logo"
                />
                <div className="card-body">
                  <p className={`card-text ${styles.textEquipamentosHome}`}>
                    Wifi
                  </p>
                </div>
              </div>
              <div className={`card ${styles.cardCategoriasHome}`}>
                <img
                  className={`img-fluid card-img-top ${styles.itemCategoriasHome}`}
                  src="/img/equipamentoQuatro.png"
                  alt="logo"
                />
                <div className="card-body">
                  <p className={`card-text ${styles.textEquipamentosHome}`}>
                    Wifi
                  </p>
                </div>
              </div>
              <div className={`card ${styles.cardCategoriasHome}`}>
                <img
                  className={`img-fluid card-img-top ${styles.itemCategoriasHome}`}
                  src="/img/equipamentoCinco.png"
                  alt="logo"
                />
                <div className="card-body">
                  <p className={`card-text ${styles.textEquipamentosHome}`}>
                    Wifi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
