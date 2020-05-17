const weather = document.querySelector(".js-weather");

const API_KEY = "09bb4e7fe228113b103538307935c6e8";
const COORDS = "coords";

function getWeather(lat, lon) {
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;

        weather.innerText = `${temperature} @ ${place}`;
    })
    ;
}

function saveCoords(coords) {
    localStorage.setItem(COORDS, JSON.stringify(coords));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = {
        latitude,
        longitude
    };

    saveCoords(coords);

    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Cant access geo location!");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);

        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();