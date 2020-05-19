const fs = require('fs');

const jsonHemoglobina = fs.readFileSync('server/data/data-hemoglobina-glicosilada.json');
const jsonGlucemiaPost = fs.readFileSync('server/data/data-glucemia-post.json');
const jsonGlucemiaPre = fs.readFileSync('server/data/Data.json');
const jsonTriglicerios = fs.readFileSync('server/data/data-triglicerios.json');
const jsonEstres = fs.readFileSync('server/data/data-stress.json');
// const jsonEjercicio = fs.readFileSync('server/data/data-ejercicio.json');
// const jsonSedentario = fs.readFileSync('server/data/data-sedentario.json');
// const jsonFuma = fs.readFileSync('server/data/data-fuma.json');
// const jsonAlcohol = fs.readFileSync('server/data/data-alcohol.json');
// const jsonGrasos = fs.readFileSync('server/data/data-grasos.json');
// const jsonVision = fs.readFileSync('server/data/data-vision.json');
// const jsonFatiga = fs.readFileSync('server/data/data-fatiga.json');
// const jsonDolor = fs.readFileSync('server/data/data-dolor.json');
// const jsonCicatrizacion = fs.readFileSync('server/data/data-cicatrizacion.json');
// const jsonFarmacos = fs.readFileSync('server/data/data-farmacos.json');
const jsonEmbarazos = fs.readFileSync('server/data/Data.json');
const jsonDataBool = fs.readFileSync('server/data/data-bool.json');

let dataHemoglo = JSON.parse(jsonHemoglobina);
let dataGlucemiaPost = JSON.parse(jsonGlucemiaPost);
let dataGlucemiaPre = JSON.parse(jsonGlucemiaPre);
let dataTriglicerios = JSON.parse(jsonTriglicerios);
let dataEstres = JSON.parse(jsonEstres);
// let dataEjercicio = JSON.parse(jsonEjercicio);
// let dataSedentario = JSON.parse(jsonSedentario);
// let dataFuma = JSON.parse(jsonFuma);
// let dataAlcohol = JSON.parse(jsonAlcohol);
// let dataGrasos = JSON.parse(jsonGrasos);
// let dataVision = JSON.parse(jsonVision);
// let dataFatiga = JSON.parse(jsonFatiga);
// let dataDolor = JSON.parse(jsonDolor);
// let dataCicatrizacion = JSON.parse(jsonCicatrizacion);
// let dataFarmacos = JSON.parse(jsonFarmacos);
let dataEmbarazos = JSON.parse(jsonEmbarazos);
let dataBool = JSON.parse(jsonDataBool);

const hemoglobina = (data) => {

    for (const object of data) {
        Number(object.hemoGlico) > 5.5 ? object.value = "Si" : object.value = "No";
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-hemoglobina-glicosilada.json', datos, 'utf-8');

    console.log(data);
}

const glucemiaPost = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 400; i++) {
        let gluPostFact = {
            glucemiaPostpandial: Math.floor(Math.random() * (450 - 50) + 50),
            value: ""
        }

        gluPostFact.glucemiaPostpandial > 140 ? (gluPostFact.value = "Si", positive++) : (gluPostFact.value = "No", negative++);

        data.push(gluPostFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-glucemia-post.json', datos, 'utf-8')

    console.log(data);
    console.log(positive, negative);

}

const glucemiaPre = (data) => {

    let glucemiaPre = []

    for (const item of data) {
        object = {
            preprandial_glucose: item.plasma_glucose,
            diabetes: item.diabetes
        }
        glucemiaPre.push(object);
    }

    let dataGluPre = JSON.stringify(glucemiaPre);

    fs.writeFileSync('server/data/data-glucemia-pre.json', dataGluPre);

    return glucemiaPre
}

const triglicerios = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let triglicerio = {
            triglicerios: Math.floor(Math.random() * (700 - 0) + 0),
            value: ""
        }

        triglicerio.triglicerios > 200 ? (triglicerio.value = "Si", positive++) : (triglicerio.value = "No", negative++);

        data.push(triglicerio);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-triglicerios.json', datos, 'utf-8');

    console.log(data);
    console.log(positive, negative);
}

const estres = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 420; i++) {

        let estres = {
            nivelEstres: Math.floor(Math.random() * (450 - 0) + 0),
            value: ""
        }

        estres.nivelEstres > 200 ? (estres.value = "Si", positive++) : (estres.value = "No", negative++);

        data.push(estres);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-estres.json', datos, 'utf-8');

    console.log(data);
    console.log(positive, negative);
}

