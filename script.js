document.addEventListener("DOMContentLoaded", async () => {
    const getIp = async () => {
        try {
            const response = await fetch('https://api.ipify.org');
            return response.text();
        } catch (e) {
            console.error(e);
        }
    }

    try {
        const ipAddress = await getIp();
        const totalResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
        const dataResponse = await totalResponse.json();
        const { country, countryCode, region, city, zip, lat, lon, timezone, isp, org, as } = dataResponse;
        const getIpElement = document.getElementById('ip');
        getIpElement.textContent = `${ipAddress} - ${country} - ${lat} - ${lon} `;
        let map = L.map('map').setView([lat, lon], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        const getCountry = document.getElementById('location');
    } catch(e) {
        console.error(e);
    }

});

const toggleButton = document.getElementById('button-submit--ip');
async function searchIp(input) {
   try {
       const response = await fetch(`http://ip-api.com/json/${input}`);
   } catch(e) {
       console.log(e);
   }
}
toggleButton.addEventListener('click', () => {
    {searchIp(input)} // hier gebleven
});






