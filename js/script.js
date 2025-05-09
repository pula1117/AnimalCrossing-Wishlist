$(document).ready(function () {
    let sortedCharacters = [];

    fetch("https://api.nookipedia.com/villagers", {
        method: "GET",
        headers: {
            "X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        // Si quieres ordenar por nombre, descomenta esto:
        // data.sort((a, b) => a.name.localeCompare(b.name));

        data.forEach(villager => {
            let villagerHTML = `
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${villager.name}</h5>
                        <p class="card-text">${villager.species} | ${villager.personality}</p>
                        <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary">Ver en Nookipedia</a>
                    </div>
                </div>
            `;

            $("#villagerContainer").append(villagerHTML);
        });
    })
    .catch(error => {
        console.error("Error en la llamada a la API:", error);
    });
});
