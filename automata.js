class Automata {
    constructor(game) {
        this.game = game;
        this.automata = [];
        this.height = 200;
        this.width = 200;
        this.tickCount = 0;
        this.ticks = 0;
        this.speed = parseInt(document.getElementById("speed").value, 10) || 60;

        // Initialize the automata grid
        for (let col = 0; col < this.width; col++) {
            this.automata.push(new Array(this.height).fill(0));
        }

         // Load a random setup to start
        this.loadRandomAutomata();

        // load a preset from html
        this.initializeUIControls();
       
    }

    reset() {
        // To clear the grid
        this.automata.forEach(row => row.fill(0));
        

        this.loadRandomAutomata();

        // Reset any other state variables as needed
        this.ticks = 0;
        // Update display elements if necessary
        document.getElementById('ticks').innerText = "Ticks: 0";
    }


    initializeUIControls() {
        const applyPresetsBtn = document.getElementById('applyPresetsBtn');
        if (applyPresetsBtn) {
            applyPresetsBtn.addEventListener('click', () => {
                const selectedPresets = Array.from(document.getElementById('presetSelector').selectedOptions).map(option => option.value);
                this.loadPresets(selectedPresets);
            });
        }

        const resetBtn = document.getElementById('resetBtn');
        // if (resetBtn) {
            resetBtn.addEventListener('click', () => this.reset());
        // }
    }

    loadRandomAutomata() {
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                this.automata[col][row] = Math.floor(Math.random() * 2);
            }
        }
    }

    // Preset configurations

    loadPresets(presetNames) {
        this.automata = this.automata.map(row => row.fill(0)); // Clear current state before applying presets
        const presets = {
            glider: [{col: 1, row: 0}, {col: 2, row: 1}, {col: 0, row: 2}, {col: 1, row: 2}, {col: 2, row: 2}],
            smallExploder: [{col: 1, row: 0}, {col: 0, row: 1}, {col: 1, row: 1}, {col: 2, row: 1}, {col: 0, row: 2}, {col: 2, row: 2}, {col: 1, row: 3}],
            lwss: [{col: 0, row: 1}, {col: 3, row: 1}, {col: 4, row: 2}, {col: 0, row: 3}, {col: 4, row: 3}, {col: 1, row: 4}, {col: 2, row: 4}, {col: 3, row: 4}, {col: 4, row: 4}],
            gosperGliderGun: [
                {col: 1, row: 5}, {col: 1, row: 6}, {col: 2, row: 5}, {col: 2, row: 6},
                {col: 11, row: 5}, {col: 11, row: 6}, {col: 11, row: 7}, {col: 12, row: 4},
                {col: 12, row: 8}, {col: 13, row: 3}, {col: 13, row: 9}, {col: 14, row: 3},
                {col: 14, row: 9}, {col: 15, row: 6}, {col: 16, row: 4}, {col: 16, row: 8},
                {col: 17, row: 5}, {col: 17, row: 6}, {col: 17, row: 7}, {col: 18, row: 6},
                {col: 21, row: 3}, {col: 21, row: 4}, {col: 21, row: 5}, {col: 22, row: 3},
                {col: 22, row: 4}, {col: 22, row: 5}, {col: 23, row: 2}, {col: 23, row: 6},
                {col: 25, row: 1}, {col: 25, row: 2}, {col: 25, row: 6}, {col: 25, row: 7},
                {col: 35, row: 3}, {col: 35, row: 4}, {col: 36, row: 3}, {col: 36, row: 4}
            ],
            diehard: [
                {col: 7, row: 2}, {col: 8, row: 2}, {col: 8, row: 3}, {col: 12, row: 3},
                {col: 13, row: 1}, {col: 13, row: 3}, {col: 14, row: 3}
            ]
            
        };
        presetNames.forEach(presetName => {
            presets[presetName].forEach(({col, row}) => {
                if (this.automata[col] && this.automata[col][row] !== undefined) {
                    this.automata[col][row] = 1;
                }
            });
        });
    }
    

    countNeighbors(col, row) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i || j) && this.automata[col + i] && this.automata[col + i][row + j]) count++;
            }
        }
        return count;
    }

    update() {
        this.speed = parseInt(document.getElementById("speed").value, 10) || 60;

        if (this.tickCount++ >= this.speed && this.speed !== 120) {
            this.tickCount = 0;
            this.ticks++;
            document.getElementById('ticks').innerText = "Ticks: " + this.ticks;

            let next = this.automata.map(row => new Array(this.height).fill(0));

            for (let col = 0; col < this.width; col++) {
                for (let row = 0; row < this.height; row++) {
                    const neighbors = this.countNeighbors(col, row);
                    const alive = this.automata[col][row] === 1;
                    if (alive && (neighbors === 2 || neighbors === 3)) next[col][row] = 1;
                    else if (!alive && neighbors === 3) next[col][row] = 1;
                }
            }

            this.automata = next;
        }
    }

    draw(ctx) {
        const size = 8;
        const gap = 1;
        ctx.fillStyle = "Black";
        for (let col = 0; col < this.width; col++) {
            for (let row = 0; row < this.height; row++) {
                if (this.automata[col][row]) {
                    ctx.fillRect(col * (size + gap), row * (size + gap), size - 2 * gap, size - 2 * gap);
                }
            }
        }
    }
}
