import React from "react";
import styles from "./moderador.module.css";
import Link from "next/link";

const Contato = () => {
    return (
        <>
            <div className="container-fluid p-0">

                <div className={`position-relative ${styles.bannerContato}`}>
                    {/* Imagem para desktop (aparece só em md+) */}
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
                                <form>
                                    <div className="mb-2">
                                        <label htmlFor="name" className="form-label fw-semibold text-break">Nome:</label>
                                        <input type="text" className="form-control bg-white bg-opacity-25 border-0 text-white" id="name" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="email" className="form-label fw-semibold text-break">Email:</label>
                                        <input type="email" className="form-control bg-white bg-opacity-25 border-0 text-white" id="email" />
                                    </div>
                                    <div className="mb-2">
                                        <label htmlFor="title" className="form-label fw-semibold text-break">Título:</label>
                                        <input type="text" className="form-control bg-white bg-opacity-25 border-0 text-white" id="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label fw-semibold text-break">Mensagem:</label>
                                        <textarea className="form-control bg-white bg-opacity-25 border-0 text-white" id="message" rows="3" ></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-outline-light w-100 fw-bold text-break" >ENVIAR</button>
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
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>


                {/* banner 2 */}
                <div className={`position-relative ${styles.banner2Contato}`}>
                    {/* Imagem para desktop */}
                    <img src="/img/banner2Contato.png" alt="Banner Desktop" className={`img-fluid px-20 d-none d-md-block ${styles.bannerContato2Desktop}`}  />

                    {/* Imagem para mobile */}
                    <img src="/img/bannerContato2Mobile.png" alt="Banner Mobile" className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerContato2Mobile}`} />

                    {/* Botão sobre a imagem */}
                    <Link href="/login/usuario">
                        <button className={styles.botaoBannerContato}>COMECE AGORA</button>
                    </Link>
                </div>

            </div>




        </>
    );
};

export default Contato;


