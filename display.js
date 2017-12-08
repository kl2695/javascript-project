import * as d3 from 'd3';
import {
    countriesPop, countriesPopArr,
    countriesGDP, countriesGDPArr,
    betterLife, countriesBetter,
    health, countriesHealth, 
    education, countriesEd,
} from './src/javascript/data';


const Display = function (input) {
    d3.select("svg").remove();
    let dataset;
    let countries; 

    switch (input) {
        case "quality":
            dataset = betterLife; 
            countries = countriesBetter;
            break;
        case "health":
            dataset = health;
            countries = countriesHealth; 
            break;
        case "education":
            dataset = education;
            countries = countriesEd;
            break;

    }

    document.getElementById("quality").addEventListener("click", function () {
        return Display("quality");
    });
    document.getElementById("health").addEventListener("click", function () {
        return Display("health");
    });
    document.getElementById("education").addEventListener("click", function () {
        return Display("education");
    });

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
        .domain([
            d3.min(dataset, function (d) {
                return d;
            })*0.9,
            d3.max(dataset, function (d) {
                return d;
            })*1.1
        ])
        .range([xPadding, w - xPadding]);
    

    // vertical scale 
    const yScale = d3.scaleLinear()
        .domain([
            d3.min(countriesPopArr, function (d) {
                return d;
            })*0.7,
            d3.max(countriesPopArr, function (d) {
                return d;
            })*1.1
        ])
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

  


    //dataset = [population, betterLife, health, education]
    // append circles to svg 


    const Circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .transition()
        .duration(1000) // this is 1s
        .delay(100);

    Circles
        .attr("cx", function (d, i, nodes) {
            return xScale(d);
        })
        .attr("cy", function (d, i, nodes) {
            return yScale(countriesPop[countries[i]]);
        })
        .attr("r", function (d, i) {
            return rScale(countriesGDPArr[i]);
        })
        .attr("fill", function (d) {
            let rand = Math.round(d * 30).toString();
            return "rgb(100, 0, " + rand + ")";
        })
        .transition()
        .duration(1000) // this is 1s
        .delay(300);

    // append text to svg 

    const Text = svg.selectAll("text")
        .data(countries)
        .enter()
        .append("text")
        .transition()
        .duration(1000) // this is 1s
        .delay(100);

    Text.text(function (d) {
        return d;
    })
        .attr("x", function (d, i) {
            return xScale(dataset[i]);
        })
        .attr("y", function (d, i) {
            return yScale(countriesPop[countries[i]]);
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
        .attr("transform", "translate(" + (xPadding / 2) + "," + (h / 2) + ")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
        .text("Population(millions)");




};


export default Display; 
