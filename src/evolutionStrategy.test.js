/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const seedrandom = require('seedrandom');
const { Prop } = require('./props');
const { EvolutionStrategy } = require('./evolutionStrategy');
const rng = seedrandom('hello.');

const workingStrategyInstance = new EvolutionStrategy();
const vars = ['p', 'q', 't'];

test('must init poblation', () => {
  const count = 5;
  const maxHeight = 5;
  const minHeight = 3;
  workingStrategyInstance.initialPopulation(rng, vars, count, maxHeight, minHeight);
  expect(workingStrategyInstance.population.length).toBe(count);
});

test('must assessPopulation poblation', () => {
  workingStrategyInstance.assessPopulation(Prop.randomTruthTable(rng, vars));
  workingStrategyInstance.population.forEach(ind => {
    expect(ind.fitness !== null).toBe(true);
  });
});

test('must selection', () => {
  //console.log(workingStrategyInstance.population.length);
  //expect(workingStrategyInstance.population.length).toBe(5);
  workingStrategyInstance.selection(rng, 3);
  expect(workingStrategyInstance.population.length).toBe(3);
});