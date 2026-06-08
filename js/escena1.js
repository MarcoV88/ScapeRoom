const input1 = document.getElementById("input1");
const input2 = document.getElementById("input2");
const input3 = document.getElementById("input3");
const input4 = document.getElementById("input4");
const input5 = document.getElementById("input5");
const input6 = document.getElementById("input6");
const input7 = document.getElementById("input7");
const input8 = document.getElementById("input8");

const img = document.getElementById("img");
let respuestas = [0,0,0,0,0,0,0,0];

const barra1 = document.getElementById("barra1");
const barra2 = document.getElementById("barra2");
const barra3 = document.getElementById("barra3");
const barra4 = document.getElementById("barra4");
const barra5 = document.getElementById("barra5");
const barra6 = document.getElementById("barra6");
let vidas = 6;

const comprobar = document.getElementById("comprobar");
comprobar.addEventListener("click", function(){
    if(input1.value == "H"){
        input1.style.backgroundColor = "green";
        respuestas.splice(0, 1,1);
    }else if(input1.value == "M"){
        respuestas.splice(0, 1,3);
    }else{
        input1.style.backgroundColor = "red";
        respuestas.splice(0,1,2);
    }
    if(input2.value == "a"){
        input2.style.backgroundColor = "green";
        respuestas.splice(1, 1,1);
    }else if(input2.value == "E"){
        respuestas.splice(1, 1,3);
    }else{
        input2.style.backgroundColor = "red";
        respuestas.splice(1,1,2);
    }
    if(input3.value == "c"){
        input3.style.backgroundColor = "green";
        respuestas.splice(2, 1,1);
    }else if(input3.value == "N"){
        respuestas.splice(2, 1,3);
    }else{
        input3.style.backgroundColor = "red";
        respuestas.splice(2,1,2);
    }
    if(input4.value == "k"){
        input4.style.backgroundColor = "green";
        respuestas.splice(3, 1,1);
    }else if(input4.value == "S"){
        respuestas.splice(3, 1,3);
    }else{
        input4.style.backgroundColor = "red";
        respuestas.splice(3,1,2);
    }
    if(input5.value == "e"){
        input5.style.backgroundColor = "green";
        respuestas.splice(4, 1,1);
    }else if(input5.value == "A"){
        respuestas.splice(4, 1,3);
    }else{
        input5.style.backgroundColor = "red";
        respuestas.splice(4,1,2);
    }
    if(input6.value == "a"){
        input6.style.backgroundColor = "green";
        respuestas.splice(5, 1,1);
    }else if(input6.value == "J"){
        respuestas.splice(5, 1,3);
    }else{
        input6.style.backgroundColor = "red";
        respuestas.splice(5,1,2);
    }
    if(input7.value == "d"){
        input7.style.backgroundColor = "green";
        respuestas.splice(6, 1,1);
    }else if(input7.value == "E"){
        respuestas.splice(6, 1,3);
    }else{
        input7.style.backgroundColor = "red";
        respuestas.splice(6,1,2);
    }
    if(input8.value == "o"){
        input8.style.backgroundColor = "green";
        respuestas.splice(7, 1,1);
    }else if(input8.value == "1"){
        respuestas.splice(7, 1,3);
    }else{
        input8.style.backgroundColor = "red";
        respuestas.splice(7,1,2);
    }
    console.log(respuestas)
    let j = 0;
    let error = 0;
    let pista = 0;
    for(let i = 0; i < respuestas.length; i++){
        if(respuestas[i] == 1){
            j++
        }
        if(respuestas[i] == 2){
            error = 1;
        }
        if(respuestas[i] == 3){
            pista++;
        }
    }
    if(j == 8){
        img.style.display = "block"
    }
    if(error == 1){
        vidas = vidas -1;
        if(vidas == 5){
            barra1.className = "critico"
        }
        if(vidas == 4){
            barra2.className = "critico"
        }
        if(vidas == 3){
            barra3.className = "critico"
        }
        if(vidas == 2){
            barra4.className = "critico"
        }
        if(vidas == 1){
            barra5.className = "critico"
        }
        if(vidas == 0){
            barra6.className = "critico"
            console.log(vidas)
        }
    }
    const modal = document.getElementById("modal");
    if(pista == 8){
        modal.innerHTML = `
                    <div class="modal">
                        <p>Pista: </p>
                        <button id="cerrar">x</button>
                        <p>Código ASCII</p>
                    </div>
                `;
                const cerrarModal = document.getElementById("cerrar");
                
                cerrarModal.addEventListener('click', () => {
                    modal.close();
                });
                modal.showModal();
    }

    if(vidas == 0){
                modal.innerHTML = `
                    <div class="modal">
                        <button id="cerrar">x</button>
                        <p>Batería agotada</p>
                    </div>
                `;
                const cerrarModal = document.getElementById("cerrar");
                
                cerrarModal.addEventListener('click', () => {
                    modal.close();
                });
                modal.showModal();
    }

});


img.addEventListener("click",function(){
    window.location.href = "escena2.html";
    })

