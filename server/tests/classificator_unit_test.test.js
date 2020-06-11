const assert = require('chai').assert;

const { getData, featureQuantifies, datosBool, categoriesNum, clasificationNum, normDist, clasificationBool, classification } = require('../utils/classificator');

// Pruebas unitarias para el clasificador
describe('Unit tests for clasificator', () => {
    describe('Get data for classification', () => {
        it("Check if return a array", () => {
            const data = getData('server/data/Data.json')
            assert.typeOf(data, "array");
        });
        it("Check data structure if is Object(json)", () => {
            const data = getData('server/data/Data.json')
            assert.typeOf(data[0], "object");
        });
        it("Check # data elements", () => {
            const data = getData('server/data/Data.json')
            assert.equal(data.length, 768);
        });
        it("Check the correctly element property", () => {
            const data = getData('server/data/data-capillar-glucose.json')
            assert.equal(data[0].hasOwnProperty("capillar_glucose"), true);
        });
        it("Check type of data for bool variable", () => {
            const data = featureQuantifies('exercise', datosBool);
            assert.typeOf(data, "array");
        });
        it("Check quantify of positivie and negative in boolean variable", () => {
            const data = featureQuantifies('exercise', datosBool);
            assert.equal(data[0], 330);
            assert.equal(data[1], 30);
        });
    });
    describe('Test clasification functions', () => {
        it('Check the results of numerical variable', () => {
            const data = getData('server/data/data-capillar-glucose.json');
            const result = categoriesNum(data);
            assert.typeOf(result, "array");
        });
        it('Check the type of postitive data numerical variable', () => {
            const data = getData('server/data/data-capillar-glucose.json');
            const result = categoriesNum(data);
            assert.typeOf(result[0], "array");
        });
        it('Check gaussian distribution positive value function', () => {
            const data = getData('server/data/data-capillar-glucose.json');
            const data2 = categoriesNum(data);
            const result = normDist(data2[0], 150);
            assert.isAtMost(result, 0.5);
        });
        it('Check gaussian distribution function', () => {
            const data = getData('server/data/data-capillar-glucose.json');
            const data2 = categoriesNum(data);
            const result = normDist(data2[1], 150);
            assert.isAtMost(result, 0.5);
        });
        it('Check classificactionNum function', () => {
            const data = getData('server/data/data-capillar-glucose.json');
            const data2 = categoriesNum(data);
            const results = clasificationNum(data2, 150);
            assert.sameMembers(results, [ 0.9453198934505045, 0.054680106549495386 ]);
        });
        it('Check clasificationBool function', () => {
            const data = getData('server/data/data-bool.json');

            const example = {
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

            const result = clasificationBool(example, data);
            assert.sameMembers(result, [ 0.0009911480476915814, 0.00005673717821978508 ]);
        });
        it('Check classification function', () => {
            const example = {
                pregnancies: 3,
                preprandial_glucose: 100,
                diastolic_blood_pressure: 60,
                triceps_skin_fold_thickness: 10,
                serum_insulin: 60,
                body_mass_index: 27.8,
                diabetes_pedigree_function: 1.5,
                age: 25, 
                stress_level: 400,
                cholesterol: 250,
                triglyceries: 100,
                gender: 0,
                capillar_glucose: 300,
                postprandial_glucose: 140,
                glycosylated_hemoglobin: 3.5,
                exercise: 0,
                sedentary_life: 0,
                smoke: 1,
                alcoholism: 1,
                fatty_fod: 1,
                blurry_vision: 0,
                fatigue: 1,
                pain_hands_feet: 0,
                slow_healing: 1,
                drugs: 1
            }
            const result = classification(example);
            assert.typeOf(result, "object");
        });
    });
});

