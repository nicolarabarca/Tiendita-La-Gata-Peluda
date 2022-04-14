/*Se utiliza Fragment como una versión ligera de Document que 
almacena un segmento de una estructura de documento compuesta de nodos como un documento estándar.*/
const Fragment = document.createDocumentFragment(); 

/*Se capturan los ID de los  elementos de html que se ocuparan para imprimir 
en pantalla base de datos,cantidad,total, etc*/
const TemplateCard = document.getElementById("template-card").content; // content trae el contenido del template de la tarjeta
const templateTotal = document.getElementById("template-total").content;
const Items = document.getElementById("Items");
const Total = document.getElementById("printTotal");
const TemplateShoppingCart = document.getElementById(
  "template-ShoppingCart"
).content;

// Se declara objeto vacio con let para luego sobreescribirlo con los productos seleccionados por el cliente 
let shoppingCart = {};
// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { FetchData()
    if (localStorage.getItem('shoppingCart')) {
       shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        PrintShoppingCart(e) // e para capturar los elemento que se quieran seleccionar 
    }
}); 
Items.addEventListener('click', e => { ActionIncreaseDecrease(e) })
cards.addEventListener("click", (e) => {/* se ustiliza eventdelegation  para manejar eventos de
 manera eficiente.y detectar el id de todos los botones que nos serviran para añadir los producto al carrito*/
  addShoppingCart(e);
});

 const BuyButton = document.querySelector(".btn-secondary");
  BuyButton.addEventListener("click" , Buy)
/* Se lee información base de datos de data.json con información de los productos que se pintaran 
en pantalla utilizando fetch*/
 const FetchData = async () => {
    const Res = await fetch('assets/js/data.json');// aquí se es donde se espera que se lea la información de base de datos
    const Data = await Res.json()// Se guarda la data base de datos de productos 
    PrintShoppingCart(Data)
    Data.forEach((arrayDataProducts) => {  /* Se recorre y recibe base de datos y se utiliza template con 
    queryselector que devuelve el primer elemento del documento para imprimir en pantalla
     información proveniente de esta misma*/
      TemplateCard.querySelector("button").dataset.id = arrayDataProducts.id;
      TemplateCard.querySelector("h5").textContent = arrayDataProducts.name;
      TemplateCard.querySelector("h6").textContent = arrayDataProducts.price;
      TemplateCard.querySelector("p").textContent = arrayDataProducts.description;
      TemplateCard.querySelector("img").setAttribute("src", arrayDataProducts.img);
      const Clone = TemplateCard.cloneNode(true); // se hace la clonacion del template que esta en index.html
      Fragment.appendChild(Clone);
      cards.appendChild(Fragment);
    });
  }
