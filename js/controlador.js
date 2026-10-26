class ControladorJuego {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;

        this.inicializarEventos();
        this.vista.renderizarTablero(this.modelo);
    }

    inicializarEventos() {
        // Eventos del panel de opciones
        this.vista.selectDimension.addEventListener('change', (e) => {
            this.modelo.setDimension(e.target.value);
            this.vista.renderizarTablero(this.modelo);
        });

        this.vista.selectTamano.addEventListener('change', (e) => {
            this.modelo.setTamano(e.target.value);
            this.vista.renderizarTablero(this.modelo);
        });

        this.vista.selectAspecto.addEventListener('change', (e) => {
            this.modelo.setAspecto(e.target.value);
            this.vista.renderizarTablero(this.modelo);
        });

        this.vista.btnReiniciar.addEventListener('click', () => {
            this.modelo.inicializarTablero();
            this.vista.renderizarTablero(this.modelo);
        });

        // Eventos Drag & Drop delegados en el contenedor del tablero
        const tablero = this.vista.elTablero;

        // 1. Inicio de arrastre (dragstart)
        tablero.addEventListener('dragstart', (e) => {
            const ficha = e.target.closest('.ficha');
            if (!ficha) return;

            const datosOrigen = {
                fila: parseInt(ficha.getAttribute('data-fila'), 10),
                col: parseInt(ficha.getAttribute('data-col'), 10)
            };

            // Transferir coordenadas de la ficha como JSON
            e.dataTransfer.setData('text/plain', JSON.stringify(datosOrigen));
            e.dataTransfer.effectAllowed = 'move';
        });

        // 2. Permitir soltar sobre la celda (dragover)
        tablero.addEventListener('dragover', (e) => {
            e.preventDefault(); // Necesario para permitir la acción de 'drop'
            e.dataTransfer.dropEffect = 'move';
        });

        // 3. Indicador visual al entrar en celda objetivo (dragenter)
        tablero.addEventListener('dragenter', (e) => {
            const celda = e.target.closest('.celda');
            if (celda) {
                celda.classList.add('drag-over');
            }
        });

        // 4. Retirar indicador visual al salir de celda objetivo (dragleave)
        tablero.addEventListener('dragleave', (e) => {
            const celda = e.target.closest('.celda');
            if (celda && !celda.contains(e.relatedTarget)) {
                celda.classList.remove('drag-over');
            }
        });

        // 5. Acción de soltar e intercambiar fichas (drop)
        tablero.addEventListener('drop', (e) => {
            e.preventDefault();

            // Limpiar estilos visuales de arrastre
            document.querySelectorAll('.celda.drag-over').forEach(c => c.classList.remove('drag-over'));

            const celdaDestino = e.target.closest('.celda');
            if (!celdaDestino) return;

            const destino = {
                fila: parseInt(celdaDestino.getAttribute('data-fila'), 10),
                col: parseInt(celdaDestino.getAttribute('data-col'), 10)
            };

            const dataRaw = e.dataTransfer.getData('text/plain');
            if (!dataRaw) return;

            const origen = JSON.parse(dataRaw);

            // Solo intercambiamos si las coordenadas son distintas
            if (origen.fila !== destino.fila || origen.col !== destino.col) {
                this.modelo.intercambiarFichas(origen, destino);
                this.vista.renderizarTablero(this.modelo);
            }
        });
    }
}