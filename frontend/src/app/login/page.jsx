import styles from "./login.module.css";
import Link from 'next/link';

export default function Login() {
    return (
        <>
            <div className="login-background">
                <div className="login-container">
                    <h2>Login</h2>
                    <form>
                        <label htmlFor="email">Email:</label>
                        <div className="input-wrapper">
                            <input type="email" id="email" placeholder="Digite seu email" />
                            <span className="icon"><i className="bi bi-envelope-fill" />
                            </span>
                        </div>

                        <label htmlFor="password">Senha:</label>
                        <div className="input-wrapper">
                            <input type="password" id="password" placeholder="Digite sua senha" />
                            <span className="icon"><i className="bi bi-lock-fill" />
                            </span>
                        </div>

                        <button className="btn">Entrar</button>

                        <p className="register-text">
                            Esqueceu sua senha? Entre em <Link href="/contato">contato</Link> com a nossa secretaria
                        </p>
                    </form>
                </div>
            </div>

        </>
    )
}