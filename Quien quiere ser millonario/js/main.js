/* let datos = [1, 2, 3, 4];
let botones = Array.from(document.querySelectorAll(".respuesta-juego"));

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function randomizar() {
    let numeros = shuffle(datos);
    let cont = 0,
        num;
    for (i in botones) {
        num = numeros[cont++];
        botones[i].value = (num) ? num : " ";
    }
}

function respuestas() {
    for (i in botones) {
        if (botones[i].value == "1") {
            botones[i].value = "Respuesta A";
        } else if (botones[i].value == "2") {
            botones[i].value = "Respuesta B";
        } else if (botones[i].value == "3") {
            botones[i].value = "Respuesta C";
        } else if (botones[i].value == "4") {
            botones[i].value = "Respuesta D";
        }
    }
}
randomizar();
respuestas(); */