//Extraemos información del DOM (tags del svg) y los almacenamos en nuestro modelo de datos.
function Elementos(tipo,id,disponible,genCod,selec,tag) {
    this.tipo = tipo;
    this.id = id;
    this.disponible = disponible;
    this.genCod = genCod;
    this.selec = selec;
    this.color = getCol(tipo,disponible,selec);
    this.tag = tag;
}

var tagsElements = [new Array(63),new Array(30),new Array(34)]; //MesasMarrones , MesasPcs, Salas
for (let i = 0; i < 63; i++) {
    let tagMesaM = document.getElementById("mesaMarron"+i);
    let tagMesaPc = document.getElementById("mesaPc"+i);
    let tagSala = document.getElementById("sala"+i);

    // recoger tags en matriz o directamente generar objetos Elementos e introducirlos en un array de Obj elementos? Mejor esto ,no?
    if (tagMesaM != null) {
        tagsElements[0][i] = tagMesaM;
    }
    if (tagMesaPc != null) {
        tagsElements[1][i] = tagMesaPc;
    }
    if (tagSala != null) {
        tagsElements[2][i] = tagSala;
    }
    
    
}










                            //TEST PREVIOS al desarrollo que funcionan OK //
let elementoTest = document.getElementById("sala33");
console.log(elementoTest);
// function haz() {
//     elementoTest.style.fill="red";
// }
// elementoTest.onclick = haz;

// function confirm() {
//     alert("test");
// }
                                        ////////


                                        /*
mesaTOT:93
    mesaMarron:63
    mesapc: 30
    sala:34
        ELEMENTOS TOTALES: 127 - PREBLOQUEADOS: 100

PASOS:
    1- Coger Todos los id's de objetos diferenciando entre sus tipos.
    2- Bloquear la mayoria. (mas alante de forma random).
    3- SI esta bloqueado(fill:red) no selecionable.
    4- SI esta disponible, element.onclick=green
        4.1- Si 1 elemento.onclick=green => HABILITAR Confirmar
    5- SI click en otro elemento selecionable , CAMBIAR green.
    6- al clicar CONFIRMAR
        6.1 - Obtener el tipo de elemento; si es MESA MARRON => Imprimir CODIGO
                    Else noMesaMarron => mensaje de reserva hecho.
*/ 