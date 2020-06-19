const math = require('mathjs');
const fs = require('fs');

const { numVariables, boolVariables, variablePathData } = require('./utilities');

let datosBool = JSON.parse(fs.readFileSync('server/data/data-bool.json'));

function getData(path) {
    const jsonData = fs.readFileSync(path, 'utf-8');

    return JSON.parse(jsonData);
}

function classification(object) {
    // El el parametro object es el que trae la 
    // información del sistema de captura
    // y despues se separan booleanas (o binomiales) y numericas
    let numVars = []; let boolVars = {}; let data = [];
    let aceptedVariables = {}; let i = 0;
    // Se guarda el nombre de la variable numerica 
    // y su valor en el arreglo
    for (const iterator of numVariables) {
        const val = { variable: iterator, value: object[iterator] };
        numVars.push(val);
    }
    // Se guarda el nombre de la variable binomial y su valor
    for (const iterator of boolVariables) {
        boolVars[iterator] = object[iterator];
    }
    // Despues de separar las variables se obitene la data de c/u
    for (const iterator of variablePathData) {
        data.push(getData(iterator.path));
    }
    // Se procede a clasificar las numericas primeramente 
    //¡IMPORTANTE EL ORDEN DE LAS VARIABLES!
    for (const iterator of numVars) {
        const result = clasificationNum(categoriesNum(data[i]), iterator.value);
        if (result[0] > result[1]) {
            aceptedVariables[iterator.variable] = iterator.value;
        }
        i++;
    }
    // Se clasifican las binomiales
    const booldata = clasificationBool(boolVars, datosBool);
    if (booldata[0] > booldata[1]) {
        for (const iterator of boolVariables) {
            if (object[iterator] === 1) {
                aceptedVariables[iterator] = object[iterator];
            }
        }
    }
    return aceptedVariables;
}

function featureQuantifies(feature, data) {
    let quantifyPositive = 0; let quantifyNegative = 0;
    for (const iterator of data) {
        if (iterator[feature] === 1 && iterator.diabetes === 1) { quantifyPositive++; }
        else if (iterator[feature] === 1 && iterator.diabetes === 0) { quantifyNegative++; }
    }
    return [quantifyPositive, quantifyNegative];
}

//Para  las variables binomiales
function categoriesBool(data) {

    let numPositive = 0;
    let numNegative = 0;
    let datos = [];
    let probabilities = [];

    for (const iterator of data) {
        (iterator.diabetes === 1) ? (numPositive++) : (numNegative++);
    }

    let exercise = featureQuantifies('exercise', data);
    let sedentary_life = featureQuantifies('sedentary_life', data);
    let smoke = featureQuantifies('smoke', data);
    let alcoholism = featureQuantifies('alcoholism', data);
    let fatty_food = featureQuantifies('fatty_fod', data);
    let blurry_vision = featureQuantifies('blurry_vision', data);
    let fatigue = featureQuantifies('fatigue', data);
    let pain_hands_feet = featureQuantifies('pain_hands_feet', data);
    let slow_healing = featureQuantifies('slow_healing', data);
    let drugs = featureQuantifies('drugs', data);

    probabilities.push(exercise, sedentary_life, smoke, alcoholism, fatty_food, blurry_vision, fatigue, pain_hands_feet, slow_healing, drugs);

    for (const iterator of probabilities) {
        iterator[0] = iterator[0] / numPositive;
        iterator[1] = iterator[1] / numNegative;
    }

    datos.push(numPositive, numNegative, data.length, probabilities);

    return datos;
}

//Para variables numericas
function categoriesNum(data) {

    let variable = "";
    let numPositive = 0;
    let numNegative = 0;
    let positive = [];
    let negative = [];
    let datos = [];

    for (let i = 0; i < numVariables.length; i++) {
        if (data[0][numVariables[i]] !== undefined) {
            variable = numVariables[i];
            break;
        }
    }

    for (const iterator of data) {
        (iterator.diabetes === "Si" || iterator.diabetes === '1') ? (numPositive++, positive.push(Number(iterator[variable]))) : (numNegative++, negative.push(Number(iterator[variable])));
    }

    datos.push(positive, negative, numPositive, numNegative);

    return datos;
}

function normDist(variableData, x) {

    let variance = math.variance(variableData);
    let mean = math.mean(variableData);

    let probability = (1 / (math.sqrt(2 * math.pi * variance))) * Math.exp(- Math.pow((x - mean), 2) / (2 * variance));

    return probability;
}

function clasificationNum(data, value) {

    let total = data[data.length - 1] + data[data.length - 2];

    let probPos = data[data.length - 1] / total;
    let probNeg = data[data.length - 2] / total;

    let pos1 = probPos * normDist(data[0], value);
    let pos2 = probNeg * normDist(data[1], value);

    let evidence = pos1 + pos2;

    let resultados = [];

    resultados.push((pos1 / evidence));
    resultados.push((pos2 / evidence));

    return resultados;
}

function bernoulliDist(value, prob) {

    return math.pow(prob, value) * math.pow((1 - prob), (1 - value));
}

function clasificationBool(values, data) {

    const probabilities = categoriesBool(data);
    let class1 = probabilities[0] / probabilities[2]
    let class2 = probabilities[1] / probabilities[2];
    let i = 0;

    for (const iterator of probabilities[3]) {

        class1 *= bernoulliDist(values[boolVariables[i]], iterator[0]);
        class2 *= bernoulliDist(values[boolVariables[i]], iterator[1]);

        i++;
    }
    return [class1, class2];
}

module.exports = {
    classification,
    getData,
    featureQuantifies,
    datosBool,
    categoriesNum,
    clasificationNum,
    clasificationBool,
    normDist
};

