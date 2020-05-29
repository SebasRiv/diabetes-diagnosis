

const numVariables = ["pregnancies", "preprandial_glucose", "diastolic_blood_pressure", "triceps_skin_fold_thickness", "serum_insulin", "body_mass_index", "diabetes_pedigree_function", "age", "stress_level", "cholesterol", "triglyceries", "gender", "capillar_glucose", "postprandial_glucose", "glycosylated_hemoglobin"];

const boolVariables = ['exercise', 'sedentary_life', 'smoke', 'alcoholism', 'fatty_fod', 'blurry_vision', 'fatigue', 'pain_hands_feet', 'slow_healing', 'drugs'];

const variablePathData = [
    { variable: 'pregnancies', path: 'server/data/data-pregnancies.json' },
    { variable: 'preprandial_glucose', path: 'server/data/data-glucemia-pre.json' },
    { variable: 'diastolic_blood_pressure', path: 'server/data/Data.json' },
    { variable: 'triceps_skin_fold_thickness', path: 'server/data/Data.json' },
    { variable: 'serum_insulin', path: 'server/data/Data.json' },
    { variable: 'body_mass_index', path: 'server/data/Data.json' },
    { variable: 'diabetes_pedigree_function', path: 'server/data/Data.json' },
    { variable: 'age', path: 'server/data/Data.json' },
    { variable: 'stress_level', path: 'server/data/data-stress.json' },
    { variable: 'cholesterol', path: 'server/data/data-cholesterol.json' },
    { variable: 'triglyceries', path: 'server/data/data-triglicerios.json' },
    { variable: 'gender', path: 'server/data/data-gender.json' },
    { variable: 'capillar_glucose', path: 'server/data/data-capillar-glucose.json' },
    { variable: 'postprandial_glucose', path: 'server/data/data-glucemia-post.json' },
    { variable: 'glycosylated_hemoglobin', path: 'server/data/data-hemoglobina-glicosilada.json' },
]

module.exports = {
    numVariables,
    boolVariables,
    variablePathData
}