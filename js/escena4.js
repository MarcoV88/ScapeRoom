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
            reducirVida()

    
    }
    });



    
// Elementos de la batería
const barra1 = document.getElementById("barra1");
const barra2 = document.getElementById("barra2");
const barra3 = document.getElementById("barra3");
const barra4 = document.getElementById("barra4");
const barra5 = document.getElementById("barra5");
const barra6 = document.getElementById("barra6");

let vidas = 6;
const barras = [barra1, barra2, barra3, barra4, barra5, barra6];

// Función para actualizar la batería visualmente
function actualizarBateria() {
    // Todas las barras empiezan normales
    for (let i = 0; i < barras.length; i++) {
        if (barras[i]) {
            barras[i].className = "barra";
            
        }
    }
    
    // Las barras que corresponden a las vidas perdidas se ponen de color rojo
    const perdidas = 6 - vidas;
    for (let i = 0; i < perdidas; i++) {
        if (barras[i]) {
            barras[i].className = "critico";
        }
    }
    
    // Si el usuario se queda sin vidas, se muestra el modal de game over
    if (vidas <= 0) {
        mostrarGameOver();
    }
}

// Función para mostrar Game Over
function mostrarGameOver() {
    // Creo el modal de game over
    let modalGameOver = document.getElementById("modalGameOver");
    if (!modalGameOver) {
        modalGameOver = document.createElement("div");
        modalGameOver.id = "modalGameOver";
        modalGameOver.className = "modal";
        modalGameOver.innerHTML = `
            <div class="contenido-modal">
                <h2>💀 BATERÍA AGOTADA 💀</h2>
                <p>Has fallado demasiadas veces. El sistema se ha bloqueado.</p>
                <button id="reiniciarBtn" style="background-color:#00ff41; color:black; padding:10px; margin-top:15px; cursor:pointer;">Reiniciar Escena</button>
            </div>
        `;
        document.body.appendChild(modalGameOver);
        
        const reiniciarBtn = document.getElementById("reiniciarBtn");
        if (reiniciarBtn) {
            reiniciarBtn.addEventListener("click", function() {
                window.location.href = "inicio.html"; // Redirigir a la pagina principal
            });
        }
    }
    modalGameOver.style.display = "block";
}

// Función para reducir vida cuando hay error
function reducirVida() {
    if (vidas > 0) {
        vidas--;
        actualizarBateria();
        console.log("Vidas restantes:", vidas);
    }
    
    if (vidas <= 0) {
        if (enviar) enviar.disabled = true;
        if (respuesta) respuesta.disabled = true;
    }
}   
    

});