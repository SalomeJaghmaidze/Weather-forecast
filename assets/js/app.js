
function getTime() {
    fetch("http://worldtimeapi.org/api/ip")
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            dateTime = response,
                currentYear = dateTime.datetime[0] + dateTime.datetime[1] + dateTime.datetime[2]
                + dateTime.datetime[3];

            var dateObject = formatAMPM(new Date);
            document.getElementById("clock").innerText = dateObject.strTime;
            greeting(dateObject.hours, dateObject.ampm);

            days = [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday'
            ];

            day = dateTime.day_of_week;
            currentDay = days[day];

            var months = {
                "01": "January",
                "02": "February",
                "03": "March",
                "04": "April",
                "05": "May",
                "06": "June",
                "07": "July",
                "08": "August",
                "09": "September",
                "10": "October",
                "11": "November",
                "12": "December"
            };
            month = dateTime.datetime[5] + dateTime.datetime[6];
            currentMonth = months[month];
            day = parseInt(dateTime.datetime[8] + dateTime.datetime[9]);
            document.getElementById("current-day").innerText = currentDay + ", " + currentMonth + " " + day + ", " + currentYear;
        })
}

getTime();

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return {
        "strTime": strTime,
        "hours": hours,
        "ampm": ampm,
    };
}

function greeting(hours, ampm) {
    if (hours >= 8 && hours < 12 && ampm == "AM") {
        document.getElementById("greeting").innerText = "Good morning!";
    } else if (hours >= 12 && hours < 6 && ampm == "PM") {
        document.getElementById("greeting").innerText = "Good afternoon!";
    } else if (hours >= 6 && hours < 12 && ampm == "PM") {
        document.getElementById("greeting").innerText = "Good evening!";
    } else if (hours >= 12 && ampm == "AM") {
        document.getElementById("greeting").innerText = "Happy night! It's time to ride the rainbow to dreamland.";
    } else {
        console.log("error");
    }
};

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

                var hour = hourly[i].dt_txt;
                timeHour = hour[11] + hour[12] + hour[13] + hour[14] + hour[15];

                createCard(description, temperatureC, imageURL, timeHour);
            }
        })
}

forecastWeekly("Tbilisi");

function createCard(text, temperature, image, hour) {
    var eachDay = document.createElement("div");
    eachDay.setAttribute("class", "each-day");

    var img = document.createElement('img');
    img.setAttribute("src", image);
    img.setAttribute("class", "weather-icon");

    var mainText = document.createElement("p");
    mainText.setAttribute("class", "mainText");

    var hourText = document.createElement("p");
    hourText.setAttribute("class", "hourText");

    var tempText = document.createElement("p");
    tempText.setAttribute("id", "temp");

    var img = document.createElement('img');
    img.setAttribute("src", image);
    img.setAttribute("class", "weather-icon");

    tempText.innerText = temperature + " °C";
    mainText.innerText = text;
    hourText.innerText = hour;

    var main = document.getElementById("main-card");

    eachDay.appendChild(img);
    eachDay.appendChild(hourText);
    eachDay.appendChild(mainText);
    eachDay.appendChild(tempText);
    main.appendChild(eachDay);
};
