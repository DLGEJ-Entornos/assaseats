function Usuario(user,pass,nombre,apellidos,llave) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.llave =llave;
}
function ListaUsers(lista) { //guarda array
    this.lista = lista;
}
// console.log(document.head.textContent.includes("LOGIN"));
if (document.head.textContent.includes("LOGIN")) {
    let admin = new Usuario("admin","admin","Manolo","Garcia");
    var arrUsuarios = [];
    arrUsuarios.push(admin);    
    ListaUsers.lista = arrUsuarios;
}
//var sessionUser; //obj con usuario que ha iniciado sesion.