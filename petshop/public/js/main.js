const url = `https://apipetshop.herokuapp.com/api/articulos`
const selector = document.getElementById("price");
console.log(selector)
let productos = [];

let app = new Vue({
    el: "#app",
    data: {        
        productos: [],
        juguetes: [],
        medicamentos: [],
        carrito: [],
        total: 0.0,
        valor: ""
    },
    methods: {
        cambiarSelector(){
            if(app.valor == "+"){
                sortArray(app.productos, "b", "precio")
            }
            if(app.valor == "-"){
                sortArray(app.productos, "a", "precio")
            }
            if(app.valor == ""){
                app.productos = [];
                copyArray(productos, app.productos);
            }
        },
        comprar(){
            alert("La compra se ha realizado efectivamente. ¡Muchas gracias por tu visita!");
            this.borrarTodos();
        },
        borrarTodos(){
            app.carrito = [];
            app.total = 0.0;
            cartVue.count = 0;
        },
        alertaProducto(){
            var toastLive = document.getElementById('liveToast')
            console.log(toastLive)
            var toast = new bootstrap.Toast(toastLive)
            toast.show()
        }
    }
})

let cartVue = new Vue({
    el: "#cart",
    data: {
        count: 0
    }
})

fetch(url)
    .then(response => response.json())
    .then(myJson => {
        let title = document.querySelector("title").innerHTML;
        let array = myJson.response;
        
        app.medicamentos = filtrar(array, "Medicamento");
        app.juguetes = filtrar(array, "Juguete");

        if(title.includes("Farmacia")){
            copyArray(app.medicamentos, productos);
            app.productos = app.medicamentos;
        }
        if(title.includes("Juguetes")){
            copyArray(app.juguetes, productos);
            app.productos = app.juguetes;
        }
        loadCart();
    })
    .catch(err => console.log(err))

/*====== Filter functions ======*/
function filtrar(array,tipo){
   return array.filter(producto => producto.tipo == tipo)
}

function filtrarPrecio(array, order, param){
    sortArray(array, order, param);
}

function sortArray(array, order, param){
    if(order == "a") array.sort((a,b) => {return a[param] - b[param]});
    if(order == "b") array.sort((a,b) => {return b[param] - a[param]});
}

selector.addEventListener("change", e => {
    let value = e.target.value;
    
    if(value == "+"){
        sortArray(app.productos, "b", "precio")
    }
    if(value == "-"){
        sortArray(app.productos, "a", "precio")
    }
    if(value == ""){
        app.productos = [];
        copyArray(productos, app.productos);
    }
})
/*====== /Filter functions ======*/

/*====== Cart functions ======*/
function waitForAnswer() {
    return new Promise(resolve => {
        setTimeout(() => {
        resolve();
        }, 1);
    });
}
    
async function loadCart() {
await waitForAnswer();
let addToCart = document.querySelectorAll(".btn-cart");

addToCart.forEach(product => { 
        product.addEventListener("click", e => {
            let productContainer = e.target.parentNode.parentNode;
            let titulo = productContainer.childNodes[2].innerHTML;
            let product = findProduct(productos, titulo);
            
            e.preventDefault();
            addProduct(product)
            console.log(app.carrito)

        })
    })
}

function findProduct(array, titulo){
    for(let i = 0; i < array.length; i++){
        if(array[i].nombre == titulo){
            return array[i];
        }
    }
}

function addProduct(product){
    app.carrito.push(product)
    app.total = trunc(app.total + (product.precio - 0.01));
    cartVue.count++;
}

function removeProduct(product, productTitle){
    let producto = findProduct(productos, productTitle);
    app.carrito.splice((product -1), 1)

    if(app.carrito.length > 0){
        app.total = trunc(app.total - (producto.precio - 0.01));
    }
    else{
        app.total = 0.0;
    }
}

function deleteItem(item){
    let product = item.parentNode.parentNode.id;
    let productTitle =(item.parentNode.childNodes[0].innerHTML);

    removeProduct(product, productTitle);
    cartVue.count--;
}

/*====== /Cart functions ======*/

// Other functions
function trunc(number){
    let auxVar = number.toString();
    let decimalPosition = auxVar.indexOf(".") + 1;
    auxVar = auxVar.substr(0, decimalPosition + 2);
    return Number(auxVar);
}
function copyArray(array, auxArray){
    array.map(item => auxArray.push(item));
}