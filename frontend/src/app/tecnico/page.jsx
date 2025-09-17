'use client'

import styles from "./tecnico.module.css";
import Link from "next/link";
import Calendario from "@/components/calendario/Calendario.jsx"
import { useEffect, useState } from "react";
import { getDecodedToken, getToken } from "@/utils/auth";
import axios from "axios";
import { API_URL } from "@/utils/api";
import Loading from "../loading";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { FecharChamadoModal } from "@/components/tecnico";
import useWindowWidth from '@/hooks/useWindowWidth';
import { CardChamadosResponsivoTec } from "@/components/tecnico";

export default function Tecnico() {
    const [chamados, setChamados] = useState([]);
    const [estatisticas, setEstatisticas] = useState([]);
    const [disponiveis, setDisponiveis] = useState([]);
    const token = getToken();
    const decoded = getDecodedToken();
    const [loading, setLoading] = useState(false);

    const width = useWindowWidth();

    useEffect(() => {
        setLoading(true);
        axios.get(`${API_URL}/tecnico/${decoded.id}/estatisticas`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("Estatisticas recebidas:", res.data);
                setEstatisticas(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar estatisticas:", err);
                setEstatisticas([]);
            })

        axios.post(`${API_URL}/tecnico/${decoded.id}/pool-chamadas`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                setDisponiveis(response.data)
            })

        axios.get(`${API_URL}/tecnico/${decoded.id}/chamados`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                console.log("Chamados recebidos:", res.data);
                setChamados(res.data);
            })
            .catch((err) => {
                console.error("Erro ao buscar chamados:", err);
                setChamados([]);
            })
            .finally(() => setLoading(false));
    }, []);

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
                    <h3 className={`text-break ${styles.numero}`}>{estatisticas.total_chamados}</h3>
                    <p className={`text-break ${styles.texto}`}>Chamados atuais</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgNaoIniciadoTecnicos.png" className={styles.iconeChamados} alt="Não iniciado" />
                    <h3 className={`text-break ${styles.numero}`}>{disponiveis.length}</h3>
                    <p className={`text-break ${styles.texto}`}>Não iniciado</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgAndamentoTecnicos.png" className={styles.iconeChamados} alt="Em andamento" />
                    <h3 className={`text-break ${styles.numero}`}>{estatisticas.em_andamento}</h3>
                    <p className={`text-break ${styles.texto}`}>Em andamento</p>
                </div>

                <div className={styles.card}>
                    <img src="/img/imgConcluidoTecnicos.png" className={styles.iconeChamados} alt="Concluído" />
                    <h3 className={`text-break ${styles.numero}`}>{estatisticas.concluidos}</h3>
                    <p className={`text-break ${styles.texto}`}>Concluídos</p>
                </div>


            </div>

            {/* título para mostrar os chamados recentes */}
            <div className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-stopwatch mx-2 my-2"></i>
                    <span className="text-dark">
                        Chamados <span className="text-danger">recentes:</span>
                    </span>
                </h4>
            </div>
            <div className="m-3 mt-0">
                {(chamados.length === 0 && loading) ? (
                    <Loading />
                ) : (
                    <div>
                        {width >= 992 ? (
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
                                        {chamados.slice(0, 3).map((chamado) => (
                                            <tr key={chamado.id}>
                                                <td className="text-center">{chamado.id}</td>
                                                <td>{chamado.pool}</td>
                                                <td className={`textTabela text-black-75 ${chamado.urgencia === 'Urgente' ? 'text-danger fw-bold' : ''}`}>{chamado.urgencia === 'Urgente' && <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>}{chamado.titulo}</td>
                                                <td className="text-center">{chamado.patrimonio ?? "--"}</td>
                                                <td
                                                    className={`fw-bold text-${chamado.status === "concluído"
                                                        ? "success"
                                                        : chamado.status === "pendente"
                                                            ? "danger"
                                                            : "warning"
                                                        } text-center`}
                                                >
                                                    {chamado.status}
                                                </td>
                                                <td>{chamado.usuario ?? "--"}</td>
                                                <td>{format(chamado.criado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                                <td>{format(chamado.atualizado_em, "dd/MM/yyyy HH:mm", { locale: ptBR })}</td>
                                                <td className="text-center">
                                                    <Link
                                                        href={`/tecnico/chamados/${chamado.id}`}
                                                        className="text-dark text-decoration-none fw-bold"
                                                    >
                                                        Ver Detalhes
                                                    </Link>
                                                    {chamado.status === "concluído" ? (
                                                        <p className="py-1 m-0">
                                                            <i className="bi bi-check-all text-success me-1"></i>
                                                            Concluído
                                                        </p>
                                                    ) : (
                                                        <FecharChamadoModal
                                                            chamado={chamado}
                                                            buttonStyle="btn btn-danger py-1 px-2 small w-100"
                                                            modalId={`FecharModal${chamado.id}`}
                                                        />
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            chamados.slice(0, 3).map((chamado) => (
                                <CardChamadosResponsivoTec key={chamado.id} chamado={chamado} />
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* título para mostrar o calendário */}
            {/* <div id="AdmEstatistica" className="dc-outer d-flex container my-5">
                <h4 className="fw-bold text-break">
                    <i className="bi bi-calendar-check mx-2 my-2"></i>
                    <span className="text-dark">
                        Confira seu <span className="text-danger">calendário:</span>
                    </span>
                </h4>
            </div> */}

            {/* <Calendario /> // Posteriormente, usar calendario para organizar prazos.  */}

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