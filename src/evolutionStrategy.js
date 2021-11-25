/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
const { Prop, Variable } = require('./props');

class EvolutionStrategy {
  population = [];

  bestIndividual = null;

  initialPopulation(rng, vars, count, maxHeight, minHeight) {
    for (let x = 0; x < count; x += 1) {
      const individual = new Individual(Prop.randomProp(rng, vars, maxHeight, minHeight));
      this.population.push(individual);
    }
    // eslint-disable-next-line prefer-destructuring
    this.bestIndividual = this.population[0];
  }

  assessPopulation(truthTable) {
    this.population.forEach((individual) => {
      individual.valuateFitness(truthTable);
      if (this.bestIndividual.fitness < individual.fitness) {
        this.bestIndividual = individual;
      }
    });
  }

  selection(rng, count) {
    // suma de todos los fitness
    const sumFitness = this.population.reduce((sum, individual) => sum + individual.fitness, 0);
    this.population.forEach((individual) => individual.calculateHeigth(sumFitness));
    const selected = [];

    // eslint-disable-next-line no-param-reassign
    for (count; count > 0; count -= 1) {
      let randomProb = rng();

      // eslint-disable-next-line no-restricted-syntax
      for (const individual of this.population) {
        randomProb -= individual.weight;
        if (randomProb <= 0) {
          selected.push(individual);
          break;
        }
      }
    }
    this.population = selected;
  }

  // eslint-disable-next-line class-methods-use-this
  mutation(rng, prop, propArgs) {
    console.log("prop");
    const numberOfNodes = prop.countNodes();
    const randomNode = Math.floor(rng() * numberOfNodes) + 1;
    if (randomNode === 1) {
      const res = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
      return res;
    }
    prop.changeNode(rng, [randomNode], 0, propArgs);
    return prop;
  }

  mutatePopulation(rng, propArgs, count) {
    const actualPopulation = this.population.length;
    const newMutations = count - actualPopulation;
    for (let mutation = 0; mutation < newMutations; mutation += 1) {
      const individual = this.population[mutation % actualPopulation];
      const mutatedIndividual = this.mutation(rng, deepClone(individual), propArgs);
      this.population.push(mutatedIndividual);
    }
  }

  evolutionStrategy(rng, truthTable, steps, count, propArgs) {
    let step = 0;
    this.initialPopulation(rng, propArgs.vars, count, propArgs.maxHeight, propArgs.minHeight);
    this.assessPopulation(truthTable);
    while ((this.bestIndividual.fitness < 1) && (step < steps)) {
      step += 1;
      this.selection(rng, count / 2);
      this.mutatePopulation(rng, propArgs, count);
      this.assessPopulation(truthTable);
    }
    return this.bestIndividual;
  }
}

class Individual {
  prop;

  fitness = 0;

  weight = 0;

  calculateHeigth(total) {
    this.weight = this.fitness / total;
  }

  constructor(prop) {
    this.prop = prop;
  }

  valuateFitness(truthTable) {
    this.fitness = Prop.fitness(this.prop, truthTable);
  }
}

function deepClone(obj) {
  if (obj === null || typeof obj !== "object")
    return obj
  var props = Object.getOwnPropertyDescriptors(obj)
  for (var prop in props) {
    props[prop].value = deepClone(props[prop].value)
  }
  return Object.create(
    Object.getPrototypeOf(obj), 
    props
  )
}
exports.EvolutionStrategy = EvolutionStrategy;
