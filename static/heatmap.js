var myMap = L.map("heatmap", {
    center: [37.7749, -122.4194],
    zoom: 3
  });
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: "pk.eyJ1IjoiaGJ1c3MiLCJhIjoiY2s3cnA4aWxpMDVvazNsbzV6bm90ZGN5eCJ9.NhqTxKT7yGUHDMpDIRlPvA"
  }).addTo(myMap);
  var newtry = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=1000";

  d3.json(newtry, function(response){
      var heatArray = [];

      for (var i=0; i < response.length; i++){
          var location = response[i].location;
          if (location) {
              heatArray.push([location.coordinates[1], location.coordinates[0]]);
          }
      }

      var heat = L.heatLayer(heatArray, {
          radius: 30,
          blur: 10
      }).addTo(myMap);
  })