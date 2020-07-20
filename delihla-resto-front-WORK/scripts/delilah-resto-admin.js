const token = localStorage.getItem("token")
const body = document.getElementById("body");

window.onload = async function(){
    // GET PEDIDOS
    let url = "http://127.0.0.1:3000/pedidos/get-pedidos";
    fetch(url,{
        method: "GET",
        headers:{
            'Authorization': token
        }
    })
    .then(async function(res){
        let payload = await res.json();
        console.log(payload);
        for (let index = 0; index < payload.datos.length; index++) {
            armarpedidostable(index, payload);
        }
    })
    .catch(function(err){
        console.log(err);
    })
}

let container_pedidos = document.getElementById("container-pedidos");
let container_estado = document.getElementById("container-estado");
let container_hora = document.getElementById("container-hora");
let container_descripcion = document.getElementById("container-descripcion");
let container_pago = document.getElementById("container-pago");
let container_usuario = document.getElementById("container-usuario");
let container_direccion = document.getElementById("container-direccion");

function armarpedidostable(index, payload){
    // ESTADO   
    let estado = document.createElement("button");
        estado.className = "estado";
        container_estado.appendChild(estado);
        estado.innerHTML = payload.datos[index].estado;
        estado.style.background = "red";
        switch (estado.innerHTML) {
            case "nuevo":
                estado.style.background = "red"
                break;
            case "confirmado":
                estado.style.background = "#fbdd74"
                break;
            case "preparando":
                estado.style.background = "darkcyan"
                break;
            case "enviando":
                estado.style.background = "blue"
                break;
            case "entregado":
                estado.style.background = "green";
                break;        
        };
        estado.style.color= "white"
        estado.onclick = pedidoscomeback;
        estado.value = payload.datos[index].id_pedido
        // ESTADO
    // HORA
    let hora = document.createElement("p");
        hora.className = "hora";
        container_hora.appendChild(hora);
        hora.innerHTML = payload.datos[index].hora;
        // HORA
    // DESCRIPCION  
    let descripcion_p = document.createElement("p");
        descripcion_p.className = "descripcion_p";
        container_descripcion.appendChild(descripcion_p);
        descripcion_p.innerHTML = payload.datos[index].foodname;
        // DESCRIPCION
    // PAGO 
    let pago = document.createElement("p");
        pago.className = "pago";
        container_pago.appendChild(pago);
        pago.innerHTML = payload.datos[index].price;
        // PAGO
    // USUARIO 
    let usuario_p = document.createElement("p");
        usuario_p.className = "usuario_p"
        container_usuario.appendChild(usuario_p);
        usuario_p.innerHTML = payload.datos[index].user_fullname;
        // USUARIO
    // DIRECCION 
    let direccion = document.createElement("button");
        direccion.className = "direccion";
        container_direccion.appendChild(direccion);
    let direccion_p = document.createElement("p");
        direccion_p.className = "direccion_p";
        container_direccion.appendChild(direccion_p);
        direccion_p.innerHTML = payload.datos[index].user_adress;
        // DIRECCION
}

function pedidoscomeback(event){
    estado_elements.splice(0,1);
    let element_event = event.currentTarget;
    estado_elements.push(element_event);
    console.log(estado_elements);
    var clientY = Math.floor(event.clientY);
    console.log(clientY);
    let estado = event.target.innerHTML;
    console.log(estado);
    let estados_div_container = document.createElement("div");
    estados_div_container.id = "estados-container";
    estados_div_container.style.display = "flex";
    container_pedidos.appendChild(estados_div_container);
    let estados = ["nuevo", "confirmado", "preparando","enviando", "entregado"]
    let indice = estados.indexOf(estado);
    console.log(indice);
    estados.splice(indice, 1);
    for (let index = 0; index < estados.length; index++) {
        let tipos_de_estado = document.createElement("div")
        estados_div_container.appendChild(tipos_de_estado);
        tipos_de_estado.className = "estados";
        tipos_de_estado.onclick = pedidos_put;
        const element = estados[index];
        tipos_de_estado.innerHTML = element;
        switch (element) {
            case "nuevo":
                tipos_de_estado.style.background = "red"
                break;
            case "confirmado":
                tipos_de_estado.style.background = "#fbdd74"
                break;
            case "preparando":
                tipos_de_estado.style.background = "darkcyan"
                break;
            case "enviando":
                tipos_de_estado.style.background = "blue"
                break;
            case "entregado":
                tipos_de_estado.style.background = "green";
                break;        
        }
    }
    estados_div_container.style.top = clientY + "px";
}
// estados_div_container arreglar que aparezca y desaparezca en todos los casos

// array donde voy a guardar el boton de clase estado, asi trato de despejarlo y modificarlo
const estado_elements = [];

