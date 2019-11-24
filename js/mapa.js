/////Ѡ RECUPERANDO CREDENCIALES DEL USUARIO LOGUEADO /////
console.log(localStorage.getItem("nomUser"));
console.log(localStorage.getItem("apeUser"));
/////////////////

//Ѡ Extraemos información del DOM (tags del svg) y los almacenamos en nuestro modelo de datos.
var btnConfirmar = document.getElementById("confirm");
btnConfirmar.disabled = true;

function getTipo(tag) { //esto es validación mas q otra cosa?

    if (tag.tagName == "circle") {
        return "sala";
    }else if(tag.tagName == "rect"){
        if (tag.id.includes("Pc")) {
            return "mesaPc";
        }else
            return "mesaM";
    }else
        alert("Error, la etiqueta no es ni circulo , ni rectangulo. Es: "+tag.tagName);
}

function getColor() { //NO DEVUELVAS VALOR, CAMBIA EL COLOR DEL OBJETO EN EL DOM (THIS.TAG valdria?, pasado por referencia?)
    console.log("entra en getColor");
    if (!this.disponible) {
        this.tag.style.fill = "red";
    }else{
        if (this.selec) {
            this.tag.style.fill = "green";
            
        }else{
            if (this.tipo == "mesaM") {
                this.tag.style.fill = "#a05a2c";
                // this.tag.style.fill = "purple";
                this.tag.style.cursor = "hand";
            }else{
                this.tag.style.fill = "#ffd42a";
                this.tag.style.cursor = "hand";
            }
        }
    }
}   
function Elemento(tipo,id,disponible,genCod,selec,tag,coord) { //tag es por REFERENCIA o por valor?
    this.tipo = tipo;
    this.id = id;
    this.disponible = disponible;
    this.genCod = genCod;
    this.selec = selec;
    this.changeColor = getColor;
    this.tag = tag;
    this.coord = coord;
}

var Elements = [new Array(63),new Array(30),new Array(34)]; //MesasMarrones , MesasPcs, Salas
for (let i = 0; i < 63; i++) {
    let tagMesaM = document.getElementById("mesaMarron"+i);
    let tagMesaPc = document.getElementById("mesaPc"+i);
    let tagSala = document.getElementById("sala"+i);
    
    // recoger tags en matriz o directamente generar objetos Elementos e introducirlos en un array de Obj elementos? Mejor esto ,no?
    if (tagMesaM != null) {
        let persCoord = "0,"+i;
        let elMesaM = new Elemento(getTipo(tagMesaM),tagMesaM.id,true,false,false,tagMesaM,persCoord);
        Elements[0][i] = elMesaM;
    }
    if (tagMesaPc != null) {
        let persCoord = "1,"+i;
        let elMesaPc = new Elemento(getTipo(tagMesaPc),tagMesaPc.id,true,false,false,tagMesaPc,persCoord);
        Elements[1][i] = elMesaPc;
    }
    if (tagSala != null) {
        let persCoord = "2,"+i;
        let elSala = new Elemento(getTipo(tagSala),tagSala.id,true,false,false,tagSala,persCoord);
        Elements[2][i] = elSala;
    }
}

//Ѡ BLOQUEO DE 100
    //mMarron(63) => 50 //mesaPc(30) => 20 //sala(34) => 30
for (let i = 0; i < 50; i++) {
    // debugger;
    Elements[0][i].disponible = false;
    Elements[0][i].changeColor();
    // console.log(Elements[0][i]);
    if (i < 20) {
        Elements[1][i].disponible = false;
        Elements[1][i].changeColor();    
    }
    if (i < 30) {
        Elements[2][i].disponible = false;
        Elements[2][i].changeColor();
    }
}

