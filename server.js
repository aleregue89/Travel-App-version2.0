// Setup empty JS object to act as endpoint for all routes
projectData = [];
//projectData = {};

// Require Express to run server and routes
const express = require('express');

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
app.use(express.static('website'));

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

// ** GET route Request - respond with JS object to return projectData ** //
app.get('/all', sendData);

function sendData(request, response) {
    response.send(projectData);
}

// ** POST route - adds incoming data to projectData ** //

app.post('/add', callBack);

function callBack (request, response) {
    //res.send('POST received');
    //let data = req.body;
    //console.log(data);
    let newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse,
    };

    projectData.push(newEntry);
    console.log(projectData);
}


/*
// POST an animal
const data = [];

app.post('/animal', addAnimal);

function addAnimal (req, res) {
    data.push(req.body);
}
*/