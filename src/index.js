const Game = require("./game.js");
const GameView = require("./game_view.js");

window.addEventListener('DOMContentLoaded', (event) => {
    let canvas; 
    document.getElementsByClassName("two")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas')
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 2,
            ctx
        });
        gameview.start();
    })
    document.getElementsByClassName("three")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas')
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 3,
            ctx
        });
        gameview.start();
    })
    document.getElementsByClassName("four")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas')
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 4,
            ctx
        });
        gameview.start();
    })
});

window.GameView = GameView;
window.Game = Game;