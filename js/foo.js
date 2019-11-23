//Ѡ Extraemos información del DOM (tags del svg) y los almacenamos en nuestro modelo de datos.
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
                //return "#a05a2c";
                this.tag.style.fill = "purple";
            }else
            this.tag.style.fill = "#ffd42a";
        }
    }
}   
function Elemento(tipo,id,disponible,genCod,selec,tag) { //tag es por REFERENCIA o por valor?
    this.tipo = tipo;
    this.id = id;
    this.disponible = disponible;
    this.genCod = genCod;
    this.selec = selec;
    this.changeColor = getColor;
    this.tag = tag;
    //onclick para selecionables NO FUNC , quedate con la idea
    // if (this.disponible) {
    //     this.selec = true;
    //     // this.tag = addOnclick(this.tag);
    //     console.log(this.tag);
    //     console.log(this.color);
    // }
}

var Elements = [new Array(63),new Array(30),new Array(34)]; //MesasMarrones , MesasPcs, Salas
for (let i = 0; i < 63; i++) {
    let tagMesaM = document.getElementById("mesaMarron"+i);
    let tagMesaPc = document.getElementById("mesaPc"+i);
    let tagSala = document.getElementById("sala"+i);
    
    // recoger tags en matriz o directamente generar objetos Elementos e introducirlos en un array de Obj elementos? Mejor esto ,no?
    if (tagMesaM != null) {
        
        let elMesaM = new Elemento(getTipo(tagMesaM),tagMesaM.id,true,false,false,tagMesaM);
        Elements[0][i] = elMesaM;
    }
    if (tagMesaPc != null) {

        let elMesaPc = new Elemento(getTipo(tagMesaPc),tagMesaPc.id,true,false,false,tagMesaPc);
        Elements[1][i] = elMesaPc;
    }
    if (tagSala != null) {
        
        let elSala = new Elemento(getTipo(tagSala),tagSala.id,true,false,false,tagSala);
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
//Pintamos TODOS (forma ineficiente, mejor todos disponibles a true y bloquear 100)

console.log("ArrElementos: ",Elements[0][2].disponible," y color: ",Elements[0][2].tag.style.fill); //HAY QUE EJECUTAR .changeColor manualmente pa cambiar colores del dom, NO retorna el color
console.log("Directam del dom: ",document.getElementById("mesaMarron1").style.fill);


/*mesaTOT:93
    mesaMarron:63
    mesapc: 30
    sala:34
        ELEMENTOS TOTALES: 127 - PREBLOQUEADOS: 100
    !NO SENTENCIAS DE CONTROL DE FLUJO DENTRO DE OBJETOS, SI FUNCIONES QUE SE PASAN MANUALMENTE PARAMETROS!

PASOS:
    1- Coger Todos los id's de objetos diferenciando entre sus tipos. OK
    2- Desbloquear 27. (mas alante de forma random). NO DISPONIBLES POR DEF (EN CREACION DE OBJ) (se desbloquean los selecionables)
    3- SI esta disponible(fill:red) no selecionable. 
    4- SI esta disponible, element.onclick=green
        4.1- Si 1 elemento.onclick=green => HABILITAR Confirmar
    5- SI click en otro elemento selecionable , CAMBIAR green.
    6- al clicar CONFIRMAR
        6.1 - Obtener el tipo de elemento; si es MESA MARRON => Imprimir CODIGO
                    Else noMesaMarron => mensaje de reserva hecho.
*/ 