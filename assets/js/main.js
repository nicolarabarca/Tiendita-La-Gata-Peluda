const Fragment = document.createDocumentFragment();
const TemplateCard = document.getElementById("template-card").content;
const templateTotal = document.getElementById("template-total").content;
const Items = document.getElementById("Items");
const Total = document.getElementById("printTotal");
const TemplateShoppingCart = document.getElementById(
  "template-ShoppingCart"
).content;
let shoppingCart = {};
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
Items.addEventListener('click', e => { ActionIncreaseDecrease(e) })
// separa  el evento click de los botones añadir mesa
cards.addEventListener("click", (e) => {
  addShoppingCart(e);
});
document.addEventListener('DOMContentLoaded', e => { FetchData()
    if (localStorage.getItem('shoppingCart')) {
       shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'))
        PrintShoppingCart()
    }
}); 
// Se pintan en pantalla cada producto con su descripción y precio
 const FetchData = async () => {
    const Res = await fetch('assets/js/data.json');
    const Data = await Res.json()
    PrintShoppingCart(Data)
    Data.forEach((arrayDataProducts) => {
      TemplateCard.querySelector("button").dataset.id = arrayDataProducts.id;
      TemplateCard.querySelector("h5").textContent = arrayDataProducts.name;
      TemplateCard.querySelector("h6").textContent = arrayDataProducts.price;
      TemplateCard.querySelector("p").textContent = arrayDataProducts.description;
      TemplateCard.querySelector("img").setAttribute("src", arrayDataProducts.img);
      const Clone = TemplateCard.cloneNode(true);
      Fragment.appendChild(Clone);
      cards.appendChild(Fragment);
    });
  }
// añadir  productos  al carrito.
function addShoppingCart(e) {
  if (e.target.matches(".card .btn-secondary")) {
    setShoppingCart(e.target.parentElement);
    Toastify({
      text: "Se añadio el producto al carrito",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
  } else {
    e.stopPropagation();
  }
}
//Pintar productos en carrito
function setShoppingCart(object) {
  const Product = {
    id: object.querySelector(".card .btn-secondary").dataset.id,
    name: object.querySelector("h5").textContent,
    price: object.querySelector("h6").textContent,
    quantity: 1,
  };
  // Si el producto existe se aumenta producto en cantidad
  if (shoppingCart.hasOwnProperty(Product.id)) {
    Product.quantity = shoppingCart[Product.id].quantity + 1;
  }
  shoppingCart[Product.id] = { ...Product }; // se copia el objeto Product
  PrintShoppingCart();
}
// Se imprime en carrito Data de productos seleccionados
const PrintShoppingCart = () => {
  Items.innerHTML = "";

  Object.values(shoppingCart).forEach((Product) => {
    //Se accede a los valores del objeto
    TemplateShoppingCart.querySelector("th").textContent = Product.id;
    TemplateShoppingCart.querySelectorAll("td")[0].textContent = Product.name;
    TemplateShoppingCart.querySelectorAll("td")[1].textContent = Product.quantity;
    TemplateShoppingCart.querySelector("span").textContent =  Product.price * Product.quantity;
    //botones aumentar o disminuir cantidad de algun producto seleccionado
    TemplateShoppingCart.querySelector(".btn-secondary").dataset.id = Product.id;
    TemplateShoppingCart.querySelector(".btn-danger").dataset.id = Product.id;
    const Clone = TemplateShoppingCart.cloneNode(true);
    Fragment.appendChild(Clone);
  });
  Items.appendChild(Fragment);

  printTotal();

  localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
};
//Función para imprimir Total de suma de productos seleccionados para comprar
const printTotal = () => {
  Total.innerHTML = "";
  if (Object.keys(shoppingCart).length === 0) {
    Total.innerHTML = ` <th scope="row" colspan="5">Tu Carrito esta vacío</th> `;
    return;
  }

  const TotalQuantity = Object.values(shoppingCart).reduce(
    (collector, { quantity }) => collector + quantity, 0);
  const TotalPrice = Object.values(shoppingCart).reduce(
    (collector, { quantity, price }) => collector + quantity * price, 0);
  templateTotal.querySelectorAll("td")[0].textContent = TotalQuantity;
  templateTotal.querySelector("span").textContent = TotalPrice;
  const Clone = templateTotal.cloneNode(true);
  Fragment.appendChild(Clone);
  Total.appendChild(Fragment);
  const EmptyCart = document.getElementById("empty-cart")
   EmptyCart.addEventListener("click",() => {
  shoppingCart = {};
  PrintShoppingCart();
   })
};

const ActionIncreaseDecrease = e => {
    if (e.target.classList.contains('btn-secondary')) {
        const Product = shoppingCart[e.target.dataset.id]
        Product.quantity++
        shoppingCart[e.target.dataset.id] = { ...Product }
         PrintShoppingCart();
    }
  
    if (e.target.classList.contains('btn-danger')) {
        const Product= shoppingCart[e.target.dataset.id]
        Product.quantity--
        if (Product.quantity === 0) {
            delete shoppingCart[e.target.dataset.id]
        } else {
          shoppingCart[e.target.dataset.id] = {...Product}
        }
         PrintShoppingCart()
    }
    e.stopPropagation()
  }
