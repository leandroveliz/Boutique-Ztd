class Carrito{
cargarEventos(){
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
        
    
        insertarCarritoHTML();
    })
}
//Se agregan producto al Carrito
agregarProducto(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        this.obtenerDatosProducto(productoSeleccionado);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Agregaste el producto al Carrito',
            showConfirmButton: false,
            timer: 1500
        })
    };
}
//Se obtiene mediante DOM los datos del producto
obtenerDatosProducto(producto) {

    const productoAgregado = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id === productoAgregado.id)

    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                producto.precio = `${Number(productoAgregado.precio) * producto.cantidad}`;
                console.log(producto.precio)
                return producto;
                
            } else {
                return producto;
            }
        });
        articulosCarrito = [...productos];
    } else {

        articulosCarrito = [...articulosCarrito, productoAgregado];

    }

    
    this.insertarCarritoHTML();

}
//Inserta los datos obtenidos mediante el DOM al HTML
insertarCarritoHTML() {
    this.borrarHTML();

    articulosCarrito.forEach(producto => {
        const { nombre, imagen, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
            
			<td>
				<img class="imgDom" src="${imagen}" width=100>
			</td>
			<td>
				${nombre}
			</td>
			<td>
            <p class="h5">$ ${precio}</p>
			</td>
			<td>
                
				${cantidad}
			</td>
            
			<td>
				<button href="#" class="borrar-producto btn btn-danger" style="font-size:10px" data-id="${id}"> X </button>
			</td>
            
		`
        contenedorCarrito.appendChild(row);
    });

    this.guardarStorage();
}
//Guardar el producto en localStorage
guardarStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
//Obtiene el producto del localStorage
obtenerProductosStorage(){
    let productosLS;
    if(localStorage.getItem('carrito') === null){
        productosLS=[];
        
    }else{
        productosLS = JSON.parse(localStorage.getItem('carrito'))
        
    }
    return productosLS;

}
//Elimina el producto del carrito
eliminarProducto(e) {
    e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            
            producto = e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID= producto.querySelector('a').getAttribute('data-id');
            
        }
        
        this.eliminarProductoStorage(productoID);
        this.calcularTotal();
}
//elimina el producto del localStorage
eliminarProductoStorage(productoID){
    let productosLS;
    productosLS = this.obtenerProductosStorage();
    productosLS.forEach(function(productoLS,index){
        if(productoLS.id === productoID){
            productosLS.splice(index,1);
        }
    });
    localStorage.setItem('carrito',JSON.stringify(productosLS));
}

//limpia el html de carrito y limpia el localStorage
vaciarCarrito(e) {
    e.preventDefault();
    this.borrarHTML();
    articulosCarrito = [];
    this.guardarStorage();
    
}
//borrar el duplicado del producto ingresado al html ya no me sumaba la cantidad 
//cada vez que clicleaba en agregar al carrito
borrarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

//trae el producto del localStorage con sus datos y lo arroja en el html
leerProductosStorage(){
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    articulosCarrito.forEach(producto => {
        const { nombre, imagen, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
			<td>
				<img class="imgDom" src="${imagen}" width=100>
			</td>
			<td>
				${nombre}
			</td>
			<td>
				${precio}
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto" style="font-size:10px" data-id="${id}"> X </a>
			</td>
			
		`
        contenedorCarrito.appendChild(row);
    });
}
//trae el producto del localStorage con sus datos y lo arroja en el html carrito
leerProductosStorageCompra(){
    articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
    articulosCarrito.forEach(producto => {
        const { nombre, imagen, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
			<td>
				<img class="imgDom" src="${imagen}" width=100>
			</td>
			<td>
				${nombre}
			</td>
			<td>
				<p class="h4">$${precio}</p>
			</td>
			<td>
				${cantidad}
			</td>
			<td>
				<a href="#" class="borrar-producto btn btn-danger" style="font-size:10px"data-id="${id}"> X </a>
			</td>
			
		`
        listaCompra.appendChild(row);
    });
}
//procesa la compra y te envia al carrito.html
procesarPedido(e){
    e.preventDefault();
    
    if(this.obtenerProductosStorage().length === 0)
    {
        Swal.fire({
            type:'error',
            title: 'Opps...',
            text: 'El carrito esta vacio, agregar algun producto ',
            icon: 'warning',
            timer:1500,
            showConfirmButton:false,
        
        })
    }else{
        location.href = "../views/carrito2.html"
    }
    
}
//realiza las cuentas del total,subtotal e iva 
calcularTotal(){
    let productoLS;
    let total = 0,subtotal = 0, iva = 0;
    productoLS = this.obtenerProductosStorage();
    for(let i=0; i < productoLS.length;i++){
        let element = Number(productoLS[i].precio * productoLS[i].cantidad);
        total+=element;
    }
    iva = parseFloat(total*0.21);
    subtotal = parseFloat(total-iva);
    document.getElementById('subtotal').innerHTML = "$" + subtotal;
    document.getElementById('iva').innerHTML = "$" + iva;
    document.getElementById('total').innerHTML = "$" + total;

    
}

}

