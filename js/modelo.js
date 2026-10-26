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
        const fichas = []; 

        // 1. Calculamos cuántas FILAS COMPLETAS de tamaño N le tocan a cada tipo de ficha
        const filasPorTipo = [
            Math.floor(this.dimension / 3),
            Math.floor(this.dimension / 3),
            Math.floor(this.dimension / 3)
        ];

        // Las filas sobrantes (cuando N no es múltiplo de 3, ej: 4x4 o 5x5) se reparten
        let sobrantes = this.dimension % 3;
        for (let i = 0; i < sobrantes; i++) {
            filasPorTipo[i]++;
        }

        // 2. Generamos el total exacto de fichas por cada uno de los 3 colores
        for (let tipo = 0; tipo < 3; tipo++) {
            const numFichas = filasPorTipo[tipo] * this.dimension;
            for (let j = 0; j < numFichas; j++) {
                fichas.push(tipo + 1); 
            }
        }

        // 3. Mezcla aleatoriamente recorriendo cada ficha e intercambiándola por otra aleatoria
        for (let i = fichas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [fichas[i], fichas[j]] = [fichas[j], fichas[i]];
        }

        // 4. Convertir el vector plano a una matriz NxN
        this.tablero = [];
        for (let fila = 0; fila < this.dimension; fila++) {
            const filaFichas = fichas.slice(fila * this.dimension, (fila + 1) * this.dimension); 
            this.tablero.push(filaFichas); // Crea una matriz agregando cada fila
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