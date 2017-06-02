// stolen from
// https://bl.ocks.org/cagrimmett/07f8c8daea00946b9e704e3efcbd5739

import * as d3 from "d3"

function gridDataMaker() {
  var data = new Array();
  var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
  var ypos = 1;
  var width = 50;
  var height = 50;
  var click = 'unselected';
  var n = 6;
  // iterate for rows 
  for (var row = 0; row < n; row++) {
    data.push( new Array() );
    
    // iterate for cells/columns inside rows
    for (var column = 0; column < n; column++) {
      data[row].push({
        x: xpos,
        y: ypos,
        width: width,
        height: height,
        click: click,
        tile: 0,
        selected: 0
      })
      // increment the x position. I.e. move it over by 50 (width variable)
      xpos += width;
    }
    // reset the x position after a row is complete
    xpos = 1;
    // increment the y position for the next row. Move it down 50 (height variable)
    ypos += height; 
  }
  data[3][3].tile = 1;
  return data;
}

export class Board {
  constructor(channel, room){
    var that = this;
    this.data = gridDataMaker(); 
    console.log(that.data)
    this.grid = d3.select("#grid")
      .append("svg")
      .attr("width","510px")
      .attr("height","510px");
      
    this.row = this.grid.selectAll(".row")
      .data(this.data)
      .enter().append("g")
      .attr("class", "row");
      
    this.column = this.row.selectAll(".square")
      .data(function(d) { return d; })
      .enter().append("rect")
      .attr("class","square")
      .attr("x", function(d) { return d.x; })
      .attr("y", function(d) { return d.y; })
      .attr("width", function(d) { return d.width; })
      .attr("height", function(d) { return d.height; })
      .style("fill", (d) => d.tile == 1 ? "steelblue" : "#fff" )
      .style("stroke", "#222")
      .on('click', function(d) {
        var check = _.max(_.flatMap(that.data, (d) => d).map((d) => d.click == 'selected'))
        var check2 = _.max(_.flatMap(that.data, (d) => d).map((d) => d.click == 'moved'))
        if (d.click == 'moved') {
          d.click = 'confirmed'
          that.data.map((arr) => arr.map((d2) => d2 == d ? '' : d2.click = 'unselected'))
        } else if (check & !check2){
          d.click = 'moved'
        } else if (d.click == 'selected') {
          that.data.map((arr) => arr.map((d2) => d2.click = 'unselected'))
        } else {
          d.click = 'selected'
          that.data.map((arr) => arr.map((d2) => d2 == d ? '' : d2.click = 'unselected'))
        }
         // d.click ++;
         // if (d.tile == 1){ d3.select(this).style("fill", "blue")}
         // if ((d.click)%2 == 0 ) { d3.select(this).style("fill","#fff"); }
         // if ((d.click)%2 == 1 ) { d3.select(this).style("fill","#2C93E8"); }
         channel.push(`new_msg:${room}`, { body: that.data })
       });
  }

  update(data){
    this.data = data
    this.grid.selectAll(".row").data(data)
    this.row.selectAll(".square")
        .data(function(d) { return d; })
        .style("fill", (d) => {
           if (d.click == 'selected') {
             return 'yellow'
           } else if (d.click == 'moved') {
             return 'red'
           } else if (d.click == 'confirmed') {
             return 'green'
           } else {
             return 'white'
           }
         })
  }
}

