///// ▶CREANDO LA ESTRUCTURA DE DATOS QUE /////
function Usuario(user,pass,nombre,apellidos,llave) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.llave =llave;
}
let admin = new Usuario("admin","admin","Manolo","Garcia");
var arrUsuarios = [];
arrUsuarios.push(admin);

let btnEntrar = document.getElementById("btnEntrar");
btnEntrar.disabled = true;
let inUser = document.getElementById("user");
let inPass = document.getElementById("pass");
inPass.disabled = true;

function chkUsr() {
    let userVal = false;
    arrUsuarios.forEach(Usuario =>{
        if (inUser.value == Usuario.user) {
            userVal = true;
            inPass.disabled = false;
            // debugger;
            inPass.style = "visibility:visible;";
        }else{
            inPass.disabled = false;
            inPass.style = "visibility:hidden;";
            btnEntrar.style = "visibility:hidden;";
        }
    })
}
function chkPass() {
    let passVal = false;
    arrUsuarios.forEach(Usuario =>{
        if (inPass.value == Usuario.pass) {
            passVal = true;
            btnEntrar.style = "visibility:visible;";
            btnEntrar.disabled=false;
            inUser.style = "visibility:hidden;";
            
            localStorage.nomUser = Usuario.nombre;  //GUARDADO PERMANENTE DE CREDENCIALES
            localStorage.apeUser = Usuario.apellidos;
        }else{
            inUser.style = "visibility:visible;";
            btnEntrar.disabled=true;
            btnEntrar.style = "visibility:hidden;";
            localStorage.nomUser = "";
            localStorage.apeUser = "";
            // Usuario.llave = null;
        }
    })
}
// Elements.forEach(ArrElemByTipo =>{
//     for(element of ArrElemByTipo){
//         if (element.disponible) {
//             element.tag.setAttribute("onclick", "seleccionar('"+element.coord+"')");
//             element.changeColor();
//         }
//     } 
// })