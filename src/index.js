/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
const seedrandom = require('seedrandom');
const {
  Prop, Conjunction, Variable, Biconditional, Conditional, Disjunction,
} = require('./props');
const { EvolutionStrategy } = require('./evolutionStrategy');

const rng = seedrandom('hello.');
 /*
// Props
let variableP = new Variable('p');
let variableQ = new Variable('q');
let and = new Conjunction(variableP, variableQ);
let biconditional = new Biconditional(and, variableQ);
let conditional = new Conditional(biconditional, and);
let disjunction = new Disjunction(conditional, biconditional);

// Variables
const vars_p = ['p'];
const vars = ['p', 'q'];
const value = { p: true, q: false };
const vars_t = ['p', 'q', 't'];
const propArgs = {
  vars: vars_t,
  minHeight: 3,
  maxHeight: 5,
};
const propArgs2 = {
  vars: ['a', 'b', 'c'],
  minHeight: 3,
  maxHeight: 5,
};
const evolutionStrategy = new EvolutionStrategy();

// Pruebas para la fase 2

console.log('\nMUTATION TEST1');
const variableH = new Variable('H');
const propExpected = evolutionStrategy.mutation(rng, variableH, propArgs);
const resExpected = JSON.stringify(variableH)
console.log(JSON.stringify(propExpected) === resExpected);

console.log('\nMUTATION TEST2');
const randomProp3 = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
console.log(randomProp3);
let str3 = JSON.stringify(randomProp3);
const randomPropEvol3 = evolutionStrategy.mutation(rng, randomProp3, propArgs);
console.log(JSON.stringify(randomPropEvol3) === str3);

console.log('\nMUTATION TEST3');
const randomProp2 = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
let str2 = JSON.stringify(randomProp2);
const randomPropEvol2 = evolutionStrategy.mutation(rng, randomProp2, propArgs);
console.log(JSON.stringify(randomPropEvol2) === str2);

console.log('\nMUTATION TEST4');
const randomProp4 = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
let str4 = JSON.stringify(randomProp4);
const randomPropEvol4 = evolutionStrategy.mutation(rng, randomProp4, propArgs);
console.log(JSON.stringify(randomPropEvol4) === str4);

console.log('\nMUTATION TEST5');
const randomProp5 = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
let str5 = JSON.stringify(randomProp5);
const randomPropEvol5 = evolutionStrategy.mutation(rng, randomProp5, propArgs);
console.log(JSON.stringify(randomPropEvol5) === str5);*/

// Variables.
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
const prop = Prop.randomProp(rng, propArgs3Var.vars, propArgs3Var.maxHeight, propArgs3Var.minHeight);
const truthTableOfProp = Prop.truthTable(prop, propArgs3Var.vars);
const evStrategy = new EvolutionStrategy();

console.log("\n---------------------------------------------------------------------------")
console.log("EXPERIMENTOS CON UNA VARIABLE")
console.log("---------------------------------------------------------------------------")

experiment(randomTruthTable1Var, propArgs1Var);

console.log("\n---------------------------------------------------------------------------")
console.log("EXPERIMENTOS CON DOS VARIABLES")
console.log("---------------------------------------------------------------------------")

experiment(randomTruthTable2Var, propArgs2Var);

console.log("\n---------------------------------------------------------------------------")
console.log("EXTRA 1 --> EXPERIMENTOS CON TRES VARIABLES")
console.log("---------------------------------------------------------------------------")

experiment(randomTruthTable3Var, propArgs3Var);

console.log("\n---------------------------------------------------------------------------")
console.log("EXTRA 2 --> UTILIZANDO TABLA DE VERDAD DE EXPRESION GENERADA AL AZAR")
console.log("---------------------------------------------------------------------------")

experiment(truthTableOfProp, propArgs3Var);





function experiment(truthTable, propArgs) {
  sum = 0;
  count = 0;
  console.log('\nRANDOM SEARCH');
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = Prop.randomSearch(rng, truthTable, 9999999, propArgs);
    sum += bestIndividual[1];
  }
  console.log("PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, RANDOM SEARCH");
  console.log(sum / count);


  console.log("\nEVOLUTION STRATEGY");
  sum = 0;
  count = 0;
  for (count = 0; count < 100; count += 1) {
    const bestIndividual = evStrategy.evolutionStrategy(rng, truthTable, 9999999, 50, propArgs);
    sum += bestIndividual[1];
  }
  console.log("PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, POBLACION INICIAL DE 50, ESTRATEGIA EVOLUTIVA");
  console.log(sum / count);
}