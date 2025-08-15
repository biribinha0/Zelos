
import React from 'react';
import './detalhesChamado.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const DetalhesChamado = () => {
    const cardWidth = 'min(800px, 98vw)'; 
    return (
        <div className="dc-outer d-flex align-items-center justify-content-center"> 
            <div className="dc-inner p-4" style={{ width: cardWidth }}>
                <div className="dc-header d-flex align-items-center mb-4"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" color="#4a4a4a">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                    </svg>
                    <div className="dc-title fs-4 fw-bold ms-2">Detalhes do</div>
                    <p className="m-2 dc-title2">chamado</p>
                </div>
                
                <div className="dc-grid row g-3"> 
                    <div className="dc-field col-12 col-md-6">
                        <label className="dc-label">Número do patrimônio:</label> 
                        <input className="form-control dc-input" type="text" defaultValue="LOTEF253484499445" /> 
                    </div> 
                    <div className="dc-field col-12 col-md-6"> 
                        <label className="dc-label">Status atual:</label>
                        <input className="form-control dc-input" type="text" defaultValue="pendente" />
                    </div> 
                    <div className="dc-field col-12 col-md-6"> 
                        <label className="dc-label">Tipo de chamado:</label>
                        <input className="form-control dc-input" type="text" defaultValue="defeito" />
                    </div> 
                    <div className="dc-field col-12 col-md-6"> 
                        <label className="dc-label">Descrição do chamado:</label>
                        <input className="form-control dc-input" type="text" defaultValue="peça faltando na cadeira" /> 
                    </div> 
                    <div className="dc-field col-12"> 
                        <label className="dc-label">Histórico:</label>
                        <textarea className="form-control dc-textarea" rows={4}></textarea> 
                    </div> 
                </div>
                
            </div> 
        </div>
    );
};

export default DetalhesChamado;
