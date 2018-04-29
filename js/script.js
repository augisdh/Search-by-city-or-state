"use strict";

const cities = [];

fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json")
    .then(function(response){
        response.json()
        .then(data => cities.push(...data));
    });

function findMatch(word, cities){
    return cities.filter(item => {
        const regex = new RegExp(word, "gi");
        return item.city.match(regex) || item.state.match(regex);
    });
}

// Adds commas to numbers
function numberCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches(){
    if(this.value.length !== 0){
        const result = findMatch(this.value, cities).map(item => {
        const regex = new RegExp(this.value, "gi");
        const inputValueCity = item.city.replace(regex, `<span class="hlight">${this.value}</span>`);
        const inputValueState = item.state.replace(regex, `<span class="hlight">${this.value}</span>`);
        return `
            <li>
                <span class="name">${inputValueCity}, ${inputValueState}</span>
                <span class="pop">${numberCommas(item.population)}</span>
            </li>
        `;
    }).join('');

    suggestionsUl.innerHTML = result;
    } else {
        const result = `
            <li>Filter for a city</li>
            <li>or a state</li>
        `;

        suggestionsUl.innerHTML = result;
    }
}

const searchInput = document.querySelector(".search");
const suggestionsUl = document.querySelector(".suggestions");

searchInput.addEventListener("keyup", displayMatches);
