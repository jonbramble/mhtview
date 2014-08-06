function flash_message(msg){
  $("#msgs").hide();
  $("#msgs").html("<h3>"+msg+"</h3>");
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

function show_data(value){
      display.setValue(value);
}


function setup_display(){

      display = new SegmentDisplay("display");

      display.pattern         = "##.#";
      display.cornerType      = 2;
      display.displayType     = 14;
      display.displayAngle    = 9;
      display.digitHeight     = 20;
      display.digitWidth      = 12;
      display.digitDistance   = 2;
      display.segmentWidth    = 3;
      display.segmentDistance = 0.5;
      display.colorOn         = "rgba(0, 0, 0, 0.9)";
      display.colorOff        = "rgba(0, 0, 0, 0.05)";

}

function show_clock(){

	
      var animate = function() {
        var time    = new Date();
        var hours   = time.getHours();
        var minutes = time.getMinutes();
        var seconds = time.getSeconds();
        var value   = ((hours < 10) ? ' ' : '') + hours
            + ':' + ((minutes < 10) ? '0' : '') + minutes
            + ':' + ((seconds < 10) ? '0' : '') + seconds;
        display.setValue(value);
        window.setTimeout(function(){animate()}, 1000);
      }

      var display = new SegmentDisplay("display");
      display.pattern         = "##:##:##";
      display.cornerType      = 2;
      display.displayType     = 7;
      display.displayAngle    = 9;
      display.digitHeight     = 20;
      display.digitWidth      = 12;
      display.digitDistance   = 2;
      display.segmentWidth    = 3;
      display.segmentDistance = 0.5;
      display.colorOn         = "rgba(0, 0, 0, 0.9)";
      display.colorOff        = "rgba(0, 0, 0, 0.1)";

      animate();
}


function socket(){
  var ws = new WebSocket('wss://' + window.location.host + window.location.pathname);
  ws.onopen = function () {flash_message("Websocket Open"); }
  ws.onclose = function () {flash_message("Websocket Closed"); }
  //ws.onmessage = function (m) { temp_data(m.data); }
  ws.onmessage = function (m) { show_data(m.data); }

  sendMessage(ws,"start");
}

$(document).ready ( function() {
  basic_chart();
  advanced_chart();
  basic_data();
  advanced_data(); 
  socket();
  //show_clock();
  setup_display();
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
