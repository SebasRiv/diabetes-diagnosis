var nools = require('nools');

var index = 0;

var Diagnostico = function (siDiabetes, noDiabetes, sexo, ejercicio, sedentario, fuma, alcohol, grasos, cicatrizacion, farmacos) {
    this.siDiabetes = siDiabetes;
    this.noDiabetes = noDiabetes;
    this.sexo = sexo;
    this.ejercicio = ejercicio;
    this.sedentario = sedentario;
    this.fuma = fuma;
    this.alcohol = alcohol;
    this.grasos = grasos;
    this.cicatrizacion = cicatrizacion;
    this.farmacos = farmacos;
}

var pesoDiagnostico = 0;

// var PesoDiagnostico = function(peso) {
//     this.peso = peso;
// }

var usadas = [];


var flow = nools.flow("Diabetes", function (flow) {

    flow.rule("Rule1", [Diagnostico, "d", "d.siDiabetes > d.noDiabetes"], function (facts) {
        //session.assert(new PesoDiagnostico(0));
        pesoDiagnostico += 30;
    });

    flow.rule("Rule2", [Diagnostico, "d", "d.siDiabetes < d.noDiabetes"], function (facts) {
        //session.assert(new PesoDiagnostico(30));
        pesoDiagnostico = pesoDiagnostico;
    });

    flow.rule("Rule3", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.sexo == 'mujer'"]], function (facts) {
        pesoDiagnostico += 3;
    });

    flow.rule("Rule4", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.sexo == 'hombre'"]], function (facts) {
        pesoDiagnostico += 1;
    });

    flow.rule("Rule5", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.ejercicio == 'no'"]], function (facts) {
        pesoDiagnostico += 7;
    });

    flow.rule("Rule6", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.ejercicio == 'no' && d.sedentario == 'si'"]], function (facts) {
        pesoDiagnostico += 6;
    });

    flow.rule("Rule7", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.fuma == 'si'"]], function (facts) {
        pesoDiagnostico += 7;
    });

    flow.rule("Rule8", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.alcohol == 'si'"]], function (facts) {
        pesoDiagnostico += 8;
    });

    flow.rule("Rule9", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.fuma == 'si' && d.alcohol == 'si'"]], function (facts) {
        pesoDiagnostico += 2;
    });

    flow.rule("Rule10", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.grasos == 'si'"]], function (facts) {
        pesoDiagnostico += 8;
    });

    flow.rule("Rule11", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.cicatrizacion == 'lenta'"]], function (facts) {
        pesoDiagnostico += 6;
    });

    flow.rule("Rule12", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.farmacos == 'si'"]], function (facts) {
        pesoDiagnostico += 6;
    });

    flow.rule("Rule13", [, [Diagnostico, "d", "d.siDiabetes > d.noDiabetes && d.alcohol == 'si' && d.fuma == 'si' && d.farmacos == 'si'"]], function (facts) {
        pesoDiagnostico += 3;
    });

    flow.rule("Rule14", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.sexo == 'mujer'"]], function (facts) {
        pesoDiagnostico += 5;
    });

    flow.rule("Rule15", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.sexo == 'hombre'"]], function (facts) {
        pesoDiagnostico += 2;
    });

    flow.rule("Rule16", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.ejercicio == 'no'"]], function (facts) {
        pesoDiagnostico += 8;
    });

    flow.rule("Rule17", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.ejercicio == 'no' && d.sedentario == 'si'"]], function (facts) {
        pesoDiagnostico += 7;
    });

    flow.rule("Rule18", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.fuma == 'si'"]], function (facts) {
        pesoDiagnostico += 5;
    });

    flow.rule("Rule19", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.alcohol == 'si'"]], function (facts) {
        pesoDiagnostico += 6;
    });

    flow.rule("Rule20", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.fuma == 'si' && d.alcohol == 'si'"]], function (facts) {
        pesoDiagnostico += 1;
    });

    flow.rule("Rule21", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.grasos == 'si'"]], function (facts) {
        pesoDiagnostico += 10;
    });

    flow.rule("Rule22", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.cicatrizacion == 'lenta'"]], function (facts) {
        pesoDiagnostico += 10;
    });

    flow.rule("Rule23", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.farmacos == 'si'"]], function (facts) {
        pesoDiagnostico += 7;
    });

    flow.rule("Rule24", [, [Diagnostico, "d", "d.siDiabetes < d.noDiabetes && d.alcohol == 'si' && d.fuma == 'si' && d.farmacos == 'si'"]], function (facts) {
        pesoDiagnostico += 5;
    });
});

var session = flow.getSession();

session.match().then(
    function () {
        //all done!
        console.log("All done!");
        session.dispose();
        session = flow.getSession();
    },
    function (err) {
        console.log("Error matchUntilHalt()", err.stack);
    }
);

