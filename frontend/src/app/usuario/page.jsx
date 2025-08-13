import styles from "./usuario.module.css";
import { getDecodedToken } from "@/utils/auth";

export default async function Usuario() {
    const decoded = await getDecodedToken();
    return (
        <>

                <h1 className={styles.nomeComeco}>Seja bem vindo(a),<h1 className={styles.nomeComeco1}>{decoded.id}!</h1></h1>

                <img src="/img/imgBannerUsuario.png" className={`img-fluid ${styles.bannerUsuario}`} alt="" />

                <h2 className="text-center">Confira seus últimos chamados:</h2>
            
        </>
    )
}