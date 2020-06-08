const fs = require('fs');
const puppeteer = require('puppeteer');

const Diagnostico = require('../models/diagnosis');

const diagnosisCtrl = {};

const classicator = require('../utils/classificator');
const { flow, Diagnosis, execute } = require('../utils/expertSystem');
const { numVariables, boolVariables } = require('../utils/utilities');

diagnosisCtrl.getDiagnostics = (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("All right!");
}

diagnosisCtrl.postDiagnosis = (req, res) => {

    const example = {
        pregnancies: Number(req.body.embarazos),
        preprandial_glucose: Number(req.body.gluAyunas), // Para sistema difuso
        diastolic_blood_pressure: Number(req.body.preSangDias),
        triceps_skin_fold_thickness: Number(req.body.esPliegCutTri),
        serum_insulin: Number(req.body.ins),
        body_mass_index: Number(req.body.imc),
        diabetes_pedigree_function: Number(req.body.funcPediDiab),
        age: Number(req.body.edadAnos),
        stress_level: Number(req.body.nivelEst),
        cholesterol: Number(req.body.colesterol),
        triglyceries: Number(req.body.trigliceridos),
        gender: Number(req.body.sexo),
        capillar_glucose: Number(req.body.glucemiaCap), // Para sistema difuso
        postprandial_glucose: Number(req.body.glucemiaPosp), // Para sistema difuso
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

    let fuzzyVariables = {
        preprandial_glucose: example.preprandial_glucose,
        capillar_glucose: example.capillar_glucose,
        postprandial_glucose: example.postprandial_glucose,
        glycosylated_hemoglobin: example.glycosylated_hemoglobin,
    }

    const activated = [];
    const object = classicator(example);

    const objectSE = {};
    let data = [];

    for (const iterator of numVariables) {
        if (object[iterator]) {
            objectSE[iterator] = object[iterator];
            activated.push({ variable: iterator, value: object[iterator] });
            data.push(objectSE[iterator]);
        } else {
            objectSE[iterator] = 0;
            data.push(objectSE[iterator]);
        }
    }

    for (const iterator of boolVariables) {
        if (object[iterator]) {
            objectSE[iterator] = object[iterator];
            activated.push({ variable: iterator, value: object[iterator] });
            data.push(objectSE[iterator]);
        } else {
            objectSE[iterator] = 0;
            data.push(objectSE[iterator]);
        }
    }

    const Diagnostico = new Diagnosis(...data);

    var session = flow.getSession();

    session.assert(Diagnostico);
    const promise = new Promise((resolve, reject) => {

        console.log(execute(session, res, fuzzyVariables, activated));
        resolve("Mostrando resultados");

    });

    promise.then((resp) => {
        console.log(resp);
    });
}

diagnosisCtrl.getResults = async (req, res) => {
    const results = await Diagnostico.find();
    res.json(results);
}

diagnosisCtrl.postResults = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { nombre, documento, diagnostico } = req.body;
    const newDiagnostico = new Diagnostico({ username: nombre, document: documento, diagnosis: diagnostico });
    await newDiagnostico.save();
    res.status(200).json('Diagnostico guardado');
}

diagnosisCtrl.getResult = async (req, res) => {
    const diagnostico = await Diagnostico.findById(req.params.id);
    res.json(diagnostico);
}

