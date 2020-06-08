const url = "http://localhost:4000/api/diagnosis/results";

const lista = document.getElementById('lista');
const volver = document.getElementById('volver');

volver.addEventListener('click', (e) => {
    window.location = "index.html";
});

let datos;

fetch(url, {
    method: 'GET'
})
    .then(res => res.json())
    .then(data => {
        console.log(data);

        datos = data;

        // for (const boton of botones) {
        //     boton.addEventListener('click', (e) => {
        //         console.log('pija por el culo');
        //     });
        // }
        let index = 0;

        console.log(datos);

        for (const dato of datos) {

            const renglon = document.createElement('tr');
            const numero = document.createElement('td');
            const documento = document.createElement('td');
            const nombre = document.createElement('td');
            const salida = document.createElement('td');
            const etiqueta = document.createElement('td');
            const fecha = document.createElement('td');
            const boton = document.createElement('td');

            const button = document.createElement('button');
            button.className += "btn btn-success";
            button.type = "button";

            const i = document.createElement('i');
            i.className += "fas fa-info";

            button.appendChild(i);
            button.innerHTML += " Ver Detalle";

            boton.appendChild(button);

            numero.innerHTML = index + 1;
            documento.innerHTML = dato.document;
            nombre.innerHTML = dato.username;
            salida.innerHTML = dato.diagnosis["Valor del sistema difuso"];
            etiqueta.innerHTML = dato.diagnosis["Diagnostico de SD"];
            fecha.innerHTML = dato.date;

            renglon.appendChild(numero);
            renglon.appendChild(documento);
            renglon.appendChild(nombre);
            renglon.appendChild(salida);
            renglon.appendChild(etiqueta);
            renglon.appendChild(fecha);
            renglon.appendChild(boton);

            lista.appendChild(renglon);
            index++;

            button.addEventListener('click', (e) => {
                const numero = Number(e.srcElement.parentElement.parentElement.children[0].innerHTML);
                const diagnostico = data[numero - 1];
                console.log(diagnostico);

                const variablesDifuso = [];

                const valorPre = diagnostico.diagnosis.fuzzyVariables.preprandial_glucose
                const valorCap = diagnostico.diagnosis.fuzzyVariables.capillar_glucose
                const valorPost = diagnostico.diagnosis.fuzzyVariables.postprandial_glucose
                const valorHem = diagnostico.diagnosis.fuzzyVariables.glycosylated_hemoglobin

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

                variablesDifuso.push({ variable: "Glucosa prepandial o en ayunas", valor: valorPre, tipo: "Numerica", estado: etiquetaPre });
                variablesDifuso.push({ variable: "Glucosa capilar", valor: valorCap, tipo: "Numerica", estado: etiquetaCap });
                variablesDifuso.push({ variable: "Glucosa postpandial", valor: valorPost, tipo: "Numerica", estado: etiquetaPos });
                variablesDifuso.push({ variable: "Hemoglobina Glicosilada", valor: valorHem, tipo: "Numerica", estado: etiquetaHem });
                console.log(variablesDifuso);

                const usuario = { nombre: diagnostico.username, documento: diagnostico.document };
                console.log(usuario);

                console.log(diagnostico.diagnosis);

                localStorage.setItem("resultados", JSON.stringify(diagnostico.diagnosis));
                localStorage.setItem("variablesDifuso", JSON.stringify(variablesDifuso));
                localStorage.setItem("usuario", JSON.stringify(usuario));

                setTimeout(() => {
                    window.location = "diagnostic.html";
                }, 1000);

            });
        }
        const botones = document.querySelectorAll('button');
        console.log(botones);
    })
