let btnEntrar = document.getElementById("btnEntrar");
btnEntrar.disabled = true;
let inUser = document.getElementById("user");
let inPass = document.getElementById("pass");
inPass.disabled = true;

function chkUsr() {
    let userVal = false;
    console.log("responseUser");
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
    console.log("responsePass");
    
    let passVal = false;
    console.log("responseUser");
    arrUsuarios.forEach(Usuario =>{
        if (inPass.value == Usuario.pass) {
            passVal = true;
            btnEntrar.style = "visibility:visible;";
            btnEntrar.disabled=false;
            inUser.style = "visibility:hidden;";
            Usuario.llave = Usuario.user;
        }else{
            inUser.style = "visibility:visible;";
            btnEntrar.disabled=true;
            btnEntrar.style = "visibility:hidden;";
            Usuario.llave = null;
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