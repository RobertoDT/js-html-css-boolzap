$(document).ready(function() {

  $(".send-message").click(
    function() {
      sendMessage();

    }
  );

  $("#input-message").keyup(
    function(event) {
      if(event.which == 13) {
        sendMessage();

      }
    }
  );

  $("#search").keyup(function(event){
    cercaContatto();

  });

  /*AL CLICK SU UN <li> OTTENGO L'HEADER CORRISPONDENTE AL CONTATTO SELEZIONATO*/
  $(".contacts li").click(
      function(){
        //CONTATTO
        var contattoCorrente = $(this).index();
        $(".avatar").removeClass("active");
        var indexContatto = contattoCorrente + 1;
        $(".avatar:nth-child("+indexContatto+")").addClass("active");
        $(".contacts li").removeClass("active");
        $(this).addClass("active");

        //CHAT-BOX
        var chatCorrente = $(this).index();
        $(".chat").removeClass("active");
        var indexChat = chatCorrente + 2;
        $(".chat:nth-child("+indexChat+")").addClass("active");

      }
    );

    //MENU A TENDINA
    $(".message-angle").click(
      function(){
        $(this).parents(".message-row").children(".dropdown-menu").toggle();
      }
    );

    //ELIMINAZIONE MESSAGGIO
    $(".delete-message").click(
      function(){
        $(this).parents(".message-row").children(".message").remove();
        $(this).parents(".message-row").children(".dropdown-menu").hide();
      }
    );






});

/*FUNZIONE INVIO MESSAGGIO UTENTE*/
function sendMessage() {
  var inputText = $("#input-message").val();

  if(inputText != "") {
    var templateMessage = $(".templates .message-row").clone();

    var time = getTime();

    templateMessage.find(".message-text").text(inputText);
    templateMessage.find(".message-time").text(time);
    templateMessage.addClass("sent");


    $(".chat.active").append(templateMessage);
    setTimeout(rispostaCpu,1000);
    $("#input-message").val("");
  }
}

/*FUNZIONE AUTORISPOSTA CPU*/
function rispostaCpu(){
  var templateMessageCpu = $(".templates .message-row").clone();

  var time = getTime();

  templateMessageCpu.find(".message-time").text(time);

  templateMessageCpu.find(".message-text").text("ok");
  $(".chat.active").append(templateMessageCpu);
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

//FUNZIONE CHE RESTITUISCE L'ORARIO
function getTime(){
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();

  if(minutes < 10){
    minutes = "0" + minutes;
  }

  return hours + ":" + minutes;
}
