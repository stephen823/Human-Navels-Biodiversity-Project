//Function to create data for bar chart
function plot_data(dataset){
  //Create dictionary for default plot
var ind_data=[];
for (i=0; i<dataset.sample_values.length; i++) {
  ind_data.push({"otu_ids":dataset.otu_ids[i],"sample_values":dataset.sample_values[i]});
}
console.log(ind_data);

//sort the dictionary
var ind_data_sort=ind_data.sort((a,b)=>b.sample_values-a.sample_values);
console.log(ind_data_sort);

//slice data
var ind_data_sliced=ind_data_sort.slice(0,10);
console.log(ind_data_sliced);

//Create two seperate list for plot
var ids=[];
var values=[];
ind_data_sliced.forEach((ind_data_sliced)=> {
  Object.entries(ind_data_sliced).forEach(([key, value]) => {
    if(key==="otu_ids"){ids.push(value);}
    else {values.push(value);}
  });
});

console.log(ids);
console.log(values);
var result=[ids,values];
return result

}


//Function for create data for bubble chart
function plot_data_bubble(dataset){
  //Create dictionary for default plot
var ind_data=[];
for (i=0; i<dataset.sample_values.length; i++) {
  ind_data.push({"otu_ids":dataset.otu_ids[i],"sample_values":dataset.sample_values[i]});
}
console.log(ind_data);

//sort the dictionary
var ind_data_sort=ind_data.sort((a,b)=>b.sample_values-a.sample_values);
console.log(ind_data_sort);


//Create two seperate list for plot
var ids=[];
var values=[];
ind_data_sort.forEach((ind_data_sort)=> {
  Object.entries(ind_data_sort).forEach(([key, value]) => {
    if(key==="otu_ids"){ids.push(value);}
    else {values.push(value);}
  });
});

console.log(ids);
console.log(values);
var result=[ids,values];
return result

}




//Define ploting function 
function ploting(xv,yv){
  for(var itr = 0; itr<xv.length;itr++){
  xv[itr] = "UTO " + xv[itr];
  }
  var xv_str = xv.map(function(e){return e.toString()});
  console.log(xv_str);
  var trace1={
    x:yv,
    y:xv,
    type:"bar",
    orientation: 'h'

  }

  var data=[trace1];

  var layout={
    title:"bar chart",
    xaxis:{title:"sample values"},
    yaxis:{title:"uto id"},
    barThickness: 6
  }

  Plotly.newPlot("bar",data,layout);
}

//Function for plot bubble
function plotbubble(xv,yv){
  var trace1 = {
    x: xv,
    y: yv,
    mode: 'markers',
    label: "#22",
    marker: {
      size: yv,
      color: xv,
    }
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'sample value vs uto id',
    showlegend: false,
    height: 500,
    width: 900,
    xaxis:{title:"uto id"},
    yaxis:{title:"sample values"}
  };
  
  Plotly.newPlot('bubble', data, layout);

}

//Plot gauge function
function plotguage(ind_value){
  var data = [
    {
      type: "indicator",
      mode: "gauge+number+delta",
      value: ind_value,
      title: { text: "Belly Button wash frequency", font: { size: 24 } },
      gauge: {
        axis: { range: [null, 9], tickwidth: 1, tickcolor: "red" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 1], color: "Lightyellow" },
          { range: [1, 2], color: "lightGoldenRodYellow" },
          { range: [2, 3], color: "LemonChiffon" },
          { range: [3, 4], color: "PaleGoldenRod" },
          { range: [4, 5], color: "Khaki" },
          { range: [5, 6], color: "YellowGreen" },
          { range: [6, 7], color: "DarkSeaGreen" },
          { range: [7, 8], color: "MediumSeaGreen" },
          { range: [8, 9], color: "SeaGreen" }
        ]
      }
    }
  ];
  
  var layout = {
    width: 400,
    height: 400,
    margin: { t: 25, r: 15, l: 15, b: 25 },
    paper_bgcolor: "lavender",
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('gauge', data, layout);
}


