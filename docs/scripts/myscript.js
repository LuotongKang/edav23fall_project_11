// add your JavaScript/D3 to this file


// set the dimensions and margins of the graph
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 510 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("div#plot")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom +30)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Initialize the X axis
const x = d3.scaleBand()
  .range([ 0, width ])
  .padding(0.2);
const xAxis = svg.append("g")
  .attr("transform", `translate(0,${height})`);

// Initialize the Y axis
const y = d3.scaleLinear()
  .range([ height, 0]);
const yAxis = svg.append("g")
  .attr("class", "myYaxis");

svg.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width/2+margin.left+50)
  .attr("y", height + margin.top)
  .style("font-size", "14px")
  .text("Number of Mental Issues the Child has");

svg.append("text")
  .attr("class", "y label")
  .attr("text-anchor", "end")
  .attr("x", -margin.top - 100)
  .attr("y", -margin.left + 10)
  .attr("dy", ".75em")
  .attr("transform", "rotate(-90)")
  .style("font-size", "14px")
  .text("Count");

svg.append("text")
  .attr("x", width / 2)
  .attr("y", -margin.top / 2)
  .attr("text-anchor", "middle")
  .style("font-size", "18px")
  .text("Number of Mental Health Issues By Grade");

svg.append("text")
  .attr("x", width / 2)
  .attr("y", height + margin.bottom -30)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .style("font-style", "italic")
  .selectAll("tspan")
  .data([
    "Instructions:",
    "Please use the buttons below to explore and compare the distribution",
    "of mental health issues among children with different grades."
  ])
  .enter().append("tspan")
  .text(d => d)
  .attr("x", width / 2)
  .attr("dy", 15)
  .style("fill", "gray");

//y.domain([0, 7000]);

// A function that create / update the plot for a given variable:
function update(selectedVar) {

  // Parse the Data
  d3.csv("https://raw.githubusercontent.com/LuotongKang/edav23fall_project_11/1785290b64ff1196f36b5ce1291faef6d572d574/data/d3.csv").then( function(data) {
    //console.log(data);
    // X axis
    x.domain(data.map(d => d.Num_Mental_Issues));
    xAxis.transition().duration(1000).call(d3.axisBottom(x));

    // Add Y axis
    y.domain([0, d3.max(data, d => +d[selectedVar]) ]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // variable u: map data to existing bars
    const rects = svg.selectAll("rect")
      .data(data)

    // update bars
    rects.join("rect")
      .transition()
      .duration(1000)
        .attr("x", d => x(d.Num_Mental_Issues))
        .attr("y", d => y(d[selectedVar]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d[selectedVar]))
        .attr("fill", "lightpink")
  })

}

// Initialize plot
update('Mostly A')
