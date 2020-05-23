const diagnosisCtrl = {};

const classicator = require('../classificator');
const { flow, Diagnosis } = require('../tests/expertTest2');
const { numVariables, boolVariables } = require('../utilities');

diagnosisCtrl.getDiagnostics = (req, res) => {
    res.send('All right!');
}

diagnosisCtrl.postDiagnosis = (req, res) => {

    const example = {
        pregnancies: 0,
        preprandial_glucose: 100,
        diastolic_blood_pressure: 60,
        triceps_skin_fold_thickness: 10,
        serum_insulin: 60,
        body_mass_index: 27.8,
        diabetes_pedigree_function: 2.4,
        age: 25,
        stress_level: 200,
        cholesterol: 250,
        triglyceries: 100,
        gender: 0,
        capillar_glucose: 250,
        postprandial_glucose: 140,
        glycosylated_hemoglobin: 3.5,
        exercise: 1,
        sedentary_life: 0,
        smoke: 0,
        alcoholism: 0,
        fatty_fod: 0,
        blurry_vision: 0,
        fatigue: 0,
        pain_hands_feet: 1,
        slow_healing: 1,
        drugs: 1
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

    session.match().then(
        function () {
            //all done!
            console.log("All done!");
            //peso = totalWeight;
            //console.log(peso);
            session.dispose();
            session = flow.getSession();
            res.send('Diagnostic success');
        },
        function (err) {
            console.log("Error matchUntilHalt()", err.stack);
        }
    );
}

module.exports = diagnosisCtrl;