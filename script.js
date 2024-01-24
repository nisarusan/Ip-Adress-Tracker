// document.addEventListener("DOMContentLoaded", async () => {
//     const getIp = async (ipAddress) => {
//         try {
//
//             if (map) {
//                 map.remove();
//             }
//             const dataResponse = await totalResponse.json();
//             const {country, lat, lon} = dataResponse;
//             // Display IP address
//             const ipElement = document.getElementById('ip');
//             ipElement.textContent = `IP Address: ${ipAddress}`;
//
//             // Initialize Leaflet map
//             map = L.map('map').setView([lat, lon], 13);
//
//             // Add OpenStreetMap tile layer
//             L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//                 maxZoom: 19,
//                 attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//             }).addTo(map);
//
//             // Display location information
//             const locationElement = document.getElementById('location');
//             locationElement.textContent = `Location: ${dataResponse.city}, ${dataResponse.regionName}, ${dataResponse.country}`;
//         } catch (e) {
//             console.error(e);
//         }
//     }
//
//     try {
//         const ipAddress = await getIp();
//         const totalResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
//         const dataResponse = await totalResponse.json();
//         const { country, countryCode, region, city, zip, lat, lon, timezone, isp, org, as } = dataResponse;
//         const getIpElement = document.getElementById('ip');
//         getIpElement.textContent = `${ipAddress}`;
//         const map = L.map('map').setView([lat, lon], 13);
//
//         L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             maxZoom: 19,
//             attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
//         }).addTo(map);
//
//         const getCountry = document.getElementById('location');
//         getCountry.textContent = `${country}`;
//
//     } catch(e) {
//         console.error(e);
//     }
//
// });
//
// const toggleButton = document.getElementById('button-submit--ip');
// async function searchIp(input) {
//    try {
//        const response = await fetch(`http://ip-api.com/json/${input}`);
//    } catch(e) {
//        console.log(e);
//    }
// }
// const inputElement = document.getElementById('search-ip');
// const input = inputElement.value;
// toggleButton.addEventListener('click', () => {
//     {searchIp(input)} // hier gebleven
//     const getIpElement = document.getElementById('ip');
//     getIpElement.textContent = `${ipAddress}`;
// });


//

//use leaflet
    document.addEventListener("DOMContentLoaded", async () => {
        let map;

        const displayIpInformation = async (ipAddress) => {
            try {
                // Destroy existing map if it exists
                if (map) {
                    map.remove();
                }

                const totalResponse = await fetch(`http://ip-api.com/json/${ipAddress}`);
                const dataResponse = await totalResponse.json();
                const {country, lat, lon} = dataResponse;

                // Display IP address
                const ipElement = document.getElementById('ip');
                ipElement.textContent = `IP Address: ${ipAddress}`;

                // Initialize Leaflet map
                map = L.map('map').setView([lat, lon], 13);

                // Add OpenStreetMap tile layer
                L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                }).addTo(map);

                // Display location information
                const locationElement = document.getElementById('location');
                locationElement.textContent = `Location: ${dataResponse.city}, ${dataResponse.regionName}, ${dataResponse.country}`;
            } catch (e) {
                console.error(e);
            }
        };

        // Get the general IP address of the user's computer
        const generalIpAddress = await fetch('https://api.ipify.org').then(response => response.text());

        // Display information for the general IP address
        await displayIpInformation(generalIpAddress);

        const toggleButton = document.getElementById('button-submit--ip');
        toggleButton.addEventListener('click', async () => {
            const inputElement = document.getElementById('search-ip');
            const input = inputElement.value;

            if (input) {
                // Clear existing content
                const ipElement = document.getElementById('ip');
                const locationElement = document.getElementById('location');

                ipElement.textContent = 'IP Address: Loading...';
                locationElement.textContent = 'Location: Loading...';

                // Display information for the entered IP address
                await displayIpInformation(input);
            } else {
                console.error('Please enter an IP address.');
            }
        });
    });




