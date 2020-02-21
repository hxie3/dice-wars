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

    start() {
        this.game.draw(this.ctx);
        let canvas = document.getElementById('game-canvas')
        canvas.addEventListener("click", (e) => {
            let border1;
            let border2;
            if (this.game.players.length === 2) {
                border1 = 350;
                border2 = 400;
            } else if (this.game.players.length === 3) {
                border1 = 325;
                border2 = 375;
            } else {
                border1 = 300;
                border2 = 350;
            }
            const mousePos = {
                x: e.clientX - canvas.offsetLeft,
                y: e.clientY - canvas.offsetTop
            };
            const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
            const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
            if (color === `rgb(0, 0, 0)`) {
                this.game.draw(this.ctx);
                this.game.clearSelected();
                return
            }
            const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);
            if (!(mousePos.x >= border1 && mousePos.x <= border2 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === hexagonSelected.color) {
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

module.exports = GameView;