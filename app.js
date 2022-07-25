const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  //console.log(req.body.cityName);
  const query = req.body.cityName;
  const apiKey = "61d7709730f386723a667d57da384b0e";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+
                                                "&appid="+apiKey+"&units="+unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    // using .on method, we can tap into the response data and search for data
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The weather is currently "+ weatherDescription + "</h1>");
      res.write("<p>The temparature in "+query+" is "+ temp + " degree Celcius.</p>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
})

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
