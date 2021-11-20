const { Prop, Negation, Conjunction, Variable, Biconditional, Conditional, Disjunction } = require("./props");
var seedrandom = require('seedrandom');
var rng = seedrandom('hello.');

const and = new Conjunction(new Variable("p"), new Variable("q"));
const biconditional = new Biconditional(and, new Variable("q"));
const conditional = new Conditional(biconditional, and);
const disjunction = new Disjunction(conditional, biconditional);

// Pruebas para el randomProp y evalProp
console.log("PRUEBAS DE randomProp y evalProp");
const vars = ["p", "q"];
const value = { p: true, q: false };

const randomProp = Prop.randomProp(rng, vars, 5, 3);
console.log(Prop.evalProp(and, value));
console.log(Prop.evalProp(biconditional, value));
console.log(Prop.evalProp(conditional, value));
console.log(Prop.evalProp(disjunction, value));
console.log(Prop.evalProp(randomProp, value));

// Pruebas para el truthTable
console.log("\nPRUEBAS DE truthTable");
const vars_p = ["p"];
const vars_t = ["p", "q", "t"];
console.log(Prop.truthTable(new Variable("p"), vars_p));
console.log(Prop.truthTable(and,vars_t))

// Pruebas para el randomTruthTable
console.log("\nPRUEBAS DE randomTruthTable");
const randomTruthTable = Prop.randomTruthTable(rng, vars_t);
console.log(randomTruthTable);


// Pruebas para el fitness
console.log("\nPRUEBAS DE fitness");
console.log(Prop.fitness(new Variable("p"), randomTruthTable));
console.log(Prop.fitness(and, Prop.truthTable(and,vars_t)));
console.log(Prop.fitness(new Variable("p"), Prop.truthTable(new Variable("p"), vars_p)));


// Pruebas para el randomSearch
console.log("\nPRUEBAS DE randomSearch");
const propArgs = {
    vars: vars_t,
    minHeight: 3,
    maxHeight: 5
};
const bestFitness = Prop.randomSearch(rng, randomTruthTable, 10000, propArgs);
console.log(Prop.fitness(bestFitness, randomTruthTable));

const propArgs2 = {
    vars: ["a", "b", "c"],
    minHeight: 3,
    maxHeight: 5
};
const randomTruthTable2 = Prop.randomTruthTable(rng,propArgs2.vars);
const bestFitness2 = Prop.randomSearch(rng, randomTruthTable2, 300000, propArgs2);
console.log(Prop.fitness(bestFitness2, randomTruthTable2));

// Pruebas para la fase 2
console.log("\nPRUEBAS DE POPULATION");
