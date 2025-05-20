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
                console.log(villager); // Muestra toda la info del personaje

                const card = `
                    <div class="col-6 col-md-3 col-lg-3 mb-4 px-2">

                        <a href="https://nookipedia.com/wiki/${encodeURIComponent(villager.name)}" target="_blank" class="card-link-wrapper text-decoration-none w-100">
                            <div class="card shadow-sm border-0" style="border-radius: 1rem; overflow: hidden;">
                                <img src="${villager.image_url}" class="card-img-top" alt="${villager.name}" style="height: 480px; object-fit: cover;">
                                <div class="card-body text-dark p-2 d-flex justify-content-center align-items-center" style="height: auto; background: white;">
                                    <h5 class="card-title m-0">${villager.name}</h5>
                                </div>
                            </div>
                        </a>
                    </div>
                `;



                $(`#${speciesKey}Row`).append(card);
            }
        });

        // Función para marcar botón activo
        function setActiveTab(buttonId) {
            $(".btn-tab").removeClass("active-tab");
            $(`#${buttonId}`).addClass("active-tab");
        }

        // Botones con efecto de pestaña
        $("#btnCats").click(function () {
            hideAll();
            $(speciesContainers["cat"]).show();
            setActiveTab("btnCats");
        });

        $("#btnEagles").click(function () {
            hideAll();
            $(speciesContainers["eagle"]).show();
            setActiveTab("btnEagles");
        });

        $("#btnElephants").click(function () {
            hideAll();
            $(speciesContainers["elephant"]).show();
            setActiveTab("btnElephants");
        });

        $("#btnOctopus").click(function () {
            hideAll();
            $(speciesContainers["octopus"]).show();
            setActiveTab("btnOctopus");
        });

        // Mostrar inicialmente los gatos y marcar el botón
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
      form.addEventListener('submit', function (event) {
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
          } else {
              emailInput.setCustomValidity("");
          }

          // Validar contraseña
          if (!specialCharRegex.test(password)) {
              passwordInput.setCustomValidity("La contraseña debe contener al menos un carácter especial.");
              valid = false;
          } else {
              passwordInput.setCustomValidity("");
          }

          if (!form.checkValidity() || !valid) {
              event.preventDefault();
              event.stopPropagation();
          }

          form.classList.add('was-validated');
      }, false);
  }