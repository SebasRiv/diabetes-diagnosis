const path = require('path');

const diagnosisCtrl = {};

const classicator = require('../classificator');
const { flow, Diagnosis, execute } = require('../tests/expertTest2');
const { flow: flowFuzzy, execute: executeFuzzy } = require('../tests/fuzzyTest');
const { numVariables, boolVariables } = require('../utilities');

diagnosisCtrl.getDiagnostics = (req, res) => {
    let pathFile = path.resolve(__dirname, '../public/index.html');
    res.status(200).sendFile(pathFile);
}

diagnosisCtrl.postDiagnosis = (req, res) => {

    const example = {
        pregnancies: Number(req.body.pregnancies),
        preprandial_glucose: Number(req.body.preprandial_glucose ), // Para sistema difuso
        diastolic_blood_pressure: Number(req.body.diastolic_blood_pressure ),
        triceps_skin_fold_thickness: Number(req.body.triceps_skin_fold_thickness ),
        serum_insulin: Number(req.body.serum_insulin ),
        body_mass_index: Number(req.body.body_mass_index  ),
        diabetes_pedigree_function: Number(req.body.diabetes_pedigree_function),
        age: Number(req.body.age ),
        stress_level: Number(req.body.stress_level ),
        cholesterol: Number(req.body.cholesterol ),
        triglyceries: Number(req.body.triglyceries ),
        gender: Number(req.body.gender),
        capillar_glucose: Number(req.body.capillar_glucose ), // Para sistema difuso
        postprandial_glucose: Number(req.body.postprandial_glucose ), // Para sistema difuso
        glycosylated_hemoglobin: Number(req.body.glycosylated_hemoglobin), // Para sistema difuso
        exercise: Number(req.body.exercise),
        sedentary_life: Number(req.body.sedentary_life),
        smoke: Number(req.body.smoke),
        alcoholism: Number(req.body.alcoholism),
        fatty_fod: Number(req.body.fatty_fod),
        blurry_vision: Number(req.body.blurry_vision),
        fatigue: Number(req.body.fatigue),
        pain_hands_feet: Number(req.body.pain_hands_feet),
        slow_healing: Number(req.body.slow_healing),
        drugs: Number(req.body.drugs
    )}

    let example2 = {
        preprandial_glucose: example.preprandial_glucose,
        capillar_glucose: example.capillar_glucose,
        postprandial_glucose: example.postprandial_glucose,
        glycosylated_hemoglobin: example.glycosylated_hemoglobin,
    }

    const object = classicator(example);

    const objectSE = {};
    let data = [];

    for (const iterator of numVariables) {
        if (object[iterator]) {
            objectSE[iterator] = object[iterator];
            data.push(objectSE[iterator]);
        } else {
            objectSE[iterator] = 0;
            data.push(objectSE[iterator]);
        }
    }

    for (const iterator of boolVariables) {
        if (object[iterator]) {
            objectSE[iterator] = object[iterator];
            data.push(objectSE[iterator]);
        } else {
            objectSE[iterator] = 0;
            data.push(objectSE[iterator]);
        }
    }

    const Diagnostico = new Diagnosis(...data);

    var session = flow.getSession();

    session.assert(Diagnostico);
    // session.assert(exam);

    // session.match().then(
    //     function () {
    //         //all done!
    //         console.log("All done!");
    //         //peso = totalWeight;
    //         //console.log(peso);
    //         session.dispose();
    //         session = flow.getSession();
    //         console.log(totalWeight);
    //         res.send('Diagnostic success');
    //     },
    //     function (err) {
    //         console.log("Error matchUntilHalt()", err.stack);
    //     }
    // );

    //res.send('Diagnostic success');
    console.log(execute(session, res, example2, object));
    // executeFuzzy(flowFuzzy.getSession(), example2);
}

diagnosisCtrl.getFuzzy = (req, res) => {

}

module.exports = diagnosisCtrl;