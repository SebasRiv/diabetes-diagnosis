
const url = "http://localhost:4000/api/diagnosis";
const url2 = "https://pokeapi.co/api/v2/pokemon/ditto";
const url3 = "http://localhost:4000/api/diagnosis/results";

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
    sendInformation();
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

    console.log(variablesDifuso);

    for (let i = 0; i < elementosNumericos.length; i++) {
        objeto[elementosNumericos[i].id] = elementosNumericos[i].value;
    }

    for (let i = 0; i < elementosBinomiales.length; i++) {
        objeto[elementosBinomiales[i].id] = elementosBinomiales[i].value;
    }

    console.log(objeto);
    console.log(JSON.stringify(objeto));

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            localStorage.setItem("resultados", JSON.stringify(data));
            localStorage.setItem("variablesDifuso", JSON.stringify(variablesDifuso));
            localStorage.setItem("usuario", JSON.stringify({nombre: nombre.value, documento: documento.value}));
            setTimeout(() => window.location = "diagnostic.html", 1500);
        });
}