const ejercicio = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let ejercicioFact = {
            ejercicio: Math.random(),
            value: ""
        }

        ejercicioFact.ejercicio > 0.5 ? (ejercicioFact.ejercicio = "Si", ejercicioFact.value = "No", positive++) : (ejercicioFact.ejercicio = "No", ejercicioFact.value = "Si", negative++);

        data.push(ejercicioFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-ejercicio.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const sedentario = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let sedentarioFact = {
            sedentario: Math.random(),
            value: ""
        }

        sedentarioFact.sedentario > 0.5 ? (sedentarioFact.sedentario = "Si", sedentarioFact.value = "Si", positive++) : (sedentarioFact.sedentario = "No", sedentarioFact.value = "No", negative++);

        data.push(sedentarioFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-sedentario.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const fuma = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let fumaFact = {
            fuma: Math.random(),
            value: ""
        }

        fumaFact.fuma > 0.5 ? (fumaFact.fuma = "Si", fumaFact.value = "Si", positive++) : (fumaFact.fuma = "No", fumaFact.value = "No", negative++);

        data.push(fumaFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-fuma.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const alcohol = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let alcoholFact = {
            alcohol: Math.random(),
            value: ""
        }

        alcoholFact.alcohol > 0.5 ? (alcoholFact.alcohol = "Si", alcoholFact.value = "Si", positive++) : (alcoholFact.alcohol = "No", alcoholFact.value = "No", negative++);

        data.push(alcoholFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-alcohol.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const grasos = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let grasosFact = {
            AlimenGrasos: Math.random(),
            value: ""
        }

        grasosFact.AlimenGrasos > 0.5 ? (grasosFact.AlimenGrasos = "Si", grasosFact.value = "Si", positive++) : (grasosFact.AlimenGrasos = "No", grasosFact.value = "No", negative++);

        data.push(grasosFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-grasos.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}


const vision = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let visionFact = {
            visionBorrosa: Math.random(),
            value: ""
        }

        visionFact.visionBorrosa > 0.5 ? (visionFact.visionBorrosa = "Si", visionFact.value = "Si", positive++) : (visionFact.visionBorrosa = "No", visionFact.value = "No", negative++);

        data.push(visionFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-vision.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const fatiga = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let fatigaFact = {
            fatiga: Math.random(),
            value: ""
        }

        fatigaFact.fatiga > 0.5 ? (fatigaFact.fatiga = "Si", fatigaFact.value = "Si", positive++) : (fatigaFact.fatiga = "No", fatigaFact.value = "No", negative++);

        data.push(fatigaFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-fatiga.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const dolor = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let dolorFact = {
            dolor: Math.random(),
            value: ""
        }

        dolorFact.dolor > 0.5 ? (dolorFact.dolor = "Si", dolorFact.value = "Si", positive++) : (dolorFact.dolor = "No", dolorFact.value = "No", negative++);

        data.push(dolorFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-dolor.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const cicatrizacion = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let cicratizacionFact = {
            cicatrizacion: Math.random(),
            value: ""
        }

        cicratizacionFact.cicatrizacion > 0.5 ? (cicratizacionFact.cicatrizacion = "Si", cicratizacionFact.value = "Si", positive++) : (cicratizacionFact.cicatrizacion = "No", cicratizacionFact.value = "No", negative++);

        data.push(cicratizacionFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-cicatrizacion.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const farmacos = (data) => {

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 450; i++) {

        let farmacosFact = {
            farmacos: Math.random(),
            value: ""
        }

        farmacosFact.farmacos > 0.5 ? (farmacosFact.farmacos = "Si", farmacosFact.value = "Si", positive++) : (farmacosFact.farmacos = "No", farmacosFact.value = "No", negative++);

        data.push(farmacosFact);
    }

    const datos = JSON.stringify(data);

    fs.writeFileSync('server/data/data-farmacos.json', datos, 'utf-8');

    console.log(positive);
    console.log(negative);
}

const embarazos = (data) => {

    let pregnancies = []

    for (const item of data) {
        object = {
            pregnancies: item.number_of_times_pregnant,
            value: item.diabetes
        }
        pregnancies.push(object);
    }

    let dataPregnancies = JSON.stringify(pregnancies);

    fs.writeFileSync('server/data/data-pregnancies.json', dataPregnancies);

    return pregnancies
}

const dataBooleans = () => {

    let dataBool = [];

    let positive = 0;
    let negative = 0;

    for (let i = 0; i < 768; i++) {
        const object = {
            exercise: Math.round(Math.random()),
            sedentary_life: Math.round(Math.random()),
            smoke: Math.round(Math.random()),
            alcoholism: Math.round(Math.random()),
            fatty_fod: Math.round(Math.random()),
            blurry_vision: Math.round(Math.random()),
            fatigue: Math.round(Math.random()),
            pain_hands_feet: Math.round(Math.random()),
            slow_healing: Math.round(Math.random()),
            drugs: Math.round(Math.random()),
            diabetes: Math.round(Math.random())
        }

        object.diabetes === 1 ? positive ++ : negative ++;
        dataBool.push(object);
    }

    const datos = JSON.stringify(dataBool);

    fs.writeFileSync('server/data/data-bool.json', datos);

    return [positive, negative];
}

//hemoglobina(dataHemoglo);
//glucemiaPost(dataGlucemiaPost);
// console.log(glucemiaPre(dataGlucemiaPre));
//triglicerios(dataTriglicerios);
//estres(dataEstres);
//ejercicio(dataEjercicio);
//sedentario(dataSedentario);
//fuma(dataFuma);
//alcohol(dataAlcohol);
//grasos(dataGrasos);
//vision(dataVision);
//fatiga(dataFatiga);
//dolor(dataDolor);
//cicatrizacion(dataCicatrizacion);
//farmacos(dataFarmacos);
console.log(embarazos(dataEmbarazos));
// console.log(dataBooleans());