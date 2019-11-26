//★6 Extraemos información del DOM (tags del svg) y los almacenamos en nuestro modelo de datos.
var btnConfirmar = document.getElementById("confirm");
btnConfirmar.disabled = true;

//★7 COMPRUEBA EL TIPO DE ELEMENTO QUE RECOGEMOS Y LE ASIGNA AL OBJ. LA PROPIEDAD TIPO
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

//★8 METODO QUE RENDERIZA EL COLOR DEL ELEMENTO SEGUN EL VALOR DE SUS PROPIEDADES
function getColor() {
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
//★9 DEFINICIÓN DEL OBJETO ELEMENTO
function Elemento(tipo,id,disponible,selec,tag,coord) { //tag es por REFERENCIA
    this.tipo = tipo;
    this.id = id;
    this.disponible = disponible;
    this.selec = selec;
    this.changeColor = getColor;
    this.tag = tag;
    this.coord = coord;
}

//★10 CREAR ARRAY DE ELEMENTOS, CAPTURARLOS DEL DOM , GENERAR OBJETO CON ELLOS Y METERLOS EN ARRAY.
var Elements = [new Array(63),new Array(30),new Array(34)]; //MesasMarrones , MesasPcs, Salas
for (let i = 0; i < 63; i++) {
    let tagMesaM = document.getElementById("mesaMarron"+i);
    let tagMesaPc = document.getElementById("mesaPc"+i);
    let tagSala = document.getElementById("sala"+i);
    

    if (tagMesaM != null) {
        let persCoord = "0,"+i;
        let elMesaM = new Elemento(getTipo(tagMesaM),tagMesaM.id,true,false,tagMesaM,persCoord);
        Elements[0][i] = elMesaM;
    }
    if (tagMesaPc != null) {
        let persCoord = "1,"+i;
        let elMesaPc = new Elemento(getTipo(tagMesaPc),tagMesaPc.id,true,false,tagMesaPc,persCoord);
        Elements[1][i] = elMesaPc;
    }
    if (tagSala != null) {
        let persCoord = "2,"+i;
        let elSala = new Elemento(getTipo(tagSala),tagSala.id,true,false,tagSala,persCoord);
        Elements[2][i] = elSala;
    }
}

//★11 BLOQUEO DE 100 ELEMENTOS POR DEFECTO (DE TODOS LOS TIPOS)
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


//★12 SELECIONAMOS EL OBJETO VINCULADO A SU ETIQUETA CON EVENTO ONCLICK DISPARADO
var coordCandidata;
function seleccionar(coord) {

    let elemento = Elements[coord[0]][coord.substring(2,coord.length)];

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


//★13 Haciendo seleccionables los Disponibles (EVENTonclick+changeColor en tag)
Elements.forEach(ArrElemByTipo =>{
    for(element of ArrElemByTipo){
        if (element.disponible) {
            element.tag.setAttribute("onclick", "seleccionar('"+element.coord+"')");
            element.changeColor();
        }
    } 
})

//★14  CUANDO EL ELEMENTO SE HA SELECIONADO Y CONFIRMADO SE CONFIGURA SU TIKET Y SE ABRE LA VENTANA HIJA
function confirm() {
 
    let elemento = Elements[coordCandidata[0]][coordCandidata.substring(2,coordCandidata.length)];

    // ALMACENAMOS PERMANENTEMENTE EL CODIGO-TIKET DEL USUARIO
    localStorage.llaveQR = localStorage.getItem("nomUser")+coordCandidata;
    localStorage.llaveQR = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data="+
        localStorage.llaveQR;
    console.log(localStorage);

    if (elemento.tipo == "mesaM") {
        //CREAMOS LA VENTANA HIJA PARA EL TIKET:
        let winConfig = "width=700,height=600";
         //debugger;

        var intervalo = setInterval(checkCierre, 500);
        var vGenTik = window.open("./tiket.html","ticket",winConfig);

    }else{
        if (elemento.tipo == "mesaPc") {
            alert("Has reservado esta mesa con ID: "+elemento.id+".");
        }else
            alert("Has reservado esta sala con ID: "+elemento.id+".");
    }

//★15 COMPRUEBA QUE SE HA CERRADO LA VENTANA HIJA PARA LANZAR ALERT
    function checkCierre() {
        // console.log(vGenTik); //error cross-origin?
        if (vGenTik != undefined) {
            if (vGenTik.closed) {
                alert("Email enviado!");
                clearInterval(intervalo);
            }else{
                console.log("esta abierta.")
            }    
        }else{
            console.log("no definida");
        }
    }
    
}