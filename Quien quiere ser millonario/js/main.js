var secciones = [];
var tiempo_splash = 2500;
/* agregado */
var tiempo_nivel = 1000;
/* fin agregado */
window.onload = function() {
    inicializarReferencias();
    setTimeout(cambiarSplash, tiempo_splash);
    this.inicializarJuego();
}

function inicializarReferencias() {
    secciones[1] = document.getElementById("seccion-splash");
    secciones[2] = document.getElementById("seccion-home");
    secciones[3] = document.getElementById("seccion-juego");
    secciones[4] = document.getElementById("seccion-creditos");
    secciones[5] = document.getElementById("seccion-instrucciones");
    /* agregado */
    secciones[6] = document.getElementById("seccion-nivel-juego");
}

function mostrarNivel() {
    nivelActual = document.getElementById("nivelActual");
    if (contador == 0) {
        nivelActual.innerHTML = "Nivel 1";
        cambiarSeccion(6);
        setTimeout(volverAlJuego, tiempo_nivel);
    } else if (contador == 30) {
        nivelActual.innerHTML = "Nivel 2";
        cambiarSeccion(6);
        setTimeout(volverAlJuego, tiempo_nivel);
    } else if (contador == 60) {
        nivelActual.innerHTML = "Nivel 3";
        cambiarSeccion(6);
        setTimeout(volverAlJuego, tiempo_nivel);
    } else if (contador == 100) {
        nivelActual.innerHTML = "Has ganado el juego";
        cambiarSeccion(6);
        /*         setTimeout(volverAlJuego, tiempo_nivel);
                terminarJuego(); */
    }
    /* else {
           nivelActual.innerHTML = "Siguiente nivel";
           cambiarSeccion(6);
           setTimeout(volverAlJuego, 1000);
       } */
}

function volverAlJuego() {
    if (!document.getElementById("seccion-nivel-juego").classList.contains("oculto")) {
        document.getElementById("seccion-nivel-juego").classList.add("oculto");
        cambiarSeccion(3);
    }
}


/* fin agregado */
function cambiarSplash() {
    secciones[1].className = "splash oculto";
    secciones[2].className = "home";
}

function cambiarSeccion(id_seccion) {
    for (var i in secciones) {
        secciones[i].classList.add("oculto");
    }
    secciones[id_seccion].classList.add("animated");
    secciones[id_seccion].classList.add("headShake");
    secciones[id_seccion].classList.remove("oculto");
}

function inicializarJuego() {
    contador = 0;
    countAyudaSolucion = 0;
    countAyudaPublico = 0;
    countAyuda50 = 0;
    r = 0;
    datos = [1, 2, 3, 4];
    nivelFacil = ["Según el refran quien es ciego?", "El amor", "La esperanza", "El odio", "La envidia",
        "Segun el refran El que se acuesta a dormir es porque cria", "fama", "alegria", "flojera", "sueño",
        "Uno de ellos canta Vamos pa la conga", "Ricardo Montaner", "Guillermo Davila", "Nino Bravo", "Frank Quintero",
        "Complete el siguiente trabalenguas: Me han dicho que has dicho un dicho un dicho que he...", "Dicho", "Escuchado", "Contado", "Aprendido",
        "Uno de los libros de J. K. Rowling es Harry Potter y:", "El prisionero de Azkaban", "El arca perdida", "La magia negra", "Su varita",
        'A que tipo de animales se refiere la palabra "aviario"?', "Aves", "Peces", "Mamíferos", "Moluscos",
        "La hormiga es un :", "Insecto", "Mamífero", "Ave", "Reptil"
    ];
    nivelMedio = ["Una persona famelica esta:", "Hambrienta", "Irritable", "Furiosa", "Asustada",
        "El albinismo se presenta por la carencia de", "Pigmentacion", "calcio", "VitaminaA", "Oxígeno",
        "Fina Torres dirigio una de las siguientes películas:", "Mecanicas celestes", "Sicario", "Tokio Paraguaipoa", "Santera",
        'Quien dirigio la pelicula "el padrino" en 1972', "Francis Ford Capolla", "Roman Polanski", "Franco Zeffirelli", "Federico Fellini",
        'Con que material esculpió Miguel Angel "La Piedad" ubicada en el Vaticano?', "Marmol", "Bronce", "Madera", "Yeso",
        "Cual es el idioma oficial de Israel?", "Hebreo", "Japones", "Griego", "Chino",
        "Cual de los siguientes países limita con Francia?", "Belgica", "Holanda", "Suecia", "Dinamarca"

    ];
    nivelDificil = ["Jose Tomas Boves murio en la Batalla de", "Urica", "Carabobo", "Mucuritas", "Calabozo",
        "El sistema electoral para determinar las personas que ocuparan cargos publicos:", "Sufragio", "Adagio", "Naufragio", "Prestigio",
        "Cual de estos instrumentos mide la densidad de los aceites?", "Oleometro", "Dinamometro", "Micrometro", "Holometro",
        "Son las membranas movibles cubiertas de piel que resguardan los ojos", "Parpados", "Cejas", "Pupilas", "Anteojos",
        "Tecnica que describe y representa detalladamente la superficie de un terreno:", "Topografía", "Serigrafía", "Epigrafía", "Holografía",
        "En la mitología griega, Eros es considerado el dios del:", "Amor", "Odio", "Miedo", "Trabajo",
        "Cual de estos animales es un rumiante?", "La vaca", "La ardilla", "El caracol", "El loro"
    ];
    respuestas = [];
    pregunta = document.getElementById("pregunta-juego");
    opciones = document.getElementById("respuesta-juego");
    botones = Array.from(document.querySelectorAll(".respuesta-juego"));
    llenarRespuestas();
}

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

