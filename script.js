const API_KEY = window.API_KEY;

async function getWeather() {
    const locationInput = document.getElementById('locationInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const errorMessage = document.getElementById('errorMessage');
    
    // Reset displays
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    
    try {
        // Get coordinates from location name
        const city = locationInput.value.trim();
        if (!city) {
            throw new Error('Please enter a location');
        }
        
        const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();
        
        if (!geoData.length) {
            throw new Error('Location not found');
        }
        
        const { lat, lon } = geoData[0];
        
        // Get weather data using coordinates
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();
        
        // Update UI with weather information
        document.getElementById('locationName').textContent = weatherData.name;
        document.getElementById('temperature').textContent = `${Math.round(weatherData.main.temp)}°C`;
        document.getElementById('description').textContent = weatherData.weather[0].description;
        
        // Show weather information
        weatherInfo.style.display = 'block';
        
    } catch (error) {
        // Display error message
        errorMessage.textContent = error.message || 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
    }
}

// Add event listener for Enter key
document.getElementById('locationInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});