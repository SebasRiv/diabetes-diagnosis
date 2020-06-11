const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);

const url = 'http://localhost:4000/api/diagnosis';

describe('Integration tests for GET, POST routes', () => {
    it('Should realize a POST for a diagnosis', (done) => {
        chai.request(url)
            .post('/')
            .send({
                embarazos: 3,
                gluAyunas: 100,
                preSangDias: 60,
                esPliegCutTri: 10,
                ins: 60,
                imc: 27.8,
                funcPediDiab: 1.5,
                edadAnos: 25, 
                nivelEst: 400,
                colesterol: 250,
                trigliceridos: 100,
                sexo: 0,
                glucemiaCap: 300,
                glucemiaPosp: 140,
                hemoGlic: 3.5,
                ejercicioFisi: 0,
                sedentario: 0,
                fuma: 1,
                alcohol: 1,
                aliGrasos: 1,
                visBorrosa: 0,
                fatiga: 1,
                entManosPies: 0,
                cicLenta: 1,
                tratamiFarma: 1
            })
            .end((err, res) => {
                // console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should GET the results', (done) => {
        chai.request(url)
            .get('/results')
            .end((err, res) => {
                // console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should GET functional', (done) => {
        chai.request(url)
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should GET only one result', (done) => {
        chai.request(url)
            .get('/results/5edd896bc86c3b0094a98c47')
            .end((err, res) => {
                // console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should Save a result', (done) => {
        chai.request(url)
            .post('/results')
            .send({
                "nombre": "test",
                "documento": 12345,
                "diagnostico":  {
                    "variables seleccionadas": [
                        {
                            "variable": "preprandial_glucose",
                            "value": 150
                        },
                        {
                            "variable": "diastolic_blood_pressure",
                            "value": 60
                        },
                        {
                            "variable": "triceps_skin_fold_thickness",
                            "value": 10
                        },
                        {
                            "variable": "serum_insulin",
                            "value": 60
                        },
                        {
                            "variable": "body_mass_index",
                            "value": 27
                        },
                        {
                            "variable": "diabetes_pedigree_function",
                            "value": 1
                        },
                        {
                            "variable": "age",
                            "value": 27
                        },
                        {
                            "variable": "cholesterol",
                            "value": 100
                        },
                        {
                            "variable": "exercise",
                            "value": 1
                        },
                        {
                            "variable": "alcoholism",
                            "value": 1
                        },
                        {
                            "variable": "fatty_fod",
                            "value": 1
                        },
                        {
                            "variable": "blurry_vision",
                            "value": 1
                        },
                        {
                            "variable": "drugs",
                            "value": 1
                        }
                    ],
                    "peso final SE": 46,
                    "reglas activadas SE": [
                        {
                            "regla": "Regla 8",
                            "descripcion": "valor de Indice de masa corporal entre 25 y 44.5",
                            "distribucion": "Numerica",
                            "variable": "Indice de masa corporal",
                            "valor": 27,
                            "etiqueta": "Prediabetes",
                            "peso": 3
                        },
                        {
                            "regla": "Regla 10",
                            "descripcion": "valor de Función pedigree de diabetes entre 0.5 y 1.6",
                            "distribucion": "Numerica",
                            "variable": "Función pedigree de diabetes",
                            "valor": 1,
                            "etiqueta": "Prediabetes",
                            "peso": 5
                        },
                        {
                            "regla": "Regla 12",
                            "descripcion": "Edad entre 20 y 45 años",
                            "distribucion": "Numerica",
                            "variable": "Edad",
                            "valor": 27,
                            "etiqueta": "Prediabetes",
                            "peso": 5
                        },
                        {
                            "regla": "Regla 17",
                            "descripcion": "No realiza ejercicio físico",
                            "distribucion": "Binomial",
                            "variable": "¿Ejercicio Físico?",
                            "valor": 1,
                            "etiqueta": "Verdadero",
                            "peso": 7
                        },
                        {
                            "regla": "Regla 20",
                            "descripcion": "Toma bebidas alcoholicas periodicamente",
                            "distribucion": "Binomial",
                            "variable": "¿Consume alcohol?",
                            "valor": 1,
                            "etiqueta": "Verdadero",
                            "peso": 8
                        },
                        {
                            "regla": "Regla 21",
                            "descripcion": "Consume alimentos grasos",
                            "distribucion": "Binomial",
                            "variable": "¿Aliementos grasos?",
                            "valor": 1,
                            "etiqueta": "Verdadero",
                            "peso": 8
                        },
                        {
                            "regla": "Regla 22",
                            "descripcion": "Su visión borrosa",
                            "distribucion": "Binomial",
                            "variable": "¿Visión borrosa?",
                            "valor": 1,
                            "etiqueta": "Verdadero",
                            "peso": 4
                        },
                        {
                            "regla": "Regla 30",
                            "descripcion": "Consume farmacos o esta en tratamiento con drogas",
                            "distribucion": "Binomial",
                            "variable": "¿Consume farmacos?",
                            "valor": 1,
                            "etiqueta": "Verdadero",
                            "peso": 6
                        }
                    ],
                    "fuzzyVariables": {
                        "preprandial_glucose": 150,
                        "capillar_glucose": 100,
                        "postprandial_glucose": 100,
                        "glycosylated_hemoglobin": 4,
                        "peso": 46
                    },
                    "Valor del sistema difuso": 50,
                    "Reglas activadas SD": [
                        {
                            "regla": "Regla 164",
                            "descripcion": "La Glucemia en Ayunas o Glucemia Prepandial se encuentra entre los niveles peligrosos de Diabetes (Sin ingesta de alimentos en el inicio del día), la Glucemia Capilar se encuentra en los niveles Normales, La Glucemia Posprandial se encuentra en entre los niveles Normales, la Hemoglobina Glicosilada se encuentra en los niveles Normales y el Peso, como resultado de salida para las variables representantes del estilo de vida del paciente conmutadas además de otras relacionadas con exámenes más elaborados se encuentra en los niveles riesgosos de Pre Diabetes."
                        }
                    ],
                    "Diagnostico de SD": "Propenso"
                }
            })
            .end((err, res) => {
                // console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
    it('Should POST for pdf download', (done) => {
        chai.request(url)
            .post('/download')
            .send({
                usuario:{"nombre":"test","documento":12345},
                variablesDifuso:[{"variable":"Glucosa prepandial o en ayunas","valor":150,"tipo":"Numerica","estado":"Diabetes"},{"variable":"Glucosa capilar","valor":100,"tipo":"Numerica","estado":"Normal"},{"variable":"Glucosa postpandial","valor":100,"tipo":"Numerica","estado":"Normal"},{"variable":"Hemoglobina Glicosilada","valor":4,"tipo":"Numerica","estado":"Normal"}],
                resultados:{"variables seleccionadas":[{"variable":"preprandial_glucose","value":150},{"variable":"diastolic_blood_pressure","value":60},{"variable":"triceps_skin_fold_thickness","value":10},{"variable":"serum_insulin","value":60},{"variable":"body_mass_index","value":27},{"variable":"diabetes_pedigree_function","value":1},{"variable":"age","value":27},{"variable":"cholesterol","value":100},{"variable":"exercise","value":1},{"variable":"alcoholism","value":1},{"variable":"fatty_fod","value":1},{"variable":"blurry_vision","value":1},{"variable":"drugs","value":1}],"peso final SE":46,"reglas activadas SE":[{"regla":"Regla 8","descripcion":"valor de Indice de masa corporal entre 25 y 44.5","distribucion":"Numerica","variable":"Indice de masa corporal","valor":27,"etiqueta":"Prediabetes","peso":3},{"regla":"Regla 10","descripcion":"valor de Función pedigree de diabetes entre 0.5 y 1.6","distribucion":"Numerica","variable":"Función pedigree de diabetes","valor":1,"etiqueta":"Prediabetes","peso":5},{"regla":"Regla 12","descripcion":"Edad entre 20 y 45 años","distribucion":"Numerica","variable":"Edad","valor":27,"etiqueta":"Prediabetes","peso":5},{"regla":"Regla 17","descripcion":"No realiza ejercicio físico","distribucion":"Binomial","variable":"¿Ejercicio Físico?","valor":1,"etiqueta":"Verdadero","peso":7},{"regla":"Regla 20","descripcion":"Toma bebidas alcoholicas periodicamente","distribucion":"Binomial","variable":"¿Consume alcohol?","valor":1,"etiqueta":"Verdadero","peso":8},{"regla":"Regla 21","descripcion":"Consume alimentos grasos","distribucion":"Binomial","variable":"¿Aliementos grasos?","valor":1,"etiqueta":"Verdadero","peso":8},{"regla":"Regla 22","descripcion":"Su visión borrosa","distribucion":"Binomial","variable":"¿Visión borrosa?","valor":1,"etiqueta":"Verdadero","peso":4},{"regla":"Regla 30","descripcion":"Consume farmacos o esta en tratamiento con drogas","distribucion":"Binomial","variable":"¿Consume farmacos?","valor":1,"etiqueta":"Verdadero","peso":6}],"fuzzyVariables":{"preprandial_glucose":150,"capillar_glucose":100,"postprandial_glucose":100,"glycosylated_hemoglobin":4,"peso":46},"Valor del sistema difuso":50,"Reglas activadas SD":[{"regla":"Regla 164","descripcion":"La Glucemia en Ayunas o Glucemia Prepandial se encuentra entre los niveles peligrosos de Diabetes (Sin ingesta de alimentos en el inicio del día), la Glucemia Capilar se encuentra en los niveles Normales, La Glucemia Posprandial se encuentra en entre los niveles Normales, la Hemoglobina Glicosilada se encuentra en los niveles Normales y el Peso, como resultado de salida para las variables representantes del estilo de vida del paciente conmutadas además de otras relacionadas con exámenes más elaborados se encuentra en los niveles riesgosos de Pre Diabetes."}],"Diagnostico de SD":"Propenso"}
            })
            .end((err, res) => {
                // console.log(res.body);
                expect(res).to.have.status(200);
                done();
            });
    });
});

