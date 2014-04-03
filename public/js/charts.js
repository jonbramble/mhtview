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


$(document).ready ( function() {

 var target = document.getElementById('chart-spinner');
 


$( "#show-charts" ).bind( "click", function() {
  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";

  var spinner = new Spinner(opts).spin(target);
  
  var phpoints = new Array();
  var ehpoints = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.phdata, function(i, point) {
       var pharr = {x: new Date(point.time), y: parseFloat(point.ph)};
       phpoints.push(pharr);
     });
     $.each ( jsondata.ehdata, function(i, point) {
       var eharr = {x: new Date(point.time), y: parseFloat(point.mv)};
       ehpoints.push(eharr);
     });
    plotchart("phchartContainer","pH trace", phpoints);
    plotchart("ehchartContainer","eH trace", ehpoints);

    spinner.stop();

   });


});




 
});


  
  



    