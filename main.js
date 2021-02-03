//POBIERANIE ELEMENTÓW
const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-box i');
const temp = document.querySelector('.temp');
const weatherDesc = document.querySelector('.weather-desc');
const warning = document.querySelector('.warning');
const cityName = document.querySelector('.city-name');
const tempFeel = document.querySelector('.temp-feel')
const humidity = document.querySelector('.humidity')
const pressure = document.querySelector('.pressure');
const windSpeed = document.querySelector('.wind-speed');
const icon = document.querySelector('.icon');
const cityDate = document.querySelector('.city-date');



const setDate = () =>{
    const todayDate = new Date();
    const daysName = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const dayName = daysName[todayDate.getDay()];
    let day = todayDate.getDate();
    let month = todayDate.getMonth()+1;
    const year = todayDate.getFullYear();
    if(day < 10) day = '0' + day;
    if(month < 10) month = '0' + month;

    cityDate.textContent = `${dayName}, ${day}.${month}.${year}`;
}



//API
const apiKey = '&appid=e4d26af4cd3ee06464daffe7cb6e94e6';
const api = 'https://api.openweathermap.org/data/2.5/weather?q='
const units = '&units=metric';
const defaultCity = 'Husów'
let city;
let apiUrl;


const checkInput = () => {
    if(input.value == '') {
        warning.textContent = "Podaj nazwę miejsowości";
        input.value = '';
        cityName.textContent = '';
        temp.textContent = 'no date';
        tempFeel.textContent = 'no date';
        humidity.textContent = 'no date';
        pressure.textContent = 'no date';
        windSpeed.textContent = 'no date';
        weatherDesc.textContent = '';
        icon.innerHTML = '<i class="fas fa-question-circle"></i>';
    }
    else getWeather();
} 

const chooseIcon = id => 
{
    // console.log(id);
    if(id >= 200 && id < 300){
        icon.innerHTML = '<i class="fas fa-bolt"></i>';
        // icon.textContent = 'thunderstorm';
    } 
    else if (id >= 300 && id < 400){
        icon.innerHTML = '<i class="fas fa-cloud-rain"></i>';
        // icon.textContent = 'drizzle';
    }
    else if (id >= 500 && id < 600){
        icon.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i>';
        // icon.textContent = 'rain';
    } 
    else if (id >= 600 && id < 700) {
        icon.innerHTML = '<i class="fas fa-snowflake"></i>';
        // icon.textContent = 'ice';
    }
    else if (id >= 700 && id < 800 ) {
        icon.innerHTML = '<i class="fas fa-smog"></i>';
        // icon.textContent = 'fogg';
    }
    else if (id == 800) {
        icon.innerHTML = '<i class="fas fa-sun"></i>';
        // icon.textContent = 'sun';
    }
    else if (id > 800 && id < 810) {
        icon.innerHTML = '<i class="fas fa-cloud"></i>';
        // console.log('cloud');
    }
    else {
        icon.innerHTML = '<i class="fas fa-question-circle"></i>';
        // icon.textContent = 'unknown';
    }


}

const getWeather = () => {

    // warning.textContent = '';
    city = (!input.value) ? defaultCity : input.value;
    // console.log(city);
    apiUrl = api + city + apiKey + units;

    axios.get(apiUrl)
    .then(res => {
        input.value = '';
        warning.textContent = '';

        const main = res.data.main;

        cityName.textContent = res.data.name;
        temp.textContent = Math.round(main.temp) + '°C';
        tempFeel.textContent = Math.round(main.feels_like) + '°C';
        humidity.textContent = main.humidity + '%';
        pressure.textContent = main.pressure + ' hPa';
        windSpeed.textContent = res.data.wind.speed + ' m/s';
        const weatherData = Object.assign({}, ...res.data.weather);
        weatherDesc.textContent = weatherData.main;

        // console.log(weatherData.id);
        chooseIcon(weatherData.id);
      

    })
    .catch(res => {
        // console.log('lipa');
        warning.textContent = "Wpisz poprawną nazwę miejscowości";
        input.value = '';
        cityName.textContent = '';
        temp.textContent = 'no date';
        tempFeel.textContent = 'no date';
        humidity.textContent = 'no date';
        pressure.textContent = 'no date';
        windSpeed.textContent = 'no date';
        weatherDesc.textContent = '';
        icon.innerHTML = '<i class="fas fa-question-circle"></i>';

    })

}
    setDate();
    getWeather();
   searchBtn.addEventListener('click', checkInput);
   input.addEventListener('keydown', e => {
        // console.log(e);
        if(e.keyCode == '13') checkInput();
   })

   