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

// Pruebas para la fase 0
console.log('PRUEBAS DE randomProp y evalProp');

const randomProp = Prop.randomProp(rng, vars, 5, 3);
console.log(Prop.evalProp(and, value));
console.log(Prop.evalProp(biconditional, value));
console.log(Prop.evalProp(conditional, value));
console.log(Prop.evalProp(disjunction, value));
console.log(Prop.evalProp(randomProp, value));

console.log('\nPRUEBAS DE truthTable');
console.log(Prop.truthTable(variableP, vars_p));
console.log(Prop.truthTable(and, vars_t));

// Pruebas para la fase 1
console.log('\nPRUEBAS DE randomTruthTable');
const randomTruthTable = Prop.randomTruthTable(rng, vars_t);
console.log(randomTruthTable);

console.log('\nPRUEBAS DE fitness');
console.log(Prop.fitness(variableP, randomTruthTable));
console.log(Prop.fitness(and, Prop.truthTable(and, vars_t)));
console.log(Prop.fitness(variableP, Prop.truthTable(variableP, vars_p)));

console.log('\nPRUEBAS DE randomSearch');
const bestFitness = Prop.randomSearch(rng, randomTruthTable, 10000, propArgs);
console.log(Prop.fitness(bestFitness, randomTruthTable));

const randomTruthTable2 = Prop.randomTruthTable(rng, propArgs2.vars);
const bestFitness2 = Prop.randomSearch(rng, randomTruthTable2, 300000, propArgs2);
console.log(Prop.fitness(bestFitness2, randomTruthTable2));

// Pruebas para la fase 2
console.log('\nPRUEBAS DE POPULATION');
const evolutionStrategy = new EvolutionStrategy();
console.log('\nINITIAL POPULATION');
evolutionStrategy.initialPopulation(rng, vars_t, 3, 5, 3);
console.log(evolutionStrategy.population);

console.log('\nASSESS POPULATION');
evolutionStrategy.assessPopulation(Prop.truthTable(and, vars));
console.log(evolutionStrategy.population);

console.log('\nSELECTION');
evolutionStrategy.selection(rng, 2);
console.log(evolutionStrategy.population);

console.log('\nMUTATION TEST1');

const variableH = new Variable('H');
console.log(variableH);
const z = evolutionStrategy.mutation(rng, variableH, propArgs);
console.log(z);

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

console.log('\nEVOLUTION STRATEGY TEST');
const propArgsEvStrategy = {
  vars: ['a', 'b', 'c'],
  minHeight: 3,
  maxHeight: 5,
};
const truthTableEvStrategy = Prop.randomTruthTable(rng, propArgsEvStrategy.vars);
const evStrategy = new EvolutionStrategy();

let sum = 0;
let count = 0;
for (count = 0; count < 100; count += 1) {
  const bestIndividual = Prop.randomSearch(rng, truthTableEvStrategy, 9999999, propArgsEvStrategy);
  //console.log(bestIndividual);
  sum += bestIndividual[1];
}
console.log("PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, RANDOM SEARCH");
console.log(sum / count);

sum = 0;
count = 0;
for (count = 0; count < 100; count += 1) {
  const bestIndividual = evStrategy.evolutionStrategy(rng, truthTableEvStrategy, 9999999, 50, propArgsEvStrategy);
 // console.log(bestIndividual);
  sum += bestIndividual[1];
}
console.log("PROMEDIO DE PASOS PARA HALLAR LA EXPRESION CON MEJOR FITNESS, TOMANDO UNA POBLACION INICIAL DE 50, ESTRATEGIA EVOLUTIVA");
console.log(sum / count);
