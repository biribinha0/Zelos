"use client";
import axios from 'axios';
import styles from './login.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setToken, getDecodedToken, isAuthenticated } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/utils/api';
import AlertModal from "@/components/common/AlertModal";

export default function LoginUsuario() {
    const router = useRouter();
    const [loginParams, setLoginParams] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [mensagem, setMensagem] = useState(null);
    const [justLoggedIn, setJustLoggedIn] = useState(false);

    const isAuth = isAuthenticated();
    const decoded = getDecodedToken();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        axios.post(`${API_URL}/auth/login`, loginParams, {
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then(function (response) {
                setToken(response.data.token);
                setJustLoggedIn(true)
                const decoded = getDecodedToken();
                setLoginParams({ username: '', password: '' });
                router.push(`/${decoded.funcao}`);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
                setMensagem(error.response.data.mensagem);
                setLoading(false);
            });
    }

    if (isAuth && !justLoggedIn) {
        return (
            <div className={'bgModal'}>
                < AlertModal titulo={"Aviso"} descricao={"Você já está logado"} textoBotao={'Painel de controle'} linkBotao={`/${decoded.funcao}`} />
            </div>
        )
    }

    return (
        <div className={styles.loginBackground}>
            <div className={styles.loginContainer}>
                <h2>Login Usuário</h2>
                <form onSubmit={handleLogin}>
                    <label htmlFor="matricula" className={styles.label}>Número de Matrícula:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id="matricula"
                            placeholder="Digite seu Número de Matrícula"
                            value={loginParams.username}
                            onChange={(e) => setLoginParams({ ...loginParams, username: e.target.value })}
                            required />
                        <span className={styles.icon}><i className="bi bi-envelope-fill" /></span>
                    </div>

                    <label htmlFor="password" className={styles.label}>Senha:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            id="password"
                            placeholder="Digite sua senha"
                            value={loginParams.password}
                            onChange={(e) => setLoginParams({ ...loginParams, password: e.target.value })}
                            required />
                        <span className={styles.icon}><i className="bi bi-lock-fill" /></span>
                    </div>

                    <button className={styles.btn} type='submit' disabled={loading}>
                        {loading ? "Entrando..." : "Entrar"}
                    </button>

                    {mensagem && <p className='text-center pt-3'>{mensagem}</p>}

                    <p className={styles.registerText}>
                        Esqueceu sua senha? Entre em <Link href="/contato">contato</Link> com a nossa secretaria.
                    </p>
                </form>
            </div>
        </div>
    )
}
