// Elementos de la batería
const barra1 = document.getElementById("barra1");
const barra2 = document.getElementById("barra2");
const barra3 = document.getElementById("barra3");
const barra4 = document.getElementById("barra4");
const barra5 = document.getElementById("barra5");
const barra6 = document.getElementById("barra6");
const barras = [barra1, barra2, barra3, barra4, barra5, barra6];

let vidas = 6;
let juegoCompletado = false;
let sumaAcertada = false;  // Para saber si ya pasó la primera fase

// Números visibles en los modales
const NUMERO_SERVIDOR = 443;
const NUMERO_LOG = 3;
const NUMERO_PC = 7;
const SUMA_CORRECTA = 443 + 3 + 7; // 453

// Número oculto en el inicio (lo encontraron en Escena 1 o 2)
// En este caso, lo ponemos realista: el puerto 22 (SSH) o la IP 192.168.1.1
const NUMERO_OCULTO_INICIO = 22;  // Puerto SSH, muy común en hacking

// Clave final: suma correcta - número oculto (o la operación que quieras)
// 453 - 22 = 431
const CLAVE_FINAL = SUMA_CORRECTA - NUMERO_OCULTO_INICIO; // 431

// Función para actualizar batería
function actualizarBateria() {
    for (let i = 0; i < barras.length; i++) {
        if (barras[i]) barras[i].className = "barra";
    }
    const perdidas = 6 - vidas;
    for (let i = 0; i < perdidas; i++) {
        if (barras[i]) barras[i].className = "critico";
    }
}

// Función para abrir modales
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.style.display = "block";
}

function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) modal.style.display = "none";
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

// Función para perder vida
function perderVida() {
    vidas--;
    actualizarBateria();
    
    if (vidas <= 0) {
        mostrarGameOver();
    }
    return vidas;
}

// Función para mostrar Game Over
function mostrarGameOver() {
    let modalGameOver = document.getElementById("modalGameOver");
    if (!modalGameOver) {
        modalGameOver = document.createElement("div");
        modalGameOver.id = "modalGameOver";
        modalGameOver.className = "modal";
        modalGameOver.innerHTML = `
            <div class="contenido-modal" style="text-align:center;">
                <h2>💀 GAME OVER 💀</h2>
                <p>El servidor te ha detectado. Has perdido todas las vidas.</p>
                <button id="reiniciarBtn" style="background-color:#ff4444; color:white; padding:10px; margin-top:15px; cursor:pointer;">REINICIAR ESCENA</button>
            </div>
        `;
        document.body.appendChild(modalGameOver);
        document.getElementById("reiniciarBtn").addEventListener("click", () => location.reload());
    }
    modalGameOver.style.display = "block";
}

// Botón para volver al inicio guardando progreso
const btnVolverInicio = document.getElementById("btnVolverInicio");

if (btnVolverInicio) {
    btnVolverInicio.addEventListener("click", function() {
        // Guardar el progreso actual
        sessionStorage.setItem("volviendoDesdeEscena3", "true");
        localStorage.setItem("sumaAcertada", sumaAcertada);
        localStorage.setItem("vidas", vidas);
        localStorage.setItem("juegoCompletado", juegoCompletado);
        
        // Ir al inicio
        window.location.href = "inicio.html";
    });
}

// Al cargar la escena 3, recuperar progreso guardado
function recuperarProgreso() {
    const volviendo = sessionStorage.getItem("volviendoDesdeEscena3");
    if (volviendo === "true") {
        sumaAcertada = localStorage.getItem("sumaAcertada") === "true";
        vidas = parseInt(localStorage.getItem("vidas")) || 6;
        juegoCompletado = localStorage.getItem("juegoCompletado") === "true";
        
        // Limpiar la bandera
        sessionStorage.removeItem("volviendoDesdeEscena3");
        
        // Restaurar interfaz
        actualizarBateria();
        
        if (sumaAcertada && claveFinalContainer) {
            claveFinalContainer.style.display = "block";
            if (document.getElementById("codigoSuma")) {
                document.getElementById("codigoSuma").disabled = true;
                document.getElementById("btnVerificarSuma").disabled = true;
            }
        }
        
    }
}

// Llamar a esta función al inicio
recuperarProgreso();

