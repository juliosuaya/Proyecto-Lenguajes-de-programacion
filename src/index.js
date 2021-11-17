const { Prop, Conjunction, Variable, Biconditional, Conditional, Disjunction } = require("./props");
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');

const props = new Prop();
const and = new Conjunction(new Variable("p"), new Variable("q"));
const biconditional = new Biconditional(and, new Variable("q"));
const conditional = new Conditional(biconditional, and);
const disjunction = new Disjunction(conditional, biconditional);

// Pruebas para el randomProp y evalProp
console.log("PRUEBAS DE randomProp y evalProp");
const vars = ["p", "q"];
const value = { p: true, q: false };
const seed = null;
const randomProp = Prop.randomProp(rng, vars, 5, 3);
console.log(props.evalProp(and, value));
console.log(props.evalProp(biconditional, value));
console.log(props.evalProp(conditional, value));
console.log(props.evalProp(disjunction, value));
console.log(props.evalProp(randomProp, value));

// Pruebas para el truthTable
console.log("\nPRUEBAS DE truthTable");
const vars_p = ["p"];
const vars_t = ["p", "q", "t"];
console.log(props.truthTable(new Variable("p"), vars_p));
console.log(props.truthTable(and,vars_t))
