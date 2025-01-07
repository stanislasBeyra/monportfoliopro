const destinationsContainer = document.getElementById('all-destinations');
const regionFilter = document.getElementById('region');

// Charger les données depuis un fichier JSON
fetch('assets/data/destinations.json')
    .then(response => response.json())
    .then(data => {
        renderDestinations(data);

        // Appliquer le filtre de région
        regionFilter.addEventListener('change', () => {
            const selectedRegion = regionFilter.value;
            const filteredDestinations = selectedRegion === 'all' 
                ? data 
                : data.filter(dest => dest.region === selectedRegion);
            renderDestinations(filteredDestinations);
        });
    });

// Fonction pour afficher les destinations
function renderDestinations(destinations) {
    destinationsContainer.innerHTML = '';
    destinations.forEach(dest => {
        const card = `
            <div class="destination-card">
                <img src="${dest.image}" alt="${dest.name}">
                <h3>${dest.name}</h3>
                <p>${dest.description}</p>
                <p><strong>${dest.price}</strong></p>
            </div>
        `;
        destinationsContainer.innerHTML += card;
    });
}
