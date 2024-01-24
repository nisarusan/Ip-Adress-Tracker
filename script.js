
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




