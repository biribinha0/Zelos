import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { CategoriasHome, ProfissionaisHome, SobreHome } from "@/components/home";


export default function Home() {
  return (
    <>
      <div className="container-fluid p-0">
        <div className="row">
          <div className={`d-md-none ${styles.xs}`}>
            <Link href={'/login/usuario'}>
              <img
                className="img-fluid w-100"
                src="/img/bannerUmMobileHome.png"
                alt="bannerUmMobile"
              />
            </Link>
          </div>
          <div className={`d-md-none ${styles.smPersonalizado}`}>
            <Link href={'/login/usuario'}>
              <img
                className="img-fluid w-100"
                src="/img/bannerUmTabletHome.png"
                alt="bannerUmMobile"
              />
            </Link>
          </div>
          <div className="d-none d-md-block">
            <Link href={'/login/usuario'}>
              <img
                className="img-fluid w-100"
                src="/img/bannerUmHome.png"
                alt="bannerUm"
              />
            </Link>
          </div>
        </div>
        <CategoriasHome />
        <ProfissionaisHome />
        <SobreHome />
      </div>
    </>
  );
}
