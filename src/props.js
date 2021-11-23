class Prop {
    /* 
    Falta agregar para variable, y se puede controlar la altura aca y no en cada clase(tener cuidado con la recursividad)
    o separar Prop a otro lado.
    */
    static randomProp(rng, vars, maxHeight, minHeight) {
        switch (Math.round(rng() * 4)) {
            case 0:
                return Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            case 1:
                return Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            case 2:
                return Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            case 3:
                return Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            default:
                return Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }
    }

    static evalProp(prop, value) {
        return prop.evaluate(value);
    }

    static truthTable(prop, vars) {
        const table = createTable(vars);

        var finalResult = [];
        table.forEach(values => {
            finalResult.push([values, Prop.evalProp(prop, values)]);
        });
        return finalResult;

    }

    // Devuelve una tabla de verdad aleatoria
    static randomTruthTable(rng, vars) {
        const table = createTable(vars);
        const finalResult = [];
        table.forEach(values => {
            const result = Math.round(rng() * 2);
            if (result == 1) {
                finalResult.push([values, true]);
            } else {
                finalResult.push([values, false]);
            }
        });
        return finalResult;
    }

    static fitness(prop, truthTable) {
        let total = 0, favorables = 0;
        truthTable.forEach(x => {
            const values = x[0], truthValue = x[1];
            total += 1;
            if (Prop.evalProp(prop, values) === truthValue) {
                favorables += 1;
            }
         });
         return favorables/total;
    }

    static randomSearch(rng, truthTable, count, propArgs) {
        let steps = count, step = 0, bestProp = null, bestFitness = -99999999999;
        while (bestFitness <1 && step < steps) {
            step += 1;
            let prop = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
            let fitness = Prop.fitness(prop, truthTable);
            if (fitness > bestFitness) {
                bestProp = prop;
                bestFitness = fitness;
            }
        }
        return bestProp;
    }
}

class Variable extends Prop {
    name = null;

    constructor(varName) {
        super();
        this.name = varName;
    }
    static randomProp(rng, vars, maxHeight, minHeight) {
        if (minHeight <= 1) {
            const randomNum = Math.round(rng() * vars.length)
            const value = vars[randomNum]

            return new Variable(value);
        }
        else {
            return Prop.randomProp(rng, vars, maxHeight, minHeight);
        }
    }

    evaluate(value) {
        return value[this.name];
    }
}

class Conjunction extends Prop {

    left = null;
    right = null;

    constructor(leftProp, rightProp) {
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    static randomProp(rng, vars, maxHeight, minHeight) {
        let left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Conjunction(left, right);
        }
        left = selectRandomProp(rng, vars, maxHeight, minHeight);
        right = selectRandomProp(rng, vars, maxHeight, minHeight);
        return new Conjunction(left, right);
    }

    evaluate(value) {
        const leftValue = this.left.evaluate(value);
        const rightValue = this.right.evaluate(value);
        return leftValue && rightValue;
    }
}

class Negation extends Prop {

    val = null;

    constructor(value) {
        super();
        this.val = value;
    }

    static randomProp(rng, vars, maxHeight, minHeight) {
        return new Negation(Prop.randomProp(rng, vars, maxHeight - 1, minHeight - 1));
    }

    evaluate(value) {
        const boolValue = this.val.evaluate(value);
        return !boolValue;
    }
}

class Disjunction extends Prop {

    left = null;
    right = null;

    constructor(leftProp, rightProp) {
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    static randomProp(rng, vars, maxHeight, minHeight) {

        let left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Disjunction(left, right);
        }
        left = selectRandomProp(rng, vars, maxHeight, minHeight);
        right = selectRandomProp(rng, vars, maxHeight, minHeight);
        return new Disjunction(left, right);
    }

    evaluate(value) {
        const leftValue = this.left.evaluate(value);
        const rightValue = this.right.evaluate(value);
        return leftValue || rightValue;
    }
}

class Conditional extends Prop {

    left = null;
    right = null;

    constructor(leftProp, rightProp) {
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    static randomProp(rng, vars, maxHeight, minHeight) {

        let left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Conditional(left, right);
        }
        left = selectRandomProp(rng, vars, maxHeight, minHeight);
        right = selectRandomProp(rng, vars, maxHeight, minHeight);
        return new Conditional(left, right);
    }

    evaluate(value) {
        const leftValue = this.left.evaluate(value)
        const rightValue = this.right.evaluate(value)
        return !leftValue || rightValue;
    }
}

class Biconditional extends Prop {

    left = null;
    right = null;

    constructor(leftProp, rightProp) {
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    static randomProp(rng, vars, maxHeight, minHeight) {

        let left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Biconditional(left, right);
        }

        left = selectRandomProp(rng, vars, maxHeight, minHeight);
        right = selectRandomProp(rng, vars, maxHeight, minHeight);
        return new Biconditional(left, right);
    }

    evaluate(value) {
        const leftValue = this.left.evaluate(value)
        const rightValue = this.right.evaluate(value)

        return leftValue === rightValue
    }
}

function selectRandomProp(rng, vars, maxHeight, minHeight) {
    switch (Math.round(rng() * 5)) {
        case 0:
            return Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        case 1:
            return Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        case 2:
            return Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        case 3:
            return Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        case 4:
            return Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
        default:
            return Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

    }
}

function createTable(vars) {
    let table = [];
    const varsCount = vars.length;

    for (let y = 0; y < 2 ** varsCount; y++) {


        let l1 = {};
        for (let x = 0; x < varsCount; x++) {

            const jump = 2 ** x;
            const actualVar = vars[x];
            let res = Math.floor(y / jump);
            if (res % 2 === 0) {
                l1[actualVar] = false;
            }
            else {
                l1[actualVar] = true;
            }


        }
        table.push(l1);

    }
    return table;
}


exports.Prop = Prop;
exports.Variable = Variable;
exports.Conjunction = Conjunction;
exports.Biconditional = Biconditional;
exports.Conditional = Conditional;
exports.Disjunction = Disjunction;