diagnosisCtrl.download = async (req, res) => {

    const { usuario, variablesDifuso, resultados } = req.body;

    const path = __dirname + '/../uploads/report.pdf';

    (async function () {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();

            await page.setContent(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <meta http-equiv="x-ua-compatible" content="ie=edge">
                <title>Reporte de Diagnóstico</title>
            
                <link rel="icon" href="public/img/cerebroIcon.ico">
                
            </head>
            <body>
                
                <!-- Latest compiled and minified CSS - Libreria de Bootstrap-->
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" >
            
                <!-- Font Awesome - Liberia Iconos FontAwsome -->
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.10.2/css/all.css" integrity="zmfNZmXoNWBMemUOo1XUGFfc0ihGGLYdgtJS3KCr/l0=">
            
                <!-- jQuery library -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
            
                <!-- Popper JS - Librerías para trabajar con Bootstrap 4-->
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.min.js"></script>
            
                <!-- Latest compiled JavaScript - Librerías para trabajar con Bootstrap 4 -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js"></script>
            
                <!-- ***************************************************************************************** -->
                <!-- ***************************************************************************************** -->
                <!-- ***************************************************************************************** -->
            
                <!-- WORK ZONE -->
            
                <div class="content-wrapper" style="min-height: 717px;">
            
                    <!-- Main content -->
                    <section class="content">
            
                        <div class="container-fluid">
            
                            <div class="row">
            
                                <div class="col-12">
            
                                    <!-- Default box -->
                                    <div class="card card-info card-outline">
            
                                        <div class="card-header">
            
                                            <div class="row">
            
                                                <div class="col-sm-12">
            
            
                                                    <h2>
            
                                                        <div class='alert alert-success mt-3 small' align="center"><b><i class="fas fa-brain"></i> REPORTE DE DIAGNÓSTICO  <i class="fas fa-brain"></i></b></div>
            
                                                    </h2>
            
                                                </div>
            
                                            </div>
            
                                        </div>
                                        <!-- /.card-header -->
            
                                        <div class="card-body">
            
                                            <form action="#">
            
                                                <div class="row">
            
                                                    <div class="col-sm-12">
            
                                                        <h5>
                                                            <div class='alert alert-primary' align="center"><b><i class="fas fa-user"></i> Nombre del paciente: <b><font  color="red">${usuario.nombre}</font></b> | Documento: <b><font  color="red">${usuario.documento}</font></b> <i class="fas fa-user"></i></b></div>
                                                        </h5>
                                                        <h5>
                                                            <div class='alert alert-primary' align="center"><b><i class="fas fa-clipboard-list"></i> Resultado del diagnostico: <b><font  color="red">${resultados["Diagnostico de SD"]} </font></b><i class="fas fa-clipboard-list"></i></b></div>
                                                        </h5>
                                                        <h5>
                                                            <div class='alert alert-primary' align="center"><b><i class="fas fa-list"></i> Elementos estudiados para diagnóstico <i class="fas fa-list"></i></b></div>
                                                        </h5>
            
                                                    </div>
            
                                                    <div class="col-sm-12">
            
                                                        <div class="table-responsive">        
                                                            <table id="dataTableDiagnostics" class="table-striped table-bordered table-hover table-condensed" style="width:100%">
                                                            <thead class="thead-dark">
                                                                <tr>
                                                                    <th>Variable</th>
                                                                    <th>Valor</th>
                                                                    <th>Etiqueta</th>
                                                                    <th>Descripción</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            ${resultados["reglas activadas SE"].map((item, i) => `
                                                                <tr>
                                                                    <td>${item.variable}</td>
                                                                    <td>${item.valor}</td>
                                                                    <td>${item.etiqueta}</td>
                                                                    <td>${item.descripcion}</td>
                                                                </tr>               
                                                                `).join('')}
                                                            </tbody> 
            
                                                           </table>  
            
                                                        </div>
            
                                                    </div>
            
                                                    <div class="col-sm-12">
            
                                                        <hr/>
            
                                                    </div>
            
                                                    <!-- ------------------------------------------------------------ -->
            
                                                    <div class="col-sm-6">
            
                                                        <div class="col-sm-12">
            
                                                            <h5>
                                                                <div class='alert alert-secondary' align="center"><b><i class="fas fa-list"></i> Estudios de salida <i class="fas fa-list"></i></b></div>
                                                            </h5>
            
                                                        </div>
            
                                                        <div class="table-responsive">        
                                                            <table id="dataTableDiagnostics" class="table-striped table-bordered table-hover table-condensed" style="width:100%">
                                                            <thead class="thead-dark">
                                                                <tr>
                                                                    <th>Nombre de variable</th>
                                                                    <th>Valor</th>
                                                                    <th>Estado</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            ${variablesDifuso.map((item, i) => `
                                                                <tr>
                                                                    <td>${item.variable}</td>
                                                                    <td>${item.valor}</td>
                                                                    <td>${item.estado}</td>
                                                                </tr>            
                                                            `).join('')}
                                                            </tbody> 
            
                                                           </table>  
            
                                                        </div>
            
                                                    </div>
            
                                                    <div class="col-sm-6">
            
                                                        <div class="col-sm-12">
            
                                                            <h5>
                                                                <div class='alert alert-warning' align="center"><b><i class="fas fa-list"></i> Diagnóstico <i class="fas fa-list"></i></b></div>
                                                            </h5>
            
                                                        </div>
            
                                                        <div class="table-responsive">        
                                                            <table id="dataTableDiagnostics" class="table-striped table-bordered table-hover table-condensed" style="width:100%">
                                                            <thead class="thead-dark">
                                                                <tr>
                                                                    <th>Diagnóstico</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                            ${resultados["Reglas activadas SD"].map((item, i) => `
                                                                <tr>
                                                                    <td>${item.descripcion}</td>
                                                                </tr>
                                                            `).join('')}
            
                                                            </tbody> 
            
                                                           </table>  
            
                                                        </div>
            
                                                    </div>
            
                                                    <div class="col-sm-12">
            
                                                        <hr/>
            
                                                    </div>
                                                    
            
                                                </form> <!-- Form general -->
                                                
                                            </div>
                                            <!-- /.card-body -->
            
                                        </div>
                                        <!-- /.card -->
            
                                    </div>
            
                                </div>
            
                            </div>
            
                        </section>
                        <!-- /.content -->
            
                    </div>
            
                </body>
            
                </html>
            `);
            await page.emulateMediaType('screen');
            await page.pdf({
                path: path,
                format: 'A4',
                printBackground: true
            });

            await browser.close();
            //process.exit()
        } catch (error) {
            console.log('our error', e);
        }
    })();

    var data = fs.readFileSync(__dirname + '/../uploads/report.pdf');
    res.contentType("application/pdf");
    res.send(data);

}

module.exports = diagnosisCtrl;