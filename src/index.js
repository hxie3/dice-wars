const Game = require("./game.js");
const GameView = require("./game_view.js");
const Util = require("./util.js");


window.addEventListener('DOMContentLoaded', (event) => {
    let canvas; 
    document.getElementsByClassName("two")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas2')
        document.getElementById('game-canvas3').classList.remove("active")
        document.getElementById('game-canvas4').classList.remove("active")
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 2,
            ctx
        });
        gameview.start(2);
    })
    document.getElementsByClassName("three")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas3')
        document.getElementById('game-canvas2').classList.remove("active")
        document.getElementById('game-canvas4').classList.remove("active")
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 3,
            ctx
        });
        gameview.start(3);
    })
    document.getElementsByClassName("four")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas4')
        document.getElementById('game-canvas2').classList.remove("active")
        document.getElementById('game-canvas3').classList.remove("active")
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 4,
            ctx
        });
        gameview.start(4);
    })
    console.log('DOM fully loaded and parsed');
});

window.GameView = GameView;
window.Game = Game;