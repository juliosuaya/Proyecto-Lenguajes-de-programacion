

class Operator {
    randomProp(rng, vars, maxHeight, minHeight) {
    }

    evaluate(value) {
    }
}

class Variable extends Operator{
     name = null;
     
     constructor(varName){
         super();
         this.name = varName;
     }
     evaluate(value){
        return value[this.name];
     }
}
    
class Conjunction extends Operator{

    left = null;
    right = null;

    constructor(leftProp, rightProp){
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    randomProp(rng, vars, maxHeight, minHeight) {

    }

    evaluate(value) {
        return this.left.evaluate(value) && this.right.evaluate(value);
    }   
}

class Negation extends Operator{
    
    val = null;

    constructor(value){
        this.val = value;
    }

    randomProp(rng, vars, maxHeight, minHeight) {

    }

    evaluate(value) {
        return !this.val.evaluate(value);
    }
}

class Disjunction extends Operator{
    
    left = null;
    right = null;

    constructor(leftProp, rightProp){
        super();
        this.left = leftProp;
        this.right = rightProp;
    }

    randomProp(rng, vars, maxHeight, minHeight) {

    }

    evaluate(value) {
        return this.left.evaluate(value) || this.right.evaluate(value);
    }
}

class Conditional extends Operator{
    
  left = null;
  right = null;

  constructor(leftProp, rightProp){
      super();
      this.left = leftProp;
      this.right = rightProp;
  }

  randomProp(rng, vars, maxHeight, minHeight) {

  }

  evaluate(value) {
      return !this.left.evaluate(value) || this.right.evaluate(value);
  }
}

class Biconditional extends Operator{
    randomProp(rng, vars, maxHeight, minHeight) {

    }

    evaluate(value) {
        
    }

    
    
}

exports.Operator = Operator;
exports.Variable = Variable;
exports.Conjunction = Conjunction;