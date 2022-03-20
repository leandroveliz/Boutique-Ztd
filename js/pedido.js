const carro = new Carrito();
let articulosCarrito = [];
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaProductos = document.querySelector('#lista-productos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos(){
listaProductos.addEventListener('click',(e)=>carro.agregarProducto(e));
carrito.addEventListener('click', (e)=>carro.eliminarProducto(e));
vaciarCarritoBtn.addEventListener('click',(e)=> carro.vaciarCarrito(e));
document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carro.insertarCarritoHTML();
})
document.addEventListener('DOMContentLoaded',carro.leerProductosStorage());
procesarPedidoBtn.addEventListener('click', (e)=>{carro.procesarPedido(e)})
}
