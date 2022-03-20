const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
let articulosCarrito = [];
const carrito = document.getElementById('carrito2');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded',compra.leerProductosStorageCompra())
    carrito.addEventListener('click',(e)=> compra.eliminarProducto(e));
    compra.calcularTotal();
    
}

