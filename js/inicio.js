document.addEventListener("DOMContentLoaded", () => {
    const maskArea = document.getElementById("maskArea");
    const modal = document.getElementById("customModal");
    const closeButton = document.querySelector(".close-button");

    if (maskArea && modal) {
        maskArea.addEventListener("click", (e) => {
            e.preventDefault(); // Evita el comportamiento por defecto del enlace '#'
            modal.style.display = "block";
        });
    }

    if (closeButton && modal) {
        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".flashlight-container");
    const layer = document.getElementById("flashlightLayer");
    const hiddenPhoto = document.getElementById("hiddenPhoto");

    const modal1 = document.getElementById("customModal");
    const modal2 = document.getElementById("secretModal");
    const maskArea = document.getElementById("maskArea");
    
    const close1 = document.getElementById("closeModal1");
    const close2 = document.getElementById("closeModal2");

    if (container && layer) {
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Conseguimos el valor del radio dinámico desde el CSS
            const radius = getComputedStyle(layer).getPropertyValue('--radius').trim() || '35px';

            // Actualizamos el background manteniendo la estructura de doble capa (Linterna + Líneas CRT)
            layer.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    transparent 0%,
                    transparent ${radius},
                    rgba(0, 0, 0, 0.95) calc(${radius} + 5px),
                    rgba(0, 0, 0, 0.95) 100%
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

        // Al salir el ratón, restauramos el estado oculto mimetizado
        container.addEventListener("mouseleave", () => {
            layer.style.background = `
                radial-gradient(
                    circle at -500px -500px,
                    transparent 0%,
                    transparent 35px,
                    rgba(0, 0, 0, 0.95) 40px,
                    rgba(0, 0, 0, 0.95) 100%
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

    // === GESTIÓN DE MODALES ===
    if (maskArea) {
        maskArea.addEventListener("click", (e) => {
            e.preventDefault();
            modal1.style.display = "block";
        });
    }

    if (hiddenPhoto) {
        hiddenPhoto.addEventListener("click", () => {
            modal2.style.display = "block";
        });
    }

    if (close1) close1.addEventListener("click", () => modal1.style.display = "none");
    if (close2) close2.addEventListener("click", () => modal2.style.display = "none");

    window.addEventListener("click", (e) => {
        if (e.target === modal1) modal1.style.display = "none";
        if (e.target === modal2) modal2.style.display = "none";
    });
});