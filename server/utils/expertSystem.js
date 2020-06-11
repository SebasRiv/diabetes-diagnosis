var nools = require('nools');
const { flow: flowFuzzy, execute: executeFuzzy } = require('./fuzzySystem');

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

var peso = 0;
var totalWeight = 0;

let activated = [];

var flow = nools.flow("Diagnosis", function (flow) {

    flow.rule("Regla 1", [Diagnosis, "d", "d.pregnancies > 1"], function (facts) {
        totalWeight += 5;
        // console.log(totalWeight);
        activated.push({regla:"Regla 1", descripcion: "valor de N° de Embarazos mayor que 1", distribucion: "Numerica", variable: "N° de Embarazos", valor: facts.d.pregnancies, etiqueta: "prediabetes", peso: 5});
    });

    flow.rule("Regla 2", [Diagnosis, "d", "d.diastolic_blood_pressure >= 80 && d.diastolic_blood_pressure <= 110"], function (facts) {
        totalWeight += 3;
        // console.log(totalWeight);
        activated.push({regla:"Regla 2", descripcion: "valor de Presion sanguinea diastolica entre 80 y 110", distribucion: "Numerica", variable: "Presion sanguinea diastolica", valor: facts.d.diastolic_blood_pressure, etiqueta: "Prediabetes", peso: 3});
    });

    flow.rule("Regla 3", [Diagnosis, "d", "d.diastolic_blood_pressure > 110 "], function (facts) {
        totalWeight += 6;
        // console.log(totalWeight);
        activated.push({regla:"Regla 3", descripcion: "valor de Presion sanguinea diastolica mayor que 110", distribucion: "Numerica", variable: "Presion sanguinea diastolica", valor: facts.d.diastolic_blood_pressure, etiqueta: "Diabetes", peso: 6});
    });

    flow.rule("Regla 4", [Diagnosis, "d", "d.triceps_skin_fold_thickness >= 30 && d.triceps_skin_fold_thickness <= 60 "], function (facts) {
        totalWeight += 2;
        // console.log(totalWeight);
        activated.push({regla:"Regla 4", descripcion: "valor de Grosor del pliegue cutáneo del tríceps entre 30 y 60", distribucion: "Numerica", variable: "Grosor del pliegue cutáneo del tríceps", valor: facts.d.triceps_skin_fold_thickness, etiqueta: "Prediabetes", peso: 2});
    });

    flow.rule("Regla 5", [Diagnosis, "d", "d.triceps_skin_fold_thickness > 60 "], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 5", descripcion: "valor de Grosor del pliegue cutáneo del tríceps mayor que 60", distribucion: "Numerica", variable: "Grosor del pliegue cutáneo del tríceps", valor: facts.d.triceps_skin_fold_thickness, etiqueta: "Diabetes", peso: 4});
    });

    flow.rule("Regla 6", [Diagnosis, "d", "d.serum_insulin >= 240  && d.serum_insulin <= 430"], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 6", descripcion: "valor de Insulina entre 240 y 430", distribucion: "Numerica", variable: "Insulina", valor: facts.d.serum_insulin, etiqueta: "Prediabetes", peso: 4});
    });

    flow.rule("Regla 7", [Diagnosis, "d", "d.serum_insulin > 430"], function (facts) {
        totalWeight += 7;
        // console.log(totalWeight);
        activated.push({regla:"Regla 7", descripcion: "valor de Insulina mayor que 430", distribucion: "Numerica", variable: "Insulina", valor: facts.d.serum_insulin, etiqueta: "Diabetes", peso: 7});
    });

    flow.rule("Regla 8", [Diagnosis, "d", "d.body_mass_index >= 25 && d.body_mass_index <= 44.5"], function (facts) {
        totalWeight += 3;
        // console.log(totalWeight);
        activated.push({regla:"Regla 8", descripcion: "valor de Indice de masa corporal entre 25 y 44.5", distribucion: "Numerica", variable: "Indice de masa corporal", valor: facts.d.body_mass_index, etiqueta: "Prediabetes", peso: 3});
    });

    flow.rule("Regla 9", [Diagnosis, "d", "d.body_mass_index > 44.5"], function (facts) {
        totalWeight += 6;
        // console.log(totalWeight);
        activated.push({regla:"Regla 9", descripcion: "valor de Indice de masa corporal que 44", distribucion: "Numerica", variable: "Indice de masa corporal", valor: facts.d.body_mass_index, etiqueta: "Diabetes", peso: 6});
    });

    flow.rule("Regla 10", [Diagnosis, "d", "d.diabetes_pedigree_function >= 0.5 && d.diabetes_pedigree_function <= 1.6"], function (facts) {
        totalWeight += 5;
        // console.log(totalWeight);
        activated.push({regla:"Regla 10", descripcion: "valor de Función pedigree de diabetes entre 0.5 y 1.6", distribucion: "Numerica", variable: "Función pedigree de diabetes", valor: facts.d.diabetes_pedigree_function, etiqueta: "Prediabetes", peso: 5});
    });

    flow.rule("Regla 11", [Diagnosis, "d", "d.diabetes_pedigree_function > 1.6"], function (facts) {
        totalWeight += 8;
        // console.log(totalWeight);
        activated.push({regla:"Regla 11", descripcion: "valor de Función pedigree de diabetes mayor que 1.6", distribucion: "Numerica", variable: "Función pedigree de diabetes", valor: facts.d.diabetes_pedigree_function, etiqueta: "Diabetes", peso: 8});
    });

    flow.rule("Regla 12", [Diagnosis, "d", "d.age >= 20 && d.age <= 45"], function (facts) {
        totalWeight += 5;
        // console.log(totalWeight);
        activated.push({regla:"Regla 12", descripcion: "Edad entre 20 y 45 años", distribucion: "Numerica", variable: "Edad", valor: facts.d.age, etiqueta: "Prediabetes", peso: 5});
    });

    flow.rule("Regla 13", [Diagnosis, "d", "d.age > 45"], function (facts) {
        totalWeight += 8;
        // console.log(totalWeight);
        activated.push({regla:"Regla 13", descripcion: "Edad mayor que 45 años", distribucion: "Numerica", variable: "Edad", valor: facts.d.age, etiqueta: "Diabetes", peso: 8});
    });

    flow.rule("Regla 14", [Diagnosis, "d", "d.gender == 1"], function (facts) {
        totalWeight += 5;
        // console.log(totalWeight);
        activated.push({regla:"Regla 14", descripcion: "Genero Femenino", distribucion: "Numerica", variable: "Genero", valor: "Femenino", etiqueta: "prediabetes", peso: 5});
    });

    flow.rule("Regla 15", [Diagnosis, "d", "d.stress_level >= 100 && d.stress_level <= 350"], function (facts) {
        totalWeight += 2;
        // console.log(totalWeight);
        activated.push({regla:"Regla 15", descripcion: "valor de Nivel de estres entre 100 y 350", distribucion: "Numerica", variable: "Nivel de estres", valor: facts.d.stress_level, etiqueta: "Prediabetes", peso: 2});
    });

    flow.rule("Regla 16", [Diagnosis, "d", "d.stress_level > 350"], function (facts) {
        totalWeight += 3;
        // console.log(totalWeight);
        activated.push({regla:"Regla 16", descripcion: "valor de Nivel de estres mayor que 350", distribucion: "Numerica", variable: "Nivel de estres", valor: facts.d.stress_level, etiqueta: "Diabetes", peso: 3});
    });

    flow.rule("Regla 17", [Diagnosis, "d", "d.exercise == 1"], function (facts) {
        totalWeight += 7;
        // console.log(totalWeight);
        activated.push({regla:"Regla 17", descripcion: "No realiza ejercicio físico", distribucion: "Binomial", variable: "¿Ejercicio Físico?", valor: facts.d.exercise, etiqueta: "Verdadero", peso: 7});
    });

    flow.rule("Regla 18", [Diagnosis, "d", "d.sedentary_life == 1"], function (facts) {
        totalWeight += 6;
        // console.log(totalWeight);
        activated.push({regla:"Regla 18", descripcion: "Tiene un estilo de vida sedentario", distribucion: "Binomial", variable: "¿Vida sedentaria?", valor: facts.d.sedentary_life, etiqueta: "Verdadero", peso: 6});
    });

    flow.rule("Regla 19", [Diagnosis, "d", "d.smoke == 1"], function (facts) {
        totalWeight += 7;
        // console.log(totalWeight);
        activated.push({regla:"Regla 19", descripcion: "Es fumador(a)", distribucion: "Binomial", variable: "¿Fuma?", valor: facts.d.smoke, etiqueta: "Verdadero", peso: 7});
    });

    flow.rule("Regla 20", [Diagnosis, "d", "d.alcoholism == 1"], function (facts) {
        totalWeight += 8;
        // console.log(totalWeight);
        activated.push({regla:"Regla 20", descripcion: "Toma bebidas alcoholicas periodicamente", distribucion: "Binomial", variable: "¿Consume alcohol?", valor: facts.d.alcoholism, etiqueta: "Verdadero", peso: 8});
    });

    flow.rule("Regla 21", [Diagnosis, "d", "d.fatty_fod == 1"], function (facts) {
        totalWeight += 8;
        // console.log(totalWeight);
        activated.push({regla:"Regla 21", descripcion: "Consume alimentos grasos", distribucion: "Binomial", variable: "¿Aliementos grasos?", valor: facts.d.fatty_fod, etiqueta: "Verdadero", peso: 8});
    });

    flow.rule("Regla 22", [Diagnosis, "d", "d.blurry_vision == 1"], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 22", descripcion: "Su visión borrosa", distribucion: "Binomial", variable: "¿Visión borrosa?", valor: facts.d.blurry_vision, etiqueta: "Verdadero", peso: 4});
    });

    flow.rule("Regla 23", [Diagnosis, "d", "d.fatigue == 1"], function (facts) {
        totalWeight += 3;
        // console.log(totalWeight);
        activated.push({regla:"Regla 23", descripcion: "Sufre de fatiga constantemente", distribucion: "Binomial", variable: "¿Fatiga?", valor: facts.d.fatigue, etiqueta: "Verdadero", peso: 3});
    });

    flow.rule("Regla 24", [Diagnosis, "d", "d.pain_hands_feet == 1"], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 24", descripcion: "Padece de dolor y entumecimiento en manos y pies", distribucion: "Binomial", variable: "¿Dolor y entumecimiento en manos y pies?", valor: facts.d.pain_hands_feet, etiqueta: "Verdadero", peso: 4});
    });

    flow.rule("Regla 25", [Diagnosis, "d", "d.cholesterol >= 180 && d.cholesterol <= 240"], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 25", descripcion: "valor de Colesterol entre 180 y 240", distribucion: "Numerica", variable: "Colesterol", valor: facts.d.cholesterol, etiqueta: "Prediabetes", peso: 4});
    });

    flow.rule("Regla 26", [Diagnosis, "d", "d.cholesterol > 240"], function (facts) {
        totalWeight += 7;
        // console.log(totalWeight);
        activated.push({regla:"Regla 26", descripcion: "valor de Colesterol mayor que 240", distribucion: "Numerica", variable: "Colesterol", valor: facts.d.cholesterol, etiqueta: "Diabetes", peso: 7});
    });

    flow.rule("Regla 27", [Diagnosis, "d", "d.triglyceries >= 150 && d.triglyceries <= 500"], function (facts) {
        totalWeight += 4;
        // console.log(totalWeight);
        activated.push({regla:"Regla 27", descripcion: "valor de Trigliceridos entre 150 y 500", distribucion: "Numerica", variable: "Trigliceridos", valor: facts.d.triglyceries, etiqueta: "Prediabetes", peso: 4});
    });

    flow.rule("Regla 28", [Diagnosis, "d", "d.triglyceries > 500"], function (facts) {
        totalWeight += 7;
        // console.log(totalWeight);
        activated.push({regla:"Regla 28", descripcion: "valor de Trigliceridos mayor que 500", distribucion: "Numerica", variable: "Trigliceridos", valor: facts.d.triglyceries, etiqueta: "Diabetes", peso: 7});
    });

    flow.rule("Regla 29", [Diagnosis, "d", "d.slow_healing == 1"], function (facts) {
        totalWeight += 6;
        // console.log(totalWeight);
        activated.push({regla:"Regla 29", descripcion: "sufre de Cicatrización lenta", distribucion: "Binomial", variable: "¿Cicatrización lenta?", valor: facts.d.slow_healing, etiqueta: "Verdadero", peso: 6});
    });

    flow.rule("Regla 30", [Diagnosis, "d", "d.drugs == 1"], function (facts) {
        totalWeight += 6;
        peso = totalWeight;
        activated.push({regla:"Regla 30", descripcion: "Consume farmacos o esta en tratamiento con drogas", distribucion: "Binomial", variable: "¿Consume farmacos?", valor: facts.d.drugs, etiqueta: "Verdadero", peso: 6});
    });
});

function execute(session, res, values, variables) {

    let pato;

    const promise = new Promise((resolve, reject) => {

        session.match().then(
            function () {
                let result = {"variables seleccionadas": variables, "peso final SE": totalWeight, "reglas activadas SE": activated, fuzzyVariables: values}

                let sessionFuzzy = flowFuzzy.getSession();
                values.peso = totalWeight;
                executeFuzzy(sessionFuzzy, values, result, res);
                resolve(totalWeight);
                totalWeight = 0;
                activated = [];

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
    });
}

function testExecute(session) {

    let result = 0;

    session.match().then(function (resolve) {
        resolve(result = totalWeight);
        console.log(totalWeight);
        session.dispose();
        session = flow.getSession();
    },
    function (err) {
        console.log("Error matchUntilHalt()", err.stack);
    });
        
    return result;
}

module.exports = {
    flow,
    Diagnosis,
    execute,
    testExecute
};