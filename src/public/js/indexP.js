const socket = io()
document.getElementById('prod-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombreInput = document.getElementById('nombre');
    const nombre = nombreInput.value;
    nombreInput.value = '';

    const apellidoInput = document.getElementById('apellido');
    const apellido = apellidoInput.value;
    apellidoInput.value = '';

    const edadInput = document.getElementById('edad');
    const edad = edadInput.value;
    edadInput.value = '';

    const newProduct = {
        nombre: nombre,
        apellido: apellido,
        edad: edad,
    };
    socket.emit("newProd", newProduct);
});

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `A continuación verás la lista actualizada`,
        confirmButtonText: 'Aceptar', // Cambia el texto del botón Aceptar
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload(); // Recarga la página cuando se hace clic en Aceptar
        }
    });
});
