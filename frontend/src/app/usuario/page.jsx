import styles from "./usuario.module.css";
import SideBarUsuario from '@/components/SideBarUsuario/SideBarUsuario';

export default function Usuario() {
    return (
        <>
           <SideBarUsuario/>

           <h1 className={styles.nomeComeco}>Bem vindo(a), Lídia!</h1>

        </>
    )
}