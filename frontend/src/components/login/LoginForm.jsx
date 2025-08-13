"use client"
import { useState } from "react";

export default function LoginForm(styles) {
  

    
    return (
        <form>
            <label htmlFor="email" className={styles.label}>Email:</label>
            <div className={styles.inputWrapper}>
                <input type="email" id="email" placeholder="Digite seu email" />
                <span className={styles.icon}><i className="bi bi-envelope-fill" />
                </span>
            </div>

            <label htmlFor="password" className={styles.label}>Senha:</label>
            <div className={styles.inputWrapper}>
                <input type="password" id="password" placeholder="Digite sua senha" />
                <span className={styles.icon}><i className="bi bi-lock-fill" />
                </span>
            </div>

            <button className={styles.btn}>Entrar</button>

            <p className={styles.registerText}>
                Esqueceu sua senha? Entre em <Link href="/contato">contato</Link> com a nossa secretaria.
            </p>
        </form>
    )
}