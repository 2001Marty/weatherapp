const successCallback = async(position) => {
  getCityName(position);
  setCity(await getCityName(position), position.coords.latitude, position.coords.longitude);
};

const errorCallback = (error) => {
  console.log(error)
};

var options = {
  nableHighAccuracy: true,
  timeout: 5000,
};

const getCityName = async (position) =>{
  const res = await fetch('./data/city.list.json');
  const cities = await res.json();
  const city_name = cities.filter(city => 
    city.coord.lat.toFixed(1) == position.coords.latitude.toFixed(1) &&
    city.coord.lon.toFixed(1) == position.coords.longitude.toFixed(1)
    );
  if(city_name.length != 0){
    const indexArr = city_name.map((c) => {
      return Math.abs(c.coord.lat - position.coords.latitude);
    });
    const min = Math.min(...indexArr)
    const closest = city_name[indexArr.indexOf(min)]
    return closest.name
  }else return 'tvá lokace';
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);

