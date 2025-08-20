import styles from "./sobreHome.module.css";

export default function SobreHome() {
    return (
        <>
            <div className={`container-fluid ${styles.sobreHome}`}>
                <div className="row">
                    <div className="col-md-6 d-flex justify-center align-items-center">
                        <img src="/img/logoSobreHome.png" className={`img-fluid`} alt="..." />
                    </div>
                    <div className="col-md-6 p-5">
                        <div className={`accordion accordion-flush ${styles.perguntasFrequentes}`} id="accordionFlushExample">
                            <div className={`${styles.perguntasFrequentesTitulo}`}>
                                <h3>Perguntas Frequentes</h3>
                            </div>
                            <div className={`accordion-item pt-3 ${styles.backgroundAccordionHome} ${styles.accordionItemBorderHome}`}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed ${styles.backgroundAccordionHome}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseOne"
                                    >
                                        Como solicito o serviço de manutenção de um equipamento?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseOne"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        O pedido deve ser feito diretamente pelo sistema de chamados da instituição, acessando a área de manutenção. Basta selecionar a categoria do problema, descrever a situação e enviar o chamado.
                                    </div>
                                </div>
                            </div>
                            <div className={`accordion-item ${styles.accordionItemBorderHome} ${styles.backgroundAccordionHome}`}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed ${styles.backgroundAccordionHome}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseTwo"
                                    >
                                        Qual o prazo médio para atendimento e conserto?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        O prazo varia de acordo com a gravidade e o tipo de solicitação. Pequenos reparos costumam ser atendidos em até 48 horas, enquanto manutenções mais complexas podem levar de 3 a 7 dias úteis se não houver necessidade de subtituição ou troca de peças.
                                    </div>
                                </div>
                            </div>
                            <div className={`accordion-item ${styles.accordionItemBorderHome} ${styles.backgroundAccordionHome}`}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed ${styles.backgroundAccordionHome}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseThree"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseThree"
                                    >
                                        Quais são os tipos de consertos disponíveis?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseThree"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        Realizamos reparos em equipamentos físicos (mesas, cadeiras, portas, iluminação, climatização etc.), suporte técnico em sistemas internos, rede de internet e dispositivos de uso institucional, além de auxílio externo e na limpeza. 
                                    </div>
                                </div>
                            </div>
                            <div className={`accordion-item ${styles.accordionItemBorderHome} ${styles.backgroundAccordionHome}`}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed ${styles.backgroundAccordionHome}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFour"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseFour"
                                    >
                                        Existe algum custo para os serviços de manutenção?
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseFour"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body text-justify">
                                        Não. Todos os serviços são internos e oferecidos gratuitamente pelo SENAI para manter o bom funcionamento dos espaços e equipamentos. Esse sistema não tem como objetivo cobrar o funcionário, mas permitir que consertos sejam feitos sem burocracia, proporcionando agilidade, eficiência e praticidade na jornada de trabalho mesmo diante de imprevistos.
                                    </div>
                                </div>
                            </div>
                            <div className={`accordion-item ${styles.accordionItemBorderHome} ${styles.backgroundAccordionHome}`}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button collapsed ${styles.backgroundAccordionHome}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseFive"
                                        aria-expanded="false"
                                        aria-controls="flush-collapseFive"
                                    >
                                        O que devo fazer se o equipamento apresentar o mesmo problema após o conserto?
                                        
                                    </button>
                                </h2>
                                <div
                                    id="flush-collapseFive"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionFlushExample"
                                >
                                    <div className="accordion-body">
                                        Nesse caso, é importante abrir um novo chamado relatando que o problema persiste. Nossa equipe irá priorizar o atendimento e realizar a revisão necessária sem nenhum custo adicional.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}