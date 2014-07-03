function flash_message(msg){
  $("#msgs").hide();
  $("#msgs").html(msg);
  $("#msgs").fadeIn("slow");
  $("#msgs").fadeOut("slow");
}

function temp_data(data){
  $("#temp").html("<h4>"+data+"</h4>");
}

function sendMessage(ws,msg) {
    waitForSocketConnection(ws, function() {
        ws.send(msg);
    });
};


function waitForSocketConnection(socket, callback){
        setTimeout(
            function(){
                if (socket.readyState === 1) {
                    if(callback !== undefined){
                        callback();
                    }
                    return;
                } else {
                    waitForSocketConnection(socket,callback);
                }
            }, 5);
 };


function socket(){
  var ws = new WebSocket('ws://' + window.location.host + window.location.pathname);
  ws.onopen = function () {flash_message("Websocket Open"); }
  ws.onclose = function () {flash_message("Websocket Closed"); }
  ws.onmessage = function (m) { temp_data(m.data); }

  sendMessage(ws,"start");
}

$(document).ready ( function() {
  basic_chart();
  advanced_chart();
  basic_data();
  advanced_data(); 
  socket();
 
});




/*window.onload = function(){
      (function(){
        var show = function(el){
          return function(msg){ el.innerHTML = msg; }
        }(document.getElementById('msgs'));

        var ws       = new WebSocket('ws://' + window.location.host + window.location.pathname);
        ws.onopen    = function()  { show('websocket opened'); };
        ws.onclose   = function()  { show('websocket closed'); }
        ws.onmessage = function(m) { show('websocket message: ' +  m.data); };

        var sender = function(f){
          var input     = document.getElementById('input');
          input.onclick = function(){ input.value = "" };
          f.onsubmit    = function(){
            ws.send(input.value);
            input.value = "send a message";
            return false;
          }
        }(document.getElementById('form'));
      })();
    }
    */