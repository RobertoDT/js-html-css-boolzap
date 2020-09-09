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


});

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
