const Hexagon = require("./hexagon.js");
const Player = require("./player.js");
const DIM_X = 1000;
const DIM_Y = 1000;
const COLORS = ["rgb(237, 52, 86)", "rgb(255, 246, 137)", "rgb(88, 53, 94)", "rgb(122, 231, 199)"];

class Game {
    constructor(object) {
        this.players = [];
        this.addPlayers(object.players);
        this.colors = COLORS.slice(0, this.players.length);
        this.colors.push("transparent");
        this.size = object.size;
        this.ctx = object.ctx
        this.hexagons = [];
        this.addHexagons(this.size);
        this.endButtonListener();
    }

    currentPlayer() {
        return this.players[0];
    }

    // calculateLargestContiguousSum(playerHexagon) {
    //     let newpos;
    //     let color = playerHexagon.color;
    //     let result = false;
    //     // let ownedHexagons = this.hexagons.filter(hexagon => hexagon.color === color);
    //     let dirs = [
    //         [(this.hexagons[0].size + (2 * this.hexagons[0].x)), this.hexagons[0].y],
    //         [(this.hexagons[0].size - (2 * this.hexagons[0].x)), this.hexagons[0].y],
    //         [(this.hexagons[0].size + (this.hexagons[0].x), (this.hexagons[0].y + Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],
    //         [(this.hexagons[0].size + (this.hexagons[0].x), (this.hexagons[0].y - Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],
    //         [(this.hexagons[0].size - (this.hexagons[0].x), (this.hexagons[0].y + Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],
    //         [(this.hexagons[0].size - (this.hexagons[0].x), (this.hexagons[0].y - Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],
    //     ]
    //     dirs.forEach(dir => {
    //         newpos = (playerHexagon.x + dir[0], playerHexagon.y + dir[1]);
            
    //     })
    // }

    endButtonListener() {
        document.getElementsByClassName("end-button")[0].addEventListener("click", (e) => {
            this.nextPlayer();
            this.draw(this.ctx);
        })
    }

    nextPlayer() {
        let newOrder = this.players.slice(1);
        newOrder.push(this.players[0]);
        this.players = newOrder
    }

    allObjects() {
        let newarr = this.hexagons.slice();
        return newarr;
    }

    addPlayers(num) {
        for (let i = 0; i < num; i++) {
            this.players.push(new Player(COLORS[i]))
        }
    }

    addHexagons(size) {
        let color;
        let hexagon;
        let twoHeight = Math.sqrt((size * size) - ((size / 2) * (size / 2))) * 2;
        for(let x = 100; x <= 700; x += 150) {
            for(let y = 100 + twoHeight; y <= 750; y += twoHeight) {
                if (x === 100 || y === 100 || x === 700) {
                    color = this.colors[Math.floor(Math.random() * (this.colors.length - 1))];
                } else {
                    color = this.colors[Math.floor(Math.random() * this.colors.length)];
                }
                hexagon = new Hexagon({
                    size,
                    color,
                    x,
                    y
                });
                this.hexagons.push(hexagon);
            }
        }
        for (let x = 175; x <= 625; x += 150) {
            for (let y = 100 + twoHeight / 2; y <= 700; y += twoHeight) {
                color = this.colors[Math.floor(Math.random() * this.colors.length)];
                hexagon = new Hexagon({
                    size,
                    color,
                    x,
                    y
                });
                this.hexagons.push(hexagon);
            }
        }
    }

    drawTwo(ctx) {
        ctx.moveTo(350, 25)
        ctx.beginPath();
        ctx.lineTo(350, 75);
        ctx.lineTo(400, 75);
        ctx.lineTo(400, 25);
        ctx.lineTo(350, 25);
        ctx.lineTo(350, 75)
        ctx.fillStyle = this.players[0].color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();

        ctx.moveTo(400, 25)
        ctx.beginPath();
        ctx.lineTo(400, 75);
        ctx.lineTo(450, 75);
        ctx.lineTo(450, 25);
        ctx.lineTo(400, 25);
        ctx.fillStyle = this.players[1].color;
        ctx.fill();

    }

    drawThree(ctx) {
        ctx.moveTo(375, 25)
        ctx.beginPath();
        ctx.lineTo(375, 75);
        ctx.lineTo(425, 75);
        ctx.lineTo(425, 25);
        ctx.lineTo(375, 25);
        ctx.lineTo(375, 75);
        ctx.fillStyle = this.players[1].color;
        ctx.fill();

        ctx.moveTo(325, 25)
        ctx.beginPath();
        ctx.lineTo(325, 75);
        ctx.lineTo(375, 75);
        ctx.lineTo(375, 25);
        ctx.lineTo(325, 25);
        ctx.lineTo(325, 75);
        ctx.fillStyle = this.players[0].color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();

        ctx.moveTo(425, 25)
        ctx.beginPath();
        ctx.lineTo(425, 75);
        ctx.lineTo(475, 75);
        ctx.lineTo(475, 25);
        ctx.lineTo(425, 25);
        ctx.fillStyle = this.players[2].color;
        ctx.fill();
    }

    drawFour(ctx) {
        ctx.moveTo(350, 25)
        ctx.beginPath();
        ctx.lineTo(350, 75);
        ctx.lineTo(400, 75);
        ctx.lineTo(400, 25);
        ctx.lineTo(350, 25);
        ctx.lineTo(350, 75);
        ctx.fillStyle = this.players[1].color;
        ctx.fill();

        ctx.moveTo(300, 25)
        ctx.beginPath();
        ctx.lineTo(300, 75);
        ctx.lineTo(350, 75);
        ctx.lineTo(350, 25);
        ctx.lineTo(300, 25);
        ctx.lineTo(300, 75);
        ctx.fillStyle = this.players[0].color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();

        ctx.moveTo(400, 25)
        ctx.beginPath();
        ctx.lineTo(400, 75);
        ctx.lineTo(450, 75);
        ctx.lineTo(450, 25);
        ctx.lineTo(400, 25);
        ctx.fillStyle = this.players[2].color;
        ctx.fill();

        ctx.moveTo(450, 25)
        ctx.beginPath();
        ctx.lineTo(450, 75);
        ctx.lineTo(500, 75);
        ctx.lineTo(500, 25);
        ctx.lineTo(450, 25);
        ctx.fillStyle = this.players[3].color;
        ctx.fill();
    }

    draw(ctx) {
        ctx.clearRect(0, 0, DIM_X, DIM_Y);
        this.allObjects().forEach(el => {
            el.draw(ctx)
        })
        if (this.players.length === 2) {
            this.drawTwo(ctx);
        } else if (this.players.length === 3) {
            this.drawThree(ctx);
        } else {
            this.drawFour(ctx);
        }
    }
}

module.exports = Game;