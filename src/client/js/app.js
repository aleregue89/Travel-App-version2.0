import { checkForName } from "./nameValidation";

/* Global Variables */
const geoNames_URL = 'http://api.geonames.org/searchJSON?q=';
const userName = 'aleregue25';

//const userName = process.env.GEONAME_USER;
require('dotenv').config();

// creating event listener to wait for DOM Content Load
/* creating event listener - click on button - save trip*/
document.addEventListener('DOMContentLoad', function() {
    document.getElementById('saveTrip').addEventListener('click', performAction);
});

function performAction(event) {
    event.preventDefault();

    const cityInput = document.getElementById('city').value;

    // checking if a valid input was entered in city field
    if (Client.checkForName(cityInput)) {

        //if user enter a valid input - the event will be handle it
        getGeoNames(geoNames_URL, cityInput, userName).then(function(geoNameDataResponse) {
            let entry = {
                latitude: geoNameDataResponse.geonames[0].lat, 
                longitude: geoNameDataResponse.geonames[0].lng, 
                country: geoNameDataResponse.geonames[0].countryName,
            };
            // add data to server => POST request
            sendServerRequest('http://localhost:8000/getDarkSky', entry).then(function (darkSkyDataResponse) { 
                updateUI(darkSkyDataResponse);
            });
            sendServerRequest('http://localhost:8000/getPixaBay', entry).then(function(pixaBayDataResponse) {    
                let hits = pixaBayDataResponse.hits;
                let i = 0;
                let relevantHits = [];
                for(i = 0; i < hits.length; i++) {
                    let currentHit = hits[i]
                    if (currentHit.type === "photo") {
                        let tags = currentHit.tags;
                        let city = cityInput.toLowerCase();
                        if (tags.includes(city)) {
                            relevantHits.push({
                                image: currentHit.previewURL,
                                likes: currentHit.likes,
                            });
                        }
                    }
                }
                if (relevantHits.length === 0) {
                    relevantHits.push({
                        image: hits[0].previewURL,
                        likes: hits[0].likes,
                    });
                }
                updatePicture(relevantHits[0]);
            });
        });
    
        countDownTime();
        setInterval(countDownTime, 1000);

    } else {
        alert('Please enter a correct city');
        
    }

}

// ** Async function that uses FETCH() to make a GET request to the API ** //
const getGeoNames = async(geoNames_URL, city_input, userName) => {
    const response = await fetch(geoNames_URL+city_input+'&maxRows=10&username='+userName);
    try {
        // transform into JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.log( error);
    }
};

function updatePicture (data) {
   document.getElementById('picture').src = data.image;
   //document.getElementById('image_likes').innerHTML = data.likes;
}

function updateUI (data) {
    /* data =
    {
  time: 1585368000,
  summary: 'Clear throughout the day.',
  icon: 'clear-day',
  sunriseTime: 1585394220,
  sunsetTime: 1585438620,
  moonPhase: 0.14,
  precipIntensity: 0.0009,
  precipIntensityMax: 0.0023,
  precipIntensityMaxError: 0.077,
  precipIntensityMaxTime: 1585404960,
  precipProbability: 0.08,
  precipType: 'rain',
  temperatureHigh: 79.09,
  temperatureHighError: 5.62,
  temperatureHighTime: 1585420440,
  temperatureLow: 74.64,
  temperatureLowError: 5.56,
  temperatureLowTime: 1585482180,
  apparentTemperatureHigh: 79.43,
  apparentTemperatureHighTime: 1585420620,
  apparentTemperatureLow: 76.04,
  apparentTemperatureLowTime: 1585440780,
  dewPoint: 66.98,
  humidity: 0.74,
  pressure: 1018.4,
  windSpeed: 9.98,
  windGust: 19.84,
  windGustTime: 1585422720,
  windBearing: 113,
  cloudCover: 0.15,
  uvIndex: 9,
  uvIndexTime: 1585417920,
  visibility: 10,
  ozone: 272.4,
  temperatureMin: 73.26,
  temperatureMinError: 5.58,
  temperatureMinTime: 1585392060,
  temperatureMax: 79.09,
  temperatureMaxError: 5.64,
  temperatureMaxTime: 1585420440,
  apparentTemperatureMin: 74.48,
  apparentTemperatureMinTime: 1585391520,
  apparentTemperatureMax: 79.43,
  apparentTemperatureMaxTime: 56.67,
    }*/

    const forecast = 'The Weather is '+ data.summary + ' With a max of temperature of '+ data.temperatureMax +'. Precipitation: '+ data.precipType +' with  a chance of '+ data.precipProbability+'%';
    const newElement = document.createElement('h4');
    newElement.innerHTML = forecast;
    document.getElementById('forecast').appendChild(newElement);
}

const sendServerRequest = async ( url = '', data = {})=>{
    //console.log(data);
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
    try { 
        const newData = await response.json();
        
        return newData;
    }catch(error) {
      console.log( error);
      // appropriately handle the error
    }
};

function countDownTime() {
   const currentDate = new Date().getTime();
   const starDate = new Date(document.getElementById('starDate').value);//getTime();
   const endDate = new Date(document.getElementById('endDate').value);//getTime();
   const countDown = Math.floor(starDate - currentDate);
   const lenghtOfTrip = endDate - starDate;
   const lenghtOfTripInDays = Math.floor(lenghtOfTrip/(1000*60*60*24));
   document.getElementById('tripLength').textContent = 'days '+lenghtOfTripInDays;
   const days = Math.floor(countDown/(1000*60*60*24));
   const hours = Math.floor(countDown/(1000*60*60) % 24);
   const minutes = Math.floor(countDown/(1000*60) % 60);
   const seconds = Math.floor(countDown/(1000) % 60);

   document.getElementById('countdown').textContent = days + ' :Days '+ hours + ' :Hours '+ minutes + ' :Minutes '+ seconds + ' :Seconds';
}

document.addEventListener('DOMContentLoad', function() {
    document.getElementById('removeTrip').addEventListener('click', removeTripHandler);
});
// Creating fuction to reset page when Client click button 'Remove Trip'
function removeTripHandler(event) {
    event.preventDefault();

    document.getElementById('starDate').value="";
    document.getElementById('endDate').value="";
    document.getElementById('city').value="";

    function removeElement(elementId) {
        // removes an element from the DOM
        let element = document.getElementById(elementId);
        element.parentNode.removeChild(element);
    }

    removeElement('picture');
    removeElement('tripLength');
    removeElement('countdown');
    
}

// adding exports statements*/ 
export {performAction};
export {removeTripHandler};
