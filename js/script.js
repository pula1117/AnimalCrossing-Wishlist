$(document).ready(function () {
    

    const speciesContainers = {
        Cat: "#villagerCatContainer",
        Eagle: "#villagerEagleContainer",
        Elephant: "#villagerElephantContainer",
        Duck: "#villagerDuckContainer"
    };

    // Función para ocultar todos los contenedores de especies
    // Se utiliza para ocultar los contenedores de especies al inicio
    function hideAll() {
        for (let key in speciesContainers) {
            $(speciesContainers[key]).hide();
        }
    }

    // Al principio, ocultar todos los contenedores
    hideAll();

    // Mostrar el spinner mientras se cargan los datos
    $("#loading").show();

    // Llamada a la API
    fetch("https://api.nookipedia.com/villagers", {
        method: "GET",
        headers: {
            "X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
        }
    })
    // Manejo de la respuesta
    // Si la API responde correctamente
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
    })
    // Manejo de los datos
    // Si la API devuelve los datos correctamente
    .then(data => {
        // Ocultar el spinner cuando los datos llegan
        $("#loading").hide();

        data.forEach(villager => {
            // Crear un contenedor para cada especie
            if (speciesContainers[villager.species]) {
                const card = `
                    <div class="card m-2" style="width: 18rem;">
                        <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 450px, weight:250px; object-fit: cover;">
                        <div class="card-body">
                            <h5 class="card-title">${villager.name}</h5>
                            <p class="card-text">${villager.species}</p>
                            <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="btn btn-primary">Nookipedia</a>
                        </div>
                    </div>
                `;
                $(speciesContainers[villager.species]).append(card);


                 // Mostrar todas las propiedades del personaje
                console.log(villager);
            }
        });

        // Activar botones después de que se carguen los datos
        $("#btnCats").click(function () {
            hideAll();
            $(speciesContainers["Cat"]).show();
        });

        $("#btnEagles").click(function () {
            hideAll();
            $(speciesContainers["Eagle"]).show();
        });

        $("#btnElephants").click(function () {
            hideAll();
            $(speciesContainers["Elephant"]).show();
        });

        $("#btnDucks").click(function () {
            hideAll();
            $(speciesContainers["Duck"]).show();
        });
    })
    // Manejo de errores
    // Si la API no responde o hay un error en la red
    .catch(error => {
        
        $("#loading").hide();
        console.error("Error al obtener datos:", error);
    });
});
