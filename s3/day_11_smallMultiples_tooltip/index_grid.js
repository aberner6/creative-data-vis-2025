//SETTING UP THE CANVAS
var w = window.innerWidth;
var h = window.innerHeight;
var rad = 50;
var margin = rad*3;
var div = d3.select("body").append("div") 
    .attr("class", "tooltip")       
    .style("opacity", 0);
var svg = d3.select("body").append("svg")
      .attr("width",w)
      .attr("height",h)
      .style("background-color","black")
//LOADING THE DATA
var skyData = [];
d3.json("sky.json").then(function(data) {
     skyData = data;
     processData();
});
//SETTING UP SCALES FOR THE SHAPE
var radScale = d3.scaleLinear()
  .domain([0,100])
  .range([rad/4,rad])

var rectScale = d3.scaleLinear()
  .domain([0, 100])
  .range([1, 10])

var dayNames = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'];
function processData(){
  draw();
}



function draw(){
//PREPARE 1 GROUP ELEMENT FOR EVERY OBJECT IN THE DATASET
  //PLACE EACH G ALONG THE X AXIS ACCORDING TO THE DAY OF WEEK
  //PLACE EACH G ALONG THE Y AXIS ACCORDING TO THE INDEX - HOW FAR WE ARE IN THE DATASET
  var numPerRow = 5;
  var numberRows = Math.floor(skyData.length/numPerRow);
  console.log(numberRows)
  var size = rad;
  var xScale = d3.scaleLinear()
    .domain([0, numPerRow -1])
    .range([margin*2,w-margin])
  var yScale = d3.scaleLinear()
    .domain([0, numberRows])
    .range([margin*2,h-margin])

  var g = svg.selectAll('anything')
    .data(skyData)
    .join('g')
    .attr('transform',function(d,i){
      var x = i % numPerRow //this is the way to make sure that "X" never exceeds the number of items we want per row
      var y = Math.floor(i / numPerRow) //this is the way to go to a new row every time we reach the end of the number of items we want per row
      console.log(y)
      return 'translate('+xScale(x)+','+yScale(y)+')'
    })
//ADD A CIRCLE ON TOP OF THE G WHERE THE RADIUS IS ACCORDING TO THE OBSERVATION OF THE CLOUDS
 //circle is bigger if more clouds, smaller if fwere clouds
  firstCirc = g.append('circle')
    .attr('cx',0)
    .attr('cy',0)
    .attr('r', function(d){ 
      return radScale(d.sky) 
    })
    .attr('fill','white')
//just for show
  secondCirc = g.append('circle')
    // .attr('class', 'second')
    .attr('cx',0)
    .attr('cy',0)
    .attr('r', 10)
    .attr('fill','pink')
//draw a rectangle that changes according to how hot that day is
  secondShape = g.append('rect')
    .attr('x',0)
    .attr('y',0)
    .attr('width', function(d){
      return radScale(d.temp)
    })
    .attr('height', function(d){
      return radScale(d.temp)
    })
    .attr('fill','blue')
  }