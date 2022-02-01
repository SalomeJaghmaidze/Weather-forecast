
function getTime() {
    fetch("http://worldtimeapi.org/api/ip")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            dateTime = response,
                currentTime = dateTime.datetime[11] + dateTime.datetime[12] + dateTime.datetime[13]
                + dateTime.datetime[14] + dateTime.datetime[15];
            console.log(currentTime);

            var clock = document.getElementById("clock").innerText = currentTime;
        })
}

getTime();

// function getForecast(cityName = "tbilisi") {
//     const baseUrl = "https://api.openweathermap.org";
//     const appId = "223bda042d7e3c9262e6a298c055bbb5";
//     fetch(baseUrl + "/data/2.5/weather?q=" + cityName + "&appid=" + appId)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (response) {
//             weather = response.weather[0];
//             console.log(weather.id);
//             console.log(weather.main);
//             console.log(weather.description);

//             let currentWeather = weather.main;
//             let description = weather.description;
//             let temperature = response.main.temp;
//             let temperatureInC = Math.round(temperature - 273.15);


//             let icon = document.getElementById("weather-icon");
//             document.getElementById("main").innerText = currentWeather;
//             document.getElementById("temp").innerText = temperatureInC + " °C";
//             icon.setAttribute("src", "assets/imgs/" + currentWeather + ".PNG")
//         })
// }

// getForecast();

function forecastWeekly(cityName = "Tbilisi") {
    const baseUrl = "https://api.openweathermap.org";
    const appId = "223bda042d7e3c9262e6a298c055bbb5";
    fetch(baseUrl + "/data/2.5/forecast?q=" + cityName + "&appid=" + appId)
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            const hourly = response.list.slice(0, 5);
            for (i = 0; i < hourly.length; i++) {
                var temp = hourly[i].main.temp;
                let temperatureC = Math.round(temp - 273.15);

                var description = hourly[i].weather[0].main;
                var imageURL = "assets/imgs/" + description + ".PNG";
                createCard(description, temperatureC, imageURL);
            }
        })
}

forecastWeekly("Tbilisi");

function createCard(text, temperature, image) {
    var eachDay = document.createElement("div");
    eachDay.setAttribute("class", "each-day");

    var img = document.createElement('img');
    img.setAttribute("src", image);
    img.setAttribute("class", "weather-icon");

    var mainText = document.createElement("p");
    mainText.setAttribute("class", "mainText");

    var tempText = document.createElement("p");
    tempText.setAttribute("id", "temp");

    var img = document.createElement('img');
    img.setAttribute("src", image);
    img.setAttribute("class", "weather-icon");

    tempText.innerText = temperature + " °C";
    mainText.innerText = text;

    console.log(image)
    var main = document.getElementById("main-card");

    eachDay.appendChild(img);
    eachDay.appendChild(mainText);
    eachDay.appendChild(tempText);
    main.appendChild(eachDay);
}
