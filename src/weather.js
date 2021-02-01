const API_KEY ='f4d9ac3f821e794b316a9ff963b5127f'; //API를 사용하기위해 openWeatherMap에서 제공하는 데이터를 받아오기 위해 key를 얻음
const COORDS = 'coords';
const weather = document.querySelector(".weather");

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`//https:// 추가해야 한다.
        ).then(function(response){
            return response.json();
        })
        .then(function(json){
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerHTML = `${temperature}º <br> ${place}`;
        })
        
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, // 객체에서 키값과 value값이 같을경우 하나만 적어주어도 된다.
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude);
}

function handleGeoError(){
    console.log('Error');
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        setInterval(getWeather(parseCoords.latitude, parseCoords.longitude),1000*60*30);
    }
}


function init(){
    loadCoords();
}

init();