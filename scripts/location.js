const successCallback = (position) => {
   setCity('Tvá lokace', position.coords.latitude, position.coords.longitude);
   console.log(position);
   

};

const errorCallback = (error) => {
    console.log(error)
};



navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

