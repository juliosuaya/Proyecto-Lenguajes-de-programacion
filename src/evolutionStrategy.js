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
  }

  assessPopulation(truthTable) {
    this.population.forEach((individual) => {
      individual.valuateFitness(truthTable);
    });
  }

  selection(rng, count) {
    // suma de todos los fitness
    console.log(this.population);
    // estaba al reves ya lo corregi
    const sumFitness = this.population.reduce((sum, individual) => sum + individual.fitness, 0);
    console.log('SUMFITNESS', sumFitness);
    this.population.forEach((individual) => individual.calculateHeigth(sumFitness));
    const selected = [

    ];

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

  /*mutation(rng, prop, propArgs) {
    let randomNumber = Math.floor(rng() * prop.countNodes());
    let height = 0;
    let actualNode = prop;
    while (randomNumber != 0) {
      let nodesList = actualNode.getChildNodes();
      if (nodesList.length > 0) {
        actualNode = nodesList[0];
      }
      nodesList.forEach(node => {
        if (randomNumber != 0) {
          randomNumber -= 1;
          actualNode = node;
        }
      });
      height += 1;
    }
    const newNode = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
    console.log(actualNode);
    const newProp = prop.changeNode(actualNode, newNode);
    console.log(newProp);
    return newProp;
  }*/

  mutation(rng, prop, propArgs) {
    let randomNode = Math.floor(rng() * prop.countNodes());
    console.log("PRIMER RANDOMICO");
    console.log(randomNode);
    // tengo dudas de si la altura maxima de esta nueva expresion comienza de 0, 
    // o si debemos considerarla desde la raiz del arbol (tomando en cuenta height)
    let newProp = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
    let mutationProp = prop.changeNode(randomNode, newProp);
    console.log(mutationProp);
    return mutationProp;
  }

  evolutionStrategy(rng, truthTable, steps, count, propArgs) {
    let step = 0;
    this.initialPopulation(rng, propArgs.vars, 2, propArgs.maxHeight, propArgs.minHeight);
    this.assessPopulation(truthTable);
    while ((this.bestIndividual.fitness < 1) && (step < steps)) {
      step += 1;
      this.selection();
      this.mutation();
      this.assessPopulation();
      // tomar el mejor individuo de la poblacion
    }
    return this.bestIndividual;
  }
}

class Individual {
  prop;

  fitness = null;

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

exports.EvolutionStrategy = EvolutionStrategy;
