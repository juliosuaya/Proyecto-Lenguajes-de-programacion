/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
/* eslint-disable max-classes-per-file */
class Prop {
  /*
    Falta agregar para variable, y se puede controlar la altura aca y
     no en cada clase(tener cuidado con la recursividad)
    o separar Prop a otro lado.
    */
  static randomProp(rng, vars, maxHeight, minHeight) {
    switch (Math.floor(rng() * 5)) {
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

    const finalResult = [];
    table.forEach((values) => {
      finalResult.push([values, Prop.evalProp(prop, values)]);
    });
    return finalResult;
  }

  // Devuelve una tabla de verdad aleatoria
  static randomTruthTable(rng, vars) {
    const table = createTable(vars);
    const finalResult = [];
    table.forEach((values) => {
      const result = Math.floor(rng() * 2);
      if (result === 1) {
        finalResult.push([values, true]);
      } else {
        finalResult.push([values, false]);
      }
    });
    return finalResult;
  }

  static fitness(prop, truthTable) {
    let total = 0; let
      favorables = 0;
    truthTable.forEach((x) => {
      const values = x[0]; const
        truthValue = x[1];
      total += 1;
      if (Prop.evalProp(prop, values) === truthValue) {
        favorables += 1;
      }
    });
    return favorables / total;
  }

  static randomSearch(rng, truthTable, count, propArgs) {
    const steps = count; let step = 0; let bestProp = null; let
      bestFitness = -99999999999;
    while (bestFitness < 1 && step < steps) {
      step += 1;
      const prop = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight, propArgs.minHeight);
      const fitness = Prop.fitness(prop, truthTable);
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
      const randomNum = Math.floor(rng() * vars.length);
      const value = vars[randomNum];
      return new Variable(value);
    }

    return Prop.randomProp(rng, vars, maxHeight, minHeight);
  }

  evaluate(value) {
    return value[this.name];
  }

  countNodes() {
    return 1;
  }

  getChildNodes() {
    return [];
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1;
    if (randomNode[0] === 0) {
      return true;
    }
    return false;
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
    let left; let
      right;
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

  getChildNodes() {
    return [this.left, this.right];
  }

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    let res = false;
    res = this.left.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.left = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    res = this.right.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.right = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    return false;
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

  getChildNodes() {
    return [this.val];
  }

  countNodes() {
    return 1 + this.val.countNodes();
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    let res = false;
    res = this.val.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.val = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    return false;
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
    let left; let
      right;
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

  getChildNodes() {
    return [this.left, this.right];
  }

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    let res = false;
    res = this.left.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.left = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    res = this.right.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.right = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    return false;
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
    let left; let
      right;
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
    const leftValue = this.left.evaluate(value);
    const rightValue = this.right.evaluate(value);
    return !leftValue || rightValue;
  }

  getChildNodes() {
    return [this.left, this.right];
  }

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    let res = false;
    res = this.left.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.left = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    res = this.right.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.right = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    return false;
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
    let left; let
      right;
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
    const leftValue = this.left.evaluate(value);
    const rightValue = this.right.evaluate(value);

    return leftValue === rightValue;
  }

  getChildNodes() {
    return [this.left, this.right];
  }

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    let res = false;
    res = this.left.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.left = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    res = this.right.changeNode(rng, randomNode, height, propArgs);
    if (res === true) {
      this.right = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
      return false;
    }
    return false;
  }
}

function selectRandomProp(rng, vars, maxHeight, minHeight) {
  switch (Math.floor(rng() * 6)) {
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
  const table = [];
  const varsCount = vars.length;

  for (let y = 0; y < 2 ** varsCount; y++) {
    const l1 = {};
    for (let x = 0; x < varsCount; x++) {
      const jump = 2 ** x;
      const actualVar = vars[x];
      const res = Math.floor(y / jump);
      if (res % 2 === 0) {
        l1[actualVar] = false;
      } else {
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
