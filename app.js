import * as d3 from 'd3';
import BetterLife from './data/better_life'; 
import Health from './data/health_spending';
import Education from './data/education'; 
import Population from './data/population';
import GDP from './data/GDP';
import Set from 'set';

const Display = function(input){
    let selected; 
    switch(input){
        case "quality of life": 
            selected = "q";
            break; 
        case "health": 
            selected = "h";
            break;
        case "education": 
            selected = "e"; 
            break;

    }




const svg = d3.select("body")
    .append("svg")
    .attr("width", 1400)
    .attr("height", 700);

let w = 1400; 
let h = 700; 
let xPadding = 60; 
let yPadding = 30;

// setting up xScale, yScale, and rScale 
// horizontal scale 
let xScale = d3.scaleLinear()
    .domain([d3.min(dataset[3], function(d) {
        return d;
    }),
        d3.max(dataset[3], function (d) {
        return d;
    })])
    .range([xPadding, w - xPadding]);

// vertical scale 
const yScale = d3.scaleLinear()
    .domain([d3.min(dataset[0], function(d) {
        return d; 
    }),
        d3.max(dataset[0], function (d) {
        return d;
    })])
    .range([h - yPadding, yPadding]);

// radius scale 

let rScale = d3.scaleLinear()
    .domain([d3.min(countriesGDPArr, function (d) {
        return d;
    }),
    d3.max(countriesGDPArr, function (d) {
        return d;
    })])
    .range([10, 40]);

// setup axes 
// horizontal axis is education 
// let xAxis = d3.axis
//     .scale(xScale)
//     .orient('bottom');

// vertical axis is population 


//dataset = [population, betterLife, health, education]
// append circles to svg 

const edCircles = svg.selectAll("circle")
    .data(education)
    .enter()
    .append("circle");

edCircles.attr("cx", function (d, i, nodes) {
    return xScale(d);
})
    .attr("cy", function(d,i, nodes){
        return yScale(countriesPop[countriesEd[i]]); 
    })
    .attr("r", function (d, i) {
        return rScale(countriesGDPArr[i]);
    })
    .attr("fill", function (d) {
        let rand = Math.round(d*30).toString();
        return "rgb(100, 0, " + rand + ")";

    });

// append text to svg 

    const edText = svg.selectAll("text")
        .data(countriesEd)
        .enter()
        .append("text");

    edText.text(function (d) {
        return d;
    })
    .attr("x", function (d, i) {
        return xScale(education[i]);
    })
    .attr("y", function (d, i) {
        return yScale(countriesPop[countriesEd[i]]); 
    });

// append x-axis to svg 
    svg.append("g")
        .attr("class", "axis")
        .call(d3.axisBottom(xScale))
        .attr("transform", "translate(0," + (h - yPadding) + ")");

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (w / 2) + "," + (h) + ")")  // text is drawn off the screen top left, move down and out and rotate
        .text("Education Spending(%GDP)");

// append y-axis to svg
    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xPadding + ",0)")
        .call(d3.axisLeft(yScale));

    svg.append("text")
        .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
        .attr("transform", "translate(" + (yPadding / 2) + "," + (h / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Population(millions)");
        



};


export default Display; 