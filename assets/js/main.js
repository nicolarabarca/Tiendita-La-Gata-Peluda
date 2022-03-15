const fragment = document.createDocumentFragment();
const templateCard = document.getElementById("template-card").content;
const templateTotal = document.getElementById("template-total").content;
const items = document.getElementById("items");
const total = document.getElementById("printTotal");
const templateShoppingCart = document.getElementById(
  "template-ShoppingCart"
).content;
let shoppingCart = {};

// Se pintan en pantalla cada producto con su descripción y precio
fetch("assets/js/data.json")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((arrayDataProducts) => {
      templateCard.querySelector("button").dataset.id = arrayDataProducts.id;
      templateCard.querySelector("h5").textContent = arrayDataProducts.name;

      templateCard.querySelector("h6").textContent = arrayDataProducts.price;
      templateCard.querySelector("p").textContent =
        arrayDataProducts.description;

      templateCard
        .querySelector("img")
        .setAttribute("src", arrayDataProducts.img);
      const clone = templateCard.cloneNode(true);

      fragment.appendChild(clone);

      cards.appendChild(fragment);
    });
  });

// separa  el evento click de los botones añadir mesa
cards.addEventListener("click", (e) => {
  addShoppingCart(e);
});
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
  const product = {
    id: object.querySelector(".card .btn-secondary").dataset.id,
    name: object.querySelector("h5").textContent,
    price: object.querySelector("h6").textContent,
    quantity: 1,
  };
  // Si el producto existe se aumenta producto en cantidad
  if (shoppingCart.hasOwnProperty(product.id)) {
    product.quantity = shoppingCart[product.id].quantity + 1;
  }
  shoppingCart[product.id] = { ...product }; // se copia el objeto product
  printShoppingCart();
}

// Se imprime en carrito data de productos seleccionados
const printShoppingCart = () => {
  items.innerHTML = "";

  Object.values(shoppingCart).forEach((product) => {
    //Se accede a los valores del objeto
    templateShoppingCart.querySelector("th").textContent = product.id;
    templateShoppingCart.querySelectorAll("td")[0].textContent = product.name;
    templateShoppingCart.querySelectorAll("td")[1].textContent =
      product.quantity;
    templateShoppingCart.querySelector("span").textContent =
      product.price * product.quantity;

    //botones aumentar o disminuir cantidad de algun producto seleccionado
    templateShoppingCart.querySelector(".btn-secondary").dataset.id =
      product.id;
    templateShoppingCart.querySelector(".btn-danger").dataset.id = product.id;

    const clone = templateShoppingCart.cloneNode(true);
    fragment.appendChild(clone);
  });
  items.appendChild(fragment);

  printTotal();
};
//Función para imprimir total de suma de productos seleccionados para comprar
const printTotal = () => {
  total.innerHTML = "";
  if (Object.keys(shoppingCart).length === 0) {
    total.innerHTML = `
    <th scope="row" colspan="5">Tu Carrito esta vacío</th>
    `;
    return;
  }

  const totalQuantity = Object.values(shoppingCart).reduce(
    (collector, { quantity }) => collector + quantity,
    0
  );
  const totalPrice = Object.values(shoppingCart).reduce(
    (collector, { quantity, price }) => collector + quantity * price,
    0
  );
  templateTotal.querySelectorAll("td")[0].textContent = totalQuantity;
  templateTotal.querySelector("span").textContent = totalPrice;
  const clone = templateTotal.cloneNode(true);
  fragment.appendChild(clone);

  total.appendChild(fragment);
};
