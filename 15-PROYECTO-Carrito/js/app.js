const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //cuando agragas un curso presionando  "agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
      articulosCarrito = []; // reseteamos el arreglo

      limpiarHTML(); //Eliminamos todo el HTML
    })
}
//Funciones
function agregarCurso(e) {
    e.preventDefault(); 



    if(e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML
    }
}

//lee el contenido del html al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){ 
   // console.log(curso);

    //crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

//revisa si un elemento ya exixte en el carrito

const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
if(existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id) {
            curso.cantidad++;
            return curso;
        } else {
            return curso;
        }
    }) 
    articulosCarrito = [...cursos];
} else {
    //Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];

}


console.log(articulosCarrito);

carritoHTML();
}

//muestra el carrito de compras en el HTML
function carritoHTML() {

    //limpiar el html
    limpiarHTML()


   // recorre el carrito y genera html

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src="${imagen}" width="90">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> x </a>
        </td>
        `;
        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });

}  
//elimina los cursos del tbody

function limpiarHTML() {
    //forma lenta
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}
