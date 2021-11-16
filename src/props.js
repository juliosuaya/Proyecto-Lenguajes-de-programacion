class Prop {

    static randomProp(rng, vars, maxHeight, minHeight) { 
        switch(Math.round(rng()*4)) {
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
    static randomProp(rng, vars, maxHeight, minHeight) {
        if (minHeight <= 1) {
            const randomNum = Math.round(rng()*Object.keys(vars).length)
            const value = Object.keys(vars)[randomNum]

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
        var left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Conjunction(left, right);
        }

        switch(Math.round(rng()*5)) {
            case 0:
                left = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                left = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                left = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                left = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                left = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }

        switch(Math.round(rng()*5)) {
            case 0:
                right = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                right = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                right = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                right = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                right = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }
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
        return new Negation(Prop.randomProp(rng, vars, maxHeight -1, minHeight - 1));
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
        
        var left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Disjunction(left, right);
        }

        switch(Math.round(rng()*5)) {
            case 0:
                left = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                left = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                left = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                left = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                left = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }

        switch(Math.round(rng()*5)) {
            case 0:
                right = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                right = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                right = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                right = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                right = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }
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
        
        var left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Conditional(left, right);
        }


        switch(Math.round(rng()*5)) {
            case 0:
                left = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                left = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                left = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                left = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                left = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }

        switch(Math.round(rng()*5)) {
            case 0:
                right = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                right = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                right = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                right = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                right = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }
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
        
        var left, right;
        if (maxHeight <= 1) {
            left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
            return new Biconditional(left, right);
        }
        switch(Math.round(rng()*5)) {
            case 0:
                left = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                left = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                left = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                left = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                left = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                left = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }

        switch(Math.round(rng()*5)) {
            case 0:
                right = Conjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 1:
                right = Negation.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 2:
                right = Disjunction.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 3:
                right = Conditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            case 4:
                right = Variable.randomProp(rng, vars, maxHeight - 1, minHeight - 1);
                break;
            default:
                right = Biconditional.randomProp(rng, vars, maxHeight - 1, minHeight - 1);

        }
        return new Biconditional(left, right);
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