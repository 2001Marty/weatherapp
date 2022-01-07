const search = document.getElementById('search');
const match_list = document.getElementById('match-list');
const city_name = document.getElementById('city-name');

const APIkey = '237acc5a5da622a10304477e0a781034';


var active_city = {
    name: 'Olomouc',
    lat: 49.59552, 
    lon: 17.251751,
};

const fetchWeather = async (lat, lon) => {
  //  const URL = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${active_city}&cnt=5&appid=${APIkey}`;
    const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude={part,hourly,minutely}&appid=${APIkey}`;
    const res = await fetch(URL);
    const data = await res.json();
    console.log(data);
};

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

function setCity(name, lat, lon) {
    active_city.name = name;
    active_city.lat = lat;
    active_city.lon = lon;
    city_name.innerText = active_city.name;
    fetchWeather(active_city.lat, active_city.lon);
}

document.onload = fetchWeather(active_city.lat, active_city.lon);

search.addEventListener('input', () => searchCities(search.value));