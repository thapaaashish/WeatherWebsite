const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

//variable to store the city
let city = '';


//this function fetch data from openWeather api
function fetchWeather(city){
    const APIKey = '79212488285934f8ee6f49971d725819';

    //fetching data from API based on the inputed city and API key
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
    .then(response => response.json())
    .then(json => {
        if (json.cod === '404') {

            //this will show error message and hide the information
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.classList.add('fadeIn');
            document.getElementById("city-name").innerHTML = '';
            return;
        }
        
        error404.style.display = 'none';
        error404.classList.remove('fadeIn');
        
        //DOM elements to update with weather information
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        const city = document.getElementById("city-name");
        
//this chose the image based on the condition of weather
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'https://cdn.pixabay.com/photo/2016/11/18/23/41/sun-1837376_960_720.png'
                    break;

                case 'Rain':
                    image.src = 'https://cdn.pixabay.com/photo/2012/04/18/13/22/cloud-37011_960_720.png';
                    break;

                case 'Snow':
                    image.src = 'https://cdn.pixabay.com/photo/2013/07/12/18/17/sleet-153216_960_720.png';
                    break;

                case 'Clouds':
                    image.src = 'https://cdn.pixabay.com/photo/2017/01/10/23/10/cloud-1970486_960_720.png';
                    break;

                case 'Haze':
                    image.src = 'https://cdn.pixabay.com/photo/2013/04/01/09/21/fog-98505_960_720.png';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
            city.innerHTML = json.name;

            //this will show the weather information and apply animation
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


            //this will change the background image based on the city we search
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + city + "')";


        });
        
}
//this will set the value in the feild when we click search button
search.addEventListener('click', () => {
    const input = document.querySelector('.search-box input');
    const newCity = input.value;

    if (newCity !== '') {
        city = newCity;
        fetchWeather(city);
        input.value = '';
    }
});

//this will set the value in the feild when we click enter button
const input = document.querySelector('.search-box input');
input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        const newCity = input.value;
        if (newCity !== '') {
            city = newCity;
            fetchWeather(city);
            input.value = '';
        }
    }
});

//function call
fetchWeather("Edinburgh");