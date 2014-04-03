function plotchart(plotdata){ 

    var mydata = plotdata;

    var chart = new CanvasJS.Chart("chartContainer",
    {

      title:{
      text: "pH Trace"
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
  
  var points = new Array();
 
  $.getJSON( url )
   .done(function( jsondata) {
     $.each ( jsondata.phdata, function(i, point) {
       var arr = {x: new Date(point.time), y: parseFloat(point.ph)};
        points.push(arr);
     });
    console.log(points.length);
    plotchart(points);

   });

  

  // data = [
  //       { x: new Date(2012, 00, 1), y: 480 },
  //       { x: new Date(2012, 01, 1), y: 414 },
  //       { x: new Date(2012, 02, 1), y: 520 },
  //       { x: new Date(2012, 03, 1), y: 460 },
  //       { x: new Date(2012, 04, 1), y: 450 },
  //       { x: new Date(2012, 05, 1), y: 500 },
  //       { x: new Date(2012, 06, 1), y: 480 },
  //       { x: new Date(2012, 07, 1), y: 480 },
  //       { x: new Date(2012, 08, 1), y: 410 },
  //       { x: new Date(2012, 09, 1), y: 500 },
  //       { x: new Date(2012, 10, 1), y: 480 },
  //       { x: new Date(2012, 11, 1), y: 510 }
  //       ];

   

});


  
  



    