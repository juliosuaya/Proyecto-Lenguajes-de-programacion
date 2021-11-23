const { Prop } = require("./props")

class EvolutionStrategy {
    population = [];
    bestIndividual = null;

    initialPopulation(rng, vars, count, maxHeight, minHeight) {
        for (var x = 0; x < count; x++) {
            const individual = new Individual(Prop.randomProp(rng, vars, maxHeight, minHeight));
            this.population.push(individual);
        }
    }

    assessPopulation(truthTable) {
        this.population.forEach(individual => {
            individual.valuateFitness(truthTable);
        });
    }

    selection(rng, count) {


        //suma de todos los fitness
        //estaba al reves ya lo corregi
        const sumFitness = this.population.reduce((sum, individual) => sum + individual.fitness, 0);
        this.population.forEach((individual) => individual.calculateHeigth(sumFitness));
        let selected = [];

        for (count; count > 0; count--) {

            let randomProb = rng();

            for (let individual of this.population) {
                randomProb -= individual.weight;

                if (randomProb <= 0) {
                    selected.push(individual);
                    break;
                }
            }
        }
        this.population = selected;
    }

    mutation(rng, prop, propsArgs){

    }

    evolutionStrategy(rng, truthTable, steps, count, propArgs){
        let step = 0;
        this.initialPopulation(rng, propArgs.vars, 2, propArgs.maxHeight, propArgs.minHeight);
        this.assessPopulation(truthTable);
        while ( (this.bestIndividual.fitness < 1) && (step < steps) ) {
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