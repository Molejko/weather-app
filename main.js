//POBIERANIE ELEMENTÓW
const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-box i');
const temp = document.querySelector('.temp');
const tempDesc = document.querySelector('.temp-desc');



//API
const apiKey = '&appid=e4d26af4cd3ee06464daffe7cb6e94e6';
const api = 'https://api.openweathermap.org/data/2.5/weather?q='
const units = '&units=metric'
let cityName = 'Rzeszów';

const apiUrl = api + cityName + apiKey + units;

fetch(apiUrl)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))