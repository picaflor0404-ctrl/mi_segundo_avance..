function mensaje() {
    alert("¡Bienvenido a FitLife Gym! Empieza tu transformación hoy ");
}

function comprar(plan) {
    alert("Has seleccionado el plan " + plan + ". Pronto serás redirigido al pago.");
}

function enviarMensaje() {
    alert("Mensaje enviado correctamente. Nos pondremos en contacto contigo.");
}

function calcularIMC() {

    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value;

    if (peso === "" || altura === "") {
        alert("Por favor completa todos los campos");
        return;
    }

    let imc = peso / (altura * altura);
    let resultado = document.getElementById("resultado");

    if (imc < 18.5) {
        resultado.innerHTML = "IMC: " + imc.toFixed(2) + " - Bajo peso";
    }
    else if (imc < 25) {
        resultado.innerHTML = "IMC: " + imc.toFixed(2) + " - Peso normal";
    }
    else if (imc < 30) {
        resultado.innerHTML = "IMC: " + imc.toFixed(2) + " - Sobrepeso";
    }
    else {
        resultado.innerHTML = "IMC: " + imc.toFixed(2) + " - Obesidad";
    }

}

let frases = [
    "¡Nunca te rindas! ",
    "Cada entrenamiento cuenta ",
    "Tu cuerpo puede lograrlo ",
    "La disciplina vence al talento "
];

let indice = 0;

setInterval(() => {
    document.title = frases[indice];
    indice++;

    if (indice >= frases.length) {
        indice = 0;
    }

}, 3000);