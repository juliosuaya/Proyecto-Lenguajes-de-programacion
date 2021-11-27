const seedrandom = require('seedrandom');
const {
  Prop, Conjunction, Disjunction, Variable,
} = require('./props');

const rng = seedrandom('hello.');

const propArgs = {
  vars: ['p', 'q', 't'],
  minHeight: 2,
  maxHeight: 2,
};
const propArgsHeight0 = {
  vars: ['p', 'q', 't'],
  minHeight: 0,
  maxHeight: 0,
};
const values = { p: true, q: false, t: true };

test('RandomProp', () => {
  const prop = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
  const nodes = prop.countNodes();
  // Como la altura maxima y minima es 2, tiene 3 nodos.
  expect(nodes).toBe(3);
});

test('RandomProp Variable altura 0', () => {
  const prop = Prop.randomProp(rng, propArgsHeight0.vars, propArgsHeight0.maxHeight, propArgsHeight0.minHeight);
  const nodes = prop.countNodes();
  // Como la altura maxima y minima es 0, tiene 1 nodo.
  expect(nodes).toBe(1);
});

test('EvalProp', () => {
  const or = new Disjunction(new Variable('p'), new Variable('q'));
  const prop = new Conjunction(or, new Variable('t'));
  const result = Prop.evalProp(prop, values);
  // ((p OR q) AND t) -> ((true OR false) AND true) = true
  expect(result).toBe(true);
});

test('TruthTable', () => {
  const or = new Disjunction(new Variable('p'), new Variable('q'));
  const prop = new Conjunction(or, new Variable('t'));
  const truthTableresult = Prop.truthTable(prop, propArgs.vars);
  const truthTableExpected = [[{ p: false, q: false, t: false }, false], [{ p: true, q: false, t: false }, false],
    [{ p: false, q: true, t: false }, false], [{ p: true, q: true, t: false }, false],
    [{ p: false, q: false, t: true }, false], [{ p: true, q: false, t: true }, true],
    [{ p: false, q: true, t: true }, true], [{ p: true, q: true, t: true }, true]];
    // La tabla de verdad de la prop debe ser igual a la tabla de verdad esperada.
  expect(truthTableresult).toStrictEqual(truthTableExpected);
});

test('RandomTruthTable', () => {
  const randomTable = Prop.randomTruthTable(rng, propArgs.vars);
  const rows = randomTable.length;
  // Con 3 variables una tabla de verdad tiene 8 filas.
  expect(rows).toBe(8);
});

test('Fitness', () => {
  const or = new Disjunction(new Variable('p'), new Variable('q'));
  const prop = new Conjunction(or, new Variable('t'));
  const truthTableresult = Prop.truthTable(prop, propArgs.vars);
  const fitness = Prop.fitness(prop, truthTableresult);
  // Se espera que de 1 ya que se utiliza la tabla de verdad de la prop.
  expect(fitness).toBe(1);
});

test('RandomSearch', () => {
  const propArgs2 = {
    vars: ['p', 'q', 't'],
    minHeight: 2,
    maxHeight: 8,
  };
  const truthTableresult = Prop.randomTruthTable(rng, propArgs.vars);
  const result = Prop.randomSearch(rng, truthTableresult, 167, propArgs2);
  const fitness = Prop.fitness(result[0], truthTableresult);
  // Luego de buscar unas 167 props random, se llega a una con fitness = 1,
  // es decir, que se adapta a la tabla de verdad dada.
  console.log(`Cantidad de pasos: ${result[1]}`);
  expect(fitness).toBe(1);
});
