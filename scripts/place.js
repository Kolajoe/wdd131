document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const temperature = 26;
const windSpeed = 5;

document.getElementById('temperature').textContent = temperature;
document.getElementById('wind-speed').textContent = windSpeed;

function calculateWindChill(temp, wind) {
    return (13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16)).toFixed(1);
}

function displayWindChill() {
    const temp = temperature;
    const wind = windSpeed;
    const windChillElement = document.getElementById('wind-chill');

    console.log(`Temperature: ${temp}°C, Wind Speed: ${wind} km/h`);

    if (temp <= 10 && wind > 4.8) {
        const windChill = calculateWindChill(temp, wind);
        windChillElement.textContent = `${windChill} °C`;
        console.log(`Wind Chill calculated: ${windChill} °C`);
    } else {
        windChillElement.textContent = 'N/A';
        console.log('Wind Chill: N/A (conditions not met)');
    }
}

displayWindChill();