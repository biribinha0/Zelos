"use client"
import React, { useEffect, useState } from "react";
import styles from "./moderador.module.css";
import Link from "next/link";
import { getDecodedToken, isAuthenticated } from "@/utils/auth";
import axios from "axios";
import { API_URL } from "@/utils/api";


const Contato = () => {
    const [mensagem, setMensagem] = useState(null)
    const [bannerHref, setBannerHref] = useState('/login/usuario')


    const [formData, setFormData] = useState({
        tipo: 'feedback',
        nome: '',
        email: '',
        titulo: '',
        mensagem: ''
    })

    useEffect(() => {
        const isAuth = isAuthenticated();
        const decoded = getDecodedToken();
        setBannerHref(isAuth ? decoded.funcao === 'usuario'
            ? '/usuario/criar' : `/${decoded.funcao}/chamados` : 'login/usuario');

        if (decoded) {
            setFormData({
                ...formData,
                nome: decoded.nomeCompleto,
                email: decoded.email
            })
        }
    }, [])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleContato = (e) => {
        e.preventDefault();
        axios.post(`${API_URL}/publico/mensagem`, formData)
            .then((res) => {
                setMensagem('Mensagem de contato enviada com sucesso');
                setFormData({
                    ...formData,
                    titulo: '',
                    mensagem: ''
                })
            })
            .catch((err) => setMensagem('Erro ao enviar mensagem de contato'))
    }


    return (
        <>
            <div className="container-fluid p-0">

                <div className={`position-relative ${styles.bannerContato}`}>
                    
                    <img
                        src="/img/bannerContato.png"
                        className={`img-fluid px-20 d-none d-md-block ${styles.bannerContatoDesktop}`}
                        alt="Banner Desktop"
                    />

                    {/* Imagem para mobile (aparece só em sm/md-) */}
                    <img
                        src="/img/bannerContatoMobile.png"
                        className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerContatoMobile}`}
                        alt="Banner Mobile"
                    />
                </div>


                <div className={`${styles.espaco}`}></div>


                <div className="container my-3">
                    <div className={`row justify-content-center g-5 ${styles.formularioInformacoes}`}>
                        <div className="col-md-6">
                            <div className={`p-3  text-white text-break ${styles.formContato}`}>
                                <h6>Contate-nos</h6>
                                <h2 className="fw-bold fst-italic text-break">Entre em contato</h2>
                                <form onSubmit={handleContato}>
                                    <div className="mb-2">
                                        <label htmlFor="name" className="form-label fw-semibold text-break">Nome:</label>
                                        <input
                                            type="text"
                                            className="form-control bg-white bg-opacity-25 border-0 text-white"
                                            id="name"
                                            name="nome"
                                            value={formData.nome}
                                            onChange={handleChange}
                                            required
                                            placeholder="Insira seu nome completo"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label fw-semibold text-break">Email:</label>
                                        <input
                                            type="email"
                                            className="form-control bg-white bg-opacity-25 border-0 text-white"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                             placeholder="Insira seu email"
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="title" className="form-label fw-semibold text-break">Título:</label>
                                        <input
                                            type="text"
                                            className="form-control bg-white bg-opacity-25 border-0 text-white"
                                            id="titulo"
                                            name="titulo"
                                            value={formData.titulo}
                                            onChange={handleChange}
                                            required
                                            placeholder="Insira o título da sua mensagem"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label fw-semibold text-break">Mensagem:</label>
                                        <textarea
                                            className="form-control bg-white bg-opacity-25 border-0 text-white"
                                            id="mensagem"
                                            rows="3"
                                            name="mensagem"
                                            value={formData.mensagem}
                                            onChange={handleChange}
                                            required
                                            placeholder="Insira a mensagem a ser enviada"
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={`${styles.botaoContato}`} >ENVIAR</button>
                                    {mensagem}
                                </form>
                            </div>
                        </div>


                        <div className="col-md-6 d-flex flex-column justify-content-center gap-1">
                            <p className={`text-break ${styles.texto1Contato}`}>
                                Em caso de dúvidas ou suporte, entre em contato com nossa equipe para podemos te ajudar.
                            </p>
                            <div className="row text text-center fs-6 fw-semibold">
                                <div className="col-6 mb-2">
                                    <div className="mb-1 fs-3">
                                        <i className={`bi bi-telephone ${styles.iconeContato}`}></i>
                                    </div>
                                    <h5 className={`text-break ${styles.tituloContato}`}>Telefone</h5>
                                    <p className={`text-break ${styles.subtituloContato}`}>(11) 4227-7450</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="mb-1 fs-3">
                                        <i className={`bi bi-envelope ${styles.iconeContato}`}></i>
                                    </div>
                                    <h5 className={`text-break ${styles.tituloContato}`}>Email</h5>
                                    <p className={`text-break ${styles.subtituloContato}`}>senai@sp.senai.br</p>
                                </div>
                            </div>
                            <div className="row text text-center fs-6 fw-semibold">
                                <div className="col-6 mb-2">
                                    <div className="mb-1 fs-3">
                                        <i className={`bi bi-whatsapp ${styles.iconeContato}`}></i>
                                    </div>
                                    <h5 className={`text-break ${styles.tituloContato}`}>Whatsapp</h5>
                                    <p className={`text-break ${styles.subtituloContato}`}>(11) 9876-5432</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <div className="mb-1 fs-3">
                                        <i className={`bi bi-geo-alt ${styles.iconeContato}`}></i>
                                    </div>
                                    <h5 className={`text-break ${styles.tituloContato}`}>Endereço</h5>
                                    <p className={`text-break ${styles.subtituloContato}`}>R. Boa Vista, 825 - SCS</p>
                                </div>
                            </div>
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.7171624700615!2d-46.55207368541615!3d-23.62467498466467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce5c7d2f0d2d2d%3A0xb7a8a4c90d4f5b1d!2sR.%20Boa%20Vista%2C%20825%20-%20Boa%20Vista%2C%20S%C3%A3o%20Caetano%20do%20Sul%20-%20SP%2C%2009572-300!5e0!3m2!1spt-BR!2sbr!4v1628270400000!5m2!1spt-BR!2sbr"
  width="100%"
  height="190"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
/>


                        </div>
                    </div>
                </div>


               
                <div className={`position-relative ${styles.banner2Contato}`}>
                  
                    <img src="/img/banner2Contato.png" alt="Banner Desktop" className={`img-fluid px-20 d-none d-md-block ${styles.bannerContato2Desktop}`} />

                    
                    <img src="/img/bannerContato2Mobile.png" alt="Banner Mobile" className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerContato2Mobile}`} />

                   
                    <Link href={bannerHref}>
                        <button className={styles.botaoBannerContato}>COMECE AGORA</button>
                    </Link>
                </div>

            </div>




        </>
    );
};

export default Contato;


