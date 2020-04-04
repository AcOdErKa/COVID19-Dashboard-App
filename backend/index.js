const csv = require('csv-parser');
const fs = require('fs');
const express = require("express");
const app = express();
const Set = require("collections/set");

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/getAllData", (req, res, next) => {
    const raw_data = [];
    fs.createReadStream('data/covid_19_clean_complete.csv')
    .pipe(csv())
    .on('data', (data) => raw_data.push(data))
    .on('end',() => {
        res.json(raw_data);
    });
    
});

app.get("/getAllData/:country",(req,res) => {
    const raw_data = [];
    fs.createReadStream('data/covid_19_clean_complete.csv')
    .pipe(csv())
    .on('data', (data) => raw_data.push(data))
    .on('end',() => {
        const country_name = req.params.country;
        let country_data = [];
        for(let i=0; i<raw_data.length;i++){
            if(raw_data[i]['Country/Region']===country_name){
                country_data.push(raw_data[i])
            }
        }
        res.json(country_data);
        country_data = []
    });
});

app.get("/getAllCountry", (req, res) => {
    const raw_data = [];
    fs.createReadStream('data/covid_19_clean_complete.csv')
    .pipe(csv())
    .on('data', (data) => raw_data.push(data))
    .on('end',() => {
        const countries = new Set();
        for(let i=0; i<raw_data.length;i++){
            countries.add(raw_data[i]['Country/Region'])
        }
        res.json({"countries" : countries});
    });
});

app.get("/getProvince/:country", (req, res) => {
    const raw_data = [];
    fs.createReadStream('data/covid_19_clean_complete.csv')
    .pipe(csv())
    .on('data', (data) => raw_data.push(data))
    .on('end',() => {
        const provinces = new Set();
        const country_name = req.params.country;
        for(let i=0; i<raw_data.length;i++){
            if(raw_data[i]['Country/Region'] === country_name){
                provinces.add(raw_data[i]['Province/State'])
            }
        }
        res.json({"states" : provinces});
    });
});

app.get("/getAllData/:country/:state",(req, res) => {
    const raw_data = [];
    const country_name = req.params.country;
    const state_name = req.params.state;
    fs.createReadStream('data/covid_19_clean_complete.csv')
    .pipe(csv())
    .on('data', (data) => raw_data.push(data))
    .on('end',() => {
        const data = [];
        for(let i=0; i<raw_data.length;i++){
            if(raw_data[i]['Country/Region'] === country_name && raw_data[i]['Province/State'] === state_name){
                data.add(raw_data[i]);
            }
        }
        res.json({"result" : data});
    });
    
});

app.get("/", (req, res) => {
    res.json({"message":"Welcome to COVID19 API"})
});

app.get("/updatetime",(req, res) => {
    res.json({"message":"Last Updated on 4th April 2020 12:00"})
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port 3000");
   });