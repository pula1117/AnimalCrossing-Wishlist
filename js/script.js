$(document).ready(function() {
	console.log("Script cargado");
	const speciesContainers = {
		cat: "#villagerCatContainer",
		eagle: "#villagerEagleContainer",
		ostrich: "#villagerOstrichContainer",
		squirrel: "#villagerSquirrelContainer"
	};

	function hideAll() {
		for (let key in speciesContainers) {
			$(speciesContainers[key]).hide();
		}
	}
	hideAll();

	// Mostrar el loader
	$("#loading").show();

	//Llamada a la API de Nookipedia
	fetch("https://api.nookipedia.com/villagers", {
			method: "GET",
			headers: {
				"X-API-KEY": "2cb526da-fa3e-4a24-b550-6aad92eb0c02"
			}
		})

		// Manejo de errores
		.then(response => {
			if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
			return response.json();
		})

		// Manejo de datos
		.then(data => {

			// Ocultar el loader
			$("#loading").hide();

			data.forEach(villager => {
				const speciesKey = villager.species.toLowerCase();

				if (speciesContainers[speciesKey]) {
					// Redirigir a páginas locales para ciertos personajes
					const url = (() => {
						switch (villager.name) {
							case "Apollo":
								return "details.html";
							case "Bob":
								return "details2.html";
							case "Julia":
								return "details4.html";
							case "Marshal":
								return "details3.html";
							default:
								return `https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}`;
						}
					})();
					// Crear por html desde el js las cards
					const card = `
                    <div class="col-6 col-md-3 col-lg-3 mb-4 px-2">
                        <a href="${url}" target="_blank" class="card-link-wrapper text-decoration-none w-100">
                            <div class="card shadow-sm border-0" style="border-radius: 1rem; overflow: hidden; min-height: 300px;">
                                <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}">
                                <div class="card-body text-dark p-3 d-flex justify-content-center align-items-center">
                                    <h5 class="card-title m-0">${villager.name}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;
					// Añadir la card al contenedor correspondiente
					$(`#${speciesKey}Row`).append(card);
				}
			});
			// Botón activo de filtro
			function setActiveTab(buttonId) {
				$(".btn-tab").removeClass("active-tab");
				$(`#${buttonId}`).addClass("active-tab");
			}

			// Asignar handlers
			$("#btnCats").click(function() {
				hideAll();
				$(speciesContainers["cat"]).show();
				setActiveTab("btnCats");
			});

			$("#btnEagles").click(function() {
				hideAll();
				$(speciesContainers["eagle"]).show();
				setActiveTab("btnEagles");
			});

			$("#btnOstrich").click(function() {
				hideAll();
				$(speciesContainers["ostrich"]).show();
				setActiveTab("btnOstrich");
			});

			$("#btnSquirrel").click(function() {
				hideAll();
				$(speciesContainers["squirrel"]).show();
				setActiveTab("btnSquirrel");
			});
			// Mostrar inicialmente los gatos al cargar la pagina y marcar el botón
			$(speciesContainers["cat"]).show();

			setActiveTab("btnCats");
		})
        
        .catch(error => {
			$("#loading").hide();
			console.error("Error al obtener datos:", error);
		});
});

// VALIDACIÓN DE FORMULARIO
const form = document.querySelector('.needs-validation');
if (form) {
	form.addEventListener('submit', function(event) {
		const passwordInput = document.getElementById('password');
		const emailInput = document.getElementById('email');
		const password = passwordInput.value;
		const email = emailInput.value;
		const specialCharRegex = /[^A-Za-z0-9]/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		let valid = true;

		// Validar email
		if (!emailRegex.test(email)) {
			emailInput.setCustomValidity("Introduce un email válido.");
			valid = false;
		} 
        // Validar longitud de email
        else {
			emailInput.setCustomValidity("");
		}
		// Validar contraseña
		if (!specialCharRegex.test(password)) {
			passwordInput.setCustomValidity("La contraseña debe contener al menos un carácter especial.");
			valid = false;
		} 
        //Validar longitud de contraseña
        else {
			passwordInput.setCustomValidity("");
		}
        // Validar longitud de contraseña
		if (!form.checkValidity() || !valid) {
			event.preventDefault();
			event.stopPropagation();
		}
		form.classList.add('was-validated');
	}, false);
}