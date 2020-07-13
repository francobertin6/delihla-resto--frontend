window.onload = async function(){
    let token = localStorage.getItem("token")
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