// añadir  productos  al carrito.
function addShoppingCart(e) {
  if (e.target.matches(".card .btn-secondary")) {/* Se pregunta si el elemento al que se le hace click contiene esta 
    clase y si la contiene se añadira al carrito*/
    setShoppingCart(e.target.parentElement);
    Toastify({ /*Se hace uso de libreria Toastify para indicar al usuario cuando ha realizado una acción 
    relevante como añadir ptoductos al carrito*/
      text: "Se añadio el producto al carrito",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
  } else {
    e.stopPropagation();/*stopPropagation evita que el evento actual se siga propagando en las
     fases de captura y burbujeo.*/
  }
}
//Pintar productos en carrito
function setShoppingCart(object) { // Se recibe el objeto
  const Product = {
    id: object.querySelector(".card .btn-secondary").dataset.id, // se accede a la id del botón de cada producto
    name: object.querySelector("h5").textContent,
    price: object.querySelector("h6").textContent,
    quantity: 1,
  };
  // Si el producto existe se aumenta producto en cantidad
  if (shoppingCart.hasOwnProperty(Product.id)) { // hasOwnProperty() devuelve un booleano indicando si el objeto tiene la propiedad especificada.
    Product.quantity = shoppingCart[Product.id].quantity + 1;// se accede solo al elemento seleccionado por el usuario
  }
  shoppingCart[Product.id] = { ...Product }; /*se copia el objeto Product  y se empuja al carrito 
  si existe el prducto este se sobreescribe y si no existe lo crea */
  PrintShoppingCart(); // se llama la función encargada de pintar el carrito
}
// Se imprime en carrito Data de productos seleccionados
const PrintShoppingCart = () => {
  Items.innerHTML = ""; 

  Object.values(shoppingCart).forEach((Product) => {
    /*Se accede a los valores del objeto y  se usa el template de index 
    html para crear los productos seleccionados por el usuario de manera dinamica*/
    TemplateShoppingCart.querySelector("th").textContent = Product.id;
    TemplateShoppingCart.querySelectorAll("td")[0].textContent = Product.name;
    TemplateShoppingCart.querySelectorAll("td")[1].textContent = Product.quantity;
    TemplateShoppingCart.querySelector("span").textContent =  Product.price * Product.quantity; // se multiplica precio de producto por cantidad
    //botones aumentar o disminuir cantidad de algun producto seleccionado
    TemplateShoppingCart.querySelector(".btn-secondary").dataset.id = Product.id;
    TemplateShoppingCart.querySelector(".btn-danger").dataset.id = Product.id;
    const Clone = TemplateShoppingCart.cloneNode(true);// se hace la clonacion del template que esta en index.html
    Fragment.appendChild(Clone);
  });
  Items.appendChild(Fragment);

  printTotal(); // se llama a función encargada de imprimir el total en pantalla

  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
};
//Función para imprimir Total de suma de productos seleccionados para Buy
const printTotal = () => {
  Total.innerHTML = "";/* Esta propiedad permite reiniciar/borrar el contenido que se encuentre:*/
  if (Object.keys(shoppingCart).length === 0) {
    Total.innerHTML = ` <th scope="row" colspan="5">Tu Carrito esta vacío</th> `; // se añade a carrito mensaje carrito vacio en el caso de que asi sea mediante  innerHTML
    return;
  }

  const TotalQuantity = Object.values(shoppingCart).reduce(
    (collector, { quantity }) => collector + quantity, 0);
  const TotalPrice = Object.values(shoppingCart).reduce(
    (collector, { quantity, price }) => collector + quantity * price, 0);
  templateTotal.querySelectorAll("td")[0].textContent = TotalQuantity;
  templateTotal.querySelector("span").textContent = TotalPrice;
  const Clone = templateTotal.cloneNode(true);// se hace la clonacion del template que esta en index.html
  Fragment.appendChild(Clone);
  Total.appendChild(Fragment);
  const EmptyCart = document.getElementById("empty-cart")// se detecta el evento click mediante el id de botón vaciar carrito
   EmptyCart.addEventListener("click",() => { 
  shoppingCart = {}; // se declara objeto vacio en el caso que usuario decida vaciar carrito
  PrintShoppingCart(); // se llama la función encargada de pintar el carrito
   })
};

const ActionIncreaseDecrease = e => { /* si la clase del botón coincide con el id aumenta la cantidad del producto
viendose reflejada en el carrito modificando el total segun la cantidad del producto*/
    if (e.target.classList.contains('btn-secondary')) {
        const Product = shoppingCart[e.target.dataset.id]
        Product.quantity++
        shoppingCart[e.target.dataset.id] = { ...Product } /*se copia el objeto Product  y se empuja al carrito 
  si existe el prducto este se sobreescribe */
         PrintShoppingCart(); // se llama la función encargada de pintar el carrito
    }
  
    if (e.target.classList.contains('btn-danger')) { /* si la clase del botón coincide con el id disminuye la cantidad del producto
viendose reflejada en el carrito modificando el total segun la cantidad del producto*/
        const Product= shoppingCart[e.target.dataset.id]
        Product.quantity--
        if (Product.quantity === 0) {
            delete shoppingCart[e.target.dataset.id]// El operador delete  elimina una propiedad de un objeto.
        } else {
          shoppingCart[e.target.dataset.id] = {...Product}
        }
         PrintShoppingCart() // se llama la función encargada de pintar el carrito
    }
    e.stopPropagation()// se llama a función encargada de imprimir carrito
  }

 
  function Buy() {    /*Función que permite mostrar un alert con libreria sweetalert indicando al usuario 
  un mensaje compra exitosa si se detecta el evento click de botón comprar  */
    Items.innerHTML= "";
    Total.innerHTML= "";
    if(Buy) {
       swal({  // se usa libreria sweetalert para indicar al usuario mediante una alert con estilos añadidos que su compra fue exitosa
    title: "¡Compra exitosa!",
    text: ` Recibiras tu compra dentro de los 3 siguientes dias habiles `,
    icon: "assets/img/gatapelualogo1.png",
    button: "Entendido!",
  });
}
  }