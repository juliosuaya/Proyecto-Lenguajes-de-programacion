/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const seedrandom = require('seedrandom');
const { Prop, Variable, Conjunction } = require('./props');
const { EvolutionStrategy } = require('./evolutionStrategy');

const rng = seedrandom('hello.');

const workingStrategyInstance = new EvolutionStrategy();
const vars = ['p', 'q', 't'];
const propArgs = {
  vars: ['p', 'q', 't'],
  minHeight: 3,
  maxHeight: 5,
};

test('init population', () => {
  const count = 5;
  const maxHeight = 5;
  const minHeight = 3;
  workingStrategyInstance.initialPopulation(rng, vars, count, maxHeight, minHeight);
  expect(workingStrategyInstance.population.length).toBe(count);
});

test('assessPopulation', () => {
  workingStrategyInstance.assessPopulation(Prop.randomTruthTable(rng, vars));
  workingStrategyInstance.population.forEach((ind) => {
    expect(ind.fitness !== null).toBe(true);
  });
});

test('selection', () => {
  workingStrategyInstance.selection(rng, 3);
  expect(workingStrategyInstance.population.length).toBe(3);
});

test('Mutation test1', () => {
  const variableH = new Variable('H');
  const propExpected = workingStrategyInstance.mutation(rng, variableH, propArgs);
  const resReceived = JSON.stringify(propExpected) === JSON.stringify(variableH);
  expect(resReceived).toBe(false);
});

test('Mutation test2', () => {
  const or = new Conjunction(new Variable('h'), new Variable('r'));
  const propExpected = workingStrategyInstance.mutation(rng, or, propArgs);
  const resReceived = JSON.stringify(propExpected) === JSON.stringify(or);
  expect(resReceived).toBe(false);
});

test('Mutation test3', () => {
  const randomProp = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
  const randomPropExpected = workingStrategyInstance.mutation(rng, randomProp, propArgs);
  const resReceived = JSON.stringify(randomPropExpected) === JSON.stringify(randomProp);
  expect(resReceived).toBe(false);
});

test('EvolutionStrategy', () => {
  const result = workingStrategyInstance
    .evolutionStrategy(rng, Prop.randomTruthTable(rng, vars), 167, 50, propArgs);
  const bestProp = result[0];
  const { fitness } = bestProp;
  console.log(`Cantidad de pasos: ${result[1]}`);
  expect(fitness).toBe(1);
});
