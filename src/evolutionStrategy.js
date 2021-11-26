/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
const { Prop } = require('./props');

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
    const selected = [];

    // eslint-disable-next-line no-param-reassign
    for (count; count > 0; count -= 1) {
      let randomProb = rng();

      // eslint-disable-next-line no-restricted-syntax
      for (const individual of this.population) {
        randomProb -= (individual.fitness / sumFitness); 
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
    const numberOfNodes = prop.countNodes();
    const randomNode = Math.floor(rng() * numberOfNodes) + 1;
    let res = null;
    if (randomNode === 1) {
      res = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
    } else {
      res = prop;
      res.changeNode(rng, [randomNode], 0, propArgs);
    }
    return res;
  }

  mutatePopulation(rng, propArgs, count) {
    for (let mutation = 0; mutation < count; mutation += 1) {
      let individual = this.population[mutation];
      let newProp = this.mutation(rng, individual.prop, propArgs);
      this.population[mutation] = new Individual(newProp);
    }
  }

  evolutionStrategy(rng, truthTable, steps, count, propArgs) {
    this.resetPopulation();
    let step = 0;
    this.initialPopulation(rng, propArgs.vars, count, propArgs.maxHeight, propArgs.minHeight);
    this.assessPopulation(truthTable);
    while ((this.bestIndividual.fitness < 1) && (step < steps)) {
      step += 1;
      // Esto es para la bitacora.
      // console.log("Paso actual: " + step);
      // console.log("Fitness maximo de la poblacion: " + this.bestIndividual.fitness);
      // console.log("Fitness minimo de la poblacion: " );    FALTA IMPLEMEBTAR
      // console.log("Fitness promedio de la poblacion: " );  FALTA IMPLEMEBTAR
      // console.log("Mejor individuo: " + this.bestIndividual);
      this.selection(rng, count);
      this.mutatePopulation(rng, propArgs, count);
      this.assessPopulation(truthTable);
    }
    return [this.bestIndividual, step];
  }

  resetPopulation() {
    this.population = [];
    this.bestIndividual = null;
  }
}

class Individual {
  prop;

  fitness = 0;

  constructor(prop) {
    this.prop = prop;
  }

  valuateFitness(truthTable) {
    this.fitness = Prop.fitness(this.prop, truthTable);
  }
}
exports.EvolutionStrategy = EvolutionStrategy;
