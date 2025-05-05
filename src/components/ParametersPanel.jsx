import React from "react";
import { RotateCcw, ArrowLeft, Compass } from "react-feather";

function ParametersPanel({
  peso,
  angulo,
  distancia,
  setPeso,
  setAngulo,
  setDistancia,
}) {
  return (
    <div className="card">
      <h2>
        <RotateCcw size={20} className="mr-2" />
        Parâmetros
      </h2>

      <div className="input-group">
        <label className="input-label">
          Peso (g)
        </label>
        <div className="input-row">
          <input
            type="number"
            min="0"
            max="2000"
            step="10"
            value={peso}
            onChange={(e) => setPeso(Number(e.target.value))}
            className="numeric-input"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          <Compass size={18} className="mr-1" />
          Ângulo (°)
        </label>
        <div className="input-row">
          <input
            type="range"
            min="0"
            max="180"
            step="1"
            value={angulo}
            onChange={(e) => setAngulo(Number(e.target.value))}
            className="slider-input"
          />
          <input
            type="number"
            min="0"
            max="180"
            value={angulo}
            onChange={(e) => setAngulo(Number(e.target.value))}
            className="numeric-input-small"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">
          <ArrowLeft size={18} className="mr-1" />
          Distância (cm)
        </label>
        <div className="input-row">
          <input
            type="number"
            min="1"
            max="20"
            step="1"
            value={distancia}
            onChange={(e) => setDistancia(Number(e.target.value))}
            className="numeric-input"
          />
        </div>
      </div>

      <style jsx>{`
        .card {
          background: #ffffff;
          border-radius: 8px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        h2 {
          display: flex;
          align-items: center;
          margin-top: 0;
          margin-bottom: 16px;
          font-size: 18px;
          color: #334155;
        }
        
        .input-group {
          margin-bottom: 16px;
        }
        
        .input-label {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          font-weight: 500;
          color: #475569;
        }
        
        .input-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .slider-input {
          flex: 1;
          height: 6px;
          -webkit-appearance: none;
          background: #e2e8f0;
          border-radius: 3px;
          outline: none;
        }
        
        .slider-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .numeric-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 14px;
          color: #334155;
        }
        
        .numeric-input-small {
          width: 70px;
          padding: 8px 12px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 14px;
          color: #334155;
        }
        
        .mr-1 {
          margin-right: 6px;
        }
        
        .mr-2 {
          margin-right: 8px;
        }
      `}</style>
    </div>
  );
}

export default ParametersPanel;