const Hexagon = require("./hexagon.js");
const Player = require("./player.js");
const Dice = require("./dice.js");
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
        this.hexagons = {};
        this.addHexagons(this.size);
        this.endButtonListener();
    }

    currentPlayer() {
        return this.players[0];
    }

    ensureNoHoles() {
        let neighborHexagon;
        let currSum;
        let countedHexagons = [];
        let currPath;
        let result = true;
        // grabs first hexagon
        Object.values(this.hexagons).slice(0,1).forEach(hexagon => {
            currSum = 1;
            // if hexagon was already accounted for, skip it
            if (countedHexagons.includes(hexagon)) {
                return
            }
            // updates hexagons accounted for, for each hexagon that makes it through
            countedHexagons.push(hexagon);
            // continuously shift out hexagons and push in new hexagons to check neighbors for
            currPath = [hexagon]
            // if theres still hexagons to check neighbors for, run code
            while (currPath.length > 0) {
                // take out the first hexagon, get all positions of its neighbor, and loop through them all
                currPath.shift().findNeighbors().forEach(pos => {
                    // use position to find specific hexagon
                    neighborHexagon = this.hexagons[pos];
                    // if the position is out of bounds, go to the next position
                    if (neighborHexagon === undefined) return;
                    // if its a valid hexagon, check if its already accounted for, if not, move on
                    if (!(countedHexagons.includes(neighborHexagon))) {
                        // updates accounted hexagons
                        countedHexagons.push(neighborHexagon);
                        // total hexagons update
                        currSum += 1;
                        // if hexagon is transparent, dont add to array to check its hexagons, its a barrier
                        if (neighborHexagon.color === "transparent") return
                        currPath.push(neighborHexagon);
                    }
                })
            }
            // check total connected hexagons with all hexagons
            if (currSum !== Object.values(this.hexagons).length){
                result = false;
            }
        })
        return result;
    }

    calculateLargestContiguousSum(player) {
        let neighborHexagon;
        let largestSum = 0;
        let currSum;
        let countedHexagons = [];
        let currPath;
        let color = player.color;
        let ownedHexagons = Object.values(this.hexagons).filter(hexagon => hexagon.color === color);                
        ownedHexagons.forEach(hexagon => {
            currSum = 1;    
            if (countedHexagons.includes(hexagon)) {
                return
            }
            currPath = [hexagon]
            countedHexagons.push(hexagon);
            while (currPath.length > 0) {
                currPath.shift().findNeighbors().forEach(pos => { 
                    neighborHexagon = this.hexagons[pos];
                    if (neighborHexagon === undefined) return;
                    if ((neighborHexagon.color === hexagon.color) && (!(countedHexagons.includes(neighborHexagon)))) {
                        countedHexagons.push(neighborHexagon);
                        currPath.push(neighborHexagon);
                        currSum += 1;
                    }
                })
                if (currSum > largestSum) {
                    largestSum = currSum;
                }
            }
        })
        return largestSum;
    }

    endButtonListener() {
        document.getElementsByClassName("end-button")[0].addEventListener("click", (e) => {
            let numOfDiceToAdd = this.calculateLargestContiguousSum(this.currentPlayer());
            let ownedHexagons = Object.values(this.hexagons).filter(hexagon => hexagon.color === this.currentPlayer().color && hexagon.dices.length < 10);
            let randomHexagon;
            while (numOfDiceToAdd > 0 && ownedHexagons.length !== 0) {
                ownedHexagons = ownedHexagons.filter(hexagon => hexagon.dices.length < 10);
                randomHexagon = ownedHexagons[Math.floor(Math.random() * ownedHexagons.length)]
                if (randomHexagon === undefined) return
                randomHexagon.dices.push(new Dice());
                randomHexagon.numOfDice += 1;
                numOfDiceToAdd -= 1;
            }
            this.nextPlayer();
            this.draw(this.ctx)
        })
    }

    clearSelected() {
        Object.values(this.hexagons).forEach(hexagon => hexagon.selected = false)
    }

    checkForElimination() {
        let newPlayers = [];
        this.players.forEach((player) => {
            if(this.calculateLargestContiguousSum(player) !== 0) {
                newPlayers.push(player)
            }
        })
        this.players = newPlayers;
    }

    nextPlayer() {
        let newOrder = this.players.slice(1);
        newOrder.push(this.players[0]);
        this.players = newOrder
    }

    allObjects() {
        let arr = Object.values(this.hexagons);
        return arr;
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
                color = this.colors[Math.floor(Math.random() * this.colors.length)];
                hexagon = new Hexagon({
                    size,
                    color,
                    x,
                    y
                });
                hexagon.gridx = Math.round((x + 50) / 150);
                hexagon.gridy = Math.round((y - 100) / twoHeight);
                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;
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
                hexagon.gridx = Math.round((x - 25) / -150);
                hexagon.gridy = (Math.round(((y - 100)) / twoHeight + 0.5))
                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;
            }
        }
        if (!(this.ensureNoHoles())) {
            this.hexagons = {};
            this.addHexagons(size);
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
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${375}`, `${50 - 10}`);

        ctx.moveTo(400, 25)
        ctx.beginPath();
        ctx.lineTo(400, 75);
        ctx.lineTo(450, 75);
        ctx.lineTo(450, 25);
        ctx.lineTo(400, 25);
        ctx.fillStyle = this.players[1].color;
        ctx.fill();
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${425}`, `${50 - 10}`);
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
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${400}`, `${50 - 10}`);

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
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${350}`, `${50 - 10}`);

        ctx.moveTo(425, 25)
        ctx.beginPath();
        ctx.lineTo(425, 75);
        ctx.lineTo(475, 75);
        ctx.lineTo(475, 25);
        ctx.lineTo(425, 25);
        ctx.fillStyle = this.players[2].color;
        ctx.fill();
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[2])}`, `${450}`, `${50 - 10}`);
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
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${375}`, `${50 - 10}`);

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
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${325}`, `${50 - 10}`);

        ctx.moveTo(400, 25)
        ctx.beginPath();
        ctx.lineTo(400, 75);
        ctx.lineTo(450, 75);
        ctx.lineTo(450, 25);
        ctx.lineTo(400, 25);
        ctx.fillStyle = this.players[2].color;
        ctx.fill();
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[2])}`, `${425}`, `${50 - 10}`);

        ctx.moveTo(450, 25)
        ctx.beginPath();
        ctx.lineTo(450, 75);
        ctx.lineTo(500, 75);
        ctx.lineTo(500, 25);
        ctx.lineTo(450, 25);
        ctx.fillStyle = this.players[3].color;
        ctx.fill();
        ctx.font = '25px serif';
        ctx.textBaseline = 'hanging';
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[3])}`, `${475}`, `${50 - 10}`);
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
        } else if (this.players.length === 4) {
            this.drawFour(ctx);
        }
    }

    win(player) {
        let color;
        if (player.color === "rgb(237, 52, 86)") {
            color = "Red";
        } else if (player.color === "rgb(255, 246, 137)") {
            color = "Yellow";
        } else if (player.color === "rgb(88, 53, 94)") {
            color = "Purple";
        } else {
            color = "Blue";
        }
        if(alert(`${color} wins! Play again?`)) {
            // window.location.reload();
        } else {
            window.location.reload();
        }
    }
}

module.exports = Game;