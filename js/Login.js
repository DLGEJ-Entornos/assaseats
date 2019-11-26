///// ★1 CREANDO LA ESTRUCTURA DE DATOS PARA LOS USUARIOS
function Usuario(user,pass,nombre,apellidos) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.apellidos = apellidos;
}
///// ★2
let admin = new Usuario("admin","admin","Manolo","Garcia");
var arrUsuarios = [];
arrUsuarios.push(admin);

let btnEntrar = document.getElementById("btnEntrar");
btnEntrar.disabled = true;
let inUser = document.getElementById("user");
let inPass = document.getElementById("pass");
inPass.disabled = true;

///// ★3
function chkUsr() {
    let userVal = false;
    arrUsuarios.forEach(Usuario =>{ // REQ.
        if (inUser.value == Usuario.user) {
            userVal = true;
            inPass.disabled = false;
            
            inPass.style = "visibility:visible;";
        }else{
            inPass.disabled = false;
            inPass.style = "visibility:hidden;";
            btnEntrar.style = "visibility:hidden;";
        }
    })
}
///// ★4
function chkPass() {
    let passVal = false;
    arrUsuarios.forEach(Usuario =>{
        if (inPass.value == Usuario.pass) {
            passVal = true;
            btnEntrar.style = "visibility:visible;";
            btnEntrar.disabled=false;
            inUser.style = "visibility:hidden;";
            
            ///// ★5
            localStorage.nomUser = Usuario.nombre;  //GUARDADO PERMANENTE DE CREDENCIALES
            localStorage.apeUser = Usuario.apellidos;
        }else{
            inUser.style = "visibility:visible;";
            btnEntrar.disabled=true;
            btnEntrar.style = "visibility:hidden;";
            localStorage.nomUser = "";
            localStorage.apeUser = "";
        }
    })
}