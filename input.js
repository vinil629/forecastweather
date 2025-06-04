
    // current.addEventListener('click',currentloc)

const btn=document.getElementById("btn");
btn.addEventListener("click",start);

async function start(){
    const inp=document.getElementById("inp");
    

    const cityname = inp.value;
    if(inp.value===''){
        alert("enter the city name");
        return
    }

     fetchdata(cityname)
     storedata()
//    await  fivedays(cityname)

    inp.value='';



}


// function fetching(){
    
    
    async function fetchdata(cityname){
        // try{
        cityname=cityname.trim();

    
    const APIkey = '7b3f180fe61e90984fd9d5f6aeb326c3';
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metrix&q=";
    

    
    const response= await fetch(apiUrl + cityname + `&appid=${APIkey}`)
    const result=await response.json()
    console.log(result)
    if(response.ok){
        display(result)
        // storedata()
        fetchForecast(cityname)
        // storedata()
    }else{
        throw new Error("city not found")
    }
        

    // .then((res) => res.json())  
    // .then((vin)=>{
    //     console.log(vin);
    //     display(vin)
    //     fetchForecast(cityname)
        
        
    // })
}



  


// }

//its used to display the weather of data
async function display(vin){
    const sec=document.getElementById("second");
 
    const iconUrl = `https://openweathermap.org/img/wn/${vin.weather[0].icon}.png`;
    sec.innerHTML=`
    <div class='text-white text-2xl'>
    
    
    <h1>city:${vin.name}</h1>
    <p>temp:${(vin.main.temp-273.15).toFixed(2)}°C</p>
    <p>speed:${vin.wind.speed}m/s</p>
    <p>${vin.weather[0].description}</p>
    <p>humidity:${vin.main.humidity}%</p>
    </div>
    
    <div class='mx-10'>
    
    
    <img src=${iconUrl} width="150px" height="150px">
    </div>
    

    

    `
}


// function storedata(){
//     const inp=document.getElementById("inp");
//     // const city=inp.value;
//     let city=[]
//     city.push(inp.value)

//     localStorage.setItem("data",JSON.stringify(city));


// }

//its used to storedata in localstorage the recent searches
async function storedata() {
    const inp = document.getElementById("inp");
    const select=document.getElementById("recentCitiesDropdown");
    const city = inp.value;

    // Check if there's already existing data
    let cities = JSON.parse(localStorage.getItem("data")) || [];
    
    // Push the new city into the array
    cities.push(city);
    
    // Store the updated cities array in localStorage
    localStorage.setItem("data", JSON.stringify(cities));
    console.log(cities);
    // list(cities)

    function list(cities){
        select.innerHTML='';
        const defaultOption = document.createElement('option');
            defaultOption.text = 'Select a city';
            defaultOption.value = '';
            select.appendChild(defaultOption);
            cities.forEach(city => {
                const option = document.createElement('option');
                option.text = city;
                option.value = city; // The value of the option is the city name
                select.appendChild(option);

                
            });



    }
    list(cities)
   
select.addEventListener('click',(event)=>{
    const selected=event.target.value;
    if(selected){
        fetchdata(selected);

    }else{
        console.log("no city selected")
    }
})
  
       
 
    

    

  
}
// <------fetching forecast of 5 days using async and await------>

async function fetchForecast(cityname) {
    try {
        const apikey = '7b3f180fe61e90984fd9d5f6aeb326c3';
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=${apikey}&units=metric`);
        const data = await response.json();
        console.log(data)
        if (data.cod === '200') {
            displayForecast(data);  //calling a function to display the forecast data
        } else {
            forecastData.innerHTML = '<p class="text-gray-600">Unable to fetch forecast data.</p>';
        }
    } catch (error) {
        console.error('Error fetching forecast data:', error);
    }
}

function displayForecast(data) {
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")); // Filter to get data for around midday
    console.log(dailyData)
    day1.innerHTML = dailyData.map(day => {
        // console.log(day)
        const date = new Date(day.dt_txt).toLocaleDateString();
        // console.log(date)
        return `
            <div class="bg-gray-100 p-4 rounded-lg shadow-lg mb-4">
                <h3 class="text-lg font-semibold text-gray-800">${date}</h3>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="${day.weather[0].description}" class="mx-auto my-2">
                <p class="text-green-600">Temp: ${day.main.temp}°C</p>
                <p class="text-gray-600">Wind: ${day.wind.speed} m/s</p>
                <p class="text-gray-600">Humidity: ${day.main.humidity}%</p>
                <p class="text-gray-600">Condition: ${day.weather[0].description}</p>
            </div>
        `;
    }).join('');
}
    // await fetch(apiUrl + cityname + `&appid=${APIkey}`)


    // its used to fetch the current location by using latitude and longitude
function currentloc(){
    // const name='london';
        console.log("hello")
        geolocation()
        function geolocation(){
            //checking the browser had geolocation api ao not
            if(navigator.geolocation){
                //if geolocation api there in browser its forward the programm
                navigator.geolocation.getCurrentPosition(currentpos);
            }else{
                alert("geo location is not supported");
                return
            }
        }
        function currentpos(position){
            console.log(position)
            var latitude=position.coords.latitude;
            var longitude=position.coords.longitude;
            fetchcurr(latitude,longitude);
        }

       
 }


 function fetchcurr(latitude,longitude){
    const apikey = '7b3f180fe61e90984fd9d5f6aeb326c3';
    const weathurl=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`;
    fetch(weathurl)
    .then((res)=>res.json())
    .then(det=>{
        // calling function that previosly held by changing parameter
        console.log("vin")
        console.log(det)
        display(det);
        fetchForecast(det.name)
        // displayForecast(det)


        console.log(det.name)
    })
 }
   


    
const current=document.getElementById("current");

current.addEventListener('click',currentloc)

    
   

    
   







// const select=document.getElementById("recentCitiesDropdown");

// select.addEventListener("click", async ()=>
//     {
//         const select=recentCitiesDropdown.value;
//         console.log(select);
//         if(select){
//             fetchdata(select);

//         }else{
//             alert("please select city")
//         }
        
        
    
//     });


    


   
    


    
