var citysearched = "Charlotte"

$.ajax ({
    url: "https://api.openweathermap.org/data/2.5/weather?q=" + citysearched + "&appid=2c43a84955b43240c8d4fb64e9a027c5",
    method: "GET"
})
.then(function(response) {
    console.log(response)
    if(!searches.include(response.name)) {
        searches.push(response.name);
    }
    localStorage.setItem("searches",JSON.stringify(searches));
    $("#searchcity").val("");
    renderHistory();
});

var searchedCity = $("#selected");
searchedCity.append($(".citysearched").text(response.name + " (" + moment().format('L') + ")"));
searchedCity.append($(".temperature").text("Current Temperature (F): " + response.main.temp.toFixed(2)));


