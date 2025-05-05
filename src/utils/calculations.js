// Constantes para conversão
export const GRAVIDADE = 9.80665; // m/s²
export const KGF_PARA_NEWTON = 9.80665; // 1 kgf = 9.80665 N
export const GRAMAS_PARA_KG = 0.001; // 1 g = 0.001 kg
export const CM_PARA_M = 0.01; // 1 cm = 0.01 m

/**
 * Calcula o torque com base nos parâmetros de entrada.
 * @param {number} peso - O peso em gramas.
 * @param {number} angulo - O ângulo em graus.
 * @param {number} distancia - A distância em centímetros.
 * @returns {Object} - Os valores de torque calculados.
 */
export function calcularTorque(peso, angulo, distancia) {
  // Converter gramas para kg
  const pesoKg = peso * GRAMAS_PARA_KG;

  // Converter ângulo para radianos
  const anguloRad = (angulo * Math.PI) / 180;

  // Calcular a força perpendicular (F = m * g * sin(θ))
  const forcaKgf = pesoKg * Math.sin(anguloRad);

  // Calcular torque em kgf.cm
  const torqueEmKgfCm = forcaKgf * distancia;

  // Converter para N.m
  // 1 kgf.cm = 0.0980665 N.m
  const torqueEmNm = torqueEmKgfCm * KGF_PARA_NEWTON * CM_PARA_M;

  return {
    kgfCm: torqueEmKgfCm,
    nm: torqueEmNm,
    forcaPerp: Math.sin(anguloRad),
  };
}
