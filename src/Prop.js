class Prop {

    randomProp(rng, vars, maxHeight, minHeight){}

    evalProp(prop, value) {
        return prop.evaluate(value);
    }

    truthTable(prop, vars){}
}
exports.Prop = Prop;