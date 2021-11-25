/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
const seedrandom = require('seedrandom');
const { Prop, Conjunction, Disjunction, Variable } = require('./props');
const rng = seedrandom('hello.');

const propArgs = {
    vars: ["p", "q", "t"],
    minHeight: 2,
    maxHeight: 2,
};
const values = { p: true, q: false, t: true };

test('RandomProp', () => {
    const prop = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
    let nodes = prop.countNodes();
    // Como la altura maxima y minima es 2, tiene 3 nodos.
    expect(nodes).toBe(3);
});

test('EvalProp', () => {
    const or = new Disjunction(new Variable("p"), new Variable("q"));
    const prop = new Conjunction(or, new Variable("t"));
    const result = Prop.evalProp(prop, values);
    expect(result).toBe(true);
});

test('TruthTable', () => {
    const or = new Disjunction(new Variable("p"), new Variable("q"));
    const prop = new Conjunction(or, new Variable("t"));
    const truthTableresult = Prop.truthTable(prop, propArgs.vars);
    const truthTableExpected = [[{ p: false, q: false, t: false }, false], [{ p: true, q: false, t: false }, false],
    [{ p: false, q: true, t: false }, false], [{ p: true, q: true, t: false }, false],
    [{ p: false, q: false, t: true }, false], [{ p: true, q: false, t: true }, true],
    [{ p: false, q: true, t: true }, true], [{ p: true, q: true, t: true }, true]];
    expect(truthTableresult).toStrictEqual(truthTableExpected);
});