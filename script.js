const search = document.querySelector("#searchlogo");
search.addEventListener('click', () => {
    const loc = document.querySelector("#search-bar").value;
    if(loc!==null) fetchinfo(loc);
})

const fetchinfo = async (location) => {
    clear();
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=97e39e2ae2b5b05c4ef318a281186643&units=metric`);
    let info;
    if (res.ok) {
        info = await res.json();
    }
    else {
        console.log("cannot fetch data");
        return;
    }

    let weather = info['weather'][0]['main'];
    if (weather == 'Smoke') weather = 'mist';
    else if (weather == 'Haze') weather = 'drizzle';
    weather=weather.toLowerCase();

    //icon
    const weatherbody = document.querySelector('.weatherbody');
    const img1=document.createElement('img');
    img1.setAttribute('src', `images/${weather}.png`);
    weatherbody.appendChild(img1);

    //temperature
    const temp = document.createElement('span');
    temp.innerHTML = `${info['main']['temp']}°C`;
    temp.setAttribute('id', 'temperature');
    weatherbody.appendChild(temp);

    //Location
    const loc = document.createElement('span');
    loc.innerHTML = info['name'];
    loc.setAttribute('id', 'location');
    weatherbody.appendChild(loc);

    //Humidity
    const humid = document.querySelector('.humid');
    const img2 = document.createElement('img');
    img2.setAttribute('src', 'images/humidity.png');
    humid.appendChild(img2);

    const humidity = document.createElement('span');
    humidity.className = 'humidity';
    humidity.innerHTML = `${info['main']['humidity']}%`;
    const humiditytext = document.createElement('span');
    humiditytext.className = 'hmtext';
    humiditytext.innerHTML = 'Humidity';
    const div1 = document.createElement('div');
    div1.appendChild(humidity);
    div1.appendChild(humiditytext);
    humid.appendChild(div1);

    //Wind
    const wind = document.querySelector('.wind');
    const img3 = document.createElement('img');
    img3.setAttribute('src', 'images/wind.png');
    wind.appendChild(img3);

    const windspeed = document.createElement('span');
    windspeed.className = 'windspeed';
    windspeed.innerHTML = `${info['wind']['speed']}km/h`;
    const windtext = document.createElement('span');
    windtext.className = 'wstext';
    windtext.innerHTML = 'Windspeed';
    const div2 = document.createElement('div');
    div2.appendChild(windspeed);
    div2.appendChild(windtext);
    wind.appendChild(div2);

    console.log(info['name']);
    console.log(info['weather'][0]['main']);
    console.log(info['main']['temp']);
    console.log(info['main']['humidity']);
    console.log(info['wind']['speed']);
}

function clear() {
    const weatherbody = document.querySelector('.weatherbody');
    weatherbody.innerHTML = '';
    const humid = document.querySelector('.humid');
    humid.innerHTML = '';
    const wind = document.querySelector('.wind');
    wind.innerHTML = '';
}
