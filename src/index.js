const { Prop, Negation, Conjunction, Variable, Biconditional, Conditional, Disjunction } = require("./props");
var seedrandom = require('seedrandom');
const { EvolutionStrategy } = require("./evolutionStrategy");
var rng = seedrandom('hello.');

// Props
const variableP = new Variable("p");
const variableQ = new Variable("q");
const and = new Conjunction(variableP, variableQ);
const biconditional = new Biconditional(and, variableQ);
const conditional = new Conditional(biconditional, and);
const disjunction = new Disjunction(conditional, biconditional);

// Variables
const vars_p = ["p"];
const vars = ["p", "q"];
const value = { p: true, q: false };
const vars_t = ["p", "q", "t"];
const propArgs = {
    vars: vars_t,
    minHeight: 3,
    maxHeight: 5
};
const propArgs2 = {
    vars: ["a", "b", "c"],
    minHeight: 3,
    maxHeight: 5
};


// Pruebas para la fase 0
console.log("PRUEBAS DE randomProp y evalProp");

const randomProp = Prop.randomProp(rng, vars, 5, 3);
console.log(Prop.evalProp(and, value));
console.log(Prop.evalProp(biconditional, value));
console.log(Prop.evalProp(conditional, value));
console.log(Prop.evalProp(disjunction, value));
console.log(Prop.evalProp(randomProp, value));

console.log("\nPRUEBAS DE truthTable");
console.log(Prop.truthTable(variableP, vars_p));
console.log(Prop.truthTable(and,vars_t))


// Pruebas para la fase 1
console.log("\nPRUEBAS DE randomTruthTable");
const randomTruthTable = Prop.randomTruthTable(rng, vars_t);
console.log(randomTruthTable);

console.log("\nPRUEBAS DE fitness");
console.log(Prop.fitness(variableP, randomTruthTable));
console.log(Prop.fitness(and, Prop.truthTable(and,vars_t)));
console.log(Prop.fitness(variableP, Prop.truthTable(variableP, vars_p)));

console.log("\nPRUEBAS DE randomSearch");
const bestFitness = Prop.randomSearch(rng, randomTruthTable, 10000, propArgs);
console.log(Prop.fitness(bestFitness, randomTruthTable));

const randomTruthTable2 = Prop.randomTruthTable(rng,propArgs2.vars);
const bestFitness2 = Prop.randomSearch(rng, randomTruthTable2, 300000, propArgs2);
console.log(Prop.fitness(bestFitness2, randomTruthTable2));


// Pruebas para la fase 2
console.log("\nPRUEBAS DE POPULATION");
const evolutionStrategy = new EvolutionStrategy;
console.log("\nINITIAL POPULATION");
evolutionStrategy.initialPopulation(rng, vars_t, 3, 5, 3);
console.log(evolutionStrategy.population);

console.log("\nASSESS POPULATION");
evolutionStrategy.assessPopulation(Prop.truthTable(and, vars));
console.log(evolutionStrategy.population);

console.log("\nSELECTION");
evolutionStrategy.selection(rng,2);
console.log(evolutionStrategy.population);
