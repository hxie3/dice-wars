const Game = require("./game.js");
const Util = require("./util.js")

class GameView {
    constructor(object){
        this.game = new Game({
            size: object.size,
            players: object.players,
            ctx: object.ctx
        });
        this.size = object.size;
        this.players = object.players
        this.ctx = object.ctx;
    }

    start(numOfPlayers) {
        this.game.draw(this.ctx);
        if(numOfPlayers === 2) {
            let canvas = document.getElementById('game-canvas2')
            canvas.addEventListener("click", (e) => {
                const mousePos = {
                    x: e.clientX - canvas.offsetLeft,
                    y: e.clientY - canvas.offsetTop
                };
                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);
                if (!(mousePos.x >= 350 && mousePos.x <= 400 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {
                    this.game.draw(this.ctx);
                    hexagonSelected.highlightDraw(this.ctx);
                } else {
                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)
                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== "transparent")) {
                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]
                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== "rgb(0, 0, 0)")) {
                            prevHexagon.attack(hexagonSelected)
                            this.game.checkForElimination();
                            this.game.draw(this.ctx)
                            if (this.game.players.length === 1) {
                                setTimeout(() => this.game.win(this.game.players[0]), 50);
                            }
                        }
                    }
                    playerHexagons.forEach(hexagon => hexagon.selected = false);
                    this.game.draw(this.ctx);
                }
            })
        } else if (numOfPlayers === 3) {
            let canvas = document.getElementById('game-canvas3')
            canvas.addEventListener("click", (e) => {
                const mousePos = {
                    x: e.clientX - canvas.offsetLeft,
                    y: e.clientY - canvas.offsetTop
                };
                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);
                if (!(mousePos.x >= 325 && mousePos.x <= 375 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {
                    this.game.draw(this.ctx);
                    hexagonSelected.highlightDraw(this.ctx);
                } else {
                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)
                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== "transparent")) {
                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]
                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== "rgb(0, 0, 0)")) {
                            prevHexagon.attack(hexagonSelected)
                            this.game.checkForElimination();
                            this.game.draw(this.ctx)
                            if (this.game.players.length === 1) {
                                setTimeout(() => this.game.win(this.game.players[0]), 50);
                            }
                        }
                    }
                    playerHexagons.forEach(hexagon => hexagon.selected = false);
                    this.game.draw(this.ctx);
                }
            })
        } else {
            let canvas = document.getElementById('game-canvas4')
            canvas.addEventListener("click", (e) => {
                const mousePos = {
                    x: e.clientX - canvas.offsetLeft,
                    y: e.clientY - canvas.offsetTop
                };
                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);
                if (!(mousePos.x >= 300 && mousePos.x <= 350 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {
                    this.game.draw(this.ctx);
                    this.game.clearSelected();
                    hexagonSelected.highlightDraw(this.ctx);
                } else {
                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)
                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== "transparent")) {
                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]
                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== "rgb(0, 0, 0)")) {
                            prevHexagon.attack(hexagonSelected)
                            this.game.checkForElimination();
                            this.game.draw(this.ctx)
                            if (this.game.players.length === 1) {
                                setTimeout(() => this.game.win(this.game.players[0]), 50);
                            }
                        }
                    }
                    playerHexagons.forEach(hexagon => hexagon.selected = false);
                    this.game.draw(this.ctx);
                }
            })
        }
    }

    reset() {
        this.game = new Game({
            size: this.size,
            players: this.players,
            ctx: this.ctx
        });
    }
}

module.exports = GameView;