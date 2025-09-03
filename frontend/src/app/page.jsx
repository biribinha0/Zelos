"use client"
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import { CategoriasHome, ProfissionaisHome, SobreHome } from "@/components/home";
import { isAuthenticated, getDecodedToken } from "@/utils/auth";
import { useEffect, useState } from "react";


export default function Home() {
  const [bannerHref, setBannerHref] = useState('/login/usuario')
  useEffect(() => {
    const isAuth = isAuthenticated();
    const decoded = getDecodedToken();
    setBannerHref(isAuth ? decoded.funcao === 'usuario'
      ? '/usuario/criar' : `/${decoded.funcao}/chamados` : 'login/usuario');
  }, [])
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
            <Link href={bannerHref}>
              <img
                className="img-fluid w-100"
                src="/img/bannerUmTabletHome.png"
                alt="bannerUmMobile"
              />
            </Link>
          </div>
          <div className="d-none d-md-block">
            <Link href={bannerHref}>
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
