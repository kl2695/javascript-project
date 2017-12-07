import * as d3 from 'd3';
import BetterLife from './data/better_life';
import Health from './data/health_spending';
import Education from './data/education';
import Population from './data/population';
import GDP from './data/GDP';

// Population data 
let dataset = [];

let string4 = Population.join(",");
const array4 = d3.csvParse(string4).columns;

export const countriesPop = {};
export const countriesPopArr = [];

for (let i = 0; i < array4.length; i = i + 7) {
    countriesPop[array4[i]] = array4[i + 6];
    countriesPopArr.push(parseInt(array4[i + 6]));
}

countriesPopArr.sort(function (a, b) { return (a - b); });
dataset.push(countriesPopArr);


// GDP data

let string5 = GDP.join(",");
const array5 = d3.csvParse(string5).columns;

export const countriesGDP = {};
export const countriesGDPArr = [];

for (let i = 0; i < array5.length; i = i + 7) {
    if (countriesPop[array5[i]]) {
        countriesGDP[array5[i]] = array5[i + 6];
        countriesGDPArr.push(parseInt(array5[i + 6]));
    }
}

// Better Life data 

let string = BetterLife.join(",");
const array = d3.csvParse(string).columns;

export const betterLife = [];
export const countriesBetter = [];
let countries = {};
for (let i = 0; i < array.length; i = i + 7) {
    if (countriesPop[array[i]] && countries[array[i]] === undefined) {
        countriesBetter.push(array[i]);
        countries[array[i]] = 1;
        betterLife.push(array[i + 6]);
    }
}

countriesBetter = countriesBetter.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();

dataset.push(betterLife);



// Health data


let string2 = Health.join(",");
const array2 = d3.csvParse(string2).columns;

export const health = [];
export const countriesHealth = [];
countries = {};

for (let i = 0; i < array2.length; i = i + 7) {
    if (countriesPop[array2[i]] && countries[array2[i]] === undefined) {
        countriesHealth.push(array2[i]);
        countries[array2[i]] = 1;
        health.push(array2[i + 6]);
    }
}

countriesHealth = countriesHealth.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();


dataset.push(health);
let string3 = Education.join(",");
const array3 = d3.csvParse(string3).columns;


// Education data 

export const education = [];
export const countriesEd = [];
countries = {};

for (let i = 0; i < array3.length; i = i + 7) {
    if (countriesPop[array3[i]] && countries[array3[i]] === undefined) {
        countriesEd.push(array3[i]);
        countries[array3[i]] = 1;
        education.push(array3[i + 6]);
    }
}

countriesEd = countriesEd.reverse().filter(function (e, i, arr) {
    return arr.indexOf(e, i + 1) === -1;
}).reverse();

dataset.push(education);