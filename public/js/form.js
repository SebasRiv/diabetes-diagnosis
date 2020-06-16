
// Path para desarrollo
// const url = "http://localhost:4000/api/diagnosis";
// const url3 = "http://localhost:4000/api/diagnosis/results";

//Path para produccion
const url = "https://diagnosis-protoype.herokuapp.com/api/diagnosis";
const url3 = "https://diagnosis-protoype.herokuapp.com/api/diagnosis/results";

const button = document.getElementById('boton');
const form = document.getElementById('form');

const documento = document.getElementById('documento');
const nombre = document.getElementById('nombre');

const volver = document.getElementById('volver');

volver.addEventListener('click', (e) => {
    window.location = "index.html";
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const botones = document.querySelectorAll('button');

    const embarazos = document.getElementById('embarazos');
    const gluAyunas = document.getElementById('gluAyunas');
    const preSangDias = document.getElementById('preSangDias');
    const esPliegCutTri = document.getElementById('esPliegCutTri');
    const ins = document.getElementById('ins');
    const imc = document.getElementById('imc');
    const funcPediDiab = document.getElementById('funcPediDiab');
    const edadAnos = document.getElementById('edadAnos');
    const nivelEst = document.getElementById('nivelEst');
    const colesterol = document.getElementById('colesterol');
    const trigliceridos = document.getElementById('trigliceridos');
    const glucemiaCap = document.getElementById('glucemiaCap');
    const glucemiaPosp = document.getElementById('glucemiaPosp');
    const hemoGlic = document.getElementById('hemoGlic');

    const numEmbarazos = Number(embarazos.value);
    const numGluAyunas = Number(gluAyunas.value);
    const numPreSangDias = Number(preSangDias.value);
    const numEsPliegCutTri = Number(esPliegCutTri.value);
    const numIns = Number(ins.value);
    const numImc = Number(imc.value);
    const numFuncPediDiab = Number(funcPediDiab.value);
    const numEdadAnos = Number(edadAnos.value);
    const numNivelEst = Number(nivelEst.value);
    const numColesterol = Number(colesterol.value);
    const numTrigliceridos = Number(trigliceridos.value);
    const numGlucemiaCap = Number(glucemiaCap.value);
    const numGlucemiaPosp = Number(glucemiaPosp.value);
    const numHemoGlic = Number(hemoGlic.value);

    // Validación de los campos del formulario
    if (numEmbarazos < 0 || numEmbarazos > 20 || embarazos.value == "") {
        swal({
            type: "error",
            title: "Numero de embarazos invalido",
            text: "El numero de embarazos debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numGluAyunas < 50 || numGluAyunas > 450 || gluAyunas.value == "") {
        swal({
            type: "error",
            title: "Glucosa en ayunas invalida",
            text: "La glucosa en ayunas debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });

    } else if (numPreSangDias < 30 || numPreSangDias > 250 || preSangDias.value == "") {
        swal({
            type: "error",
            title: "Presión sanguinea invalida",
            text: "La presión debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numEsPliegCutTri < 0 || numEsPliegCutTri > 100 || esPliegCutTri.value == "") {
        swal({
            type: "error",
            title: "Pliegue del triceps invalido",
            text: "El pliegue del tricep debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numIns < 0 || numIns > 1000 || ins.value == "") {
        swal({
            type: "error",
            title: "Insulina invalida",
            text: "La insulina debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numImc < 0 || numImc > 100 || imc.value == "") {
        swal({
            type: "error",
            title: "Indice de masa corporal invalido",
            text: "El indice de masa corporal debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numFuncPediDiab < 0 || numFuncPediDiab > 5 || funcPediDiab.value == "") {
        swal({
            type: "error",
            title: "Valor funcion de pedigree invalido",
            text: "El valor de la funcion de pedigree debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numEdadAnos < 0 || numEdadAnos > 120 || edadAnos.value == "") {
        swal({
            type: "error",
            title: "Edad invalida",
            text: "La edad debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numNivelEst < 0 || numNivelEst > 450 || nivelEst.value == "") {
        swal({
            type: "error",
            title: "Nivel de estres invalido",
            text: "El nivel de estres debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numColesterol < 0 || numColesterol > 400 || colesterol.value == "") {
        swal({
            type: "error",
            title: "Valor de colesterol invalido",
            text: "El valor del colesterol debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numTrigliceridos < 0 || numTrigliceridos > 700 || trigliceridos.value == "") {
        swal({
            type: "error",
            title: "Valor de trigliceridos invalido",
            text: "El valor de los trigliceridos debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numGlucemiaCap < 50 || numGlucemiaCap > 450 || glucemiaCap.value == "") {
        swal({
            type: "error",
            title: "Valor de glucemia capilar invalido",
            text: "El valor de la glucemia capilar debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numGlucemiaPosp < 50 || numGlucemiaPosp > 450 || glucemiaPosp.value == "") {
        swal({
            type: "error",
            title: "Valor de glucemia postprandial invalido",
            text: "El valor de la glucemia postprandial debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else if (numHemoGlic < 0 || numHemoGlic > 10 || hemoGlic.value == "") {
        swal({
            type: "error",
            title: "Valor hemoglobina glicosilada invalido",
            text: "El valor de la hemoglobina glicosilada debe tener un valor valido",
            showConfirmButton: true,
            confirmButtonText: "Cerrar"
        });
    } else {
        swal({
            title: '¿La información que ingreso es correcta?',
            text: "Se procedera a realizar el diagnostico",
            // icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                for (const iterator of botones) {
                    iterator.disabled = true;
                }
                sendInformation();
            }
        });
    }
});

//Funcion para validar que solo se ingresen numeros, la parte comentada es para solo letras
function onlyNumbers(e) {
    const key = e.keyCode || e.which,
        tecla = String.fromCharCode(key).toLowerCase(),
        //   letras = " áéíóúabcdefghijklmnñopqrstuvwxyz",
        letras = "0123456789",
        especiales = [8, 37, 39, 46];
    let tecla_especial = false;

    for (const i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function sendInformation() {
    const elementosNumericos = document.querySelectorAll('input');
    const elementosBinomiales = document.querySelectorAll('select');

    const valorPre = document.getElementById('gluAyunas').value;
    const valorCap = document.getElementById('glucemiaCap').value;
    const valorPost = document.getElementById('glucemiaPosp').value;
    const valorHem = document.getElementById('hemoGlic').value;

    let etiquetaPre = "";
    let etiquetaCap = "";
    let etiquetaPos = "";
    let etiquetaHem = "";

    if (Number(valorPre) < 100) {
        etiquetaPre = "Normal";
    } else if (Number(valorPre) >= 100 && Number(valorPre) < 140) {
        etiquetaPre = "Prediabetes";
    } else {
        etiquetaPre = "Diabetes";
    }

    if (Number(valorCap) < 180) {
        etiquetaCap = "Normal";
    } else if (Number(valorCap) >= 180 || Number(valorCap) < 260) {
        etiquetaCap = "Prediabetes";
    } else {
        etiquetaCap = "Diabetes";
    }

    if (Number(valorPost) < 150) {
        etiquetaPos = "Normal";
    } else if (Number(valorPost) >= 150 || Number(valorPost) < 210) {
        etiquetaPos = "Prediabetes";
    } else {
        etiquetaPos = "Diabetes";
    }

    if (Number(valorHem) < 5.5) {
        etiquetaHem = "Normal";
    } else if (Number(valorHem) >= 5.5 || Number(valorHem) < 6.4) {
        etiquetaHem = "Prediabetes";
    } else {
        etiquetaHem = "Diabetes";
    }

    const objeto = {};
    const variablesDifuso = [];

    variablesDifuso.push({variable: "Glucosa prepandial o en ayunas", valor: valorPre, tipo: "Numerica", estado: etiquetaPre});
    variablesDifuso.push({variable: "Glucosa capilar", valor: valorCap, tipo: "Numerica", estado: etiquetaCap});
    variablesDifuso.push({variable: "Glucosa postpandial", valor: valorPost, tipo: "Numerica", estado: etiquetaPos});
    variablesDifuso.push({variable: "Hemoglobina Glicosilada", valor: valorHem, tipo: "Numerica", estado: etiquetaHem});

    // console.log(variablesDifuso);

    for (let i = 0; i < elementosNumericos.length; i++) {
        objeto[elementosNumericos[i].id] = elementosNumericos[i].value;
    }

    for (let i = 0; i < elementosBinomiales.length; i++) {
        objeto[elementosBinomiales[i].id] = elementosBinomiales[i].value;
    }

    // console.log(objeto);
    // console.log(JSON.stringify(objeto));

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            localStorage.setItem("resultados", JSON.stringify(data));
            localStorage.setItem("variablesDifuso", JSON.stringify(variablesDifuso));
            localStorage.setItem("usuario", JSON.stringify({nombre: nombre.value, documento: documento.value}));
            setTimeout(() => window.location = "diagnostic.html", 1500);
        });
}