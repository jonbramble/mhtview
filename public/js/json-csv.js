function basic_json_table(arrayData){
  var revData = arrayData.reverse();
  var html = "<div class='raw-data'>"; 
  html += "<table>";
  var arrayLength = revData.length;
  for (var i = 0; i < arrayLength; i++) {
   html += "<tr>";
   html += "<td>"+i.toString()+"</td>";
   html += "<td>"+revData[i].x.getTime()+"</td>";
   html += "<td>"+revData[i].y.toString()+"</td>";
   html += "</tr>";
  }
  html += "</table></div>";
  return html;
}

function adv_json_table(arrayData){
  var revData = arrayData.reverse();
  var html = "<div class='raw-data'>"; 
  html += "<table>";
  html += "<tr><th>ID</th><th>Time</th><th>Sample</th><th>Ambient</th></tr>";
  var arrayLength = revData.length;
  for (var i = 0; i < arrayLength; i++) {
   html += "<tr>"; 
   html += "<td>"+i.toString()+"</td>";
   html += "<td>"+revData[i].x.getTime()+"</td>";
   html += "<td>"+revData[i].y.toString()+"</td>";
   html += "<td>"+revData[i].z.toString()+"</td>";
   html += "</tr>";
  }
  html += "</table></div>";
  return html;
}

function show_basic_data(){
 var target = document.getElementById('chart-spinner');

$( "#show-data" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";

  $( "#data-view").show();
  $( "#chart-view").hide();

  var spinner = new Spinner(opts).spin(target);
  
  var tpoints = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.tdata, function(i, point) {
       var tarr = {x: new Date(point.time), y: parseFloat(point.temp)};
       tpoints.push(tarr);
     });

    var html =  basic_json_table(tpoints);

    $('#data-view').html(html);

    spinner.stop();

   });


});

}

function show_advanced_data(){
 var target = document.getElementById('chart-spinner');

$( "#advanced-show-data" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/tunafish\/(.*)/)[1];
  var url = "/tunafish/"+exp+"/data.json";

  $( "#advanced-data-view").show();
  $( "#advanced-chart-view").hide();

  var spinner = new Spinner(opts).spin(target);
  
  var tpoints = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.tdata, function(i, point) {
       var tarr = {x: new Date(point.time), y: parseFloat(point.temp), z: parseFloat(point.ambient)};
       tpoints.push(tarr);
     });

    var html =  adv_json_table(tpoints);

    $( '#advanced-data-view' ).html(html);

    spinner.stop();

   });


});

}

$(document).ready ( function() {
 show_basic_data();
 show_advanced_data(); 
});