function Usuario(user,pass,nombre,apellidos,llave) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.llave =llave;
}
// console.log(document.head.textContent.includes("LOGIN"));
if (document.head.textContent.includes("LOGIN")) {
    let admin = new Usuario("admin","admin","Manolo","Garcia");
    var arrUsuarios = [];
    localStorage.arrUsuarios.push(admin);    
    

}
//var sessionUser; //obj con usuario que ha iniciado sesion.