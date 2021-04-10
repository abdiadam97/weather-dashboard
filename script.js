$(document).ready(function() {

    const apiKey = "86686468dd0fef3e310be07751d22d95";

    $("#search-button").on("click",function() {
        //get user input
        const userVal = $("#search-value").val();

        //show the current weather
        showCurrentWeather(userVal);

        //show the forecast 5 day
        showForecast(userVal);

        //create a button

    });

    const showCurrentWeather = (cityName) => {
        //contruct request url
        const query = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;

        $.ajax({
            url: query,
            success: function(datum) {
                console.log("current weather:", datum);

                //build tempalte
                const str = `
                    <div class="card">
                        <div class="card-body p-2">
                            <h3 class="card-title">${datum.name} (${new Date().toLocaleDateString()})
                            <img src="http://openweathermap.org/img/w/${datum.weather[0].icon}}.png"/></h3>
                            <p class="card-text">Wind Speed: ${datum.wind.speed} MPH</p>
                            <p class="card-text">Humidity : ${datum.main.humidity} %</p>
                            <p class="card-text">Temp: ${datum.main.temp} °F</p>
                        </div>
                    </div>
                `;

                //add to the page
                $("#today").html(str);
            }
        });
    }

    const showForecast = (cityName) => {
        //contruct request url
        const query = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`;

        $.ajax({
            url: query,
            success: function(data) {
                console.log("current weather:", data);

                //init str
                let str = "";

                //filter data
                const filteredData = data.list.filter((datum) => datum.dt_txt.indexOf("12:00:00") !== -1);

                //build tempalte
                filteredData.forEach((datum) => {
                    str += `
                        <div class="col-md-2">
                            <div class="card bg-primary text-white">
                                <div class="card-body p-2">
                                    <h5 class="card-title">${new Date().toLocaleDateString()}</h5>
                                    <img src="http://openweathermap.org/img/w/${datum.weather[0].icon}}.png"/>
                                    <p class="card-text">Wind Speed: ${datum.wind.speed} MPH</p>
                                    <p class="card-text">Humidity : ${datum.main.humidity} %</p>
                                    <p class="card-text">Temp: ${datum.main.temp} °F</p>
                                </div>
                            </div>
                        </div>
                    `;
                });

                //add to the page
                $("#forecast").html(str);
            }
        });
    }

});