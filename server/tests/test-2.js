const math = require('mathjs');
const fs = require('fs');

const jsonData = fs.readFileSync('data/data-2.json', 'utf-8');

const probResults = require('./test');

let data = JSON.parse(jsonData);

//Object for test of the algorithm

let testObject = {
    "altura": 6,
    "peso": 145,
    "talla": 10
}

let object = {
    Npreg: 3,
    glucose: 158,
    bp: 76,
    skinThick: 36,
    insulin: 245,
    bmi: 31.6,
    dpf: 0.851,
    age: 28
}

//{"number_of_times_pregnant": "5", "plasma_glucose": "117", "diastolic_blood_pressure": "92", "triceps_skin_fold_thickness": "0", "serum_insulin": "0", "body_mass_index": "34.1", "diabetes_pedigree_function": "0.337", "age": "38", "diabetes": "0"}

//console.log(data[767].diabetes);

let numPositive = 0;
let numNegative = 0;
let probMujer = 0.5;
let probHombre = 0.5;

//Gaussian distribution

//positive
let alturaMujer = [];
let pesoMujer = [];
let tallaMujer = [];

//negative
let alturaHombre = [];
let pesoHombre = [];
let tallaHombre = [];


for (const fact of data) {
    if (fact.sexo === "mujer") {
        numPositive++;
        alturaMujer.push(Number(fact.altura));
        pesoMujer.push(Number(fact.peso));
        tallaMujer.push(Number(fact.talla));
    } else {
        numNegative++;
        alturaHombre.push(Number(fact.altura));
        pesoHombre.push(Number(fact.peso));
        tallaHombre.push(Number(fact.talla));
    }
}

//Normal distribution
function normDist(variableData, x) {

    let variance = math.variance(variableData);
    let mean = math.mean(variableData);

    let probability = (1 / (math.sqrt(2 * math.pi * variance))) * Math.exp( - Math.pow((x - mean), 2) / (2 * variance));

    return probability;
}

//Evidence - constante de normalización
function evidence(object) {

    let pos1 = probHombre * normDist(alturaHombre, object.altura) * normDist(pesoHombre, object.peso) * normDist(tallaHombre, object.talla);
    let pos2 = probMujer * normDist(alturaMujer, object.altura) * normDist(pesoMujer, object.peso) * normDist(tallaMujer, object.talla);

    return pos1 + pos2;
}

let pos1 = probHombre * normDist(alturaHombre, testObject.altura) * normDist(pesoHombre, testObject.peso) * normDist(tallaHombre, testObject.talla);
let pos2 = probMujer * normDist(alturaMujer, testObject.altura) * normDist(pesoMujer, testObject.peso) * normDist(tallaMujer, testObject.talla);


let postNeg = pos1 / evidence(testObject);
let postPos = pos2 / evidence(testObject);

console.log(normDist(alturaHombre, 6));
console.log(normDist(tallaHombre, 8));
console.log(normDist(pesoHombre, 130));

console.log(((0.5 * normDist(alturaHombre, 6)*normDist(tallaHombre, 8)*normDist(pesoHombre, 130))) / evidence(testObject));


console.log(alturaMujer);

console.log(postPos, postNeg);

console.log(probResults.probResults(object));

/* let parte1 = (1 / math.sqrt(2 * math.pi * math.variance(alturaHombre)));
console.log(parte1);

console.log(Math.exp(-((testObject.altura - math.mean(alturaHombre)) ^ 2) / (2 * math.variance(alturaHombre))));

console.log(Math.exp(Math.pow(- (testObject.altura - math.mean(alturaHombre)), 2)));

let parte2 = Math.exp( - Math.pow((testObject.altura - math.mean(alturaHombre)), 2) / (2 * math.variance(alturaHombre)));
console.log(parte2);

console.log(parte1 * parte2); */

//console.log(evidence(testObject));

