const DARKSKY_URL = 'https://api.darksky.net/forecast/';
//const DARKSKY_KEY = 'db31b6288253b83854064ae560ac9428';
const DARKSKY_KEY = process.env.DARKSKY_KEY;
const PIXABAY_URL = 'https://pixabay.com/api/';
//const PIXABAY_KEY = '?key=15688114-b6cd11ea226bd30563ab32a7e';
const PIXABAY_KEY = process.env.PIXABAY_KEY;
// Require DOTENV
require('dotenv').config();


// Setup empty JS object to act as endpoint for all routes
projectData = [];
//projectData = {};

// Require Express to run server and routes
const express = require('express');
const request = require('request');
const axios = require('axios');

// Start up an instance of app
const app = express();

// ** adding the dependecies ** //
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
//app.use(express.static('src/client/views'));
//updating server file to look for assets from dist folder instead of client
app.use(express.static('dist'));

// Setup Server
const port = 8000;
// Spin up the server
const server = app.listen(port, listening);
// const server = app.listen(port, () => {console.log ('running on localhost: ${port}')})
//Callback Function
function listening() {
    console.log('server running');
    console.log(`running on localhost: ${port}`);
}

// PLUGINS -- update server file, change home route to use the index file from dist
app.get('/', function(request, response) {
    response.sendFile('dist/index.html');
});

// ** GET route Request - respond with JS object to return projectData ** //
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

// ** POST route - adds incoming data to projectData ** //

app.post('/getPixaBay', getPixaBay);

function getPixaBay (request, response) {
    country = request.body.country;
    getPixaBayResponse(country, response);
}

const getPixaBayResponse =  async(country, response) => {
    const picture = '&image_type=photo';
    const url = PIXABAY_URL+PIXABAY_KEY+'&q='+country+picture + '&per_page=200';
    console.log(url);
    axios.get(url).then(res => {
        try {
            response.json(res.data);
        } catch (error) {
            console.log(error);
        }
    });
};

app.post('/getDarkSky', callBack);

function callBack (request, response) {

    let newEntry = {
        latitude: request.body.latitude,
        longitude: request.body.longitude,
    };

    getDarkSky(DARKSKY_URL, DARKSKY_KEY, newEntry.latitude, newEntry.longitude, response);
    
}

const getDarkSky = async(darkSky_URL, darkSky_KEY, latitude, longitude, response) => {
    let currentDate = new Date().getTime();
    const timeToDate = Math.floor(currentDate/1000);
    const url = darkSky_URL+darkSky_KEY+'/'+latitude+','+longitude+','+timeToDate;
    axios.get(url).then(res => {
        response.json(res.data.daily.data[0]);
    });
    
};

// darkSky Route //
app.get('/darkSky', (req, res) => {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const time = req.query.time;
    /*
    request.end(response => {
        if (response.error) res.status(500).end(); // Send an error code to the client if there's an error
        const {
          summary,
          precipProbability,
          temperature,
          windSpeed,
          windBearing
        } = response.body.currently; // Pull out everything we need from the response
     
        res.status(200).send(
            JSON.stringify({
              summary: summary,
              chanceOfRain: precipProbability,
              temp: temperature,
              wind: {
                speed: windSpeed,
                bearing: windBearing
              }
            })
        );    
    });
    getDarkSky(darkSky_URL, darkSky_KEY, req.body.latitude, req.body.longitude).then(response => {
        res.end(JSON.stringify(response));
    });*/
    getDarkSky(darkSky_URL, darkSky_KEY, latitude, longitude).then(response => {
        res.end(JSON.stringify(response));
    });
});

/*// function for Pixabay API //
function getPixaBay(PIXABAY_URL, PIXABAY_KEY, country, response) {
    const picture = '&image_type=photo';
    const url = PIXABAY_URL+PIXABAY_KEY+'q='+country+picture;
    console.log('url:'+url);
    let options = {};
    request.get(url,options,function(err,res,body) {
        if(err){
            console.log(err);
        }
        response.send(JSON.stringify(body));
    });
}

// pixabay Route //
app.get('/pixabay', (req, res) => {
    getPixaBay(PIXABAY_URL, PIXABAY_KEY, req.body.country).then(response => {
        res.end(JSON.stringify(response));
    });
});








// Get request to solve the Cors issue with DarkSky API //
/*const darkSky_URL = 'https://api.darksky.net/forecast/';
const darkSky_KEY = 'db31b6288253b83854064ae560ac9428';
let currentDate = new Date().getTime();
const actualTime = Math.floor(currentDate/1000);
const url = darkSky_URL+darkSky_KEY+'/'+latitude+','+longitude+','+actualTime;

const request = require('request');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/getDarkSky', (req, res) => {
    request(
        {url:'url'},
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                return res.status(500).json({type: 'error', message: error.message});

            }

            res.json(JSON.parse(body));
        }
    )
})*/