//Read data from the JSON file
d3.json("samples.json").then((importdata) => {var data=importdata;  
    console.log(importdata);
    var names=importdata.names;
    console.log(names[0]);
    var metadata=importdata.metadata;
    console.log(metadata[0]);
    var samples=importdata.samples;

    var dict=[];
    var id_list=[];
    for (i=0;i<samples.length; i++ ){
      dict.push(samples[i]);
      id_list.push(samples[i].id);
      var dropdownmanu=d3.select("#selDataset");
      var name_input=samples[i].id;
      console.log(name_input);
      var option_click=dropdownmanu.append("option");
      option_click.property("value",name_input);
      console.log(option_click.property("value"));
      option_click.text(name_input);
    };
    
    console.log(dict);
    console.log(id_list);


    function init(){
      //initial bar chart
      var dict1=dict[0];
      var result1=plot_data(dict1);
      console.log(result1);
      var ids_li=result1[0];
      var values_li=result1[1];
      console.log(ids_li);
      console.log(values_li.toString()[0]); 
      ploting(ids_li,values_li);

      //initial bubble chart
      var dict2=dict[0];
      var result2=plot_data_bubble(dict2);
      console.log(result2);
      var ids_li1=result2[0];
      var values_li1=result2[1];
      console.log(ids_li1);
      console.log(values_li1); 
      plotbubble(ids_li1,values_li1);
      
      //initial basic information
      var info=d3.select("#sample-metadata");

      var id=info.append("p");
      id.attr("id","id");
      id.text("id:"+metadata[0].id);

      var eth=info.append("p");
      eth.attr("id","ethnicity");
      eth.text("ethnicity:"+metadata[0].ethnicity);

      var gender=info.append("p");
      gender.attr("id","gender");
      gender.text("gender:"+metadata[0].gender);

      var age=info.append("p");
      age.attr("id","age");
      age.text("age:"+metadata[0].age);

      var location=info.append("p");
      location.attr("id","location");
      location.text("location:"+metadata[0].location);

      var bbtype=info.append("p");
      bbtype.attr("id","bbtype");
      bbtype.text("bbtype:"+metadata[0].bbtype);

      var wfreq=info.append("p");
      wfreq.attr("id","wfreq");
      wfreq.text("wfreq:"+metadata[0].wfreq); 

      plotguage(metadata[0].wfreq);
    }
    
    init();
    //On change to the DOM, call getData()
    d3.selectAll("#selDataset").on("change",optionChanged);
    //console.log(dict);
    
    console.log(dict);
    function optionChanged(myvalue){
      console.log(dict);
      console.log(myvalue);
      
      //Function for update bar chart
      function updatePlotly(newdataset){
        var newx=newdataset[0];
        for(var itr = 0; itr<newx.length;itr++){
          newx[itr] = "UTO " + newx[itr];
          }
        Plotly.restyle("bar","y",[newx]);
        console.log(newdataset[0]);
        var newy=newdataset[1];
        Plotly.restyle("bar","x",[newy]);
        console.log(newdataset[1]);
      }


      //Function for update info
      function updateinfo(information){

        var id=d3.selectAll("#id");
        id.text("id:"+information.id);

        var ethnicity=d3.selectAll("#ethnicity");
        ethnicity.text("ethnicity:"+information.ethnicity);

        var gender=d3.selectAll("#gender");
        gender.text("gender:"+information.gender);

        var age=d3.selectAll("#age");
        age.text("age:"+information.age);

        var location=d3.selectAll("#location");
        location.text("location:"+information.location);

        var bbtype=d3.selectAll("#bbtype");
        bbtype.text("bbtype:"+information.bbtype);

        var wfreq=d3.selectAll("#wfreq");
        wfreq.text("wfreq:"+information.wfreq);
      }


      //Function for guage chart update
      function updateguage(information){
        var wfreq_num=information.wfreq;
        Plotly.restyle("gauge","value",[wfreq_num]);
      }

      //Function for bubble chart update
      function updatebubble(newdataset){
        var newx=newdataset[0];
        for(var itr = 0; itr<newx.length;itr++){
          newx[itr] = "UTO " + newx[itr];
          }
        Plotly.restyle("bubble","x",[newx]);
        console.log(newdataset[0]);
        var newy=newdataset[1];
        Plotly.restyle("bubble","y",[newy]);
        console.log(newdataset[1]);
        Plotly.restyle("bubble","marker","size",[newy]);
        Plotly.restyle("bubble","marker","color",[newx]);
      }

      //Update to new id for filter
      var dropdownmanu=d3.select("#selDataset");
      var option=dropdownmanu.property("value");
      console.log(option);
      

      //Update metadata for information section and guage chart
      console.log(metadata);
      var newinfo=metadata.filter(function(dictt){
        return dictt.id===parseInt(option);
      });
      console.log(newinfo);
      updateinfo(newinfo[0]);
      updateguage(newinfo[0]);

      //Update new data for ploting bar chart
      var data=dict.filter(function(dictt){
        return dictt.id===option.toString();
      });
      console.log(data);
      var newdata=plot_data(data[0]);
      console.log(newdata);
      updatePlotly(newdata);

      //Update new data for ploting bubble chart
      var data=dict.filter(function(dictt){
        return dictt.id===option.toString();
      });
      console.log(data);
      var newdata=plot_data_bubble(data[0]);
      console.log(newdata);
      updatebubble(newdata);
    }

    
    
});

