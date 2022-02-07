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

//Función para inicializar efecto Toolip según literatura
var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//Función que realmete  inicializa  efecto Toolip
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
//Función que reemplaza color de  fondo de  tooltip
$(document).on("inserted.bs.tooltip", function (e) {
  var tooltip = $(e.target).data("bs.tooltip");
  tooltip.$tip.addClass($(e.target).data("tooltip-custom-class"));
});
