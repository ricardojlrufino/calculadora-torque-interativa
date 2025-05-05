import React from "react";
import { GitMerge } from "react-feather";

function ResultsPanel({ torqueKgfCm, torqueNm }) {
  return (
    <div className="card">
      <h2>
        <GitMerge size={18} />
        Resultados
      </h2>

      <div className="grid grid-2col">
        <div className="result-card result-blue">
          <p className="result-label text-blue-600">Torque</p>
          <p className="result-value text-blue-700">{torqueKgfCm.toFixed(2)}</p>
          <p className="result-unit text-blue-600">kgf.cm</p>
        </div>

        <div className="result-card result-purple">
          <p className="result-label text-purple-600">Torque</p>
          <p className="result-value text-purple-700">{torqueNm.toFixed(3)}</p>
          <p className="result-unit text-purple-600">N.m</p>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3>Fórmulas:</h3>
        <div className="text-gray-600 text-sm space-y-1">
          <p>τ = F⊥ × d</p>
          <p>F⊥ = m × g × sin(θ)</p>
          <p>1 kgf.cm = 0,0980665 N.m</p>
        </div>
      </div>

      <div className="divider"></div>

      <div>
        <h3>Observações:</h3>
        <div className="text-gray-600 text-sm space-y-1">
          <p>• Torque máximo: quando ângulo = 90°</p>
          <p>• Torque zero: quando ângulo = 0° ou 180°</p>
          <p>• A força perpendicular varia com o seno do ângulo</p>
        </div>
      </div>
    </div>
  );
}

export default ResultsPanel;
