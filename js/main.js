$(document).ready(function() {

  $(".send-message").click(
    function() {
      sendMessage();
      setTimeout(rispostaCpu,1000);

    }
  );

  $("#input-message").keyup(
    function(event) {
      if(event.which == 13) {
        sendMessage();
        setTimeout(rispostaCpu,1000);

      }
    }
  );

  $("#search").keyup(function(event){
    cercaContatto();

  });


});

/*FUNZIONE INVIO MESSAGGIO UTENTE*/
function sendMessage() {
  var inputText = $("#input-message").val();

  if(inputText != "") {
    var templateMessage = $(".templates .message-row").clone();

    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var time = hours + ":" + minutes;

    templateMessage.find(".message-text").text(inputText);
    templateMessage.find(".message-time").text(time);
    templateMessage.addClass("sent");

    $(".chat").append(templateMessage);
    $("#input-message").val("");
  }
}

/*FUNZIONE AUTORISPOSTA CPU*/
function rispostaCpu(){
  var templateMessageCpu = $(".templates .message-row").clone();

  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var time = hours + ":" + minutes;

  templateMessageCpu.find(".message-time").text(time);
  templateMessageCpu.addClass("ricevuta");

  templateMessageCpu.find(".message-text").text("ok");
  $(".chat").append(templateMessageCpu);
}

//FUNZIONE RICERCA CONTATTI
function cercaContatto(){
  var lettera = $("#search").val();
  lettera = lettera.toLowerCase();

  $(".contact-name").each(function(){
    //ad ogni giro leggo il nome
    var nomeCorrente = $(this).text();
    nomeCorrente = nomeCorrente.toLowerCase();
    var trovato = nomeCorrente.includes(lettera); //restituisce vero o falso

    if(trovato){
      $(this).parents(".contact").show();
    } else {
      $(this).parents(".contact").hide();
    }

  });
}
