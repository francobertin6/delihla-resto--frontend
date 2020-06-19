// ARRAYS
const products_id = [];

// CREACION DE PRODUCTOS
async function productsdivs(datos, index){
    let section = document.getElementById("nuestros-platos");
    let creatediv = document.createElement("div");
    let foodname = document.createElement("h3");
    let price = document.createElement("p");
    let image = document.createElement("img");
    creatediv.className = "productos";
    foodname.className = "foodname";
    price.className = "price";
    image.className = "foodimage";
    section.appendChild(creatediv);
    creatediv.appendChild(foodname);
    creatediv.appendChild(price);
    creatediv.appendChild(image);
    foodname.innerHTML = datos.datos[index].foodname;
    price.innerHTML = "$ "+ datos.datos[index].price;
    image.src = datos.datos[index].url;
};

window.onload = async function(){
    let url = 'http://127.0.0.1:3000/productos/get';
    const resp = await fetch(url);
    const datos = await resp.json();
    console.log(resp);
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

