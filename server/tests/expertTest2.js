var nools = require('nools');
const { flow: flowFuzzy, execute: executeFuzzy } = require('./fuzzyTest');

/**
 * const example = {
    pregnancies: 0,
    preprandial_glucose: 100,
    diastolic_blood_pressure: 60,
    triceps_skin_fold_thickness: 10,
    serum_insulin: 60,
    body_mass_index: 27.8,
    diabetes_pedigree_function: 0.2,
    age: 25, 
    stress_level: 200,
    cholesterol: 250,
    triglyceries: 100,
    gender: 1,
    capillar_glucose: 90,
    postprandial_glucose: 140,
    glycosylated_hemoglobin: 3.5,
    exercise: 0,
    sedentary_life: 1,
    smoke: 1,
    alcoholism: 0,
    fatty_fod: 0,
    blurry_vision: 1,
    fatigue: 0,
    pain_hands_feet: 1,
    slow_healing: 0,
    drugs: 1
}
 */

// Creamos el objeto que ingresara al sistema experto

var Diagnosis = function (pregnancies = 0, preprandial_glucose = 0, diastolic_blood_pressure = 0, triceps_skin_fold_thickness = 0, serum_insulin = 0, body_mass_index = 0, diabetes_pedigree_function = 0, age = 0, stress_level = 0, cholesterol = 0, triglyceries = 0, gender = 0, capillar_glucose = 0, postprandial_glucose = 0, glycosylated_hemoglobin = 0, exercise = 0, sedentary_life = 0, smoke = 0, alcoholism = 0, fatty_fod = 0, blurry_vision = 0, fatigue = 0, pain_hands_feet = 0, slow_healing = 0, drugs = 0) {
    this.pregnancies = pregnancies;
    this.preprandial_glucose = preprandial_glucose;
    this.diastolic_blood_pressure = diastolic_blood_pressure;
    this.triceps_skin_fold_thickness = triceps_skin_fold_thickness;
    this.serum_insulin = serum_insulin;
    this.body_mass_index = body_mass_index;
    this.diabetes_pedigree_function = diabetes_pedigree_function;
    this.age = age;
    this.stress_level = stress_level;
    this.cholesterol = cholesterol;
    this.triglyceries = triglyceries;
    this.gender = gender;
    this.capillar_glucose = capillar_glucose;
    this.postprandial_glucose = postprandial_glucose;
    this.glycosylated_hemoglobin = glycosylated_hemoglobin;
    this.exercise = exercise;
    this.sedentary_life = sedentary_life;
    this.smoke = smoke;
    this.alcoholism = alcoholism;
    this.fatty_fod = fatty_fod;
    this.blurry_vision = blurry_vision;
    this.fatigue = fatigue;
    this.pain_hands_feet = pain_hands_feet;
    this.slow_healing = slow_healing;
    this.drugs = drugs;
}

var normal = 0;
var prediabetes = 0;
var diabetes = 0;

//var peso;
var totalWeight = 0;

let activated = [];
let reglas = [];

