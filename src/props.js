class Prop {

    randomProp(rng, vars, maxHeight, minHeight) { }

    evalProp(prop, value) {
        return prop.evaluate(value);
    }

    truthTable(prop, vars) { }
}

class Variable extends Prop {
    name = null;

    constructor(varName) {
        super();
        this.name = varName;
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

    randomProp(rng, vars, maxHeight, minHeight) { //podria ser estatico segun Val.

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
        this.val = value;
    }

    randomProp(rng, vars, maxHeight, minHeight) {

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

    randomProp(rng, vars, maxHeight, minHeight) {

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

    randomProp(rng, vars, maxHeight, minHeight) {

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

    randomProp(rng, vars, maxHeight, minHeight) {

    }

    evaluate(value) {
        const leftValue = this.left.evaluate(value)
        const rightValue = this.right.evaluate(value)

        return leftValue === rightValue
    }
}


exports.Prop = Prop;
exports.Variable = Variable;
exports.Conjunction = Conjunction;
exports.Biconditional = Biconditional;
exports.Conditional = Conditional;
exports.Disjunction = Disjunction;