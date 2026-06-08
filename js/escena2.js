const respuesta = document.getElementById("respuestaIP");
const enviar = document.getElementById("btnVerificar");
const mensaje = document.getElementById("mensaje");
let intentos = 0;
const IP_CORRECTA = "0.0.0.0";

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

// Función para abrir la modal que queramos
function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "block";
    }
}

// Función para cerrar la modal
function cerrarModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "none";
    }
}

// Cerrar automáticamente si el usuario hace clic fuera
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

//Verificar el IP respuesta dado por el usuario
if (enviar) {
    enviar.addEventListener("click", function() {
        // Si ya no hay vidas, no deja hacer nada
        if (vidas <= 0) return;
        
        const ipIngresada = respuesta.value.trim();
        intentos++;

        if (ipIngresada === IP_CORRECTA) {
            mensaje.innerHTML = "✅ IP CORRECTA. Accediendo a Escena 3...";
            mensaje.style.color = "#00ff41";
            setTimeout(function() {
                window.location.href = "escena3.html";
            }, 1000);
        } 
        else {
            mensaje.innerHTML = "❌ IP incorrecta. Intento " + intentos;
            mensaje.style.color = "#ff4444";
            respuesta.value = "";
            respuesta.focus();
            
            // Reducimos la vida por cada error
            reducirVida();
            
            // Mensaje adicional para cuando le quede una vida
            if (vidas === 1) {
                mensaje.innerHTML += " ⚠️ ¡Última oportunidad! (busca una pista verde en la imagen)";
            }
        }
    });
}

// Presionar Enter para verificar
if (respuesta) {
    respuesta.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            enviar.click();
        }
    });
}

// Inicializar batería al cargar
actualizarBateria();
