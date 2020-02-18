const Dice = require("./dice.js")

class Hexagon {
    constructor(object) {
        this.color = object.color
        this.x = object.x;
        this.gridx = 0;
        this.y = object.y;
        this.gridy = 0;
        this.size = object.size;
        this.selected = false;
        this.dices = [new Dice()];
        this.numOfDice = this.dices.length;
    }

    isNeighbor(hexagon) {
        let result = false;
        let pos = [hexagon.gridx, hexagon.gridy];
        let neighbors = this.findNeighbors();
        neighbors.forEach(neighbor => {
            if (neighbor[0] === pos[0] && neighbor[1] === pos[1]) result = true;
        })
        return result
    }

    rollDice() {
        let sum = 0;
        this.dices.forEach(dice => {
            sum += dice.randomValue();
        })
        return sum;
    }

    findNeighbors() {
        let pos = [this.gridx, this.gridy];
        let newpos;
        let neighbors = []
        let dirs;
        if (this.gridx > 0) {
            dirs = [
                [0, -1],
                [0, 1],
                [this.gridx * -2, 0],
                [this.gridx * -2, 1],
                [this.gridx * -2 + 1, 0],
                [this.gridx * -2 + 1, 1]
            ]
        } else {
            dirs = [
                [0, -1],
                [0, 1],
                [this.gridx * -2, -1],
                [this.gridx * -2, 0],
                [this.gridx * -2 + 1, -1],
                [this.gridx * -2 + 1, 0]
            ]
        }
        dirs.forEach(dir => {
            newpos = [pos[0]+dir[0], pos[1]+dir[1]];
            neighbors.push(newpos);
        })
        return neighbors;
    }

    draw(ctx) {
        ctx.moveTo(this.x + this.size, 0);
        ctx.beginPath();

        for(let i = 0; i <= 6; i++) {
            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        if (this.color === "transparent") return;
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.numOfDice}`, `${this.x}`, `${this.y-10}`);
    }

    highlightDraw(ctx) {
        this.selected = true;
        ctx.moveTo(this.x + this.size, 0);
        ctx.beginPath();

        for (let i = 0; i <= 6; i++) {
            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();
        if (this.color === "transparent") return;
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";

        ctx.fillText(`${this.numOfDice}`, `${this.x}`, `${this.y-10}`);
    }

    attack(otherHexagon) {
        if (this.numOfDice === 1) {
            return
        }
        let sum = this.rollDice();
        let otherSum = otherHexagon.rollDice();
        if (sum > otherSum) {
            let promise = document.getElementsByClassName("success")[0].cloneNode(true).play();
            if (typeof promise !== undefined) {
                promise.then(() => {
                    
                }).catch(() => {

                });
            }
            otherHexagon.color = this.color
            otherHexagon.numOfDice = this.numOfDice - 1;
            this.numOfDice = 1;
            this.dices = [new Dice()]
            otherHexagon.dices = [];
            while(otherHexagon.dices.length !== otherHexagon.numOfDice) {
                otherHexagon.dices.push(new Dice());
            }
        } else {
            let promise = document.getElementsByClassName("fail")[0].cloneNode(true).play();
            if (typeof promise !== undefined) {
                promise.then(() => {
                    
                }).catch(() => {

                });
            }
            this.numOfDice = 1;
            this.dices = [new Dice()];
        }
    }
}

module.exports = Hexagon;