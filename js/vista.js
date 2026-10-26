class VistaJuego {
    constructor() {
        // Selección de elementos usando atributos data-*
        this.elTablero = document.querySelector('#tablero');
        this.elMensajeVictoria = document.querySelector('[data-ui="victoria"]');
        this.selectDimension = document.querySelector('[data-control="dimension"]');
        this.selectTamano = document.querySelector('[data-control="tamano"]');
        this.selectAspecto = document.querySelector('[data-control="aspecto"]');
        this.btnReiniciar = document.querySelector('[data-action="reiniciar"]');
    }
    renderizarTablero(modelo) {
        this.elTablero.innerHTML = '';
        this.elTablero.setAttribute('data-dimension', modelo.dimension);

        // Ajuste dinámico de CSS Grid según N (revisar esto)
        this.elTablero.style.gridTemplateColumns = `repeat(${modelo.dimension}, 1fr)`;
        this.elTablero.style.gridTemplateRows = `repeat(${modelo.dimension}, 1fr)`;
        //esto añade el tablero de juego dinamicacmente
        for (let r = 0; r < modelo.dimension; r++) {
            for (let c = 0; c < modelo.dimension; c++) {
                const celda = document.createElement('div');
                celda.classList.add('celda');
                celda.setAttribute('data-fila', r);
                celda.setAttribute('data-col', c);

                const tipoFicha = modelo.tablero[r][c];
                const ficha = document.createElement('div');
                ficha.classList.add('ficha');
                ficha.setAttribute('draggable', 'true');
                ficha.setAttribute('data-tipo', tipoFicha);
                ficha.setAttribute('data-aspecto', modelo.aspecto);
                ficha.setAttribute('data-tamano', modelo.tamano);
                ficha.setAttribute('data-fila', r);
                ficha.setAttribute('data-col', c);

                celda.appendChild(ficha);
                this.elTablero.appendChild(celda);
            }
        }

        this.mostrarVictoria(modelo.juegoGanado);
    }


    mostrarVictoria(mostrar) {
        if (mostrar) {
            this.elMensajeVictoria.classList.remove('oculto');
        } else {
            this.elMensajeVictoria.classList.add('oculto');
        }
    }
}
