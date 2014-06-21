function jsoncsv(arrayData){
  var revData = arrayData.reverse();
  var html = "<div class='raw-data'>"; 
  var arrayLength = revData.length;
  for (var i = 0; i < arrayLength; i++) {
   html += "<table><tr>"
   html += "<td>"+i.toString()+"</td>";
   html += "<td>"+revData[i].x.getTime()+"</td>";
   html += "<td>"+revData[i].y.toString()+"</td>";
   html += "</tr>";
  }
  html += "</table></div>";
  return html;
}

$(document).ready ( function() {

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

    var html =  jsoncsv(tpoints);

    $( '#data-view' ).html(html);

    spinner.stop();

   });


});




 
});