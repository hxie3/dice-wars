const Game = require("./game.js");
const GameView = require("./game_view.js");

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementsByClassName("play-again")[0].addEventListener("click", e => {
        e.preventDefault();
        window.location.reload();
    })
    document.getElementsByClassName("not-again")[0].addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("win-background").classList.add("hidden");
    })
    let modalBackground = document.getElementById('modal-background');
    modalBackground.addEventListener("click", e => {
        e.preventDefault();
        modalBackground.classList.add("hidden");
    })
    document.getElementById("modal-child").addEventListener('click', e => {
        e.stopPropagation();
    })
    document.getElementsByClassName("legend")[0].addEventListener("click", e => {
        e.preventDefault();
        modalBackground.classList.remove("hidden");
    })
    let canvas;
    document.getElementsByClassName("one")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas')
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 4,
            computer: true,
            ctx,
        });
        gameview.start();
    })
    document.getElementsByClassName("two")[0].addEventListener("click", (event) => {
        document.getElementsByClassName("player-buttons")[0].classList.add("hidden");
        canvas = document.getElementById('game-canvas')
        canvas.classList.add("active")
        let ctx = canvas.getContext('2d');
        let gameview = new GameView({
            size: 50,
            players: 2,
            computer: false,
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
            computer: false,
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
            computer: false,
            ctx
        });
        gameview.start();
    })
});

window.GameView = GameView;
window.Game = Game;