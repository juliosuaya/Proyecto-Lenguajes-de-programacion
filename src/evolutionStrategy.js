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
        console.log(this.population);
        //estaba al reves ya lo corregi
        const sumFitness = this.population.reduce((sum,individual) => sum + individual.fitness, 0);
        console.log("SUMFITNESS",sumFitness)
        this.population.forEach((individual) => individual.calculateHeigth(sumFitness));
        let selected = [];

        for (count; count > 0; count--) {

            let randomProb = rng();
//            console.log("random number", rng());

            for(let individual of this.population){
  //              console.log("working with ", individual);
                randomProb -= individual.weight;
    //            console.log("new random number", randomProb);

                if (randomProb <= 0) {
      //              console.log("individual selected");
                    selected.push(individual);
                    break;
                }
            }
        }
        this.population = selected;
    }
}

class Individual {
    prop;
    fitness = null;
    weight = 0;

    calculateHeigth(total) {
        this.weight = this.fitness  / total;
    }
    constructor(prop) {
        this.prop = prop;
    }
    valuateFitness(truthTable) {
        this.fitness = Prop.fitness(this.prop, truthTable);
    }
}

exports.EvolutionStrategy = EvolutionStrategy;