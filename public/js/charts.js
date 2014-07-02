function plotchart(chartid,charttitle,plotdata){ 

    var chart = new CanvasJS.Chart(chartid,
    {

      title:{
      text: charttitle,
      },
       data: [
      {
        type: "line",

        dataPoints: plotdata
      }
      ]
    });

    chart.render();

}

var opts = {
  lines: 13, // The number of lines to draw
  length: 20, // The length of each line
  width: 10, // The line thickness
  radius: 30, // The radius of the inner circle
  corners: 1, // Corner roundness (0..1)
  rotate: 0, // The rotation offset
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#000', // #rgb or #rrggbb or array of colors
  speed: 1, // Rounds per second
  trail: 60, // Afterglow percentage
  shadow: false, // Whether to render a shadow
  hwaccel: false, // Whether to use hardware acceleration
  className: 'spinner', // The CSS class to assign to the spinner
  zIndex: 2e9, // The z-index (defaults to 2000000000)
  top: 'auto', // Top position relative to parent in px
  left: 'auto' // Left position relative to parent in px
};


function basic_chart(){
  var target = document.getElementById('chart-spinner');
  //socks();

  $( "#show-charts" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";

  $( "#chart-view").show();
  $( "#data-view").hide();

  var spinner = new Spinner(opts).spin(target);
  
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


function advanced_chart(){
  var target = document.getElementById('chart-spinner');
  //socks();

  $( "#advanced-show-charts" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/tunafish\/(.*)/)[1];
  var url = "/tunafish/"+exp+"/data.json";

  $( "#advanced-chart-view").show();
  $( "#advanced-data-view").hide();

  var spinner = new Spinner(opts).spin(target);
  
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

$(document).ready ( function() {
  basic_chart();
  advanced_chart();
});


  
  



    
