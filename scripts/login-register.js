// LOGIN
let button_login = document.getElementById("login");
let button_register = document.getElementById("register-button");


button_login.addEventListener("click", async function(event){
    event.preventDefault();
    let data = {
        "username": document.getElementById("username").value,
        "password": document.getElementById("password").value
    };
    console.log(data);
    fetch('http://127.0.0.1:3000/user/login', {
    method: 'POST',
    body: JSON.stringify(data),
    mode: 'cors',
    headers:{
        'Content-Type': 'application/json'
    }
})
.then(async function(res){
    let payload = await res.json();
    console.log(payload);
    localStorage.setItem("token", payload.token);
    if(payload.usuario == "usuario"){
        setTimeout(window.location.assign("delilah-resto-user.html"), 5000);
    }else if(payload.usuario == "admin"){
        setTimeout(window.location.assign("delilah-resto-admin.html"), 5000);
    }
})
.catch(function(err){
    console.log(err);
})
 
})
// LOGIN

// SWITCH LOGIN/REGISTER
let section_reg = document.getElementById("register");
let crearcuenta_button = document.getElementById("register-button");
let section_log = document.getElementById("loguear");
let iniciarcuenta_button = document.getElementById("iniciar-sesion");

crearcuenta_button.addEventListener("click", function(e){ 
    e.preventDefault();
    section_log.style.display = 'none';
    section_reg.style.display = 'block';
});
iniciarcuenta_button.addEventListener("click", function(e){
    e.preventDefault();
    section_log.style.display = 'flex';
    section_reg.style.display = 'none';
})
// SWITCH LOGIN/REGISTER

// REGISTER
let registro = document.getElementById("registro");

registro.addEventListener("click", async function(e){
    e.preventDefault();
    let data = {
        "username": document.getElementById("usuario").value,
        "fullname": document.getElementById("nombre-completo").value,
        "email": document.getElementById("email").value,
        "tel": document.getElementById("telefono").value,
        "adress": document.getElementById("direccion").value,
        "password": document.getElementById("contraseña").value
    }
    console.log(data);
    fetch('http://127.0.0.1:3000/user/usuarios',{
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'cors',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(function(res){
        console.log(res);
    })
    .catch(function(err){
        console.log(err);
    })
})

window.onload = function(){
    localStorage.clear();
}


