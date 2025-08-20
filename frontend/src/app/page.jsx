import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { CategoriasHome, ProfissionaisHome, SobreHome, CardProfissionalHome } from "@/components/home";


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
        <CardProfissionalHome/>
        <ProfissionaisHome/>
        <CategoriasHome/>
        <SobreHome/>
      </div>
    </>
  );
}
