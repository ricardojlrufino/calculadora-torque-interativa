import React from 'react';

function TorqueDiagram({ peso, angulo, distancia, torqueKgfCm, torqueNm }) {
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
    return 20 * Math.abs(forcaPerp); // Reduzido de 25 para 20
  };
  
  // Determinar direção do torque (horário ou anti-horário)
  const direcaoTorque = Math.sign(forcaPerp);
  
  return (
    <div className="h-full flex items-center justify-center">
      <svg viewBox="0 0 600 360" width="100%" height="100%">
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
          <rect x={centerX - 30} y={centerY - 45} width="60" height="18" rx="3" fill="white" stroke="#3b82f6" strokeWidth="1.2" />
          <text x={centerX} y={centerY - 32} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3b82f6">MOTOR</text>
          
          {/* Texto explicativo para o motor */}
          <text x={centerX} y={centerY - 55} textAnchor="middle" fontSize="8" fill="#3b82f6" fontStyle="italic">
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
          
          {/* Texto explicativo para o objeto */}
          <text x={objectX + 35} y={objectY - 25} textAnchor="start" fontSize="8" fill="#f97316" fontStyle="italic">
            Objeto onde a força é aplicada
          </text>
        </g>
        
        {/* Indicador do ângulo */}
        <path 
          d={`M ${centerX},${centerY - 20} 
              A 20 20 0 ${angulo > 180 ? 1 : 0} 1 
              ${centerX + 20 * Math.cos((angulo - 90) * Math.PI / 180)},
              ${centerY + 20 * Math.sin((angulo - 90) * Math.PI / 180)}`} 
          fill="none" 
          stroke="#8b5cf6" 
          strokeWidth="2" 
        />
        
        {/* Texto do ângulo */}
        <text 
          x={centerX + 30 * Math.cos((angulo - 90) / 2 * Math.PI / 180)} 
          y={centerY + 30 * Math.sin((angulo - 90) / 2 * Math.PI / 180)} 
          fill="#8b5cf6" 
          fontWeight="bold"
          fontSize="12"
        >
          {angulo}°
        </text>
        
        {/* Texto explicativo para o ângulo */}
        <text 
          x={centerX + 35 * Math.cos((angulo - 90) / 2 * Math.PI / 180)} 
          y={centerY + 40 * Math.sin((angulo - 90) / 2 * Math.PI / 180)} 
          fill="#8b5cf6" 
          fontSize="8" 
          fontStyle="italic"
        >
          Ângulo da aplicação
        </text>
        
        {/* VETORES DE FORÇAS */}
        {/* 1. Vetor da força peso */}
        <g>
          <line 
            x1={objectX} 
            y1={objectY} 
            x2={objectX} 
            y2={objectY + 25} 
            stroke="#ef4444" 
            strokeWidth="1.8" 
            markerEnd="url(#arrowhead-red)" 
          />
          
          {/* Texto da força peso */}
          <text 
            x={objectX + 15} 
            y={objectY + 15} 
            fill="#ef4444" 
            fontWeight="bold"
            fontSize="9"
          >
            F<tspan fontSize="7" dy="2">P</tspan> = {(peso * 0.001 * 9.81).toFixed(1)}N
          </text>
          
          {/* Descrição da força peso */}
          <text 
            x={objectX + 15} 
            y={objectY + 27} 
            fill="#ef4444" 
            fontSize="7"
            fontStyle="italic"
          >
            Força peso sempre vertical
          </text>
        </g>
        
        {/* 2. Vetor da força aplicada */}
        <g>
          <line 
            x1={objectX} 
            y1={objectY} 
            x2={objectX - 25 * Math.cos(anguloRad)} 
            y2={objectY - 25 * Math.sin(anguloRad)} 
            stroke="#8b5cf6" 
            strokeWidth="1.5" 
            markerEnd="url(#arrowhead-purple)" 
          />
          
          {/* Texto da força aplicada */}
          <text 
            x={objectX - 25 * Math.cos(anguloRad) - 8} 
            y={objectY - 25 * Math.sin(anguloRad) - 8} 
            fill="#8b5cf6" 
            fontWeight="bold"
            fontSize="9"
          >
            F<tspan fontSize="6" dy="2">a</tspan>
          </text>
        </g>
        
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
            x={objectX - getForceLength() * forcaPerp / 2} 
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
            y={objectY + 12} 
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
              x={centerX + 60} 
              y={centerY - 60} 
              fill={getTorqueColor()} 
              fontWeight="bold"
              fontSize="10"
            >
              Eficiência: {Math.round(Math.abs(forcaPerp) * 100)}%
            </text>
            
            {/* Texto suplementar sobre a eficiência */}
            <text 
              x={centerX + 60} 
              y={centerY - 48} 
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
          <rect x="0" y="0" width="280" height="42" rx="4" fill={getTorqueColor()} fillOpacity="0.2" stroke={getTorqueColor()} strokeWidth="1.2" />
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
        
        {/* Legendas melhoradas */}
        <g transform="translate(20, 20)" className="legend">
          <rect x="0" y="0" width="145" height="125" rx="4" fill="white" stroke="#cbd5e1" strokeWidth="1" />
          <text x="72" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#64748b">LEGENDAS</text>
          
          <line x1="12" y1="35" x2="35" y2="35" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
          <text x="40" y="38" fontSize="9" fill="#0f172a" textAnchor="start">Braço de Alavanca</text>
          
          <line x1="12" y1="55" x2="35" y2="55" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" markerEnd="url(#arrowhead-red)" />
          <text x="40" y="58" fontSize="9" fill="#ef4444" textAnchor="start">Força Peso</text>
          
          <line x1="12" y1="75" x2="35" y2="75" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" markerEnd="url(#arrowhead-purple)" />
          <text x="40" y="78" fontSize="9" fill="#8b5cf6" textAnchor="start">Força Aplicada</text>
          
          <line x1="12" y1="95" x2="35" y2="95" stroke="#10b981" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowhead-green)" />
          <text x="40" y="98" fontSize="9" fill="#10b981" textAnchor="start">Força Perpendicular</text>
          
          <path d="M 12,115 A 12,12 0 0,1 24,103" fill="none" stroke="#0ea5e9" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
          <text x="40" y="118" fontSize="9" fill="#0ea5e9" textAnchor="start">Torque Resultante</text>
        </g>
        
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