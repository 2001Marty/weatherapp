const search = document.getElementById('search');
const match_list = document.getElementById('match-list');
const city_name = document.getElementById('city-name');
var active_city = 'Prague';



const searchCities = async searchText => {
    const res = await fetch('city.list.json');
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
            <div class='select-item' onclick='setCity("${match.name}")'>
                <h4>${match.name}</h4>
                <small>Lat: ${match.coord.lat} / Long: ${match.coord.lon}</small>
            </div>
        `).join('');
        
        match_list.innerHTML = html;
       
    }
}

function setCity(new_city) {
    active_city = new_city;
    console.log(active_city);
    city_name.innerText = active_city;
}

search.addEventListener('input', () => searchCities(search.value));