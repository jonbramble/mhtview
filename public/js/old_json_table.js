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

function basic_data(){
 var target = document.getElementById('chart-spinner');

$( "#show-data" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";

  $( "#data-view").show();
  $( "#chart-view").hide();

  var spinner = new Spinner(spinner_opts()).spin(target);
  
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