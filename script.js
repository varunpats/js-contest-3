let fetchBtn = document.getElementById("fetchBtn");
fetchBtn.addEventListener("click", fetchData);

async function fetchData() {
    let res = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=0edbf436ee42417496fcf0da67df561e");
    let data = await res.json();
    if (data) {
        let weatherRes = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${data.latitude},${data.longitude}?unitGroup=us&key=VKB9DM35UV78DW2ELUQEC3FN9`)
        let weatherData = await weatherRes.json();
        document.getElementById("primary").style.display = "none";
        document.getElementById("secondary").style.display = "block";
        let pos = document.getElementById("pos");
        pos.innerHTML = `<span>Lat: ${data.latitude}</span>
        <span>Long: ${data.longitude}</span>`
        let map = document.getElementById("map");
        map.innerHTML = `<iframe src="https://maps.google.com/maps?q=${data.latitude},${data.longitude}&output=embed"width="100%"
        height="500" frameborder="0" style="border:0"></iframe>`
        let displayData = document.getElementById("displayData");
        displayData.innerHTML = `<p>Location: ${data.city}</p>
        <div id="position">
            <p>Lat: ${data.latitude}</p>
            <p>Long: ${data.longitude}</p>
        </div>
        <p>Time Zone: ${data.time_zone.name}</p>
        <p>Wind Speed: ${weatherData.currentConditions.windspeed}</p>
        <p>Pressure: ${weatherData.currentConditions.pressure}</p>
        <p>Humidity: ${weatherData.currentConditions.humidity}</p>
        <p>Wind Direction: ${weatherData.currentConditions.winddir}</p>
        <p>UV Index: ${weatherData.currentConditions.uvindex}</p>
        <p>Feels Like: ${weatherData.currentConditions.feelslike}</p>`
    }
}