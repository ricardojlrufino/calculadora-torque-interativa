import React from 'react';
import { RotateCcw, ArrowLeft, Compass, Scale } from "react-feather";

function TorqueDiagram({ peso, angulo, distancia, torqueKgfCm, torqueNm, setPeso, setAngulo, setDistancia }) {
  // Ângulo para posicionar o vetor força
  const anguloRad = angulo * Math.PI / 180;
  
  // Centro do diagrama
  const centerX = 300;
  const centerY = 180;
  
  // Definir distância fixa de 300px para visualização, independente do valor
  const distanciaFixa = 15; // 30 * 10 = 300px
  
  // Calcular posição do objeto baseado no ângulo e distância fixa
  const objectX = centerX + distanciaFixa * 10 * Math.cos(anguloRad - Math.PI/2);
  const objectY = centerY + distanciaFixa * 10 * Math.sin(anguloRad - Math.PI/2);
  
  // Intensidade da força perpendicular (máxima em 90°)
  const forcaPerp = Math.sin(anguloRad);
  
  // Usar o valor real da distância para os cálculos de torque, mas usar uma visualização fixa
  
  // Determinar cor do torque baseada na intensidade (mais intenso = mais brilhante)
  const getTorqueColor = () => {
    const intensidade = Math.abs(forcaPerp);
    if (intensidade > 0.9) return "#0284c7"; // Quase máximo (90°)
    if (intensidade > 0.7) return "#0ea5e9"; // Forte
    if (intensidade > 0.5) return "#38bdf8"; // Médio
    if (intensidade > 0.2) return "#7dd3fc"; // Fraco
    return "#bae6fd";                        // Muito fraco (próximo de 0° ou 180°)
  };

  // Determinar comprimento da seta perpendicular baseado na intensidade
  const getForceLength = () => {
    return 100 * Math.abs(forcaPerp); 
  };
  
  // Determinar direção do torque (horário ou anti-horário)
  const direcaoTorque = Math.sign(forcaPerp);
  
  return (
    <div className="h-full flex items-center justify-center" >
      <svg viewBox="0 0 600 360" >
        {/* Fundo com grid leve */}
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
        </pattern>
        <rect width="600" height="360" fill="#fafafa" />
        <rect width="600" height="360" fill="url(#smallGrid)" />
        
        {/* Círculo de referência para o ângulo */}
        <circle cx={centerX} cy={centerY} r={distanciaFixa * 10} stroke="#cbd5e1" strokeWidth="0.8" strokeDasharray="3,3" fill="none" />
        
        {/* Linha horizontal de referência */}
        <line 
          x1={centerX} 
          y1={centerY} 
          x2={centerX + distanciaFixa * 10} 
          y2={centerY} 
          stroke="#94a3b8" 
          strokeWidth="0.8" 
          strokeDasharray="4,2" 
        />
        
        {/* Base/Suporte */}
        <rect x={centerX - 80} y={centerY + 70} width="160" height="20" fill="#9ca3af" rx="2" />
        <rect x={centerX - 20} y={centerY + 20} width="40" height="50" fill="#6b7280" rx="2" />
        
        {/* Braço de alavanca (do motor ao objeto) */}
        <line 
          x1={centerX} 
          y1={centerY} 
          x2={objectX} 
          y2={objectY} 
          stroke="#0f172a" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
        
        {/* Rótulo da distância no braço */}
        <text 
          x={(centerX + objectX) / 2 + (objectY > centerY ? 10 : -10)} 
          y={(centerY + objectY) / 2 + (objectX > centerX ? 10 : -10)} 
          fill="#0f172a" 
          fontWeight="bold"
          fontSize="10"
          textAnchor="middle"
        >
          {distancia} cm
        </text>
        
        {/* Motor (círculo central) */}
        <g>
          <circle cx={centerX} cy={centerY} r="25" fill="#3b82f6" />
          <circle cx={centerX} cy={centerY} r="20" fill="#60a5fa" />
          <circle cx={centerX} cy={centerY} r="10" fill="#2563eb" />
          <circle cx={centerX} cy={centerY} r="3" fill="#1e40af" />
          
          {/* Rótulo do motor */}
          <rect x={centerX - 30} y={centerY - 60} width="60" height="18" rx="3" fill="white" stroke="#3b82f6" strokeWidth="1.2" />
          <text x={centerX} y={centerY - 48} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3b82f6">MOTOR</text>
          
          {/* Texto explicativo para o motor */}
          <text x={centerX} y={centerY - 63} textAnchor="middle" fontSize="8" fill="#3b82f6" fontStyle="italic">
            Ponto de rotação fixo
          </text>
        </g>
        
        {/* Eixo de rotação (com indicação de rotação) */}
        <circle cx={centerX} cy={centerY} r="30" fill="none" stroke="#3b82f6" strokeWidth="0.8" strokeDasharray="3,3" />
        
        {/* Objeto na extremidade */}
        <g>
          <rect x={objectX - 15} y={objectY - 15} width="30" height="30" rx="3" fill="#f97316" />
          <text x={objectX} y={objectY - 3} textAnchor="middle" fontSize="9" fontWeight="bold" fill="white">PESO</text>
          <text x={objectX} y={objectY + 8} textAnchor="middle" fontSize="7" fill="white">{peso}g</text>
        </g>
        
        {/* Indicador do ângulo */}
        <path 
          d={`M ${centerX},${centerY - 20} 
              A 20 20 0 ${angulo > 180 ? 1 : 0} 1 
              ${centerX + 20 * Math.cos((angulo - 90) * Math.PI / 180)},
              ${centerY + 20 * Math.sin((angulo - 90) * Math.PI / 180)}`} 
          fill="none" 
          stroke="#ef4444" 
          strokeWidth="2" 
        />
        
        {/* Texto do ângulo */}
        <text 
          x={centerX - 10 } 
          y={centerY - 5 } 
          fill="#ef4444"
          fontWeight="bold"
          fontSize="12"
        >
          {angulo}°
        </text>
        
        {/* Texto explicativo para o ângulo 
        <text 
          x={centerX + 35 * Math.cos((angulo - 90) / 2 * Math.PI / 180)} 
          y={centerY + 40 * Math.sin((angulo - 90) / 2 * Math.PI / 180)} 
          fill="#8b5cf6" 
          fontSize="8" 
          fontStyle="italic"
        >
          Ângulo da aplicação
        </text>
        */}
        
        {/* VETORES DE FORÇAS */}
        {/* 1. Vetor da força peso */}
        <g>
          <line 
            x1={objectX} 
            y1={objectY + 10} 
            x2={objectX} 
            y2={objectY + 35} 
            stroke="#ef4444" 
            strokeWidth="1.8" 
            markerEnd="url(#arrowhead-red)" 
          />
          
          {/* Texto da força peso */}
          <text 
            x={objectX + 15} 
            y={objectY + 25} 
            fill="#ef4444" 
            fontWeight="bold"
            fontSize="9"
          >
            F<tspan fontSize="7" dy="2">P</tspan> = {(peso * 0.001 * 9.81).toFixed(1)}N
          </text>
          
          {/* Descrição da força peso */}
          <text 
            x={objectX + 15} 
            y={objectY + 32} 
            fill="#ef4444" 
            fontSize="7"
            fontStyle="italic"
          >
            Força peso sempre vertical
          </text>
        </g>
        
        {/* 2. Vetor da força aplicada *
        <g>
          <line 
            x1={objectX} 
            y1={objectY - 15} 
            x2={objectX - 25 * Math.cos(anguloRad)} 
            y2={objectY - 30 * Math.sin(anguloRad)} 
            stroke="#8b5cf6" 
            strokeWidth="1.5" 
            markerEnd="url(#arrowhead-purple)" 
          />
          
          {/* Texto da força aplicada 
          <text 
            x={objectX - 27 * Math.cos(anguloRad) - 8} 
            y={objectY - 27 * Math.sin(anguloRad) - 8} 
            fill="#8b5cf6" 
            fontWeight="bold"
            fontSize="9"
          >
            F<tspan fontSize="6" dy="2">a</tspan>
          </text>
        </g>
        */}
        
        {/* 3. Componente perpendicular da força - MELHORADA */}
        <g>
          <line 
            x1={objectX} 
            y1={objectY} 
            x2={objectX - getForceLength() * forcaPerp} 
            y2={objectY} 
            stroke="#10b981" 
            strokeWidth="2" 
            markerEnd="url(#arrowhead-green)" 
          />
          
          {/* Texto da força perpendicular */}
          <text 
            x={objectX - 38 } 
            y={objectY - 8} 
            fill="#10b981" 
            fontWeight="bold"
            fontSize="9"
            textAnchor="middle"
          >
            F<tspan fontSize="6" dy="2">⊥</tspan> = {(peso * 0.001 * 9.81 * Math.abs(forcaPerp)).toFixed(1)}N
          </text>
          
          {/* Descrição da força perpendicular */}
          <text 
            x={objectX - getForceLength() * forcaPerp / 2} 
            y={objectY - 18} 
            fill="#10b981" 
            fontSize="7"
            fontStyle="italic"
            textAnchor="middle"
          >
            Componente que gera torque ({Math.round(Math.abs(forcaPerp) * 100)}%)
          </text>
          
          {/* Linha tracejada para mostrar a projeção da força */}
          {angulo !== 90 && angulo !== 0 && angulo !== 180 && (
            <line 
              x1={objectX - 25 * Math.cos(anguloRad)} 
              y1={objectY - 25 * Math.sin(anguloRad)} 
              x2={objectX - getForceLength() * forcaPerp} 
              y2={objectY} 
              stroke="#10b981" 
              strokeWidth="0.8" 
              strokeDasharray="2,2" 
            />
          )}


        </g>
        
        {/* Indicador de torque com gradiente de cor */}
        {forcaPerp !== 0 && (
          <g>
            {/* Seta de torque (arco mostrando a direção) - com cor baseada na intensidade */}
            <path 
              d={`M ${centerX + 35 * (direcaoTorque > 0 ? 1 : -1)},${centerY} 
                  A 35,35 0 0,${direcaoTorque > 0 ? 0 : 1} 
                  ${centerX},${centerY - 35 * (direcaoTorque > 0 ? 1 : -1)}`} 
              fill="none" 
              stroke={getTorqueColor()} 
              strokeWidth="2" 
              markerEnd="url(#arrowhead-blue)" 
            />
            
            {/* Texto de eficiência do torque */}
            <text 
              x={centerX - 120} 
              y={centerY - 10} 
              fill={getTorqueColor()} 
              fontWeight="bold"
              fontSize="10"
            >
              Eficiência: {Math.round(Math.abs(forcaPerp) * 100)}%
            </text>
            
            {/* Texto suplementar sobre a eficiência */}
            <text 
              x={centerX - 120} 
              y={centerY} 
              fill={getTorqueColor()} 
              fontSize="8"
              fontStyle="italic"
            >
              {angulo === 90 ? "Máxima (90°)" : 
               angulo === 0 || angulo === 180 ? "Mínima (0° ou 180°)" : 
               Math.abs(forcaPerp) > 0.9 ? "Quase máxima" :
               Math.abs(forcaPerp) > 0.7 ? "Alta" :
               Math.abs(forcaPerp) > 0.5 ? "Média" :
               Math.abs(forcaPerp) > 0.2 ? "Baixa" : "Muito baixa"}
            </text>
          </g>
        )}
        
        {/* Indicação do torque resultante */}
        <g transform={`translate(${centerX - 140}, ${centerY - 115})`}>
          <rect x="15" y="0" width="250" height="42" rx="4" fill={getTorqueColor()} fillOpacity="0.2" stroke={getTorqueColor()} strokeWidth="1.2" />
          <text x="140" y="17" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0c4a6e">TORQUE RESULTANTE</text>
          <text x="140" y="33" fontSize="15" fontWeight="bold" textAnchor="middle" fill={getTorqueColor()}>
            {torqueKgfCm.toFixed(1)} kgf·cm = {torqueNm.toFixed(3)} N·m
          </text>
        </g>
        
        {/* Equação do torque */}
        <g transform={`translate(${centerX - 70}, ${centerY + 100})`}>
          <rect x="0" y="0" width="140" height="35" rx="4" fill="white" stroke="#64748b" strokeWidth="0.8" />
          <text x="70" y="23" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#64748b">
            τ = F<tspan fontSize="10" dy="3">⊥</tspan> × d
          </text>
        </g>
        
        {/* Painel de Parâmetros (substituindo as legendas) */}
        <foreignObject x="5" y="5" width="160" height="250">
          <div xmlns="http://www.w3.org/1999/xhtml">
            <div style={{
              background: '#ffffff',
              borderRadius: '6px',
              padding: '8px',
              boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              fontFamily: 'Arial, sans-serif',
              fontSize: '10px'
            }}>
              <h3 style={{
                display: 'flex',
                alignItems: 'center',
                margin: '0 0 8px 0',
                fontSize: '12px',
                color: '#334155',
                fontWeight: 'bold'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{marginRight: '4px'}}>
                  <path d="M23 4v10c0 1.1-.9 2-2 2h-3l-4 4v-4H3c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Parâmetros
              </h3>
              
              {/* Peso */}
              <div style={{marginBottom: '10px'}}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '3px',
                  fontWeight: '500',
                  color: '#475569',
                  fontSize: '10px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{marginRight: '3px'}}>
                    <path d="M12 2l-8 4v12l8 4 8-4V6l-8-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Peso (g)
                </label>
                <input 
                  type="number" 
                  min="0"
                  max="2000"
                  step="10"
                  value={peso}
                  onChange={(e) => setPeso(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '3px 6px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '3px',
                    fontSize: '10px',
                    color: '#334155'
                  }}
                />
              </div>
              
              {/* Distância */}
              <div style={{marginBottom: '10px'}}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '3px',
                  fontWeight: '500',
                  color: '#475569',
                  fontSize: '10px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{marginRight: '3px'}}>
                    <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Distância (cm)
                </label>
                <input 
                  type="number" 
                  min="1"
                  step="1"
                  value={distancia}
                  onChange={(e) => setDistancia(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '3px 6px',
                    border: '1px solid #cbd5e1',
                    borderRadius: '3px',
                    fontSize: '10px',
                    color: '#334155'
                  }}
                />
              </div>

              {/* Ângulo */}
              <div style={{marginBottom: '10px'}}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '3px',
                  fontWeight: '500',
                  color: '#475569',
                  fontSize: '10px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{marginRight: '3px'}}>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Ângulo (°)
                </label>
                <div >
                  <input 
                    type="range" 
                    min="0"
                    max="180"
                    step="1"
                    value={angulo}
                    onChange={(e) => setAngulo(Number(e.target.value))}
                    style={{
                      width: '150px',
                      height: '4px',
                      WebkitAppearance: 'none',
                      background: '#e2e8f0',
                      borderRadius: '2px',
                      marginBottom: '3px',
                      outline: 'none'
                    }}
                  />
                  <input 
                    type="number" 
                    min="0"
                    max="180"
                    value={angulo}
                    onChange={(e) => setAngulo(Number(e.target.value))}
                    style={{
                      width: '60px',
                      padding: '2px 4px',
                      border: '1px solid #cbd5e1',
                      borderRadius: '3px',
                      fontSize: '10px',
                      color: '#334155'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </foreignObject>
        
        {/* Definições de marcadores de seta - AJUSTADOS (pontas menores) */}
        <defs>
          <marker 
            id="arrowhead-red" 
            markerWidth="6" 
            markerHeight="5" 
            refX="5" 
            refY="2.5" 
            orient="auto"
          >
            <polygon points="0 0, 6 2.5, 0 5" fill="#ef4444" />
          </marker>
          <marker 
            id="arrowhead-purple" 
            markerWidth="6" 
            markerHeight="5" 
            refX="5" 
            refY="2.5" 
            orient="auto"
          >
            <polygon points="0 0, 6 2.5, 0 5" fill="#8b5cf6" />
          </marker>
          <marker 
            id="arrowhead-green" 
            markerWidth="6" 
            markerHeight="5" 
            refX="5" 
            refY="2.5" 
            orient="auto"
          >
            <polygon points="0 0, 6 2.5, 0 5" fill="#10b981" />
          </marker>
          <marker 
            id="arrowhead-blue" 
            markerWidth="6" 
            markerHeight="5" 
            refX="5" 
            refY="2.5" 
            orient="auto"
          >
            <polygon points="0 0, 6 2.5, 0 5" fill="#0ea5e9" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default TorqueDiagram;