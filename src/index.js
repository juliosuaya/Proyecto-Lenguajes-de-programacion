const { Prop, Conjunction, Variable, Biconditional, Conditional, Disjunction } = require("./props");
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');

const props = new Prop();
const and = new Conjunction(new Variable("p"), new Variable("q"));
const biconditional = new Biconditional(and, new Variable("q"));
const conditional = new Conditional(biconditional, and);
const disjunction = new Disjunction(conditional, biconditional);
const value = { p: true, q: false };
const seed = null;
const randomProp = Prop.randomProp(rng, value, 5, 3);
console.log(props.evalProp(and, value));
console.log(props.evalProp(biconditional, value));
console.log(props.evalProp(conditional, value));
console.log(props.evalProp(disjunction, value));
console.log(props.evalProp(randomProp, value));
