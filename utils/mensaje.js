function data (texto, repoLink, c1, c2, c3)  {
  
 return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Felicidades! - ScapeRoom Hackers</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #0a0a0f;
            font-family: 'Courier New', 'Segoe UI', monospace;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .card {
            background-color: #0f0f15;
            border: 2px solid #00ff41;
            border-radius: 15px;
            padding: 30px;
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.3);
        }
        .titulo {
            text-align: center;
            color: #00ff41;
            font-size: 28px;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        .mensaje {
            background-color: #001100;
            border-left: 4px solid #00ff41;
            padding: 15px;
            margin: 20px 0;
            color: #cccccc;
            font-size: 16px;
        }
        .seccion {
            margin: 25px 0;
            padding: 15px;
            background-color: #0a0a0a;
            border-radius: 10px;
            border: 1px solid #333;
        }
        .seccion h3 {
            color: #ffaa00;
            margin-top: 0;
            margin-bottom: 15px;
            border-bottom: 1px solid #ffaa00;
            display: inline-block;
        }
        .link-repo {
            display: inline-block;
            background-color: #00ff41;
            color: #0a0a0a;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin-top: 10px;
        }
        .creadores {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        .creador {
            flex: 1;
            background-color: #001111;
            padding: 10px;
            border-radius: 8px;
            text-align: center;
            border: 1px solid #00ff41;
        }
        .creador .email {
            color: #00ff41;
            font-size: 12px;
            word-break: break-all;
        }
        .creador .icono {
            font-size: 24px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 11px;
            color: #555;
            border-top: 1px solid #333;
            padding-top: 20px;
        }
        hr {
            border-color: #00ff41;
            margin: 20px 0;
        }
        .emoji {
            font-size: 40px;
            text-align: center;
        }
        .boton-alta {
            background-color: #ffaa00;
            color: #0a0a0a;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            display: inline-block;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="emoji">🏆🕶️💻</div>
            <div class="titulo">¡SCAPE ROOM COMPLETADO!</div>
            
            <div class="mensaje">
                ${texto}
            </div>
            
            <div class="seccion">
                <h3>📂 CÓDIGO FUENTE</h3>
                <p>Puedes ver el repositorio completo del proyecto aquí:</p>
                <a href="${repoLink}" class="link-repo" target="_blank">🔗 ACCEDER AL REPOSITORIO</a>
            </div>
            
            <div class="seccion">
                <h3>👨‍💻 CREADORES</h3>
                <p>Si quieres darte de alta en la aplicación o tienes sugerencias, contáctanos:</p>
                <div class="creadores">
                    <div class="creador">
                        <div class="icono">👤</div>
                        <div class="email">${c1}</div>
                    </div>
                    <div class="creador">
                        <div class="icono">👤</div>
                        <div class="email">${c2}</div>
                    </div>
                    <div class="creador">
                        <div class="icono">👤</div>
                        <div class="email">${c3}</div>
                    </div>
                </div>
            </div>
            
            <div class="seccion" style="text-align: center;">
                <h3>📧 ¿QUIERES DARTE DE ALTA?</h3>
                <p>Si deseas recibir novedades o formar parte de nuestra comunidad,</p>
                <a href="mailto:${c1},${c2},${c3}?subject=Me%20quiero%20dar%20de%20alta" class="boton-alta">✉️ SOLICITAR ALTA</a>
            </div>
            
            <hr>
            
            <div class="footer">
                🕶️ ScapeRoom Hackers - Modo Sigilo Activado 🕶️<br>
                &copy; 2026 - Todos los derechos reservados - Hecho por Rubén Pariente, Luis López-Nuño y Marco Villamediana
            </div>
        </div>
    </div>
</body>
</html>
    ;`
}

module.exports = data;
