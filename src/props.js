class Prop {
  static bitacora = false;
  static randomProp(rng, vars, maxHeight, minHeight) {
    if (maxHeight == 0 || maxHeight == 1) {
      return Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1)
    }
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
      // Esto es para la bitacora.
      if (Prop.bitacora) {
        console.log(prop.unparse());
        console.log("\nFitness de la prop: " + fitness);
      }
      if (fitness > bestFitness) {
        bestProp = prop;
        bestFitness = fitness;
      }
    }
    return [bestProp, step];
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

  unparse() {
    return this.name;
  }

  // eslint-disable-next-line no-unused-vars
  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1;
    if (randomNode[0] === 0) {
      return true;
    }
    return false;
  }

  clone() {
    return new Variable(JSON.parse(JSON.stringify(this.name)));
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

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  unparse() {
    return " (" + this.left.unparse() + ") Conjuntion (" + this.right.unparse() + ") ";
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; 
    if (randomNode[0] === 0) {
      return true;
    }
    return checkBranches(rng, randomNode, height+1, propArgs, this);
  }

  clone() {
    return new Conjunction(this.left.clone(), this.right.clone());
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

  countNodes() {
    return 1 + this.val.countNodes();
  }

  unparse() {
    return "Negation(" + this.val.unparse() + ")";
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

  clone() {
    return new Negation(this.val.clone());
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

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  unparse() {
    return " (" + this.left.unparse() + ") Disjunction (" + this.right.unparse() + ") ";
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    return checkBranches(rng, randomNode, height, propArgs, this);
  }

  clone() {
    return new Disjunction(this.left.clone(), this.right.clone());
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

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  unparse() {
    return " (" + this.left.unparse() + ") Conditional (" + this.right.unparse() + ") ";
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    return checkBranches(rng, randomNode, height, propArgs, this);
  }

  clone() {
    return new Conditional(this.left.clone(), this.right.clone());
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

  countNodes() {
    return 1 + this.left.countNodes() + this.right.countNodes();
  }

  unparse() {
    return " (" + this.left.unparse() + ") Biconditional (" + this.right.unparse() + ") ";
  }

  changeNode(rng, randomNode, height, propArgs) {
    // eslint-disable-next-line no-param-reassign
    randomNode[0] -= 1; height += 1;
    if (randomNode[0] === 0) {
      return true;
    }
    return checkBranches(rng, randomNode, height, propArgs, this);
  }

  clone() {
    return new Biconditional(this.left.clone(), this.right.clone());
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

  for (let y = 0; y < 2 ** varsCount; y += 1) {
    const l1 = {};
    for (let x = 0; x < varsCount; x += 1) {
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

function checkBranches(rng, randomNode, height, propArgs, classProp) {
  let res = false;
  res = classProp.left.changeNode(rng, randomNode, height, propArgs);
  if (res === true) {
    classProp.left = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
    return false;
  }
  res = classProp.right.changeNode(rng, randomNode, height, propArgs);
  if (res === true) {
    classProp.right = Prop.randomProp(rng, propArgs.vars, propArgs.maxHeight - height, propArgs.minHeight - height);
    return false;
  }
  return false;
}

exports.Prop = Prop;
exports.Variable = Variable;
exports.Conjunction = Conjunction;
exports.Biconditional = Biconditional;
exports.Conditional = Conditional;
exports.Disjunction = Disjunction;
