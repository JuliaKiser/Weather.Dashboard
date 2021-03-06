$(document).ready(function() {

    var searches = JSON.parse(localStorage.getItem("searches")) || [];

    function renderHistory() {
        $("#selected").empty();
        $("#history").empty();

        // var mostrecent = searches.slice(0, 4); This limits the city list to display only 4 cities.
        for (var i=0; i < searches.length; i++){
            $("#history").append($("<button class='city list-group-item'>").text(searches[i]).attr("data-value", searches[i]));
        }
    }
    //When the user clicks on a city from the history list, it takes button value and passes it to searchWeather()
    $(document).on("click", ".list-group-item", function() {
        $("#selected").show();
        var citysearched = $(this).attr("data-value");
        searchWeather(citysearched);
        
    })
    //Take value from search bar and runs ajax API
        $("#submit").on("click", function(){
            console.log("City You Searched");
            var citysearched = $("#searchcity").val();
            searchWeather(citysearched);
            
        })

        function searchWeather(citysearched) {

            $.ajax ({
                url: "https://api.openweathermap.org/data/2.5/weather?q=" + citysearched + "&units=imperial&appid=2c43a84955b43240c8d4fb64e9a027c5",
                method: "GET"
                
            })
            .then(function(response) {
                console.log(response)
                
                if (!searches.includes(response.name)) {
                    searches.push(response.name);
                }
                localStorage.setItem("searches", JSON.stringify(searches));
                $("#searchcity").val("");
                renderHistory();

                var c = $("<h1>");
                c.text(citysearched);
                c.addClass("city");
                $("#selected").append(c);

                var temp = $("<p>");
                /*var t = (response.main.temp * (9/5)) + 32*/
                temp.text("Temperature: "+response.main.temp)+" F";
                $("#selected").append(temp);

                var humidity = $("<p>");
                humidity.text("Humidity: "+response.main.humidity);
                $("#selected").append(humidity);

                var wp = $("<p>");
                wp.text("Wind Speed: "+response.wind.speed);
                $("#selected").append(wp);


                UVFiveDay(response.coord.lat, response.coord.lon)
            });


            function UVFiveDay(lat, lon) {
                // Gets UV Index
                $.ajax ({
                    url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=2c43a84955b43240c8d4fb64e9a027c5",
                    method: "GET"
                    
                })
                .then(function(response) {
                    console.log(response)

                var index = $("<p>")
                    index.text("UV Index:  " + response.current.uvi);
                    $("#selected").append(index);

                    var header = $("<h1>")
                    header.text("5 Day Forecast")
                    $("#selected").append(header)

                })

                // Gets 5 Day Forcast
                $.ajax ({
                    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + citysearched + "&units=imperial&appid=2c43a84955b43240c8d4fb64e9a027c5",
                    method: "GET"
                    
                })
                .then(function(response) {
                    console.log(response)

                    $("#dayslist").empty();

                    for (var i = 1; i < 6; i++) {
                        var div = $("<div class='fivedayContainer'>")
                        var col = $("<div class='col-md-2 fiveday'>")

                        var icon = $("<img>")
                            icon.attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png")
                        
                        var temp = $("<p>")
                            temp.text("Temp: " +response.list[i].main.temp_max + " ??F")
                        
                        var humidity = $("<p>")
                            humidity.text("Humidity: " +response.list[i].main.humidity + "%")    

                        $("#dayslist").append(div.append(col.append(icon, temp, humidity)))

                    }
                })
            }
        }
    
    renderHistory();


})
