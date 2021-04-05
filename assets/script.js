$(document).ready(function() {

    $("#submit").on("click", function(){
        console.log("Inside button click");
        var citysearched = $("#searchcity").val();

    $.ajax ({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + citysearched + "&units=imperial&appid=2c43a84955b43240c8d4fb64e9a027c5",
        method: "GET"
    })
    .then(function(response) {
        console.log(response)
        /*if(!searches.include(response.name)) {
            searches.push(response.name);
        }*/

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


        /*localStorage.setItem("searches",JSON.stringify(searches)) || [];
        $("#searchcity").val("");
        renderHistory();*/
    });
    
    // var searchedCity = $("#selected");
    // searchedCity.append($(".citysearched").text(response.name + " (" + moment().format('L') + ")"));
    // searchedCity.append($(".temperature").text("Current Temperature (F): " + response.main.temp.toFixed(2)));

    })
    
    



})



