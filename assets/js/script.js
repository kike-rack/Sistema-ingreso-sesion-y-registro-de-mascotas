document.addEventListener("DOMContentLoaded", () => {

  //Clases mascota y veterinario

    class Mascota {
        constructor(nombre, tutor, evolucionMedica) {
        this.nombre = nombre;
        this.tutor = tutor;
        this.evolucionMedica = evolucionMedica;
        }

    resumen() {
        return `Mascota: ${this.nombre} | Tutor: ${this.tutor} | Evolución: ${this.evolucionMedica}`;
        }
    }

    class Veterinario {
        constructor(nombreUsuario, contrasena) {
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contrasena;
        this.pacientes = [];
        }

    autenticar(usuario, password) {
        return (
            this.nombreUsuario === usuario &&
            this.contrasena === password
        );
    }

    agregarPaciente(mascota) {
        this.pacientes.push(mascota);
        }

    obtenerPacientes() {
        return this.pacientes;
        }
    }

  //Datos para la autenticacion

    const veterinarios = [
        new Veterinario("Ace Ventura", "Ventura"),
        new Veterinario("Thornberry", "123456")
    ];

    let veterinarioActual = null;

  //Elementos del DOM

    const mensaje = document.getElementById("mensajes");
    const listaPacientes = document.getElementById("listaPacientes");
    const seccionMascota = document.getElementById("seccionMascota");
    const seccionLista = document.getElementById("seccionLista");

    const formLogin = document.getElementById("formLogin");
    const formMascota = document.getElementById("formMascota");

  //Funciones UI

    const mostrarMensaje = (texto, tipo) => {
        mensaje.innerHTML = `
        <div class="alert alert-${tipo}" role="alert">
            ${texto}
        </div>
        `;
    };

    const renderizarPacientes = () => {

    listaPacientes.innerHTML = "";

    if (!veterinarioActual || veterinarioActual.pacientes.length === 0) {
        listaPacientes.innerHTML =
            `<li class="list-group-item">No hay pacientes registrados</li>`;
            return;
    }

    veterinarioActual.pacientes.forEach(p => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = p.resumen();
        listaPacientes.appendChild(li);
        });
    };

  //Logging

    formLogin.addEventListener("submit", e => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    const vet = veterinarios.find(v =>
        v.autenticar(usuario, password)
    );

    if (vet) {
        veterinarioActual = vet;

        mostrarMensaje(`Bienvenido ${vet.nombreUsuario}`, "success");

        seccionMascota.style.display = "block";
        seccionLista.style.display = "block";

      renderizarPacientes(); // limpiar/mostrar lista del nuevo usuario

    } else {
        mostrarMensaje("Credenciales incorrectas", "danger");
    }
});

  //Registro de mascota

    formMascota.addEventListener("submit", e => {
    e.preventDefault();

    if (!veterinarioActual) {
        mostrarMensaje("Debe iniciar sesión primero", "warning");
        return;
    }

    const nombre = document.getElementById("nombreMascota").value;
    const tutor = document.getElementById("tutorMascota").value;
    const evolucion = document.getElementById("evolucionMascota").value;

    const mascota = new Mascota(nombre, tutor, evolucion);

    veterinarioActual.agregarPaciente(mascota);

    renderizarPacientes();

    mostrarMensaje("Mascota registrada correctamente", "success");

    formMascota.reset();
});

});

alert("Bienvenido al sistema veterinario.\n\n Para probarlo, inicializa con las siguientes credenciales \nUsuario: Ace Ventura \nContraseña: Ventura \n o también: \n Usuario: Thornberry \nContraseña: 123456")
