const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();
    alert(`
    ¡El formulario fue enviado con éxito!
    Muchas gracias por su mensaje`);
})