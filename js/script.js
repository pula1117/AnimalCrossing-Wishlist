$(document).ready(function(){
    console.log("ready!");
    
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
        return response.json(); // Convertir la respuesta a JSON
    })
    .then(data => {
        console.log("Datos recibidos:", data); // Mostrar los datos en consola
    })
    .catch(error => {
        console.error("Error en la llamada a la API:", error);
    });
});
