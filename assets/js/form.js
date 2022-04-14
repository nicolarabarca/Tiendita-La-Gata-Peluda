// Captura datos de formulario de contacto

//  se captura evento mediante id boton para  eviar  datos para hacer confirmaciòn
const buttonSend = document.getElementById("send");
buttonSend.addEventListener("click", post, false);
//VALIDACIÒN FORMULARIO
const ValidationAccess = document.addEventListener(
  "DOMContentLoaded", // El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado 
  function () {
    document
      .getElementById("applicationForm")
      .addEventListener("submit", validateForm);
  }
);

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
  if (localStorage.getItem("Users")) { //  almacenar o crear datos del lado del cliente
    personDataBase = JSON.parse(localStorage.getItem("Users"));
  } else {
    localStorage.setItem("Users", JSON.stringify(personDataBase));
  }

  firstName = document.getElementById("getName").value; // se captura el valor ingresado por el usuario (nombre)
  lastName = document.getElementById("getLastName").value;// se captura el valor ingresado por el usuario (apellido)
  mail = document.getElementById("getMail").value;// se captura el valor ingresado por el usuario (correo)
  comment = document.getElementById("getComment").value; // se captura el valor ingresado por el usuario (comentario)
  capturePerson = new Person(firstName, lastName, mail, comment);

  localStorage.setItem("Users", JSON.stringify(personDataBase));
}
// se declara Array vacio para almacenar datos ingresados por el usuario 
let personDataBase = [];
function addData() {
  personDataBase.push(capturePerson); // se envian al arra PersonDataBase datos ingresados por el usuario
  swal({
    title: "¡Hola!",// se usa libreria sweetalert para indicar al usuario mediante una alert con estilos añadidos que pronto sera contactado
    text: ` Pronto nos pondremos en contacto contigo al correo ${capturePerson.mail} `,
    icon: "assets/img/gatapelualogo1.png",
    button: "Entendido!",
  });
}

function cleanInput() { // se crea función que limpiara inputs despues de haber enviado los datos del formulario
  setTimeout("document.applicationForm.reset()", 100);// setTimeout método llama a una función después de un número de milisegundos.
  return false;
}

function validateForm(event) {
  event.preventDefault(); /* preventDefault() Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del
   evento, es decir, puede ser llamado de nuevo.*/
  let validateName = firstName;
  if (validateName.length == 0) {/* se realiza validación de ingreso de Nombre
     indicando que si el valor/largo es 0 no se ha ingresado nombre*/
    document.getElementById("getName").focus();
    Toastify({/* se realiza validación de ingreso de Nombre
     indicando que si el valor/largo es 0 no se ha ingresado nombre*/
      text: "No olvides ingresar tu Nombre :D",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
    return;
  }
  let validateLastName = lastName;
  if (validateLastName.length == 0) {/* se realiza validación de ingreso de apellido
     indicando que si el valor/largo es 0 no se ha ingresado apellido*/
    document.getElementById("getLastName").focus();
    Toastify({/*Se hace uso de libreria Toastify para indicar al usuario que debe ingresar su apellido*/
      text: "Upss no ingresaste tu Apellido",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
    return;
  }
  let validateLastMail = mail;
  if (validateLastMail.length == 0) {/* se realiza validación de ingreso de correo
     indicando que si el valor es o no se ha ingresado correo*/
    document.getElementById("getMail").focus();
    Toastify({/*Se hace uso de libreria Toastify para indicar al usuario que debe ingresar su correo*/
      text: "No olvides ingresar tu Correo Electrónico",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
    return;
  }

  let acceptTerms = document.applicationForm.terms; //acceso a check terminos y condiciones

  if (acceptTerms.checked == true) {
    addData(); // se llama funcion encargada de añadir datos proporcionados por el usuario a mensaje de exito
    cleanInput(); // se llama a funcion encargada de limpiar inputs luego de enviar datos de formulario
  } else {
    //Ingresa en esta parte del ciclo cuando se hace click en boton enviar sin aceptar terminos
    Toastify({ /*Se hace uso de libreria Toastify para indicar al usuario que debe aceptar terminos y condiciones*/
      text: "Ya casi!! Debes aceptar terminos y condiciones",
      position: "center", // `left`, `center` or `right`
      style: {
        background: "hsl(325, 2%, 57%)",
      },
      duration: 3000,
    }).showToast();
    return false; // no  se envia informaciòn de reserva
  }
}
