const formulario = document.getElementById('formulario');
const listar = document.getElementById('listar');

formulario.addEventListener('click', (e) => {
    window.location = "form.html";
});

listar.addEventListener('click', (e) => {
    window.location = "list.html";
});

