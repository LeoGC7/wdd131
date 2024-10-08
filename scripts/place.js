const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').textContent = currentYear;


const lastModified = new Date(document.lastModified);

const optionsDate = { 
    month: '2-digit', 
    day: '2-digit', 
    year: 'numeric'
};

const optionsTime = { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false
};

const formattedDate = lastModified.toLocaleDateString('en-US', optionsDate);
const formattedTime = lastModified.toLocaleTimeString('en-US', optionsTime);

const dateContainer = document.getElementById('lastmodified');

dateContainer.textContent = `Last modification: ${formattedDate} ${formattedTime}`;

// Windchill funciton
document.addEventListener('DOMContentLoaded', function () {
    const temperature = 20;
    const windSpeed = 14;
    const windChillElement = document.getElementById('windChill');

    function calculateWindChill(temperature, windSpeed) {
        return 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
    }

    function displayWindChill() {
        if (temperature <= 10 && windSpeed > 4.8) {
            const windChill = calculateWindChill(temperature, windSpeed);
            windChillElement.textContent = `${windChill.toFixed(2)} °C`;
        } else {
            windChillElement.textContent = 'N/A';
        }
    }

    displayWindChill();
});