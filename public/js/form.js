
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

    const embarazos = Number(document.getElementById('embarazos').value);
    const gluAyunas = Number(document.getElementById('gluAyunas').value);
    const preSangDias = Number(document.getElementById('preSangDias').value);
    const esPliegCutTri = Number(document.getElementById('esPliegCutTri').value);
    const ins = Number(document.getElementById('ins').value);
    const imc = Number(document.getElementById('imc').value);
    const funcPediDiab = Number(document.getElementById('funcPediDiab').value);
    const edadAnos = Number(document.getElementById('edadAnos').value);
    const nivelEst = Number(document.getElementById('nivelEst').value);
    const colesterol = Number(document.getElementById('colesterol').value);
    const trigliceridos = Number(document.getElementById('trigliceridos').value);
    const glucemiaCap = Number(document.getElementById('glucemiaCap').value);
    const glucemiaPosp = Number(document.getElementById('glucemiaPosp').value);
    const hemoGlic = Number(document.getElementById('hemoGlic').value);

    // Validación de los campos del formulario
    if (embarazos < 0 || embarazos > 20) {
        alert('Valor o valores invalidos');
    } else if(gluAyunas < 50 || gluAyunas > 450) {
        alert('Valor o valores invalidos');
    } else if(preSangDias < 30 || preSangDias > 250) {
        alert('Valor o valores invalidos');
    } else if(esPliegCutTri < 0 || esPliegCutTri > 100) {
        alert('Valor o valores invalidos');
    } else if(ins < 0 || ins > 1000) {
        alert('Valor o valores invalidos');
    } else if(imc < 0 || imc > 100) {
        alert('Valor o valores invalidos');
    } else if(funcPediDiab < 0 || funcPediDiab > 5) {
        alert('Valor o valores invalidos');
    } else if(edadAnos < 0 || edadAnos > 120) {
        alert('Valor o valores invalidos');
    } else if(nivelEst < 0 || nivelEst > 450) {
        alert('Valor o valores invalidos');
    } else if(colesterol < 0 || colesterol > 400) {
        alert('Valor o valores invalidos');
    } else if(trigliceridos < 0 || trigliceridos > 700) {
        alert('Valor o valores invalidos');
    } else if(glucemiaCap < 50 || glucemiaCap > 450) {
        alert('Valor o valores invalidos');
    } else if(glucemiaPosp < 50 || glucemiaPosp > 450) {
        alert('Valor o valores invalidos');
    } else if(hemoGlic < 0 || hemoGlic > 10) {
        alert('Valor o valores invalidos');
    } else {
        const confirmacion = confirm('¿La información que ingreso es correcta?');

        if (confirmacion) {
            for (const iterator of botones) {
                iterator.disabled = true;
            }
            sendInformation();           
        }
    }
});

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