function pedidos_put(event){
    let estados_container = document.getElementById("estados-container");
    estados_container.style.display = "none";  // en esta linea tiene que borrarse estados-container (estados_div_container)
    let element_estado = estado_elements[0];
    console.log(element_estado.value);
    let event_text = event.target.innerHTML;
    let event_background = event.target.style.background;
    element_estado.innerHTML = event_text;
    element_estado.style.background = event_background;
    let body = {
        "estado": event_text
    }
    fetch("http://127.0.0.1:3000/pedidos/update?id=" + element_estado.value,{
        method: "PUT",
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json',
            'Authorization': token
        }
    })
}

// ADMINISTRACION EN ADMIN

let administracion = document.getElementById("administracion");
let administracion_section = document.getElementById("administracion-section");
let pedidos = document.getElementById("pedidos");

administracion.addEventListener("click", function(){
    if(administracion_section.style.display == "none"){
        container_pedidos.style.display = "none";
        administracion_section.style.display = "flex";
    }
})

pedidos.addEventListener("click", function(){
    if(administracion_section.style.display == "flex"){
        container_pedidos.style.display = "flex";
        administracion_section.style.display = "none"
    }
})

// ADMINISTRACION BORRAR PRODUCTOS

let borrar_productos = document.getElementById("borrar-productos");

borrar_productos.addEventListener("click", function(){
    administracion_section.style.display = "none";
    // container
    let borrar_productos_container = document.createElement("section");
    borrar_productos_container.id = "borrar-productos-container";
    borrar_productos_container.style.display = "flex";
    body.appendChild(borrar_productos_container);
        // container
    // boton para volver atras
    let back = document.createElement("input");
    back.addEventListener("click",function(){
        if(borrar_productos_container.style.display == "flex"){
            borrar_productos_container.remove();
            administracion_section.style.display = "flex";
        }
    })
    borrar_productos_container.appendChild(back);
    back.type = "image";
    back.src = "./images/icons/espalda.svg";
        // boton para volver atras
    // titulo h1
    let h1 = document.createElement("h1");
    borrar_productos_container.appendChild(h1);
    h1.innerHTML = "Borrar productos"
        // titulo h1
    // FUNCION GET 
    get(borrar_productos_container)
})

function traer_productos_for_delete(borrar_productos_container, datos, index){
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    let button = document.createElement("button");
    button.className = "nuestros-platos-button";
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image.className = "foodimage";
    borrar_productos_container.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    creatediv.appendChild(button);
    button.value = datos.datos[index].id;
    button.innerText = "X";
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
}

async function get (borrar_productos_container){
    let url = 'http://127.0.0.1:3000/productos/get';
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log(datos);
    for (let index = 0; index < datos.datos.length; index++) {
        traer_productos_for_delete(borrar_productos_container,datos, index);
    };
};
    // ADMINISTRACION BORRAR PRODUCTOS 

// CREAR ADMINISTRADOR NUEVO

let create_admins = document.getElementById("crear-administrador");

create_admins.addEventListener("click", function(){
    administracion_section.style.display = "none";
    let section_crear_admin = document.createElement("section");
    section_crear_admin.id = "crear-admin-container";
    section_crear_admin.style.display = "flex";
    body.appendChild(section_crear_admin);
    // BACK-BUTTON
    let back = document.createElement("input");
    back.addEventListener("click", function(){
        if(section_crear_admin.style.display == "flex"){
            section_crear_admin.remove();
            administracion_section.style.display = "flex";
        }
    })
    back.type = "image";
    back.src = "./images/icons/espalda.svg";
    section_crear_admin.appendChild(back);
    back.className = "back-button-create-admin";
    // TITULO CREAR ADMINISTRADOR
    let h1 = document.createElement("h1");
    h1.innerHTML = "Crear administrador"
    section_crear_admin.appendChild(h1);
    // USUARIO INPUT
    let label_usuario = document.createElement("label");
    label_usuario.innerHTML = "Usuario/Administrador";
    section_crear_admin.appendChild(label_usuario);
    let input_usuario = document.createElement("input");
    input_usuario.type = "text";
    input_usuario.name = "admin";
    input_usuario.id = "admin";
    section_crear_admin.appendChild(input_usuario);
    // PASSWORD INPUT
    let label_password = document.createElement("label");
    label_password.innerHTML = "Contraseña";
    section_crear_admin.appendChild(label_password);
    let input_password = document.createElement("input");
    input_password.type = "text";
    input_password.name = "contra";
    input_password.id = "contra";
    section_crear_admin.appendChild(input_password);
    // CREATE BUTTON SEND INFO
    let button_send = document.createElement("button");
    button_send.innerHTML = "Crear administrador";
    button_send.id = "send-admin-info";
    section_crear_admin.appendChild(button_send);
})