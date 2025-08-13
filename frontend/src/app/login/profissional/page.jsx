"use client";
import axios from 'axios';
import styles from './login.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { setToken, getDecodedToken, getToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/utils/api';

export default function LoginProfissional() {
    const router = useRouter();
    const [loginParams, setLoginParams] = useState({
        username: '',
        password: ''
    })
    useEffect(() => {
        const token = getToken();
        if (token) {
            const decoded = getDecodedToken();
            alert('Você Já está logado');
            router.push(decoded.funcao)
        }
    }, [])
    const handleLogin = async () => {
        try {
            axios.post(`${API_URL}/auth/entrar`, loginParams, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
                .then(function (response) {
                    setToken(response.data.token)
                    const decoded = getDecodedToken()
                    setLoginParams({ username: '', password: '' })
                    router.push(`/${decoded.funcao}`)
                })
                .catch(function (error) {
                    console.log(error);
                });

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className={styles.loginBackground}>
                <div className={styles.loginContainer}>
                    <h2>Login</h2>
                    <form action={handleLogin}>
                        <label htmlFor="email" className={styles.label}>Email :</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                id="email"
                                placeholder="Digite seu Email"
                                value={loginParams.username}
                                onChange={(e) => setLoginParams({ ...loginParams, username: e.target.value })}
                                required />
                            <span className={styles.icon}><i className="bi bi-envelope-fill" />
                            </span>
                        </div>

                        <label htmlFor="password" className={styles.label}>Senha:</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="password"
                                id="password"
                                placeholder="Digite sua senha"
                                value={loginParams.senha}
                                onChange={(e) => setLoginParams({ ...loginParams, password: e.target.value })}
                                required />
                            <span className={styles.icon}><i className="bi bi-lock-fill" />
                            </span>
                        </div>
                        <button className={styles.btn} type='submit'>Entrar</button>

                        <p className={styles.registerText}>
                            Esqueceu sua senha? Entre em <Link href="/contato">contato</Link> com a nossa secretaria.
                        </p>
                    </form>
                </div>
            </div>

        </>
    )
}