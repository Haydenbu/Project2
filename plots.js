/**
 * Helper function to select data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Country
 * index 1 - Province
 * index 2 - Lat
 * index 3 - Lon
 * index 4 - Date
 * index 5 - Cases
 * index 5 - Status
 */

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var country = d3.select("#countryInput").node().value;
  console.log(country);

  // clear the input value
  d3.select("#countryInput").node().value = "";

  // Build the plot with the new country
  buildPlot(country);
}

function buildPlot(country) {
 
  var url = `https://api.covid19api.com/country/${country}/status/confirmed`
  
  d3.json(url).then(function(data) {

    // Grab values from the response json object to build the plots

    var ccountry = data.map(item => item.Country);
    var date = data.map(item => item.Date );
    var cases = data.map(item => item.Cases);
    console.log(date);
    console.log(cases);
    console.log(ccountry);
   


   
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: country,
      x: date,
      y: cases,
    
      line: {
        color: "blue"
      }
    };

    var data = [trace1];

    var layout = {
      title: `Confirmed COVID-19 cases in ${ccountry[0]} `,
      xaxis: {
        autorange: true,
        type: "date",
        title: 'Date - Timeline',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 18,
          color: 'grey'
        }
      },
      yaxis: {
        rangemode: 'nonnegative',
        zeroline: true,
        autorange: true,
        type: "log",
        title: '',
        titlefont: {
          family: 'Arial, sans-serif',
          size: 18,
          color: 'grey'
        }
      }
    };

    Plotly.newPlot("plot", data, layout);

  }
  );
}

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
