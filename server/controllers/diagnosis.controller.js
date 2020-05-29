const path = require('path');

const diagnosisCtrl = {};

const classicator = require('../classificator');
const { flow, Diagnosis, execute } = require('../tests/expertTest2');
//const publicPath = require('../config/config');
const { numVariables, boolVariables } = require('../utilities');

diagnosisCtrl.getDiagnostics = (req, res) => {
    const pathFile = path.resolve(__dirname, '../../public/index.html');
    res.status(200).sendFile(pathFile);
}

diagnosisCtrl.postDiagnosis = (req, res) => {

    const example = {
        pregnancies: Number(req.body.embarazos),
        preprandial_glucose: Number(req.body.gluAyunas ), // Para sistema difuso
        diastolic_blood_pressure: Number(req.body.preSangDias ),
        triceps_skin_fold_thickness: Number(req.body.esPliegCutTri ),
        serum_insulin: Number(req.body.ins ),
        body_mass_index: Number(req.body.imc  ),
        diabetes_pedigree_function: Number(req.body.funcPediDiab),
        age: Number(req.body.edadAnos ),
        stress_level: Number(req.body.nivelEst ),
        cholesterol: Number(req.body.colesterol ),
        triglyceries: Number(req.body.trigliceridos ),
        gender: Number(req.body.sexo),
        capillar_glucose: Number(req.body.glucemiaCap ), // Para sistema difuso
        postprandial_glucose: Number(req.body.glucemiaPosp ), // Para sistema difuso
        glycosylated_hemoglobin: Number(req.body.hemoGlic), // Para sistema difuso
        exercise: Number(req.body.ejercicioFisi),
        sedentary_life: Number(req.body.sedentario),
        smoke: Number(req.body.fuma),
        alcoholism: Number(req.body.alcohol),
        fatty_fod: Number(req.body.aliGrasos),
        blurry_vision: Number(req.body.visBorrosa),
        fatigue: Number(req.body.fatiga),
        pain_hands_feet: Number(req.body.entManosPies),
        slow_healing: Number(req.body.cicLenta),
        drugs: Number(req.body.tratamiFarma)
    }

    console.log(example);

    let example2 = {
        preprandial_glucose: example.preprandial_glucose,
        capillar_glucose: example.capillar_glucose,
        postprandial_glucose: example.postprandial_glucose,
        glycosylated_hemoglobin: example.glycosylated_hemoglobin,
    }

    console.log(example2);

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

    console.log(objectSE);

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
    const promise = new Promise((resolve, reject) => {

        console.log(execute(session, res, example2, object));
        resolve("Mostrando resultados");

    });
    // executeFuzzy(flowFuzzy.getSession(), example2);

    promise.then((resp) => {
        console.log(resp);
    });
}

diagnosisCtrl.getResults = (req, res) => {
    console.log("Hola chupapijas");
    console.log(req);
    const pathFile = path.resolve(__dirname, '../../public/diagnostic.html');
    res.sendFile(pathFile);
}

module.exports = diagnosisCtrl;