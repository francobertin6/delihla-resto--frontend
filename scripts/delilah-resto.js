// ARRAYS
const products_id = [];

// CREACION DE PRODUCTOS
async function productsdivs(datos, index){
    let section = document.getElementById("nuestros-platos");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let button = document.createElement("button");
    button.onclick = getinfo_products;
    button.className = "nuestros-platos-button";
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image.className = "foodimage";
    section.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "+";
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
};

window.onload = async function(){
    let url = 'http://127.0.0.1:3000/productos/get';
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log(datos);
    for (let index = 0; index < datos.datos.length; index++) {
        productsdivs(datos, index);
        products_id.push(datos.datos[index].id);
    };
};
// CREACION DE PRODUCTOS TERMINO

// CREACION DE RECOMENDADOS
async function recomendeddivs(data){
    let section = document.getElementById("recomended");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let añadir_button = document.createElement("button");
    let span = document.createElement("div");
    span.className = "span";
    creatediv.className = "recomended";
    foodname.className = "recomended-foodname";
    price.className = "recomended-price";
    image.className = "recomended-image";
    añadir_button.className = "añadir";
    section.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    creatediv.appendChild(añadir_button);
    creatediv.appendChild(span);
    foodname.innerHTML = data.datos[0].foodname;
    price.innerHTML = "$ "+ data.datos[0].price;
    image.src = data.datos[0].url;
}

function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    };
function removeitemofarray(random_number){
    products_id.splice(random_number, 1);
}    

setTimeout(async function recomended (){
    for (let index = 0; index < 4 ; index++) {
        let maxnumber = products_id.length;        
        let random_number = getRandomArbitrary(0 , maxnumber);
        let url_recomended = 'http://127.0.0.1:3000/productos/get/'+ products_id[random_number];
        const respuesta = await fetch(url_recomended);
        const data = await respuesta.json();
        recomendeddivs(data);
        removeitemofarray(random_number);
    };
}, 1000);

//CREACION DE RECOMENDADOS TERMINO

//CREACION DE PEDIDOS
let pedidos_data = {
    "id": [],
    "cantidad": []
}

async function getinfo_products(event){
    let style = event.target.style;
    let id = event.target.value;
    if(style.background !== "green"){
    style.background = "green";
    console.log(id);
    let url_pedidos = 'http://127.0.0.1:3000/productos/get/'+ id
    const resp = await fetch(url_pedidos);
    const data = await resp.json();
    pedidos_data.id.push(data.datos[0].id);
    console.log(pedidos_data.id);
    }
    else if(style.background == "green"){
        style.background = "orange";
        const findIndex = (element) => element == id;
        let id_number = pedidos_data.id.findIndex(findIndex);
        if(id_number >= 0){
            pedidos_data.id.splice(id_number, 1);
        }else{
            console.log(id_number);    
        }
        console.log(pedidos_data.id);
    };
    let checked = pedidos_data.id.some(element => element >= 1);
    console.log(checked);
    if(checked === true){
        carrito_noactivo.style.display = "none";
        carrito_activa.style.display = "block";
    }else{
        carrito_noactivo.style.display = "block";
        carrito_activa.style.display = "none";
    }
}

let carrito_noactivo = document.getElementById("carrito-no-activo");
let carrito_activa = document.getElementById("carrito-activo");
let icons = document.getElementById("icons");
let recomendados = document.getElementById("recomended");
let nuestros_platos = document.getElementById("nuestros-platos");
let pedidos = document.getElementById("pedidos");

carrito_activa.addEventListener("click", async function(){
    icons.style.display = "none";
    recomendados.style.display = "none";
    nuestros_platos.style.display = "none";
    pedidos.style.display = "flex";
    let detalle_pedido = document.createElement("section");
    detalle_pedido.id = "first-half"; 
    pedidos.appendChild(detalle_pedido);
    let detalle = document.createElement("h1");
    detalle_pedido.appendChild(detalle);
    detalle.innerHTML = "detalle";
    for (let index = 0; index < pedidos_data.id.length; index++) {
        const element = pedidos_data.id[index];
        let url = 'http://127.0.0.1:3000/productos/get/'+ element;
        const resp = await fetch(url);
        const data = await resp.json();
        createpedidosxproductos_section(data, detalle_pedido);
    }
})

function createpedidosxproductos_section(data, detalle_pedido){
    let div_producto = document.createElement("div");
    div_producto.className = "div_producto";
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    detalle_pedido.appendChild(div_producto);
    div_producto.appendChild(foodname);
    div_producto.appendChild(price);
    div_producto.appendChild(image);
    foodname.innerHTML = data.datos[0].foodname;
    price.innerHTML = data.datos[0].price;
    image.src = data.datos[0].url;
}





