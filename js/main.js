$(document).ready(function() {

  $(".send-message").click(
    function() {
      setTimeout(staScrivendo, 100);
      sendMessage();

    }
  );

  $("#input-message").keyup(
    function(event) {
      if(event.which == 13) {
        setTimeout(staScrivendo, 100);
        sendMessage();

      }
    }
  );

  $("#search").keyup(function(event){
    cercaContatto();

  });


  /*AL CLICK SU UN CONTATTO OTTENGO LA CHAT CORRISPONDENTE*/
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
        var indexChat = chatCorrente + 1;
        $(".chat:nth-child("+indexChat+")").addClass("active");


      }
    );

    //MENU A TENDINA
    $(document).on("click", ".message-angle", function(){
      $(this).parents(".message-row").children(".dropdown-menu").toggle();
    });

    //ELIMINAZIONE MESSAGGIO
    $(document).on("click", ".delete-message", function(){
      $(this).parents(".message-row").remove();
    });

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

    var conversazioneAttiva = $(".chat.active").index();
    conversazioneAttiva += 1;

    //impedisco di trovare (in quel secondo) la risposta automatica in un'altra chat
    setTimeout(function() {
      rispostaCpu(conversazioneAttiva);
    },1500);
    $("#input-message").val("");

    //appare così l'ultimo messaggio inviato in basso nella chat
    var heightChatActive = $(".chat.active").prop("scrollHeight");
    $(".chats-wrapper").scrollTop(heightChatActive);

    //printo messaggio utente come'ultimo messaggio nel riquadro del contatto e orario
    $(".contact.active .contact-last-message").text(inputText);
    $(".contact.active .contact-time").text(getTime);
  }
}

/*FUNZIONE AUTORISPOSTA CPU*/
function rispostaCpu(conversazioneActive){
  var templateMessageCpu = $(".templates .message-row").clone();

  var time = getTime();

  templateMessageCpu.find(".message-time").text(time);
  var ultimoMexRecente = templateMessageCpu.find(".message-text").text("ok");

  //printo orario e ultimo messaggio nel riquadro del contatto a sinistra e in alto
  $(".contact.active .contact-last-message").text(ultimoMexRecente.text());
  $(".contact.active .contact-time").text(getTime);
  $(".avatar.active span").text(getTime);

  //impedisco di trovare (in quel secondo) la risposta automatica in un'altra chat
  $(".chat:nth-child("+conversazioneActive+")").append(templateMessageCpu);

  //appare così l'ultimo messaggio inviato in basso nella chat
  var heightChatActive = $(".chat.active").prop("scrollHeight");
  $(".chats-wrapper").scrollTop(heightChatActive);

  //ritorna la scritta ultimo accesso alle tot
  $(".avatar.active .avatar-last-access").text("Ultimo accesso oggi alle " + time);
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

//FUNZIONE CHE FA VISUALIZZARE STA SCRIVENDO NELL'HEADER DELLA CHAT
function staScrivendo(){
  $(".avatar.active .avatar-last-access").text("sta scrivendo...");
}
