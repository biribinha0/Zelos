"use client";
import axios from 'axios';
import styles from './login.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setToken, getDecodedToken, isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/utils/api';
import AlertModal from "@/components/common/AlertModal";

export default function LoginProfissional() {
    const router = useRouter();
    const [loginParams, setLoginParams] = useState({
        username: '',
        password: ''
    });
    const [mensagem, setMensagem] = useState(null);
    const [loading, setLoading] = useState(false);
    const [primeiroCarregamento, setPrimeiroCarregamento] = useState(true);

    const isAuth = isAuthenticated();
    const decoded = getDecodedToken();

    useEffect(() => {
        setPrimeiroCarregamento(false);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/auth/entrar`, loginParams, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            setToken(response.data.token);
            const decoded = getDecodedToken();
            setLoginParams({ username: '', password: '' });
            setLoading(false);
            router.push(`/${decoded.funcao}`);
        } catch (error) {
            console.error(error);
            setMensagem(error.response?.data?.mensagem || "Erro ao fazer login");
            setLoading(false);
        }
    };

    if (isAuth && !loading && !primeiroCarregamento) {
        return (
            <div className={styles.bgModal}>
                <AlertModal
                    titulo="Aviso"
                    descricao="Você já está logado"
                    textoBotao="Painel de controle"
                    linkBotao={`/${decoded.funcao}`}
                />
            </div>
        );
    }

    return (
        <div className={styles.loginBackground}>
            <div className={styles.loginContainer}>
                <h2>Login Profissional</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email" className={styles.label}>Email:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id="email"
                            placeholder="Digite seu Email"
                            value={loginParams.username}
                            onChange={(e) =>
                                setLoginParams({ ...loginParams, username: e.target.value })
                            }
                            required
                        />
                        <span className={styles.icon}>
                            <i className="bi bi-envelope-fill" />
                        </span>
                    </div>

                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            id="password"
                            placeholder="Digite sua senha"
                            value={loginParams.password}
                            onChange={(e) =>
                                setLoginParams({ ...loginParams, password: e.target.value })
                            }
                            required
                        />
                        <span className={styles.icon}>
                            <i className="bi bi-lock-fill" />
                        </span>
                    </div>

                    <button className={styles.btn} type="submit" disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    {mensagem && <p className="text-center pt-3">{mensagem}</p>}

                    <p className={styles.registerText}>
                        Esqueceu sua senha? Entre em <Link href="/contato">contato</Link> com a nossa secretaria.
                    </p>
                </form>
            </div>
        </div>
    );
}
