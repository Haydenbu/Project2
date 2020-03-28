// Creating map object
var map = L.map("map", {
    center: [15.5994, -28.6731],
  zoom: 2
  });
  // Adding tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  // Load in geojson data
  var baseURL = "https://api.covid19api.com/all";
  var geojson;

//   var date = "$where=created_date between '2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
//   var confirmed = "&Status = 'confirmed'";

//   var confirmedUrl = baseURL + confirmed;

  // Grab data with d3
  d3.json(baseURL , function(data) {
    console.log(data);

    for (var i = 0; i < data.length; i++) {
        var color= "";
    
        if (data[i].Cases= 'confirmed' > 50000){
          var color= "red";
        }
        else if(data[i].Cases= 'confirmed' > 10000){
          var color= "orange";
        } 
        else if(data[i].Cases= 'confirmed' > 1000){
          var color= "yellow";
        }  
        else {
          color= "green";
        }


    L.circle([data[i].Lat,data[i].Lon], {
        fillOpacity: 0.75,
        color: "white",
        fillColor: color,
        radius:data[i].Cases* 1200
    })
    .bindPopup(`<h1>${data[i].Country}</h1> <hr> <h3>Cases: ${data[i].Cases}</h3>`).addTo(map);
    }
  });