// Function to fetch and display country data
async function fetchCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const countries = await response.json();
        displayCountries(countries);
    } catch (error) {
        console.error('Error fetching countries:', error);
    }
}

// Function to create Bootstrap card elements
function createCard(country) {
    const card = document.createElement('div');
    card.className = 'col-lg-4 col-sm-12 mb-4';

    card.innerHTML = `
        <div class="card">
            <div class="card-header">${country.name.common}</div>
            <div class="card-body">
                <img src="${country.flags.svg}" class="card-img-top" alt="${country.name.common} Flag">
                <p class="card-text">Capital: ${country.capital}</p>
                <p class="card-text">Region: ${country.region}</p>
                <p class="card-text">Latlng: ${country.latlng.join(', ')}</p>
                <p class="card-text">Country Code: ${country.cca2}</p>
                <button class="btn btn-primary" onclick="fetchWeather('${country.latlng[0]}', '${country.latlng[1]}')">Click for Weather</button>
            </div>
        </div>
    `;

    return card;
}

// Function to display countries in the container
function displayCountries(countries) {
    const container = document.getElementById('countries-container');
    container.innerHTML = '';
    countries.forEach(country => {
        const card = createCard(country);
        container.appendChild(card);
    });
}

// Function to fetch weather data
async function fetchWeather(lat, lon) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const weather = await response.json();
        alert(`Weather in ${weather.name}: ${weather.weather[0].description}, Temperature: ${weather.main.temp}K`);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// Initialize
fetchCountries();

