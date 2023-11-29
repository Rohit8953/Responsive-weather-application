const temprature= document.querySelector(".temp");
const windspeed=document.querySelector("[wind_speed]");
let   cityname=document.querySelector("[cityname]");
const humalidity=document.querySelector("[humalidity]");
const cloud=document.querySelector("[cloud]");
const searchbox=document.querySelector("[searchbox]");
const submitbtn=document.querySelector("[submitbtn]");
const weathericon=document.querySelector("[weathericon]");
const Error=document.querySelector(".error");
const alldata=document.querySelector(".alldata");
const weatherimage=document.querySelector("[weatherimage]");
const loader=document.querySelector(".loader");
const description=document.querySelector(".description");

// const response=[
//     "coord":{
//        "lon":80.75,
//        "lat":27.25
//     },
//     "weather":[
//        {
//           "id":800,
//           "main":"Clear",
//           "description":"clear sky",
//           "icon":"01d"
//        }
//     ],
//     "base":"stations",
//     "main":{
//        "temp":19.1,
//        "feels_like":18.14,
//        "temp_min":19.1,
//        "temp_max":19.1,
//        "pressure":1016,
//        "humidity":41,
//        "sea_level":1016,
//        "grnd_level":1001
//     },
//     "visibility":10000,
//     "wind":{
//        "speed":1.27,
//        "deg":128,
//        "gust":1.31
//     },
//     "clouds":{
//        "all":0
//     },
//     "dt":1700707376,
//     "sys":{
//        "country":"IN",
//        "sunrise":1700701387,
//        "sunset":1700739822
//     },
//     "timezone":19800,
//     "id":1253626,
//     "name":"Uttar Pradesh",
//     "cod":200
// ]



console.log('hello dosto kaise ho sare ke sare');
const API_key="67d90757b3e31f899c434a95be6b69b4";
let city="Uttar Pradesh";

function weatherdata(data){
    
    if (data.cod==404){
        alldata.classList.add("displaynone");
        Error.classList.add("displayblock");
    }
    else{
        alldata.classList.remove("displaynone");
        Error.classList.remove("displayblock"); 
    }

    console.log("Wheather data-->",data);
    temprature.textContent=`${data.main.temp.toFixed(2)} °C`;
    windspeed.textContent=`${data.wind.speed}km/h`;
    humalidity.textContent=`${data.main.humidity}%`;
    cloud.textContent=`${data.clouds.all}`+"%";
    cityname.textContent=`${data.name}`
    description.textContent=`${data.weather[0].description}`
    

    if (data.weather[0].main == "Clouds") {
        weatherimage.src="clouds.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherimage.src="rain.png";
    }
    else if (data.weather[0].main == "Clear") {
        weatherimage.src="clear.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherimage.src="mist.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherimage.src="drizzle.png";
    }    
}

async function showweather(city){
  
    loader.classList.add("displayblock");
    alldata.classList.add("displaynone");

try{
    const API_key= "67d90757b3e31f899c434a95be6b69b4";
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=67d90757b3e31f899c434a95be6b69b4&units=metric`);
    const data=await response.json();
    loader.classList.remove("displayblock");
    Error.classList.toggle("displaynone");
    weatherdata(data);
}
catch(err){
    console.log("Error aye hai", err);
}

}

showweather(city);

submitbtn.addEventListener('click', ()=>{
      city=searchbox.value;
      showweather(city);
});
