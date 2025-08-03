
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT;
const geoCodeAPI = process.env.geoCodeAPI;
const weatherAPI = process.env.weatherAPI;

app.get("/", (req, res) => {
    res.end("Hi, how are you my friend!!");
})


async function checkWeather(req, res) {
    const city = req.params.city;
    const p = await fetch(`https://us1.locationiq.com/v1/search?key=${geoCodeAPI}&q=${city}&format=json&`)
    const data = await p.json();
    const lat = data[0].lat;
    const long = data[0].lon;
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${18.458721727686157}&lon=${73.85104771517311}&appid=${weatherAPI}`);
    const weatherJson = await weather.json();
    res.send(weatherJson);
}

app.get("/weather/:city", checkWeather);

app.get("/weather", (req, res) => {
    res.send("Add /location for the location you want weather for");
})

app.listen(PORT, () => {
    console.log(`Hi the server has started on PORT ${PORT}`);
})