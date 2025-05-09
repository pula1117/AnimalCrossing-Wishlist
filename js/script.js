// $(document).ready(function () {

//     fetch("https://api.nookipedia.com/villagers", {
//         method: "GET",
//         headers: {
//             "X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Si quieres ordenar por nombre, descomenta esto:
//         // data.sort((a, b) => a.name.localeCompare(b.name));

//         data.forEach(villager => {
//             let villagerHTML = `
//                 <div class="card" style="width: 18rem; margin: 1rem;">
//                     <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 200px; object-fit: cover;">
//                     <div class="card-body">
//                         <h5 class="card-title">${villager.name}</h5>
//                         <p class="card-text">${villager.species} | ${villager.personality}</p>
//                         <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary">Ver en Nookipedia</a>
//                     </div>
//                 </div>
//             `;

//             $("#villagerContainer").append(villagerHTML);
//         });
//     })
//     .catch(error => {
//         console.error("Error en la llamada a la API:", error);
//     });
    
// });













$(document).ready(function () {
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
        // Filtrar solo los aldeanos cuya especie sea "Cat"
        const catVillagers = data.filter(villager => villager.species === "Cat");

        console.log("Aldeanos de especie Cat:", catVillagers);

        catVillagers.forEach(villager => {
            console.log("Villager individual:", villager);

            let villagerHTML = `
                <div class="card" style="width: 18rem; margin: 1rem;">
                    <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 200px, weight: 250px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${villager.name}</h5>
                        <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary">Nookipedia</a>
                    </div>
                </div>
            `;

            $("#villagerCatContainer").append(villagerHTML);
        });
    })
    .catch(error => {
        console.error("Error en la llamada a la API:", error);
    });
});
















// $(document).ready(function () {
//     fetch("https://api.nookipedia.com/villagers", {
//         method: "GET",
//         headers: {
//             "X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
//         }
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         // Especies deseadas
//         const allowedSpecies = ["Cat", "Eagle", "Elephant", "Duck"];

//         // Filtrar aldeanos por las especies definidas
//         const filteredVillagers = data.filter(villager =>
//             allowedSpecies.includes(villager.species)
//         );

//         console.log("Aldeanos filtrados (Cat, Eagle, Elephant, Duck):", filteredVillagers);

//         filteredVillagers.forEach(villager => {
//             console.log("Villager individual:", villager);

//             let villagerHTML = `
//                 <div class="card" style="width: 18rem; margin: 1rem;">
//                     <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 200px; object-fit: cover;">
//                     <div class="card-body">
//                         <h5 class="card-title">${villager.name}</h5>
//                         <p class="card-text">${villager.species} | ${villager.personality}</p>
//                         <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary">Ver en Nookipedia</a>
//                     </div>
//                 </div>
//             `;

//             $("#villagerContainer").append(villagerHTML);
//         });
//     })
//     .catch(error => {
//         console.error("Error en la llamada a la API:", error);
//     });
// });
