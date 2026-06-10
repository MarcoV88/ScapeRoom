document.addEventListener("DOMContentLoaded", () => {
    
    // === ENRUTADOR DE ESCENAS ===
    const escenas = {
        principal: document.getElementById("escena-principal"),
        puerta1: document.getElementById("escena-puerta1"),
        puerta2: document.getElementById("escena-puerta2"),
        puerta3: document.getElementById("escena-puerta3")
    };

    const btnPuerta1 = document.getElementById("btn-puerta1");
    const btnPuerta2 = document.getElementById("btn-puerta2");
    const btnPuerta3 = document.getElementById("btn-puerta3");
    const botonesRegresar = document.querySelectorAll(".btn-regresar");

    function cambiarEscena(escenaDestino) {
        Object.values(escenas).forEach(escena => escena.classList.remove("activa"));
        escenaDestino.classList.add("activa");
    }

    btnPuerta1.addEventListener("click", () => cambiarEscena(escenas.puerta1));
    btnPuerta2.addEventListener("click", () => cambiarEscena(escenas.puerta2));
    btnPuerta3.addEventListener("click", () => cambiarEscena(escenas.puerta3));

    botonesRegresar.forEach(btn => {
        btn.addEventListener("click", () => cambiarEscena(escenas.principal));
    });


    // BUCLE DE CONSOLA REPETIDO 
    setInterval(() => {
        console.log("====================================");
        console.log("AVISO DE INTRUSIÓN.");
        console.log("CÓDIGO DE DESBLOQUEO PRINCIPAL: 3894");
        console.log("====================================");
    }, 2000);


    // MOVIMIENTO DE LINTERNA
    const capaLinterna = document.getElementById("capaLinterna");

    if (capaLinterna) {
        window.addEventListener("mousemove", (e) => {
            if (!escenas.puerta1.classList.contains("activa")) return;

            const x = e.clientX;
            const y = e.clientY;
            const radio = getComputedStyle(capaLinterna).getPropertyValue('--radius').trim() || '65px';

            capaLinterna.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    transparent 0%,
                    transparent ${radio},
                    rgba(0, 0, 0, 0.99) calc(${radio} + 5px),
                    rgba(0, 0, 0, 0.99) 100%
                ),
                repeating-linear-gradient(
                    0deg,
                    rgba(0, 255, 0, 0.03) 0px,
                    rgba(0, 255, 0, 0.03) 2px,
                    transparent 2px,
                    transparent 8px
                )
            `;
        });
    }


    //  VERIFICACIÓN CÓDIGO FINAL
    const entradaCodigoFinal = document.getElementById("entrada-codigo-final");
    const btnEnviarCodigo = document.getElementById("btn-enviar-codigo");
    const salidaTerminal = document.getElementById("salida-terminal");

    btnEnviarCodigo.addEventListener("click", () => {
        const valor = entradaCodigoFinal.value.trim();
        
        if (valor === "") {
            salidaTerminal.style.color = "#ff3333";
            salidaTerminal.innerText = "ERROR: ENTRADA VACÍA";
            return;
        }

        if (valor === "3894") { 
            salidaTerminal.style.color = "#00ff00";
            salidaTerminal.innerText = "ACCESO CONCEDIDO. ¡HAS ESCAPADO!";
        } else {
            salidaTerminal.style.color = "#ff3333";
            salidaTerminal.innerText = `CÓDIGO "${valor}" RECHAZADO. LLAVE DE RED INCORRECTA.`;
        }
    });

});