const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "3b7032ba287795c104b18e30efab4811";

weatherForm.addEventListener("click",  async event =>{
    event.preventDefault();
    const city = cityInput.value;
    console.log(city);
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            console.log(weatherData);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{

        displayError("No city or Place name entered");
    }
});

async function getWeatherData(city){ 
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiURL);
    console.log(response);
    if(!response.ok){
        throw new Error("could not fetch city weather info");

    }
    return await response.json();
    
}
 
function displayWeatherInfo(data){ 

    const {name:city ,
           main:{temp,humidity},
           weather:[{description,id}]} = data;
     
    card.textContent = "";
    card.style.display ="flex";
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const EmojiDisplay = document.createElement("p");

    
    cityDisplay.textContent= city ;
    tempDisplay.textContent = `${(temp-273.15).toFixed(1)}C`;
    humidityDisplay.textContent = `Humidity : ${humidity}%`;
    descDisplay.textContent = description;
    EmojiDisplay.textContent = displayEmoji(id);

     
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    EmojiDisplay.classList.add("weatherEmoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay); 
    card.appendChild(humidityDisplay); 
    card.appendChild(descDisplay); 
    card.appendChild(EmojiDisplay); 

}

function displayEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId <300):
            return "🌧️";
        case(weatherId >= 300 && weatherId <400):
            return "🌧️";
        case(weatherId >= 500 && weatherId <600):
            return "🌧️";
        case(weatherId >= 600 && weatherId <700):
            return "❄️";
        case(weatherId >= 700 && weatherId <800):
            return "🍃";
        case(weatherId === 800 ):
            return "🌞";
        case(weatherId >= 801 && weatherId <810):
            return "☁️";
        default:
            return "❓";
    
}}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent= message;
    errorDisplay.classList.add("errorDisplay");
    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
} 