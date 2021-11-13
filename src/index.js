const {Prop} = require("./Prop");
const { Conjunction, Operator, Variable } = require("./operators");

const props = new Prop();
const and = new Conjunction(new Variable("p"), new Variable("q"));
const value = { p: true, q: false }
const res = props.evalProp(and, value);
console.log(res);