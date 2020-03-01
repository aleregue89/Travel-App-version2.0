// Travel-Planner functionality //

/* Global Variables */
const geoNames_URL = 'http://api.geonames.org/searchJSON?q=';
const userName = 'aleregue25';


/* creating event listener - click on button - save trip*/
document.getElementById('saveTrip').addEventListener('click', performAction);

function performAction(event) {
    const cityInput = document.getElementById('city').value;

    getGeoNames(geoNames_URL, cityInput, userName).then(function(data) {
        console.log(data);
        // add data to server => POST request
        postData('http://localhost:8000/add', {latitude: data.lat, longitude: data.lng, country: data.countryName});
    });

    countdown();
}

// ** Async function that uses FETCH() to make a GET request to the API ** //
const getGeoNames = async(geoNames_URL, city_input, userName) => {
    const response = await fetch(geoNames_URL+city_input+'&maxRows=10&username='+userName);
    try {
        // transform into JSON
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

//
const postData = async ( url = '/add', data = {})=>{
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
        console.log(newData);
        return newData;
    }catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
};
  
// function countdown
function countdown() {
    // Set the date we're counting down to from user's input
    const newDate = document.getElementById('departure').value;

    // Update the count down every 1 second
    var x = setInterval(function() {

        // Get today's date and time
        var now = new Date().getTime();
  
        // Find the distance between now and the count down date
        var distance = countdown - now;
  
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        // Display the result in the element with id="countdown"
        document.getElementById("countdown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";
  
        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("countdown").innerHTML = "EXPIRED";
        }
    }, 1000);
}
















/* Global Variables 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apikey = '4ddfc73dcbfe30676b5536475ecb5055';
//let zip = document.getElementById('zip').value;
//let userResponse = document.getElementById('feelings').value;

//Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();
// transforming date to string

//document.getElementById('generate')

// ** Create an event listener - element => id = generate ** //
document.getElementById('generate').addEventListener('click', performAction);
// ** callback function called by event listener ** //
function performAction(event) {
    const newZip = document.getElementById('zip').value;
    const userResponse = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apikey).then(function(data) {
        console.log(data);
        // ** add data to a POST request ** //
        postData('/add', {temperature: data.main.temp, date: date, userResponse: userResponse}).then(
            updateUI('/all').then(setTimeout(function() {
                const span = document.getElementById('span loading');
                if (span) {
                    const hide = document.getElementById('loading');
                    hide.removeChild(span);
                }
            }, 3000))
        );
    }).then (function(data) {
        const span = document.createElement('span');
        span.innerHTML = 'loading...';
        span.id = 'span loading';
        const loadingBar = document.getElementById('loading').appendChild(span);
    });
    
} 

// ** Async function that uses FETCH() to make a GET request to the API ** //
const getWeather = async(baseURL, newZip, apiKey) => {
    const response = await fetch(baseURL + newZip + '&apikey=' + apiKey + '&units=imperial');
    try {
        // transform into JSON
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// ** Creating another PROMISE - POST request to add API data as well data from user ** //
/* Function to POST data *
const postData = async ( url = '', data = {})=>{
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
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  };
  
  /*
  // TODO-Call Function
  postData('/add', {animmal: 'dog'});
  //postData('/addzipCode', {zipCode: 33165});
*/

  /* Promise for updating the UI dynamically 
const updateUI = async (url = '') => {
    const request = await fetch(url);
    try{
        const allData = await request.json();
        console.log(allData);
        document.getElementById('date').innerHTML = allData[0].date;
        document.getElementById('temp').innerHTML = allData[0].temperature;
        document.getElementById('content').innerHTML = allData[0].userResponse;
    } catch (error) {
        console.log("error", error);
    }

};

// adding exports statements*/ 
export {performAction}