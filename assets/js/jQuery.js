//Función que permite controlar el desplazamiento del smooth scroll
$(document).ready(function () {
  $("a").click(function () {
    var slowerScroll = this.hash;
    $("html,body").animate(
      {
        scrollTop: $(slowerScroll).offset().top - 70,
      },
      2000
    );
  });
});
