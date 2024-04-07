class Automata {
    constructor(game) {
        Object.assign(this, { game });

        this.automata = [];
        this.height = 100;
        this.width = 200;

        this.tickCount = 0;
        this.ticks = 0;

        this.speed = parseInt(document.getElementById("speed").value, 10);


        for (let col = 0; col < this.width; col++) {
            this.automata.push([]);
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = 0;
            }
        }
        this.loadRandomAutomata();
    };

    loadRandomAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = randomInt(2);
            }
        }
    };

    // addBlock(col, row) {
    //     this.automata[col][row] = 1;
    //     this.automata[col + 1][row] = 1;
    //     this.automata[col][row + 1] = 1;
    //     this.automata[col + 1][row + 1] = 1;
    // };

    // addHive(col, row, vert) {
    //     if (vert) {
    //         this.automata[col][row] = 1;
    //         this.automata[col + 1][row + 1] = 1;
    //         this.automata[col - 1][row + 1] = 1;
    //         this.automata[col + 1][row + 2] = 1;
    //         this.automata[col - 1][row + 2] = 1;
    //         this.automata[col][row + 3] = 1;
    //     } else {
    //         this.automata[col][row] = 1;
    //         this.automata[col + 1][row + 1] = 1;
    //         this.automata[col + 1][row - 1] = 1;
    //         this.automata[col + 2][row + 1] = 1;
    //         this.automata[col + 2][row - 1] = 1;
    //         this.automata[col + 3][row] = 1;
    //     }
    // };

    // addLoaf(col, row) {
    //     this.automata[col][row] = 1;
    //     this.automata[col + 1][row + 1] = 1;
    //     this.automata[col + 1][row - 1] = 1;
    //     this.automata[col + 2][row + 2] = 1;
    //     this.automata[col + 2][row - 1] = 1;
    //     this.automata[col + 3][row] = 1;
    //     this.automata[col + 3][row + 1] = 1;
    // };

    // addBoat(col, row) {
    //     this.automata[col][row] = 1;
    //     this.automata[col][row + 1] = 1;
    //     this.automata[col + 1][row] = 1;
    //     this.automata[col + 1][row + 2] = 1;
    //     this.automata[col + 2][row + 1] = 1;
    // };


    // addTub(col, row) {
    //     this.automata[col][row] = 1;
    //     this.automata[col + 1][row + 1] = 1;
    //     this.automata[col + 1][row - 1] = 1;
    //     this.automata[col + 2][row] = 1;
    // };

    // addBlinker(col, row, vert) {
    //     if (vert) {
    //         this.automata[col][row] = 1;
    //         this.automata[col][row + 1] = 1;
    //         this.automata[col][row + 2] = 1;
    //     } else {
    //         this.automata[col][row] = 1;
    //         this.automata[col + 1][row] = 1;
    //         this.automata[col + 2][row] = 1;
    //     }
    // };

    // addToad(col, row) {
    //     this.addBlinker(col, row);
    //     this.addBlinker(col + 1, row + 1);
    // };

    // addBeacon(col, row) {
    //     this.addBlock(col, row);
    //     this.addBlock(col + 2, row + 2);
    // };

    // addPulsar(col, row) {
    //     this.addBlinker(col, row, true);
    //     this.addBlinker(col + 5, row, true);
    //     this.addBlinker(col + 7, row, true);
    //     this.addBlinker(col + 12, row, true);
    //     this.addBlinker(col, row + 6, true);
    //     this.addBlinker(col + 5, row + 6, true);
    //     this.addBlinker(col + 7, row + 6, true);
    //     this.addBlinker(col + 12, row + 6, true);
    //     this.addBlinker(col + 2, row - 2, false);
    //     this.addBlinker(col + 2, row + 3, false);
    //     this.addBlinker(col + 2, row + 5, false);
    //     this.addBlinker(col + 2, row + 10, false);
    //     this.addBlinker(col + 8, row - 2, false);
    //     this.addBlinker(col + 8, row + 3, false);
    //     this.addBlinker(col + 8, row + 5, false);
    //     this.addBlinker(col + 8, row + 10, false);
    // };

    // addPenta(col, row) {
    //     this.automata[col][row] = 1;
    //     this.addBlinker(col - 1, row + 1);
    //     this.addBlinker(col - 2, row + 2);
    //     this.addBlinker(col, row + 2);
    //     this.addBlinker(col - 2, row + 9);
    //     this.addBlinker(col, row + 9);
    //     this.addBlinker(col - 1, row + 10);
    //     this.automata[col][row + 11] = 1;
    // };

    // addGosper(col, row) {
    //     this.addBlock(col, row);
    //     this.addBlinker(col + 10, row, true);
    //     this.automata[col + 11][row - 1] = 1;
    //     this.automata[col + 11][row + 3] = 1;
    //     this.automata[col + 12][row - 2] = 1;
    //     this.automata[col + 12][row + 4] = 1;
    //     this.automata[col + 13][row - 2] = 1;
    //     this.automata[col + 13][row + 4] = 1;
    //     this.automata[col + 14][row + 1] = 1;
    //     this.automata[col + 15][row - 1] = 1;
    //     this.automata[col + 15][row + 3] = 1;
    //     this.addBlinker(col + 16, row, true);
    //     this.automata[col + 17][row + 1] = 1;
    //     this.addBlinker(col + 20, row - 2, true);
    //     this.addBlinker(col + 21, row - 2, true);
    //     this.automata[col + 22][row - 3] = 1;
    //     this.automata[col + 22][row + 1] = 1;
    //     this.automata[col + 24][row - 3] = 1;
    //     this.automata[col + 24][row + 1] = 1;
    //     this.automata[col + 24][row - 4] = 1;
    //     this.automata[col + 24][row + 2] = 1;
    //     this.addBlock(col + 34, row - 2);
    // };
    
    // loadAutomata() {
    //     for (let col = 0; col < this.width; col++) {
    //         for (let row = 0; row < this.height; row++) {
    //             this.automata[col][row] = 0;
    //         }
    //     }

    //     this.addBlock(10, 10);
    //     this.addHive(14, 11, false);
    //     this.addHive(21, 10, true);
    //     this.addTub(10, 15);
    //     this.addLoaf(15, 16);
    //     this.addBoat(21, 16);

    //     this.addBlinker(30, 11);
    //     this.addToad(35, 11);
    //     this.addBeacon(41, 10);
    //     this.addPulsar(48, 11);
    //     this.addPenta(68, 9);

    //     this.addGosper(10, 50);
    // };

    count(col, row) {
        let count = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    };

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10);

        if (this.tickCount++ >= this.speed && this.speed != 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerHTML = "Ticks: " + this.ticks;

            let next = [];
            for (let col = 0; col < this.width; col++) {
                next.push([]);
                for (let row = 0; row < this.height; row++) {
                    next[col].push(0);
                }
            }

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    if (this.automata[col][row] && (this.count(col, row) === 2 || this.count(col, row) === 3)) next[col][row] = 1;
                    if (!this.automata[col][row] && this.count(col, row) === 3) next[col][row] = 1;
                }
            }
            this.automata = next;
        }
    };

    draw(ctx) {
        let size = 8;
        let gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                let cell = this.automata[col][row];
                if (cell) ctx.fillRect(col * size + gap, row * size + gap, size - 2 * gap, size - 2 * gap);
            }
        }
    };

};