var nools = require('nools');

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
var totalWeight = 0;
var peso = 0;

var flow = nools.flow("Diagnosis", function (flow) {

    flow.rule("rule1", [Diagnosis, "d", "d.pregnancies > 1"], function (facts) {
        console.log(totalWeight, ``);
        totalWeight += 5;
    });

    flow.rule("rule2", [Diagnosis, "d", "d.diastolic_blood_pressure >= 80 && d.diastolic_blood_pressure <= 110"], function (facts) {
        console.log(totalWeight);
        totalWeight += 3;
    });

    flow.rule("rule3", [Diagnosis, "d", "d.diastolic_blood_pressure > 110 "], function (facts) {
        console.log(totalWeight);
        totalWeight += 6;
    });

    flow.rule("rule4", [Diagnosis, "d", "d.triceps_skin_fold_thickness >= 30 && d.triceps_skin_fold_thickness <= 60 "], function (facts) {
        console.log(totalWeight);
        totalWeight += 2;
    });

    flow.rule("rule5", [Diagnosis, "d", "d.triceps_skin_fold_thickness > 60 "], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });

    flow.rule("rule6", [Diagnosis, "d", "d.serum_insulin >= 240  && d.serum_insulin <= 430"], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });

    flow.rule("rule7", [Diagnosis, "d", "d.serum_insulin > 430"], function (facts) {
        console.log(totalWeight);
        totalWeight += 7;
    });

    flow.rule("rule8", [Diagnosis, "d", "d.body_mass_index >= 25 && d.body_mass_index <= 44.5"], function (facts) {
        console.log(totalWeight);
        totalWeight += 3;
    });

    flow.rule("rule9", [Diagnosis, "d", "d.body_mass_index > 44.5"], function (facts) {
        console.log(totalWeight);
        totalWeight += 6;
    });

    flow.rule("rule10", [Diagnosis, "d", "d.diabetes_pedigree_function >= 0.5 && d.diabetes_pedigree_function >= 1.6"], function (facts) {
        console.log(totalWeight);
        totalWeight += 5;
    });

    flow.rule("rule11", [Diagnosis, "d", "d.diabetes_pedigree_function > 1.6"], function (facts) {
        console.log(totalWeight);
        totalWeight += 8;
    });

    flow.rule("rule12", [Diagnosis, "d", "d.age >= 20 && d.age <= 45"], function (facts) {
        console.log(totalWeight);
        totalWeight += 5;
    });

    flow.rule("rule13", [Diagnosis, "d", "d.age > 45"], function (facts) {
        console.log(totalWeight);
        totalWeight += 8;
    });

    flow.rule("rule14", [Diagnosis, "d", "d.gender == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 5;
    });

    flow.rule("rule15", [Diagnosis, "d", "d.stress_level >= 100 && d.stress_level <= 350"], function (facts) {
        console.log(totalWeight);
        totalWeight += 2;
    });

    flow.rule("rule16", [Diagnosis, "d", "d.stress_level > 350"], function (facts) {
        console.log(totalWeight);
        totalWeight += 3;
    });

    flow.rule("rule17", [Diagnosis, "d", "d.exercise == 0"], function (facts) {
        console.log(totalWeight);
        totalWeight += 7;
    });

    flow.rule("rule18", [Diagnosis, "d", "d.sedentary_life == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 6;
    });

    flow.rule("rule19", [Diagnosis, "d", "d.smoke == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 7;
    });

    flow.rule("rule20", [Diagnosis, "d", "d.alcoholism == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 8;
    });

    flow.rule("rule21", [Diagnosis, "d", "d.fatty_fod == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 8;
    });

    flow.rule("rule22", [Diagnosis, "d", "d.blurry_vision == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });

    flow.rule("rule23", [Diagnosis, "d", "d.fatigue == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 3;
    });

    flow.rule("rule24", [Diagnosis, "d", "d.pain_hands_feet == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });

    flow.rule("rule25", [Diagnosis, "d", "d.cholesterol >= 180 && d.cholesterol <= 240"], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });
    
    flow.rule("rule26", [Diagnosis, "d", "d.cholesterol > 240"], function (facts) {
        console.log(totalWeight);
        totalWeight += 7;
    });
    
    flow.rule("rule27", [Diagnosis, "d", "d.triglyceries >= 150 && d.triglyceries <= 500"], function (facts) {
        console.log(totalWeight);
        totalWeight += 4;
    });
    
    flow.rule("rule28", [Diagnosis, "d", "d.triglyceries > 500"], function (facts) {
        console.log(totalWeight);
        totalWeight += 7;
    });
    
    flow.rule("rule29", [Diagnosis, "d", "d.slow_healing == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 6;
    });
    
    flow.rule("rule30", [Diagnosis, "d", "d.drugs == 1"], function (facts) {
        console.log(totalWeight);
        totalWeight += 6;
    });
});

var session = flow.getSession();

var example = new Diagnosis(2, 500, 350, 46, 500, 24, 0.9, 45, 100, 450, 400, 1, 200, 230, 4.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1);

console.log(example);

session.assert(example);

session.match().then(
    function() {
        //all done!
        console.log("All done!");
        peso = totalWeight;
        console.log(peso);
        session.dispose();
        session = flow.getSession();
    },
    function(err) {
        console.log("Error matchUntilHalt()", err.stack);
    }
);




