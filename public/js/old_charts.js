function basic_chart(){
  var target = document.getElementById('chart-spinner');
  //socks();

  $( "#show-charts" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";

  $( "#chart-view").show();
  $( "#data-view").hide();

  var spinner = new Spinner(spinner_opts()).spin(target);
  var tpoints = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.tdata, function(i, point) {
       var tarr = {x: new Date(point.time), y: parseFloat(point.temp)};
       tpoints.push(tarr);
     });

    plotchart("tchartContainer","Temperature", tpoints);
 
    spinner.stop();

   });


});

}