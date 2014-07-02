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


  
  



    
