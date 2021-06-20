const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');

const temp_status = document.getElementById('temp_status');
const temp = document.getElementById('temp_real_val');

const datahide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === "") {
        city_name.innerHTML = 'Insert name before searching';
        datahide.classList.add('data_hide');
    }else{

        try{
            console.log(cityVal);
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=8aa0e2c5c5b17b93a04ff9290bf46d73`
            const response = await fetch(url);
            const data = await response.json();

            const arrData = [data];
            console.log(arrData[0].main.temp);
            console.log(arrData[0].weather[0].main);
            city_name.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp.innerText = `${arrData[0].main.temp}`;
            temp_status.innerText = `${arrData[0].weather[0].main}`;
            const tempStatus = arrData[0].weather[0].main;
            var stamp = arrData[0].dt;
            var rise = arrData[0].sys.sunrise;
            var set = arrData[0].sys.sunset;
            var today = new Date(stamp * 1000);
            console.log(today.getHours());
            if(tempStatus === "Clear" && (stamp >= set || stamp <= rise )) {
                console.log('here');
                temp_status.innerHTML =
                    "<i class='fas fa-moon' style='color: #fefcd7;'></i>";
            } else if (tempStatus == "Clear" ) {
                temp_status.innerHTML =
                    "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            }else if (tempStatus == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud' style='color: #dfe4ea;'></i>";
            } else if (tempStatus == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            }  else if(tempStatus == "Thunderstorm") {
                temp_status.innerHTML = "<i class='fas fa-bolt' style = 'color : #fdd023></i>"
            } else if(tempStatus == "Snow") {
                temp_status.innerHTML = "<i class = 'far fa-snowflake' style = color'a0e3f6'</i>"
            }
            else if( (tempStatus == "Mist" || tempStatus == "Drizzle" || tempStatus == "Haze" || tempStatus == "Dust") && (stamp >= set || stamp <= rise )) {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-moon' ></i>";
            }else if(tempStatus == "Mist" || tempStatus == "Drizzle" || tempStatus == "Haze" || tempStatus == "Dust"){
                temp_status.innerHTML =
                    "<i class='fas fa-cloud-sun' ></i>";

            }
            datahide.classList.remove('data_hide');

            // console.log(data);

        }catch{
            city_name.innerHTML = 'Enter a proper city name';
            datahide.classList.add('data_hide');
        }
    }

}

submitBtn.addEventListener('click', getInfo);
