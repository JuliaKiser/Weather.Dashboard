$(document).ready(function() {

    var searches =JSON.parse(localStorage.getItem("searches")) || [];

    function renderHistory() {
        $("#history").empty();

        var mostrecent = searches.slice(0, 4);
        for (var i=0; i < mostrecent.length; i++){
            $("#history").append($("<a href='' class='city list-group-item'>")).text(mostrecent[i]);
        }
    }
    $("#submit").on("click", function(){
        console.log("City You Searched");
        var citysearched = $("#searchcity").val();
        
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
            
            var c = $("h1");
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
                    var div = $("<div>")
                    var col = $("<div class='col-md-2'>")

                    var icon = $("<img>")
                        icon.attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + ".png")
                    
                    var temp = $("<p>")
                        temp.text("Temp: " +response.list[i].main.temp_max + " °F")
                    
                    var humidity = $("<p>")
                        humidity.text("Humidity: " +response.list[i].main.humidity + "%")    

                    $("#dayslist").append(div.append(col.append(icon, temp, humidity)))

                }


        

            })
        }
    })
    renderHistory();


})
