// Captura datos de formulario de contacto

// id boton eviar  datos para hacer confirmaciòn
const buttonSend = document.getElementById("send");
buttonSend.addEventListener("click", post, false);

// Captura datos de formulario de contacto
function post() {
  class Person {
    constructor(firstName, lastName, mail, comment) {
      this.name = firstName;
      this.lastName = lastName;
      this.mail = mail;
      this.comment = comment;
    }
  }

  if (localStorage.getItem("Users")) {
    personDataBase = JSON.parse(localStorage.getItem("Users"));
  } else {
    localStorage.setItem("Users", JSON.stringify(personDataBase));
  }

  firstName = document.getElementById("getName").value;
  console.log(firstName);
  lastName = document.getElementById("getLastName").value;
  mail = document.getElementById("getMail").value;
  comment = document.getElementById("getComment").value;
  capturePerson = new Person(firstName, lastName, mail, comment);

  localStorage.setItem("Users", JSON.stringify(personDataBase));
}
//Array para almacenar datos solicitados al usuario para reserva
let personDataBase = [];
function addData() {
  personDataBase.push(capturePerson);

  swal({
    title: "¡Hola!",
    text: ` Pronto nos pondremos en contacto contigo al correo ${capturePerson.mail} `,
    icon: "assets/img/gatapelualogo1.png",
    button: "Entendido!",
  });
}

function cleanInput() {
  setTimeout("document.applicationForm.reset()", 100);
  return false;
}

//VALIDACIÒN FORMULARIO

const validationAccess = document.addEventListener(
  "DOMContentLoaded",
  function () {
    document
      .getElementById("applicationForm")
      .addEventListener("submit", validateForm);
  }
);

function validateForm(event) {
  event.preventDefault();
  let validateName = firstName;
  if (validateName.length == 0) {
    document.getElementById("getName").focus();
    return;
  }
  let validateLastName = lastName;
  if (validateLastName.length == 0) {
    document.getElementById("getLastName").focus();
    return;
  }
  let validateLastMail = mail;
  if (validateLastMail.length == 0) {
    document.getElementById("getMail").focus();
    return;
  }

  let acceptTerms = document.applicationForm.terms; //acceso a check terminos y condiciones

  if (acceptTerms.checked == true) {
    addData();
    cleanInput();
  } else {
    //Ingresa en esta parte del ciclo cuando se hace click en boton enviar sin aceptar terminos
    Toastify({
      text: "Debes aceptar terminos y condiciones",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
    return false; // no  se envia informaciòn de reserva
  }
}
