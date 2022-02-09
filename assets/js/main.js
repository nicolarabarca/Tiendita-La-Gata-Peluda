// Función que permite controlar el desplazamiento del smooth scroll
$(document).ready(function () {
  $("a").click(function () {
    var slowerScroll = this.hash;
    $("html,body").animate(
      {
        scrollTop: $(slowerScroll).offset().top - 70,
      },
      3000
    );
  });
});

// Captura datos de formulario de contacto
function enviar() {
  class Persona {
    constructor(nombre, apellido, correo, escribe) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.correo = correo;
      this.escribe = escribe;
    }
  }
  var capturarNombre = document.getElementById("nombre").value;
  var capturarApellido = document.getElementById("apellido").value;
  var capturarCorreo = document.getElementById("correo").value;
  var capturarMensaje = document.getElementById("escribe").value;

  capturarUsuario = new Persona(
    capturarNombre,
    capturarApellido,
    capturarCorreo,
    capturarMensaje
  );

  agregar();
}
//Crear  array con push y variable capturarUsuario
var baseDatos = [];
function agregar() {
  baseDatos.push(capturarUsuario);
  document.getElementById("prueba").innerHTML +=
    "<p>" +
    capturarUsuario.nombre +
    "</p>" +
    "<p>" +
    capturarUsuario.apellido +
    "</p>" +
    "<p>" +
    capturarUsuario.correo +
    "</p>" +
    "<p>" +
    capturarUsuario.escribe +
    "</p>";
}
