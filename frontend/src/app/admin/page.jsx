"use client"
import { removeToken } from "@/utils/auth";
import styles from "./admin.module.css";

export default function Admin() {
    const handleSair = () => {
        removeToken()
    }
    return (
        <div className={styles.container}>
            Admin
            <button type="button" onClick={handleSair}>SAIR</button>
        </div>
    )
}