function aleatorizarPreguntas() {
    count = 0;
    lista = [0, 5, 10, 15, 20, 25, 30];
    fisher_yates(lista);
}

function fisher_yates(array) { // v2005-06-01
    var i = array.length;
    while (i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[j];
        array[j] = tmp;
    }
}

function cambiarPregunta() {
    cerrarAyudas()
    r = lista[count];
    count++;
    llenarRespuestas();
}

function llenarRespuestas() {
    randomizar();
    if (contador == 0) {
        respuestas = nivelFacil;
        aleatorizarPreguntas();
        r = lista[0];
        count = 1;
    } else if (contador == 30) {
        respuestas = nivelMedio;
        aleatorizarPreguntas();
        r = lista[0];
        count = 1;
    } else if (contador == 60) {
        respuestas = nivelDificil;
        aleatorizarPreguntas();
        r = lista[0];
        count = 1;
    }
    for (i in botones) {
        pregunta.innerHTML = respuestas[r];
        if (botones[i].value == "1") {
            botones[i].value = respuestas[r + 1];
        } else if (botones[i].value == "2") {
            botones[i].value = respuestas[r + 2];
        } else if (botones[i].value == "3") {
            botones[i].value = respuestas[r + 3];
        } else if (botones[i].value == "4") {
            botones[i].value = respuestas[r + 4];
        }
    }
}

function verificarRespuesta(id) {
    eleccion = document.getElementById(id);
    if (eleccion.value == respuestas[r + 1]) {
        alert("correcto");
        contador += 10;
        document.getElementById("contadorPremio").innerHTML = contador + "%";
    } else {
        alert("incorrecto");
        contador = 0;
        document.getElementById("contadorPremio").innerHTML = contador + "%";
    }
    cambiarPregunta();
}

function verificarAyudas(id) {
    if (id == "ayuda-solucion" && countAyudaSolucion == 0) {
        countAyudaSolucion++;
        abrirAyudas(id);
    } else if (id == "ayuda-publico" && countAyudaPublico == 0) {
        countAyudaPublico++;
        abrirAyudas(id);
    } else if (id == "ayuda-50" && countAyuda50 == 0) {
        countAyuda50++;
        abrirAyudas(id);
    } else {
        abrirAyudas("");
    }
}

function abrirAyudas(id) {
    ayuda = document.getElementById("panel-ayuda");
    imagen = document.getElementById("imagenAyuda");
    if (id == "ayuda-solucion") {
        /* ayuda.innerHTML = "Se mostrara la respuesta correcta"; */
        imagen.style.backgroundImage = "url('./img/Grupo\ 167.png')";
        ayuda.innerHTML = "La solucion es: " + respuestas[r + 1];
    } else if (id == "ayuda-publico") {
        imagen.style.backgroundImage = "url('./img/Grupo\ 168.png')";
        ayudaPublico();
        /*         ayuda.innerHTML = "El publico elige la opcion que creen correcta"; */
    } else if (id == "ayuda-50") {
        imagen.style.backgroundImage = "url('./img/Grupo\ 166.png')";
        ayuda50();
        /* ayuda.innerHTML = "Se mostraran dos posibles respuestas"; */
    } else {
        ayuda.innerHTML = "No se puede utilizar esta ayuda";
    }
    document.getElementById("ventana").classList.remove("oculto");
}

function cerrarAyudas() {
    document.getElementById("ventana").classList.add("oculto");
}

function ayudaPublico() {
    a = Math.round(Math.random() * 100);
    b = Math.round(Math.random() * 100);
    c = Math.round(Math.random() * 100);
    d = Math.round(Math.random() * 100);
    suma = a + b + c + d;
    if (suma > 100) {
        while (suma > 100) {
            a = Math.round(Math.random() * 100);
            b = Math.round(Math.random() * 100);
            c = Math.round(Math.random() * 100);
            d = Math.round(Math.random() * 100);
            suma = a + b + c + d;
        }
    }
    restante = 100 - suma;
    ayuda.innerHTML = "El publico respondio:" + "<br>" +
        respuestas[r + 1] + " " + a + "%<br>" +
        respuestas[r + 2] + ": " + b + "%<br>" +
        respuestas[r + 3] + ": " + c + "%<br>" +
        respuestas[r + 4] + ": " + d + "%<br>" +
        "No respondio o no sabe: " + restante + "%";
}

function ayuda50() {
    rand = Math.round(Math.random() * (1 - 0) + 0);
    posibilades = [];
    if (rand == 0) {
        posibilades[0] = respuestas[r + 1];
        posibilades[1] = respuestas[r + Math.round(Math.random() * (4 - 2) + 2)];
    } else {
        posibilades[0] = respuestas[r + Math.round(Math.random() * (4 - 2) + 2)];
        posibilades[1] = respuestas[r + 1];
    }
    ayuda.innerHTML = "Posibles respuestas:" + "<br>" + posibilades[0] + "<br>" + posibilades[1];
}