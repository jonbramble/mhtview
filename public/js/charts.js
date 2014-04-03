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


$(document).ready ( function() {

  var exp = $(location).attr('pathname').match(/\/experiment\/(.*)/)[1];
  var url = "/experiment/"+exp+"/data.json";
  
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

   });
});


  
  



    