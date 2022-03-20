const lista = document.querySelector('#listado')

fetch('/data.json')
    .then( (res) => res.json())
    .then( (data) => {
        console.log(data)
        
        data.forEach((producto) => {
            const div = document.createElement('div');
            
            if(producto.id<= 9){
            div.innerHTML = `
                <div class="div divColor">
                <img class="imgDom" src="${producto.imagen}" width=100 >
                <h2>${producto.nombre}</h2>
                <p class="precio">$ ${producto.precio}</p>
                <a  type="button" class="btn btn-secondary agregar-carrito">Agregar al Carrito</a>
                </div>
            `
            
   
            lista.append(div);
        }
        });
        
        
    });
