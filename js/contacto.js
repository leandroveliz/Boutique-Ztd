let miFormulario= document.getElementById("formulario");

miFormulario.addEventListener("submit",validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    console.log("Se envio el formulario");
}


let input1 = document.getElementById("nombre");
let input2 = document.getElementById("apellido");
let input3 = document.getElementById("telefono");
let input4 = document.getElementById("email");

input1.onchange = () => {console.log("Ingreso su nombre")};
input2.onchange = () => {console.log("Ingreso su apellido")};
input3.onchange = () => {console.log("Ingreso su telefono")};
input4.onchange = () => {console.log("Ingreso su email")};