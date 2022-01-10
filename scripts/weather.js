const search = document.getElementById('search');
const match_list = document.getElementById('match-list');
const city_name = document.getElementById('city-name');
const weather_stats = document.getElementById('weather-stats');

const APIkey = '237acc5a5da622a10304477e0a781034';
const days = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek', 'Sobota', 'Neděle'];

var graph_labels = [];
var graph_data = [];
var graph_data_night = [];

//default city
var active_city = {
    name: 'Olomouc',
    lat: 49.59552, 
    lon: 17.251751,
};

//fetching weather
const fetchWeather = async (lat, lon) => {
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part,hourly,minutely}&lang=cz&appid=${APIkey}`;
    const res = await fetch(URL);
    const data = await res.json();
    outputWeatherHtml(data);
};

//building fetch output
const outputWeatherHtml = data => {
    const html = data.daily.map((day, id) =>{
        if(id <= 4){
            let dt = new Date(day.dt * 1000);
            graph_labels[id] = (days[dt.getDay()]);
            graph_data[id] = (Math.floor(day.temp.day));
            graph_data_night[id] = (Math.floor(day.temp.night));
            return `
            <div class="day-card-container">
                <h2 class="day-name">${days[dt.getDay()]} <small>${dt.toLocaleDateString()}</small></h4>
                <img class="weather-icon" src=" http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png"  alt="${day.weather[0].description}">
                <p class="desc">${capitalizeFirstLetter(day.weather[0].description)}</p>
                <p class="max-temp">Denní teplota: ${Math.floor(day.temp.day)} °C</p>
                <p class="min-temp">Noční teplota: ${Math.floor(day.temp.night)} °C</p>
                <p class="feels-like-temp">Pocitová teplota: ${Math.floor(day.feels_like.day)} °C</p>
                <p class="precitipation">Vlhkost: ${Math.floor(day.humidity)} %</p>
                <p class="wind-speed">Rychlost větru: ${Math.floor(day.wind_speed)} km/h</p>
            </div>
       `
        }
    }).join('');
    tempChart.update();
    weather_stats.innerHTML= html;
}

//comparing search values and city names
const searchCities = async searchText => {
    const res = await fetch('./data/city.list.json');
    const cities = await res.json();

    let matches = cities.filter(city => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return city.name.match(regex);
    });

    if(searchText.length === 0){
        matches = [];
        match_list.innerHTML = '';
    }
    outputHtml(matches.slice(0, 8));
};

//building autocomplate selection
const outputHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => `
            <div class='select-item' onclick="setCity('${match.name}', '${match.coord.lat}', '${match.coord.lon}')">
                <h4>${match.name}</h4>
                <small>Lat: ${match.coord.lat} / Long: ${match.coord.lon}</small>
            </div>
        `).join('');
        match_list.innerHTML = html;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
function setCity(name, lat, lon) {
    active_city.name = name;
    active_city.lat = lat;
    active_city.lon = lon;
    city_name.innerText = active_city.name;
    fetchWeather(active_city.lat, active_city.lon);
}


search.addEventListener('input', () => searchCities(search.value));