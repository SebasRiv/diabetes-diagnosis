const math = require('mathjs');
const fs = require('fs');

const jsonData = fs.readFileSync(__dirname + '/data/Data.json', 'utf-8');

let data = JSON.parse(jsonData);

//Object for test of the algorithm

//Este algoritmo de clasificacion es para variables numericas o continuas.

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

//{"number_of_times_pregnant": "4", "plasma_glucose": "103", "diastolic_blood_pressure": "60", "triceps_skin_fold_thickness": "33", "serum_insulin": "192", "body_mass_index": "24.0", "diabetes_pedigree_function": "0.966", "age": "33", "diabetes": "0"},
//{"number_of_times_pregnant": "3", "plasma_glucose": "158", "diastolic_blood_pressure": "76", "triceps_skin_fold_thickness": "36", "serum_insulin": "245", "body_mass_index": "31.6", "diabetes_pedigree_function": "0.851", "age": "28", "diabetes": "1"},

//console.log(data[767].diabetes);

let numPositive = 0;
let numNegative = 0;
let probPos = 268 / 768;
let probNeg = 500 / 768;

//Gaussian distribution

//positive
let pregPos = [];
let glucosePos = [];
let bpPos = [];
let skinThickPos = [];
let insulinPos = [];
let bmiPos = [];
let dpfPos = [];
let agePos = [];

//negative
let pregNeg = [];
let glucoseNeg = [];
let bpNeg = [];
let skinThickNeg = [];
let insulinNeg = [];
let bmiNeg = [];
let dpfNeg = [];
let ageNeg = [];

for (const fact of data) {
    if (fact.diabetes === "1") {
        numPositive++;
        pregPos.push(Number(fact.number_of_times_pregnant));
        glucosePos.push(Number(fact.plasma_glucose));
        bpPos.push(Number(fact.diastolic_blood_pressure));
        skinThickPos.push(Number(fact.triceps_skin_fold_thickness));
        insulinPos.push(Number(fact.serum_insulin));
        bmiPos.push(Number(fact.body_mass_index));
        dpfPos.push(Number(fact.diabetes_pedigree_function));
        agePos.push(Number(fact.age));
    } else {
        numNegative++;
        pregNeg.push(Number(fact.number_of_times_pregnant));
        glucoseNeg.push(Number(fact.plasma_glucose));
        bpNeg.push(Number(fact.diastolic_blood_pressure));
        skinThickNeg.push(Number(fact.triceps_skin_fold_thickness));
        insulinNeg.push(Number(fact.serum_insulin));
        bmiNeg.push(Number(fact.body_mass_index));
        dpfNeg.push(Number(fact.diabetes_pedigree_function));
        ageNeg.push(Number(fact.age));
    }
}

//Normal distribution
//Ya que son variables numericas estas se ajustan a una distribucion normal con esta función
function normDist(variableData, x) {

    let variance = math.variance(variableData);
    let mean = math.mean(variableData);

    let probability = (1 / (math.sqrt(2 * math.pi * variance))) * Math.exp(- Math.pow((x - mean), 2) / (2 * variance));

    return probability;
}

//Evidence constante
function evidence(object) {

    let pos1 = probNeg * normDist(pregNeg, object.Npreg) * normDist(glucoseNeg, object.glucose) * normDist(bpNeg, object.bp) * normDist(skinThickNeg, object.skinThick) * normDist(insulinNeg, object.insulin) * normDist(bmiNeg, object.bmi) * normDist(dpfNeg, object.dpf) * normDist(ageNeg, object.age);
    let pos2 = probPos * normDist(pregPos, object.Npreg) * normDist(glucosePos, object.glucose) * normDist(bpNeg, object.bp) * normDist(skinThickPos, object.skinThick) * normDist(insulinPos, object.insulin) * normDist(bmiPos, object.bmi) * normDist(dpfPos, object.dpf) * normDist(agePos, object.age);

    return pos1 + pos2;
}

//Probabilidades: Calcula las probabilidades que tiene tener y no tener diabetes mellitus tipo 2
function probResults(object) {

    //Se crea el arreglo donde se guardaran las probabilidades
    const probs = [];

    //Se halla la posteriori de tener y no tener diabetes
    let pos1 = probNeg * normDist(pregNeg, object.Npreg) * normDist(glucoseNeg, object.glucose) * normDist(bpNeg, object.bp) * normDist(skinThickNeg, object.skinThick) * normDist(insulinNeg, object.insulin) * normDist(bmiNeg, object.bmi) * normDist(dpfNeg, object.dpf) * normDist(ageNeg, object.age);
    let pos2 = probPos * normDist(pregPos, object.Npreg) * normDist(glucosePos, object.glucose) * normDist(bpNeg, object.bp) * normDist(skinThickPos, object.skinThick) * normDist(insulinPos, object.insulin) * normDist(bmiPos, object.bmi) * normDist(dpfPos, object.dpf) * normDist(agePos, object.age);

    //Se divide por la evidencia que seria la estimación por maxima verosimilitud (EMV) para ajustar las probabilidades entre 0 y 1
    let postNeg = pos1 / evidence(object);
    let postPos = pos2 / evidence(object);

    //Se guardan en el arreglo
    probs.push(postPos);
    probs.push(postNeg);

    return probs;
}

console.log(probResults(object));

console.log(evidence(object));

module.exports = {
    probResults
}

//console.log(numPositive, numNegative, probPos, probNeg, probNeg + probPos);
