const token = localStorage.getItem("token")

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

// array donde voy a guardar el boton de clase estado, asi trato de despejarlo y modificarlo
const estado_elements = [];

function pedidos_put(event){
    let estados_container = document.getElementById("estados-container");
    estados_container.style.display = "none";
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
let administracion_section = document.getElementById("")


administracion.addEventListener("click", function(){
    if(administracion.style.display = "none"){
        container_pedidos.style.display = "none";
        administracion.style.display = "flex";
    }else{
        container_pedidos.style.display = "flex";
        administracion.style.display = "none";
    }
})