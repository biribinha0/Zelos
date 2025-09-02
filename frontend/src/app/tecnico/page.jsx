'use client'

import styles from "./tecnico.module.css";
import Link from "next/link";
import Calendario from "@/components/calendario/Calendario.jsx"

export default function Tecnico() {
    return (
        <>
            {/* banner 1 */}
            <div className={`position-relative ${styles.bannerTecnico}`}>
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/bannerTecnico.png"
                    className={`img-fluid px-20 d-none d-md-block ${styles.bannerTecnicoDesk}`}
                    alt="BannerDesktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/bannerTecnicoMobile.png"
                    className={`img-fluid d-block d-md-none w-100 px-20 ${styles.bannerTecnicoMobile}`}
                    alt="Banner Mobile"
                />
            </div>

            {/* título para mostrar os status dos chamados */}
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-card-checklist mx-2 my-2"></i>
                    <span className="text-danger">
                        Status <span className="text-dark">dos chamados:</span>
                    </span>
                </h4>
            </div>


            <div className={`${styles.container}`}>
                <div className={styles.card}>
                    <img src="/img/imgChamadosTecnicos.png" className={styles.iconeChamados} alt="Chamados totais" />
                    <h3 className={`text-break ${styles.numero}`}>40</h3>
                    <p className={`text-break ${styles.texto}`}>Chamados totais</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgAndamentoTecnicos.png" className={styles.iconeChamados} alt="Em andamento" />
                    <h3 className={`text-break ${styles.numero}`}>22</h3>
                    <p className={`text-break ${styles.texto}`}>Em andamento</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgConcluidoTecnicos.png" className={styles.iconeChamados} alt="Concluído" />
                    <h3 className={`text-break ${styles.numero}`}>18</h3>
                    <p className={`text-break ${styles.texto}`}>Concluído</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgNaoIniciadoTecnicos.png" className={styles.iconeChamados} alt="Não iniciado" />
                    <h3 className={`text-break ${styles.numero}`}>10</h3>
                    <p className={`text-break ${styles.texto}`}>Não iniciado</p>
                </div>
            </div>

            {/* título para mostrar os chamados recentes */}
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i class="bi bi-stopwatch mx-2 my-2"></i>
                    <span className="text-dark">
                        Chamados <span className="text-danger">recentes:</span>
                    </span>
                </h4>
            </div>

            <div className={styles.containerTabela}>
                <table className={styles.tabela}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo de chamado</th>
                            <th>Título</th>
                            <th>Patrimônio</th>
                            <th>Status</th>
                            <th>Usuário</th>
                            <th>Data de Abertura</th>
                            <th>Última Atualização</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>26</td>
                            <td>Apoio Técnico</td>
                            <td>Computador não liga</td>
                            <td>--</td>
                            <td className={styles.concluido}>concluído</td>
                            <td>Bernardo de Souza Madureira</td>
                            <td>10/07/2025 09:15</td>
                            <td>27/08/2025 01:26</td>
                            <td>
                                <a href="#" className={styles.link}>Ver Detalhes</a><br />
                                <span className={styles.check}>✓ Concluído</span>
                            </td>
                        </tr>
                        <tr>
                            <td>36</td>
                            <td>Apoio Técnico</td>
                            <td>Impressora travada</td>
                            <td>--</td>
                            <td className={styles.andamento}>em andamento</td>
                            <td>Bernardo de Souza Madureira</td>
                            <td>26/07/2025 09:10</td>
                            <td>26/08/2025 12:22</td>
                            <td>
                                <a href="#" className={styles.link}>Ver Detalhes</a><br />
                                <button className={styles.btnConcluir}>Concluir</button>
                            </td>
                        </tr>
                        <tr>
                            <td>42</td>
                            <td>Apoio Técnico</td>
                            <td>Problema no monitor</td>
                            <td>--</td>
                            <td className={styles.andamento}>em andamento</td>
                            <td>Bernardo de Souza Madureira</td>
                            <td>01/08/2025 14:10</td>
                            <td>26/08/2025 12:22</td>
                            <td>
                                <a href="#" className={styles.link}>Ver Detalhes</a><br />
                                <button className={styles.btnConcluir}>Concluir</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* título para mostrar os chamados recentes */}
            <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-calendar-check mx-2 my-2"></i>
                    <span className="text-dark">
                        Confira seu <span className="text-danger">calendário:</span>
                    </span>
                </h4>
            </div>

            <Calendario />

            {/* banner 2 */}
            <div className={`position-relative ${styles.banner2Tecnico}`}>
                {/* Imagem para desktop (aparece só em md+) */}
                <img
                    src="/img/banner2Tecnico.png"
                    className={`img-fluid px-20 d-none d-md-block ${styles.banner2TecnicoDesktop}`}
                    alt="Banner Desktop"
                />

                {/* Imagem para mobile (aparece só em sm/md-) */}
                <img
                    src="/img/banner2TecnicoMobile.png"
                    className={`img-fluid d-block d-md-none w-100 px-20 ${styles.banner2TecnicoMobile}`}
                    alt="Banner Mobile"
                />
            </div>

        </>
    )
}