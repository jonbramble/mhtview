function advanced_chart(){
  var target = document.getElementById('chart-spinner');
  //socks();

  $( "#advanced-show-charts" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/tunafish\/(.*)/)[1];
  var url = "/tunafish/"+exp+"/data.json";

  $( "#advanced-chart-view").show();
  $( "#advanced-data-view").hide();

  var spinner = new Spinner(spinner_opts()).spin(target);
  
  var tpoints = new Array();
  var apoints = new Array();
  var dpoints = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.tdata, function(i, point) {
       var tarr = {x: new Date(point.time), y: parseFloat(point.temp)};
       var aarr = {x: new Date(point.time), y: parseFloat(point.ambient)};
       var darr = {x: new Date(point.time), y: parseFloat(point.temp-point.ambient)};
       tpoints.push(tarr);
       apoints.push(aarr);
       dpoints.push(darr);
     });

    plotchart("temperature-tchartContainer","Sample Temperature", tpoints);
    plotchart("ambient-tchartContainer","Ambient", apoints);
    plotchart("difference-tchartContainer","Temperature Difference", dpoints);
 
    spinner.stop();

   });


});

  }