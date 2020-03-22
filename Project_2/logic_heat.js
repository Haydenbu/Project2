var myMap = L.map("map", {
    center: [15.5994, -28.6731],
    zoom: 2
  });
  
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);
  var heat_data = "https://api.covid19api.com/all";
  
  d3.json(heat_data, function(response) {
    console.log(response);
    var heatArray = [];
    var Lat= [];
    var Lon = [];
    for (var i = 0; i < response.length; i++) {
      var location = response[i].Country;
      if (location) {
        heatArray.push([Lat,Lon]);
      }
    }
    var heat = L.heatLayer(heatArray, {
      radius: 40,
      blur: 35
    }).addTo(myMap);
  });