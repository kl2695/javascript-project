import * as d3 from 'd3';
import BetterLife from './data/better_life'; 
import Health from './data/health_spending';
import Education from './data/education'; 
import Population from './data/population';
import GDP from './data/GDP';
import Set from 'set';



let string4 = Population.join(",");
const array4 = d3.csvParse(string4).columns;

let countriesPop = {};

for (let i = 0; i < array4.length; i = i + 7) {
    countriesPop[array4[i]] = array4[i+6];
}

let string5 = GDP.join(",");
const array5 = d3.csvParse(string5).columns;

let countriesGDP = {};

for (let i = 0; i < array5.length; i = i + 7) {
    if (countriesPop[array5[i]]) {
        countriesGDP[array5[i]] = array5[i+6];
    }
}

let string = BetterLife.join(","); 
const array = d3.csvParse(string).columns; 

let betterLife=[]; 
let countriesBetter = [];
for(let i=0; i<array.length; i=i+7){
    if (countriesPop[array[i]]) {
        countriesBetter.push(array[i]);
        betterLife.push(array[i+6]);
    }
}

countriesBetter = countriesBetter.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();


let string2 = Health.join(","); 
const array2 = d3.csvParse(string2).columns; 

let health = []; 
let countriesHealth = []; 

for(let i=0; i < array2.length; i = i+ 7){
    if (countriesPop[array2[i]]) {
        countriesHealth.push(array2[i]);
        health.push(array2[i+6]);
    }
}

countriesHealth = countriesHealth.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();


let string3 = Education.join(","); 
const array3 = d3.csvParse(string3).columns; 

let education = []; 
let countriesEd = []; 

for(let i=0; i<array3.length; i=i+7){
    if (countriesPop[array3[i]]){
        countriesEd.push(array3[i]);
        education.push(array3[i+6]); 
    }
}

countriesEd = countriesEd.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();




const svg = d3.select("body")
    .append("svg")
    .attr("width", 2500)
    .attr("height", 1500);




const edCircles = svg.selectAll("circle")
    .data(education)
    .enter()
    .append("circle");

edCircles.attr("cx", function (d, i, nodes) {
    return 100 + countriesGDP[countriesEd[i]] * 0.0004;
})
    .attr("cy", function(d,i, nodes){
        return 100 + countriesPop[countriesEd[i]] * 10.0;
    })
    .attr("r", function (d) {
        return Math.pow(d,2); 
    })
    .attr("fill", function (d) {
        let rand = Math.round(d*30).toString();
        return "rgb(100, 0, " + rand + ")";

    });

    const edText = svg.selectAll("text")
        .data(countriesEd)
        .enter()
        .append("text");

    edText.text(function (d) {
        return d;
    })
    .attr("x", function (d) {
        return 100 + countriesGDP[d] *0.0004;
    })
    .attr("y", function (d) {
        return 100 + countriesPop[d] *10.0;
    });


const xScale = 
    d3.scale.linear()
    .domain()
;
const yScale = d3.scale.linear();










