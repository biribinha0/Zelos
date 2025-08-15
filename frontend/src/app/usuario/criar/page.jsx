import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './criarChamado.css';


const MeuFormulario = () => {
  return (
    <div className="container-fluid position-relative">
      <div className="row position-relative" style={{ zIndex: 1 }}>
        <div className="col-md-6">
          <form style={{ padding: '40px', marginTop: '60px' }}>
            <h5 className="chamado">CHAMADOS</h5>
            <h1 className="titulo">Solicitar chamado</h1>
            <p className="subtitulo text-white">crie um chamado para sua necessidade</p>

            <h6 className="tituloInput">Número de patrimônio:</h6>
            <input type="text" className="form-control mb-3 inputCriar" placeholder="ex: 1234567894" />

            <h6 className="tituloInput">Tipo de chamado</h6>
            <select className="form-control mb-3 inputCriar">
              <option>Defeito</option>
              <option>Manutenção</option>
              <option>Falta de equipamento</option>
              <option>Outro</option>
            </select>

            <h6 className="tituloInput">Descrição do problema:</h6>
            <textarea className="form-control mb-3 inputCriar" rows="6"></textarea>

            <button type="submit" className="btn buttonC">
              solicitar
            </button>
          </form>
        </div>
        <div className="col-md-6"></div>
      </div>
    </div>
  );
};

export default MeuFormulario;
