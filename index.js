// write your code here
const stateInput = document.getElementById('state-input');
const fetchButton = document.getElementById('fetch-alerts'); 
const resultsContainer = document.getElementById('alerts-display'); 
const errorMessage = document.getElementById('error-message');


async function fetchWeatherAlerts(state) {
    const url = `https://api.weather.gov/alerts/active?area=${state.toUpperCase()}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Invalid state code or API error`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}


function displayAlerts(data, state) {
    const features = data.features;
    const count = features.length;

    
    const summary = document.createElement('p');
    summary.textContent = `Weather Alerts: ${count}`; 
    resultsContainer.appendChild(summary);

    
    const list = document.createElement('ul');
    features.forEach(alert => {
        const listItem = document.createElement('li');
        listItem.textContent = alert.properties.headline;
        list.appendChild(listItem);
    });
    
    resultsContainer.appendChild(list);
}


async function handleWeatherSearch() {
    const state = stateInput.value.trim();

    
    resultsContainer.innerHTML = '';
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');

    if (!state) {
        showError("Please enter a state abbreviation.");
        return;
    }

    try {
        const data = await fetchWeatherAlerts(state);
        displayAlerts(data, state);
        stateInput.value = ''; 
    } catch (error) {
        showError(error.message);
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}


if (fetchButton) {
    fetchButton.addEventListener('click', handleWeatherSearch);
}