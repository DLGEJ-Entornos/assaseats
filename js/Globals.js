function Usuario(user,pass,nombre,apellidos,idReserva) {
    this.user = user;
    this.pass = pass;
    this.nombre = nombre;
    this.apellidos = apellidos;
    this.idReserva =idReserva;
}
let admin = new Usuario("admin","admin","Manolo","Garcia");
var arrUsuarios = [];
arrUsuarios.push(admin);