var coordCandidata;
function seleccionar(coord) { //HAZ funcionalidad: Bool selec=true, COLOR GREEN +(control de cambiar selecionada)

    let elemento = Elements[coord[0]][coord.substring(2,coord.length)]; //asignacion q se repite en confirm() hazla en funcion

    if (!btnConfirmar.disabled && coord != coordCandidata) { //ya hay 1 selec y estas selec OTRO
        alert("Sólo puedes hacer 1 reserva. Deselecciona la actual.");
    }else{
        if (elemento.selec) {
            elemento.selec = false;
            elemento.changeColor(); //A ORIGINAL
            btnConfirmar.disabled = true;
        }else{
            elemento.selec = true;
            coordCandidata = coord;
            elemento.changeColor(); //A VERDE
            btnConfirmar.disabled = false;
        } 
    }
}
//Haciendo seleccionables los Disponibles (EVENTonclick+changeColor en tag)
Elements.forEach(ArrElemByTipo =>{
    for(element of ArrElemByTipo){
        if (element.disponible) {
            element.tag.setAttribute("onclick", "seleccionar('"+element.coord+"')");
            element.changeColor();
        }
    } 
})
function confirm() {
    // console.log(coordCandidata);
    // let exit = false;
    // let arrUsers = ListaUsers.lista;
    // for (let i = 0; i < arrUsers.length && !exit; i++) {
    //     if (arrUsers[i].llave != null) {
    //         arrUsers[i].llave = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+
    //         arrUsers[i].nombreUser+coordCandidata;
    //     exit = true;
    //     console.log(arrUsers[i].llave);
    //     }
    // }
 
    let elemento = Elements[coordCandidata[0]][coordCandidata.substring(2,coordCandidata.length)];

    // ALMACENAMOS PERMANENTEMENTE EL CODIGO-TIKET DEL USUARIO
    localStorage.llaveQR = localStorage.getItem("nomUser")+coordCandidata;
    localStorage.llaveQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+
        localStorage.llaveQR;
    console.log(localStorage);

    if (elemento.tipo == "mesaM") {
        //ABRE 'VENTANA DE GENTIKET'(vGen) Pasandole CREDENCIALES
            //vGen = Genera cod

        let winConfig = "width=700,height=500";
        var vGenTik = window.open("./tiket.html","ticket",winConfig);

    }else{
        if (elemento.tipo == "mesaPc") {
            alert("Has reservado esta mesa nº "+elemento.id+" con PC.");
        }else
            alert("Has reservado esta sala nº "+elemento.id+" con PC.");
    }
}
/*mesaTOT:93
    mesaMarron:63
    mesapc: 30
    sala:34
        ELEMENTOS TOTALES: 127 - PREBLOQUEADOS: 100
    !NO SENTENCIAS DE CONTROL DE FLUJO DENTRO DE OBJETOS, SI FUNCIONES QUE SE PASAN MANUALMENTE PARAMETROS!
    Funcion para modificar valores a gusto(por params) de todo Elements?

    Usa Screen.width para indicar que se bajen la app si estan en moviles?
    Usa Navigator(.onLine,.canShare)
    Window.print


PASOS:
    1- Coger Todos los id's de objetos diferenciando entre sus tipos. OK
    2- BLOQUEAR 100. (mas alante de forma random). DISPONIBLES POR DEF (EN CREACION DE OBJ) OK
    3- SI esta disponible,  ADDAtribute element.onclick=clicable() OK
        3.1- Si Activar clicable() => .selec=true OK
        3.2- Si .select = true => HABILITAR Confirmar (DEJAR pal final)
    4- SI click en otro elemento selecionable , NO PERMITIR Primero DESCLICAR. OK
    5- al clicar CONFIRMAR
        5.1 - Obtener el tipo de elemento; 
            5.1.1 - Si es MESA MARRON => Imprimir CODIGO Con Credenciales.
                new vGen(crendenciales,SeedCodigo?) ; vGen (BtnEnviarEmail(CODIGO | ventana))
                                                    En VentanaMAPA = Alert Mail Enviado!
            5.1.2 - Else noMesaMarron => mensaje de reserva hecho(PC Bloqueado).

*/ 