// LÓGICA PRINCIPAL
function iniciarJuego() {
    const btnVerificarSuma = document.getElementById("btnVerificarSuma");
    const mensajeSuma = document.getElementById("mensajeSuma");
    const inputSuma = document.getElementById("codigoSuma");
    const claveFinalContainer = document.getElementById("claveFinalContainer");
    const pistaOculta = document.getElementById("pistaOculta");
    const btnVerificarFinal = document.getElementById("btnVerificarFinal");
    const inputFinal = document.getElementById("codigoFinal");
    const mensajeFinal = document.getElementById("mensajeFinal");
    
    if (!btnVerificarSuma) return;
    
    // FASE 1: Verificar la suma de los tres números
    btnVerificarSuma.addEventListener("click", function() {
        if (juegoCompletado) return;
        if (vidas <= 0) return;
        if (sumaAcertada) {
            mensajeSuma.innerHTML = "⚠️ Ya superaste esta fase. Introduce la clave final.";
            return;
        }
        
        const sumaIngresada = parseInt(inputSuma.value);
        
        // Dentro de la función donde acertaste la suma
    if (sumaIngresada === SUMA_CORRECTA) {
        sumaAcertada = true;
        mensajeSuma.innerHTML = "✅ ¡Suma correcta! Ahora necesitas la clave final.";
        mensajeSuma.style.borderLeftColor = "#00ff41";
        mensajeSuma.style.color = "#00ff41";
        
        // Mostrar contenedor
        if (claveFinalContainer) {
            claveFinalContainer.style.display = "block";
        }
        
        // PISTA CON ENLACE FUNCIONAL
        if (pistaOculta) {
            pistaOculta.innerHTML = `🕶️ Casi lo tienes. La suma es correcta, pero el firewall pide un último número. Revisa los <strong style="color:#ffaa00; cursor:pointer; text-decoration:underline;" id="linkAlInicio">ARCHIVOS CLASIFICADOS del principio</strong>. Ahí está el que falta.`;
        }
        
        inputSuma.disabled = true;
        btnVerificarSuma.disabled = true;
        if (inputFinal) inputFinal.focus();
    }
        else {
            // SUMA INCORRECTA
            const vidasRestantes = perderVida();
            mensajeSuma.innerHTML = `❌ Suma incorrecta (${sumaIngresada} no es correcto). Te quedan ${vidasRestantes} vidas.`;
            mensajeSuma.style.borderLeftColor = "#ff4444";
            inputSuma.value = "";
            inputSuma.focus();
        }
    });
    
    // FASE 2: Verificar la clave final
    if (btnVerificarFinal) {
        btnVerificarFinal.addEventListener("click", function() {
            if (juegoCompletado) return;
            if (vidas <= 0) return;
            if (!sumaAcertada) {
                mensajeFinal.innerHTML = "⚠️ Primero debes acertar la suma.";
                return;
            }
            
            const claveIngresada = parseInt(inputFinal.value);
            
            if (claveIngresada === CLAVE_FINAL) {
                // Cambio a escena 4 tras acertar 
                mensajeFinal.innerHTML = "✅ ¡CLAVE CORRECTA! Exploit ejecutado. Accediendo al sistema...";
                mensajeFinal.style.borderLeftColor = "#00ff41";
                mensajeFinal.style.color = "#00ff41";
                setTimeout(function() {
                    window.location.href = "escena4.html";
                }, 1000);
            } 
            else {
                // CLAVE INCORRECTA
                const vidasRestantes = perderVida();
                mensajeFinal.innerHTML = `❌ Clave incorrecta (${claveIngresada}). Te quedan ${vidasRestantes} vidas.`;
                mensajeFinal.style.borderLeftColor = "#ff4444";
                inputFinal.value = "";
                inputFinal.focus();
                
                if (vidas <= 0) {
                    mensajeFinal.innerHTML = "💀 Sin vidas. Game Over.";
                }
            }
        });
        
        // Enter para el input final
        if (inputFinal) {
            inputFinal.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    btnVerificarFinal.click();
                }
            });
        }
    }
    
    // Enter para el input de suma
    if (inputSuma) {
        inputSuma.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                btnVerificarSuma.click();
            }
        });
    }
}
document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "linkAlInicio") {
        window.location.href = "inicio.html";
    }
});

// Inicializar
actualizarBateria();
iniciarJuego();