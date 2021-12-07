const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos del carrito

    carrito.addEventListener('click', eliminarCursos);
}


//Funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelect = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelect);
    }
}

//Elimina cursos del carrito

function eliminarCursos(e){
    if (e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');
        
        //eliminar del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHtml(); // Volvemos a iterar para imprimir el html
    }
}




//Lee el contenido del HTML

function leerDatosCurso(curso) {
    //crear un objeto con el contenido
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        title: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //controlar la cantidad de objetos
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );
    if(existe){
        //actualizamos la cantidad
       const cursos = articulosCarrito.map( curso => {
           if( curso.id === infoCurso.id ){
               curso.cantidad++;
               return curso;
           }
           else{
               return curso;
           }
       } );
       articulosCarrito = [...cursos];
    } else{
        //agregamos elementos 
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    //Agregar elementos al carrito
    console.log(infoCurso)
    carritoHtml();
}

//Muestra el carrito de compras en el Html

function carritoHtml() {
    //limpiar el html
    limpiarHTML();

    //recore y agrega
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = ` 
        <td><img src ="${curso.imagen}" width ="100" /></td>    
        <td>${curso.title}</td>
        <td><span>${curso.precio}</span></td>
        <td>${curso.cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${curso.id}" > X </a></td>
        `;

        //Agrega al tbody
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHTML() {

    //forma lenta
    //contenedorCarrito.innerHTML = '';

    //forma rapida
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}





//eliminar del carrito
