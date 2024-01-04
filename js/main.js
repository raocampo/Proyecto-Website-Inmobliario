const carrito = document.querySelector("#carrito");
const contenedorProp = document.querySelector("#lista-carrito tbody");
const limpiar = document.querySelector("#vaciar");
const listaProp = document.querySelector("#lista-prop");
let propCarrito = [];

registraEventListeners();
function registraEventListeners(){
    // Se agrega propiedad presionando en el precio de la propiedad
    listaProp.addEventListener("click", agregarPropiedad);

    //Elimina Propiedades del carrito

    carrito.addEventListener("click", eliminarProp);

    //Limpiar el Carrito

    limpiar.addEventListener("click", () => {
        console.log("Vaciando carrito...!");

        propCarrito = []; //reseteamos el arreglo

        limpiarHTML(); //Eliminamos todo el HTML
    });
}

//Funciones

function agregarPropiedad(e){
    //Este evento se ejecuta o utiliza cuando utilizamos un ancor (a)
    //e.preventdefault();

    if(e.target.classList.contains("agregar-prop")){
        const propSelec = e.target.parentElement.parentElement.parentElement;
        leerDatosProp(propSelec);
        //console.log(e.target);
    }
    
}

//Elimina una propiedad del carrito

function eliminarProp(e){
    console.log(e.target.classList);
    if(e.target.classList.contains("borrar-prop")){
        const propId = e.target.getAttribute("data-id");

        //Elimina del arreglo de propCarrito por el data-id
        propCarrito = propCarrito.filter(propiedad => propiedad.id !== propId);

        listaHtml(); //Iterar sobre el carrito y muestra el html
    }

}

//Lee el contenido del HTML al que le damos click para extraer la información

function leerDatosProp(propiedad){
    //console.log(propiedad);

    //Crear un objeto con el contenido de la propiedad actual
    const infoProp = {
        imagen: propiedad.querySelector("img").src,
        titulo: propiedad.querySelector("h5").textContent,
        precio: propiedad.querySelector(".precio button").textContent,
        id: propiedad.querySelector("a").getAttribute("data-id"),
        cantidad : 1
    };
    
    console.log(infoProp);

    //Revisa si un elemento ya existe en el carrito
    const existe = propCarrito.some(propiedad => propiedad.id === infoProp.id);

    if(existe){
        //actualizamos la cantidad
        const propiedades = propCarrito.map(propiedad => {
            if(propiedad.id === infoProp.id){
                propiedad.cantidad ++;
                return propiedad; //retorna objeto actualizado
            }else{
                return propiedad; //retorna los objetos nuevos o no duplicados.
            }
        });
    }else{
        //Se agrega elementos al arreglo de la lista
        propCarrito = [...propCarrito, infoProp];
    }

    //Agregar los elementos del objeto al carrito dentro de un arreglo
   // propCarrito = [...propCarrito, infoProp];

    console.log(propCarrito);

    listaHtml();
}

//Muetra el carrito de compras en este ejemplo es la la lista de propiedades.

function listaHtml(){

    //Limpiar HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    propCarrito.forEach(propiedad => {
        const { imagen, titulo, precio, cantidad, id } = propiedad;
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>
            <img src="${imagen}">
        <td>
        <td>
            ${titulo}
        <td>
        <td>
            ${precio}
        <td>
        <td>
            ${cantidad}
        <td>
        <td>
            <a href="#" class="borrar-prop" data-id="${id}">X</a>
        <td>
        `;

        //Agrega el HTMl del carrito en el tbody
        contenedorProp.appendChild(row);
    });
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma Lenta
    //contenedorProp.innerHTML = "";

    while(contenedorProp.firstChild){
        contenedorProp.removeChild(contenedorProp.firstChild);
    }
}





