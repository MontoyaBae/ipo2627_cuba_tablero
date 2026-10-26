document.addEventListener('DOMContentLoaded', () => {
    const modelo = new ModeloJuego();
    const vista = new VistaJuego();
    const controlador = new ControladorJuego(modelo, vista);
});