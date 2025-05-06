import React, { useState, useEffect } from "react";
import ResultsPanel from "./ResultsPanel";
import TorqueDiagram from "./TorqueDiagram";
import { calcularTorque } from "../utils/calculations";

function TorqueCalculator() {
  // Estados para armazenar os valores de entrada
  const [peso, setPeso] = useState(500);
  const [angulo, setAngulo] = useState(90);
  const [distancia, setDistancia] = useState(10);

  // Estados para armazenar os resultados
  const [torqueKgfCm, setTorqueKgfCm] = useState(0);
  const [torqueNm, setTorqueNm] = useState(0);

  // Calcular o torque sempre que os valores mudarem
  useEffect(() => {
    const resultado = calcularTorque(peso, angulo, distancia);
    setTorqueKgfCm(resultado.kgfCm);
    setTorqueNm(resultado.nm);
  }, [peso, angulo, distancia]);

  return (
    <div className="calculator-container">

      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Calculadora de Torque Interativa
      </h1>

      {/* Diagrama de torque */}
      <div className="card">
        <div className="diagram-container">
          <TorqueDiagram
            peso={peso}
            angulo={angulo}
            distancia={distancia}
            torqueKgfCm={torqueKgfCm}
            torqueNm={torqueNm}
            setPeso={setPeso}
            setAngulo={setAngulo}
            setDistancia={setDistancia}
          />
        </div>
      </div>


      {/* Layout com entradas e resultados lado a lado */}
      <div className="grid grid-2col mb-6">
       
        <div className="card">
          <h3 className="font-medium text-gray-700 mb-2">Como funciona:</h3>
          <ul className="info-list">
            <li>
              O objeto (peso) posiciona-se no ângulo informado em relação ao motor
            </li>
            <li>A força peso sempre atua verticalmente para baixo (gravidade)</li>
            <li>
              A componente perpendicular da força é o que realmente gera o torque
            </li>
            <li>
              Quando o objeto está a 90°, toda a força peso é convertida em torque
            </li>
            <li>
              Experimente diferentes ângulos para verificar como o torque varia
            </li>
          </ul>
        </div>

       <ResultsPanel torqueKgfCm={torqueKgfCm} torqueNm={torqueNm} />
      </div>

    </div>
  );
}

export default TorqueCalculator;
