$(document).ready(
  function(){

      $(".fa-paper-plane").click(
        function(){
          var messaggio = $("#myMessage").val();
          var elemento = $(".template").clone();
          elemento.prepend(messaggio);
          elemento.removeClass("template");
          elemento.addClass("msg");
          $(".lista-messaggi").append(elemento);
          $("#myMessage").val("");
        }
      );




  }
);
