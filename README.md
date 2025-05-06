# Calculadora de Torque Interativa

### Princípios Físicos

O torque (τ) é o produto da força (F) pela distância (d) ao ponto de rotação, considerando apenas a componente perpendicular da força:

τ = F⊥ × d

A componente perpendicular da força depende do ângulo de aplicação:

F⊥ = F × sin(θ)

Para o cálculo completo:
τ = m × g × sin(θ) × d

onde:

- m é a massa em kg
- g é a aceleração da gravidade (9,80665 m/s²)
- θ é o ângulo em relação à horizontal
- d é a distância em metros

### Conversões

- 1 kgf.cm = 0,0980665 N.m
- 1 g = 0,001 kg
- 1 cm = 0,01 m

## Tecnologias Utilizadas

- React.js
- React-Feather (ícones)
- CSS personalizado (sem frameworks)

## Estrutura do Projeto

- `src/components/`: Componentes React
- `src/utils/`: Funções utilitárias
- `src/styles.css`: Estilos globais

## Como Executar

1. Certifique-se de ter o Node.js instalado (versão 14 ou superior)
2. Clone o repositório:
   git clone https://github.com/seu-usuario/calculadora-torque.git
3. Entre na pasta do projeto:
   cd calculadora-torque
4. Instale as dependências:
   npm install
5. Inicie o servidor de desenvolvimento:
   npm start
6. Abra o navegador em `http://localhost:3000`

## Licença

MIT
