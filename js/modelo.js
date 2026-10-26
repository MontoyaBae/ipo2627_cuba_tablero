class ModeloJuego {
    //Objeto que por defecto tiene parametros y dado unos parametros crea un tablero base
    constructor(dimension = 3, tamano = 'mediana', aspecto = 'circulo') {
        this.dimension = parseInt(dimension, 10); //No entiendo este parseint
        this.tamano = tamano;
        this.aspecto = aspecto;
        this.tablero = []; 
        this.juegoGanado = false;

        this.inicializarTablero();
    }

    inicializarTablero() {
        this.juegoGanado = false; 
        const totalCeldas = this.dimension * this.dimension;
        const fichas = []; 

        // repartimos equilibradamente los tipos de ficha
        for (let i = 0; i < totalCeldas; i++) {
            const tipo = (i % 3) + 1; // Cambiar 3 por la dimension?
            fichas.push(tipo); //obtenemos finalmente una lista con 1,2,3 repetidos
        }

        // Mezcla aleatoriamente recorriendo cada ficha e intercambiandola por otra aleatoria
        for (let i = fichas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fichas[i], fichas[j]] = [fichas[j], fichas[i]];
        }

        // Convertir el vector plano a una matriz NxN
        this.tablero = [];
        for (let fila = 0; fila < this.dimension; fila++) {
            const filaFichas = fichas.slice(fila * this.dimension, (fila + 1) * this.dimension); //mirar esto
            this.tablero.push(filaFichas); //crea una matriz con cada fila
        }

        // Si casualmente arranca resuelto, volvemos a mezclar
        if (this.comprobarVictoria()) {
            this.inicializarTablero();
        }
    }

    intercambiarFichas(origen, destino) {
        const temp = this.tablero[origen.fila][origen.col];
        this.tablero[origen.fila][origen.col] = this.tablero[destino.fila][destino.col];
        this.tablero[destino.fila][destino.col] = temp;

        this.juegoGanado = this.comprobarVictoria();
    }

    comprobarVictoria() {
        for (let r = 0; r < this.dimension; r++) {
            const primerTipo = this.tablero[r][0]; //mira el tipo del primer elemento de la fila
            for (let c = 1; c < this.dimension; c++) {
                if (this.tablero[r][c] !== primerTipo) { //luego comprueba de que el resto de elementos de la fila tengan el mismo tipo
                    return false;
                }
            }
        }
        return true;
    }

    setDimension(dim) {
        this.dimension = parseInt(dim, 10);
        this.inicializarTablero();
    }

    setTamano(tamano) {
        this.tamano = tamano;
    }

    setAspecto(aspecto) {
        this.aspecto = aspecto;
    }
}