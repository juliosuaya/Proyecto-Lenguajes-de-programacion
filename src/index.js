const seedrandom = require('seedrandom');
const { Prop } = require('./props');
const { EvolutionStrategy } = require('./evolutionStrategy');

const rng = seedrandom('hello.');
// Si se quiere imprimir la bitacora de los metodos se debe habilitar la siguiente bandera:
Prop.bitacora = false;
let sum = 0;
let count = 0;
const propArgs1Var = {
  vars: ['a'],
  minHeight: 1,
  maxHeight: 3,
};
const propArgs2Var = {
  vars: ['a', 'b'],
  minHeight: 2,
  maxHeight: 4,
};
const propArgs3Var = {
  vars: ['a', 'b', 'c'],
  minHeight: 3,
  maxHeight: 5,
};
const randomTruthTable1Var = Prop.randomTruthTable(rng, propArgs1Var.vars);
const randomTruthTable2Var = Prop.randomTruthTable(rng, propArgs2Var.vars);
const randomTruthTable3Var = Prop.randomTruthTable(rng, propArgs3Var.vars);
const prop = Prop
  .randomProp(rng, propArgs3Var.vars, propArgs3Var.maxHeight, propArgs3Var.minHeight);
const truthTableOfProp = Prop.truthTable(prop, propArgs3Var.vars);
const evStrategy = new EvolutionStrategy();

console.log('\n---------------------------------------------------------------------------');
console.log('Experimentos Con Una Variable');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable1Var, propArgs1Var);

console.log('\n---------------------------------------------------------------------------');
console.log('Experimentos Con Dos Variables');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable2Var, propArgs2Var);

console.log('\n---------------------------------------------------------------------------');
console.log('Extra 1 --> Experimentos Con Tres Variables');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable3Var, propArgs3Var);

console.log('\n---------------------------------------------------------------------------');
console.log('Extra 2 --> Utilizando Tabla De Verdad De Expresion Generada Al Azar');
console.log('---------------------------------------------------------------------------');

experiment(truthTableOfProp, propArgs3Var);

function experiment(truthTable, propArgs) {
  sum = 0;
  count = 0;
  console.log('\nRandom Search');
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = Prop.randomSearch(rng, truthTable, 9999999, propArgs);
    sum += bestIndividual[1];
  }
  console.log('Promedio De Pasos Para Hallar La Expresion Con Mejor Fitness, Random Search');
  console.log(sum / count);

  console.log('\nEvolution Strategy');
  sum = 0;
  count = 0;
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = evStrategy.evolutionStrategy(rng, truthTable, 9999999, 20, propArgs);
    sum += bestIndividual[1];
  }
  console.log('Promedio De Pasos Para Hallar La Expresion Con Mejor Fitness, Poblacion Inicial De 20, Estrategia Evolutiva');
  console.log(sum / count);
}