var flow = nools.flow("Diagnosis", function (flow) {

    flow.rule("rule1", [Diagnosis, "d", "d.pregnancies > 1"], function (facts) {
        totalWeight += 5;
        console.log(totalWeight);
        activated.push({regla:"rule1", descripcion: "valor de pregnancies mayor que 1"});
    });

    flow.rule("rule2", [Diagnosis, "d", "d.diastolic_blood_pressure >= 80 && d.diastolic_blood_pressure <= 110"], function (facts) {
        totalWeight += 3;
        console.log(totalWeight);
        activated.push({regla:"rule2", descripcion: "valor de diastolic_blood_pressure entre 80 y 110"});
    });

    flow.rule("rule3", [Diagnosis, "d", "d.diastolic_blood_pressure > 110 "], function (facts) {
        totalWeight += 6;
        console.log(totalWeight);
        activated.push({regla:"rule3", descripcion: "valor de diastolic_blood_pressure mayor que 110"});
    });

    flow.rule("rule4", [Diagnosis, "d", "d.triceps_skin_fold_thickness >= 30 && d.triceps_skin_fold_thickness <= 60 "], function (facts) {
        totalWeight += 2;
        console.log(totalWeight);
        activated.push({regla:"rule4", descripcion: "valor de triceps_skin_fold_thickness entre 30 y 60"});
    });

    flow.rule("rule5", [Diagnosis, "d", "d.triceps_skin_fold_thickness > 60 "], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule5", descripcion: "valor de triceps_skin_fold_thickness mayor que 60"});
    });

    flow.rule("rule6", [Diagnosis, "d", "d.serum_insulin >= 240  && d.serum_insulin <= 430"], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule6", descripcion: "valor de serum_insulin entre 240 y 430"});
    });

    flow.rule("rule7", [Diagnosis, "d", "d.serum_insulin > 430"], function (facts) {
        totalWeight += 7;
        console.log(totalWeight);
        activated.push({regla:"rule7", descripcion: "valor de serum_insulin mayor que 430"});
    });

    flow.rule("rule8", [Diagnosis, "d", "d.body_mass_index >= 25 && d.body_mass_index <= 44.5"], function (facts) {
        totalWeight += 3;
        console.log(totalWeight);
        activated.push({regla:"rule8", descripcion: "valor de body_mass_index entre 25 y 44.5"});
    });

    flow.rule("rule9", [Diagnosis, "d", "d.body_mass_index > 44.5"], function (facts) {
        totalWeight += 6;
        console.log(totalWeight);
        activated.push({regla:"rule9", descripcion: "valor de body_mass_index mayor que 44"});
    });

    flow.rule("rule10", [Diagnosis, "d", "d.diabetes_pedigree_function >= 0.5 && d.diabetes_pedigree_function <= 1.6"], function (facts) {
        totalWeight += 5;
        console.log(totalWeight);
        activated.push({regla:"rule10", descripcion: "valor de diabetes_pedigree_function entre 0.5 y 1.6"});
    });

    flow.rule("rule11", [Diagnosis, "d", "d.diabetes_pedigree_function > 1.6"], function (facts) {
        totalWeight += 8;
        console.log(totalWeight);
        activated.push({regla:"rule11", descripcion: "valor de diabetes_pedigree_function mayor que 1.6"});
    });

    flow.rule("rule12", [Diagnosis, "d", "d.age >= 20 && d.age <= 45"], function (facts) {
        totalWeight += 5;
        console.log(totalWeight);
        activated.push({regla:"rule12", descripcion: "valor de age entre 20 y 45"});
    });

    flow.rule("rule13", [Diagnosis, "d", "d.age > 45"], function (facts) {
        totalWeight += 8;
        console.log(totalWeight);
        activated.push({regla:"rule13", descripcion: "valor de age mayor que 45"});
    });

    flow.rule("rule14", [Diagnosis, "d", "d.gender == 1"], function (facts) {
        totalWeight += 5;
        console.log(totalWeight);
        activated.push({regla:"rule14", descripcion: "valor de gender es 'Mujer'"});
    });

    flow.rule("rule15", [Diagnosis, "d", "d.stress_level >= 100 && d.stress_level <= 350"], function (facts) {
        totalWeight += 2;
        console.log(totalWeight);
        activated.push({regla:"rule15", descripcion: "valor de stress_level entre 100 y 350"});
    });

    flow.rule("rule16", [Diagnosis, "d", "d.stress_level > 350"], function (facts) {
        totalWeight += 3;
        console.log(totalWeight);
        activated.push({regla:"rule16", descripcion: "valor de stress_level mayor que 350"});
    });

    flow.rule("rule17", [Diagnosis, "d", "d.exercise == 0"], function (facts) {
        totalWeight += 7;
        console.log(totalWeight);
        activated.push({regla:"rule17", descripcion: "valor de exercise es 'Si'"});
    });

    flow.rule("rule18", [Diagnosis, "d", "d.sedentary_life == 1"], function (facts) {
        totalWeight += 6;
        console.log(totalWeight);
        activated.push({regla:"rule18", descripcion: "valor de sedentary_life es 'Si'"});
    });

    flow.rule("rule19", [Diagnosis, "d", "d.smoke == 1"], function (facts) {
        totalWeight += 7;
        console.log(totalWeight);
        activated.push({regla:"rule19", descripcion: "valor de smoke es 'Si'"});
    });

    flow.rule("rule20", [Diagnosis, "d", "d.alcoholism == 1"], function (facts) {
        totalWeight += 8;
        console.log(totalWeight);
        activated.push({regla:"rule20", descripcion: "valor de alcoholism es 'Si'"});
    });

    flow.rule("rule21", [Diagnosis, "d", "d.fatty_fod == 1"], function (facts) {
        totalWeight += 8;
        console.log(totalWeight);
        activated.push({regla:"rule21", descripcion: "valor de fatty_fod es 'Si'"});
    });

    flow.rule("rule22", [Diagnosis, "d", "d.blurry_vision == 1"], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule22", descripcion: "valor de blurry_vision es 'Si'"});
    });

    flow.rule("rule23", [Diagnosis, "d", "d.fatigue == 1"], function (facts) {
        totalWeight += 3;
        console.log(totalWeight);
        activated.push({regla:"rule23", descripcion: "valor de fatigue es 'Si'"});
    });

    flow.rule("rule24", [Diagnosis, "d", "d.pain_hands_feet == 1"], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule24", descripcion: "valor de pain_hands_feet es 'Si'"});
    });

    flow.rule("rule25", [Diagnosis, "d", "d.cholesterol >= 180 && d.cholesterol <= 240"], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule25", descripcion: "valor de cholesterol entre 180 y 240"});
    });

    flow.rule("rule26", [Diagnosis, "d", "d.cholesterol > 240"], function (facts) {
        totalWeight += 7;
        console.log(totalWeight);
        activated.push({regla:"rule26", descripcion: "valor de cholesterol mayor que 240"});
    });

    flow.rule("rule27", [Diagnosis, "d", "d.triglyceries >= 150 && d.triglyceries <= 500"], function (facts) {
        totalWeight += 4;
        console.log(totalWeight);
        activated.push({regla:"rule27", descripcion: "valor de triglyceries entre 150 y 500"});
    });

    flow.rule("rule28", [Diagnosis, "d", "d.triglyceries > 500"], function (facts) {
        totalWeight += 7;
        console.log(totalWeight);
        activated.push({regla:"rule28", descripcion: "valor de triglyceries mayor que 500"});
    });

    flow.rule("rule29", [Diagnosis, "d", "d.slow_healing == 1"], function (facts) {
        totalWeight += 6;
        console.log(totalWeight);
        activated.push({regla:"rule29", descripcion: "valor de slow_healing es 'Si'"});
    });

    flow.rule("rule30", [Diagnosis, "d", "d.drugs == 1"], function (facts) {
        totalWeight += 6;
        peso = totalWeight;
        console.log(totalWeight);
        activated.push({regla:"rule30", descripcion: "valor de drugs es 'Si'"});
        console.log(activated);
        totalWeight = 0;
        reglas = activated;
        activated = [];
    });
});

// var session = flow.getSession();

// var example = new Diagnosis(0, 500, 350, 46, 500, 24, 0.9, 45, 100, 450, 400, 1, 200, 230, 4.5, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0);

//console.log(example);

// session.assert(example);

function execute(session, res, values, variables) {

    let pato;

    const promise = new Promise((resolve, reject) => {

        session.match().then(
            function () {
                //all done!
                console.log("All done!");
                pato = peso;
                let result = {"variables seleccionadas": variables, "peso final SE": pato, "reglas activadas SE": reglas}

                let sessionFuzzy = flowFuzzy.getSession();
                values.peso = pato;
                executeFuzzy(sessionFuzzy, values, result, res);
                console.log("Este es: " + pato);
                resolve(pato);
                //res.status(200).json({pesoSE: pato, reglas: reglas});
                session.dispose();
                session = flow.getSession();
            },
            function (err) {
                console.log("Error matchUntilHalt()", err.stack);
            }
        );
    });

    promise.then((res) => {
        pato = res;
        console.log(res);
    });
}

// let peso = execute(session);
// console.log("Este es el peso final: ", peso);

module.exports = {
    flow,
    Diagnosis,
    execute
};