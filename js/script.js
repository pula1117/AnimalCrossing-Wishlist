
$(document).ready(function () {
    console.log("Script cargado");

    const speciesContainers = {
        cat: "#villagerCatContainer",
        eagle: "#villagerEagleContainer",
        elephant: "#villagerElephantContainer",
        octopus: "#villagerOctopusContainer"
    };

    function hideAll() {
        for (let key in speciesContainers) {
            $(speciesContainers[key]).hide();
        }
    }

    hideAll();
    $("#loading").show();

    fetch("https://api.nookipedia.com/villagers", {
        method: "GET",
        headers: {
            "X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        $("#loading").hide();

    data.forEach(villager => {
    const speciesKey = villager.species.toLowerCase();

    if (speciesContainers[speciesKey]) {
        console.log(villager); // ✅ Muestra toda la info del personaje

        const card = `
            <div class="col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch mb-4">
                <div class="card w-100">
                    <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 300px; object-fit: cover;">
                    <div class="card-body d-flex flex-column justify-content-between">
                        <h5 class="card-title">${villager.name}</h5>
                        <p class="card-text">${villager.species}</p>
                        <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary mt-auto">Nookipedia</a>
                    </div>
                </div>
            </div>
        `;
        $(`#${speciesKey}Row`).append(card);
    }
});



    // Botones que muestran solo una especie
    $("#btnCats").click(function () {
        hideAll();
        $(speciesContainers["cat"]).show();
    });

    $("#btnEagles").click(function () {
        hideAll();
        $(speciesContainers["eagle"]).show();
    });

    $("#btnElephants").click(function () {
        hideAll();
        $(speciesContainers["elephant"]).show();
    });

    $("#btnOctopus").click(function () {
        hideAll();
        $(speciesContainers["octopus"]).show();
    });


    $(speciesContainers["cat"]).show();


    })
    .catch(error => {
        $("#loading").hide();
        console.error("Error al obtener datos:", error);
    });
});
