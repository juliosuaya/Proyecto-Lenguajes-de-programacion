/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
const seedrandom = require('seedrandom');
const { Prop } = require('./props');
const { EvolutionStrategy } = require('./evolutionStrategy');

const rng = seedrandom('hello.');

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
console.log('EXPERIMENTOS CON UNA VARIABLE');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable1Var, propArgs1Var);

console.log('\n---------------------------------------------------------------------------');
console.log('EXPERIMENTOS CON DOS VARIABLES');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable2Var, propArgs2Var);

console.log('\n---------------------------------------------------------------------------');
console.log('EXTRA 1 --> EXPERIMENTOS CON TRES VARIABLES');
console.log('---------------------------------------------------------------------------');

experiment(randomTruthTable3Var, propArgs3Var);

console.log('\n---------------------------------------------------------------------------');
console.log('EXTRA 2 --> UTILIZANDO TABLA DE VERDAD DE EXPRESION GENERADA AL AZAR');
console.log('---------------------------------------------------------------------------');

experiment(truthTableOfProp, propArgs3Var);

function experiment(truthTable, propArgs) {
  sum = 0;
  count = 0;
  console.log('\nRANDOM SEARCH');
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = Prop.randomSearch(rng, truthTable, 9999999, propArgs);
    sum += bestIndividual[1];
  }
  console.log('PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, RANDOM SEARCH');
  console.log(sum / count);

  console.log('\nEVOLUTION STRATEGY');
  sum = 0;
  count = 0;
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = evStrategy.evolutionStrategy(rng, truthTable, 9999999, 50, propArgs);
    sum += bestIndividual[1];
  }
  console.log('PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, POBLACION INICIAL DE 50, ESTRATEGIA EVOLUTIVA');
  console.log(sum / count);
}
