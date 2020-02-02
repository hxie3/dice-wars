/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Hexagon = __webpack_require__(/*! ./hexagon.js */ \"./src/hexagon.js\");\nconst Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst DIM_X = 1000;\nconst DIM_Y = 1000;\nconst COLORS = [\"rgb(237, 52, 86)\", \"rgb(255, 246, 137)\", \"rgb(88, 53, 94)\", \"rgb(122, 231, 199)\"];\n\nclass Game {\n    constructor(object) {\n        this.players = [];\n        this.addPlayers(object.players);\n        this.colors = COLORS.slice(0, this.players.length);\n        this.colors.push(\"transparent\");\n        this.size = object.size;\n        this.ctx = object.ctx\n        this.hexagons = {};\n        this.addHexagons(this.size);\n        this.endButtonListener();\n    }\n\n    currentPlayer() {\n        return this.players[0];\n    }\n\n    // calculateLargestContiguousSum(player) {\n    //     let newpos;\n    //     let color = playerHexagon.color;\n    //     let result = false;\n    //     let ownedHexagons = this.hexagons.filter(hexagon => hexagon.color === color);\n    //     let dirs = [\n    //         [(this.hexagons[0].size + (2 * this.hexagons[0].x)), this.hexagons[0].y],\n    //         [(this.hexagons[0].size - (2 * this.hexagons[0].x)), this.hexagons[0].y],\n    //         [(this.hexagons[0].size + (this.hexagons[0].x), (this.hexagons[0].y + Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],\n    //         [(this.hexagons[0].size + (this.hexagons[0].x), (this.hexagons[0].y - Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],\n    //         [(this.hexagons[0].size - (this.hexagons[0].x), (this.hexagons[0].y + Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],\n    //         [(this.hexagons[0].size - (this.hexagons[0].x), (this.hexagons[0].y - Math.sqrt((this.hexagons[0].size * this.hexagons[0].size) - ((this.hexagons[0].size / 2) * (this.hexagons[0].size / 2))) * 2))],\n    //     ]\n    //     dirs.forEach(dir => {\n    //         newpos = (playerHexagon.x + dir[0], playerHexagon.y + dir[1]);\n            \n    //     })\n    // }\n\n    endButtonListener() {\n        document.getElementsByClassName(\"end-button\")[0].addEventListener(\"click\", (e) => {\n            this.nextPlayer();\n            this.draw(this.ctx);\n        })\n    }\n\n    nextPlayer() {\n        let newOrder = this.players.slice(1);\n        newOrder.push(this.players[0]);\n        this.players = newOrder\n    }\n\n    allObjects() {\n        let arr = Object.values(this.hexagons);\n        return arr;\n    }\n\n    addPlayers(num) {\n        for (let i = 0; i < num; i++) {\n            this.players.push(new Player(COLORS[i]))\n        }\n    }\n\n    addHexagons(size) {\n        let color;\n        let hexagon;\n        let twoHeight = Math.sqrt((size * size) - ((size / 2) * (size / 2))) * 2;\n        for(let x = 100; x <= 700; x += 150) {\n            for(let y = 100 + twoHeight; y <= 750; y += twoHeight) {\n                if (x === 100 || y === 100 || x === 700) {\n                    color = this.colors[Math.floor(Math.random() * (this.colors.length - 1))];\n                } else {\n                    color = this.colors[Math.floor(Math.random() * this.colors.length)];\n                }\n                hexagon = new Hexagon({\n                    size,\n                    color,\n                    x,\n                    y\n                });\n                hexagon.gridx = Math.round((x + 50) / 150);\n                hexagon.gridy = Math.round((y - 100) / twoHeight);\n                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;\n            }\n        }\n        for (let x = 175; x <= 625; x += 150) {\n            for (let y = 100 + twoHeight / 2; y <= 700; y += twoHeight) {\n                color = this.colors[Math.floor(Math.random() * this.colors.length)];\n                hexagon = new Hexagon({\n                    size,\n                    color,\n                    x,\n                    y\n                });\n                hexagon.gridx = Math.round((x - 25) / -150);\n                hexagon.gridy = (Math.round(((y - 100)) / twoHeight + 0.5))\n                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;\n            }\n        }\n    }\n\n    drawTwo(ctx) {\n        ctx.moveTo(350, 25)\n        ctx.beginPath();\n        ctx.lineTo(350, 75);\n        ctx.lineTo(400, 75);\n        ctx.lineTo(400, 25);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(350, 75)\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n\n        ctx.moveTo(400, 25)\n        ctx.beginPath();\n        ctx.lineTo(400, 75);\n        ctx.lineTo(450, 75);\n        ctx.lineTo(450, 25);\n        ctx.lineTo(400, 25);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n\n    }\n\n    drawThree(ctx) {\n        ctx.moveTo(375, 25)\n        ctx.beginPath();\n        ctx.lineTo(375, 75);\n        ctx.lineTo(425, 75);\n        ctx.lineTo(425, 25);\n        ctx.lineTo(375, 25);\n        ctx.lineTo(375, 75);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n\n        ctx.moveTo(325, 25)\n        ctx.beginPath();\n        ctx.lineTo(325, 75);\n        ctx.lineTo(375, 75);\n        ctx.lineTo(375, 25);\n        ctx.lineTo(325, 25);\n        ctx.lineTo(325, 75);\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n\n        ctx.moveTo(425, 25)\n        ctx.beginPath();\n        ctx.lineTo(425, 75);\n        ctx.lineTo(475, 75);\n        ctx.lineTo(475, 25);\n        ctx.lineTo(425, 25);\n        ctx.fillStyle = this.players[2].color;\n        ctx.fill();\n    }\n\n    drawFour(ctx) {\n        ctx.moveTo(350, 25)\n        ctx.beginPath();\n        ctx.lineTo(350, 75);\n        ctx.lineTo(400, 75);\n        ctx.lineTo(400, 25);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(350, 75);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n\n        ctx.moveTo(300, 25)\n        ctx.beginPath();\n        ctx.lineTo(300, 75);\n        ctx.lineTo(350, 75);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(300, 25);\n        ctx.lineTo(300, 75);\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n\n        ctx.moveTo(400, 25)\n        ctx.beginPath();\n        ctx.lineTo(400, 75);\n        ctx.lineTo(450, 75);\n        ctx.lineTo(450, 25);\n        ctx.lineTo(400, 25);\n        ctx.fillStyle = this.players[2].color;\n        ctx.fill();\n\n        ctx.moveTo(450, 25)\n        ctx.beginPath();\n        ctx.lineTo(450, 75);\n        ctx.lineTo(500, 75);\n        ctx.lineTo(500, 25);\n        ctx.lineTo(450, 25);\n        ctx.fillStyle = this.players[3].color;\n        ctx.fill();\n    }\n\n    draw(ctx) {\n        ctx.clearRect(0, 0, DIM_X, DIM_Y);\n        this.allObjects().forEach(el => {\n            el.draw(ctx)\n        })\n        if (this.players.length === 2) {\n            this.drawTwo(ctx);\n        } else if (this.players.length === 3) {\n            this.drawThree(ctx);\n        } else {\n            this.drawFour(ctx);\n        }\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Hexagon = __webpack_require__(/*! ./hexagon.js */ \"./src/hexagon.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\n\nclass GameView {\n    constructor(object){\n        this.game = new Game({\n            size: object.size,\n            players: object.players,\n            ctx: object.ctx\n        });\n        this.ctx = object.ctx;\n    }\n\n    start(numOfPlayers) {\n        this.game.draw(this.ctx);\n        if(numOfPlayers === 2) {\n            let canvas = document.getElementById('game-canvas2')\n            canvas.addEventListener(\"click\", (e) => {\n                const mousePos = {\n                    x: e.clientX - canvas.offsetLeft,\n                    y: e.clientY - canvas.offsetTop\n                };\n                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;\n                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;\n                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);\n                if (!(mousePos.x >= 350 && mousePos.x <= 400 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {\n                    this.game.draw(this.ctx);\n                    hexagonSelected.highlightDraw(this.ctx);\n                } else {\n                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)\n                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== \"transparent\")) {\n                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]\n                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== \"rgb(0, 0, 0)\")) {\n                            hexagonSelected.color = this.game.players[0].color;\n                        }\n                    }\n                    playerHexagons.forEach(hexagon => hexagon.selected = false);\n                    this.game.draw(this.ctx);\n                }\n            })\n        } else if (numOfPlayers === 3) {\n            let canvas = document.getElementById('game-canvas3')\n            canvas.addEventListener(\"click\", (e) => {\n                const mousePos = {\n                    x: e.clientX - canvas.offsetLeft,\n                    y: e.clientY - canvas.offsetTop\n                };\n                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;\n                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;\n                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);\n                if (!(mousePos.x >= 325 && mousePos.x <= 375 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {\n                    this.game.draw(this.ctx);\n                    hexagonSelected.highlightDraw(this.ctx);\n                } else {\n                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)\n                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== \"transparent\")) {\n                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]\n                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== \"rgb(0, 0, 0)\")) {\n                            hexagonSelected.color = this.game.players[0].color;\n                        }\n                    }\n                    playerHexagons.forEach(hexagon => hexagon.selected = false);\n                    this.game.draw(this.ctx);\n                }\n            })\n        } else {\n            let canvas = document.getElementById('game-canvas4')\n            canvas.addEventListener(\"click\", (e) => {\n                const mousePos = {\n                    x: e.clientX - canvas.offsetLeft,\n                    y: e.clientY - canvas.offsetTop\n                };\n                const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;\n                const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;\n                const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);\n                if (!(mousePos.x >= 300 && mousePos.x <= 350 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === color) {\n                    this.game.draw(this.ctx);\n                    hexagonSelected.highlightDraw(this.ctx);\n                } else {\n                    const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)\n                    if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== \"transparent\")) {\n                        const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]\n                        if (prevHexagon.isNeighbor(hexagonSelected) && (color !== \"rgb(0, 0, 0)\")) {\n                            hexagonSelected.color = this.game.players[0].color;\n                        }\n                    }\n                    playerHexagons.forEach(hexagon => hexagon.selected = false);\n                    this.game.draw(this.ctx);\n                }\n            })\n        }\n    }\n\n    bindKeyHandlers() {\n        // key(\"w\", () => {\n        //     this.game.ship.power([0, -0.025]);\n        // });\n\n        // Add click event here\n    }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/hexagon.js":
/*!************************!*\
  !*** ./src/hexagon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Hexagon {\n    constructor(object) {\n        this.color = object.color\n        this.x = object.x;\n        this.gridx = 0;\n        this.y = object.y;\n        this.gridy = 0;\n        this.size = object.size;\n        this.selected = false;\n    }\n\n    isNeighbor(hexagon) {\n        const xUpperRange = this.x + (2 * this.size);\n        const xLowerRange = this.x - (2 * this.size);\n        const twoHeight = Math.sqrt((this.size * this.size) - ((this.size / 2) * (this.size / 2))) * 2;\n        const yUpperRange = this.y + twoHeight;\n        const yLowerRange = this.y - twoHeight;\n        if ((xUpperRange >= hexagon.x) && (xLowerRange <= hexagon.x) && (yUpperRange >= hexagon.y) && (yLowerRange <= hexagon.y)){\n            return true\n        }\n        return false;\n    }\n\n    findNeighbors() {\n        let pos = [this.gridx, this.gridy];\n        let newpos;\n        let neighbors = []\n        let dirs = [\n            [0, -1],\n            [0, 1],\n            [this.gridx * -2, 0],\n            [this.gridx * -2, 1],\n            [this.gridx * -2 + 1, 0],\n            [this.gridx * -2 + 1, 0]\n        ]\n        dirs.forEach(dir => {\n            newpos = [pos[0]+dir[0], pos[1]+dir[1]];\n            neighbors.push(newpos);\n        })\n        console.log(neighbors);\n    }\n\n    draw(ctx) {\n        ctx.moveTo(this.x + this.size, 0);\n        ctx.beginPath();\n\n        for(let i = 0; i <= 6; i++) {\n            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));\n        }\n\n        ctx.fillStyle = this.color;\n        ctx.fill();\n    }\n\n    highlightDraw(ctx) {\n        this.selected = true;\n        ctx.moveTo(this.x + this.size, 0);\n        ctx.beginPath();\n\n        for (let i = 0; i <= 6; i++) {\n            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));\n        }\n\n        ctx.fillStyle = this.color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n    }\n}\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./src/hexagon.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\");\n\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    let canvas; \n    document.getElementsByClassName(\"2\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas2')\n        document.getElementById('game-canvas3').classList.remove(\"active\")\n        document.getElementById('game-canvas4').classList.remove(\"active\")\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 2,\n            ctx\n        });\n        gameview.start(2);\n    })\n    document.getElementsByClassName(\"3\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas3')\n        document.getElementById('game-canvas2').classList.remove(\"active\")\n        document.getElementById('game-canvas4').classList.remove(\"active\")\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 3,\n            ctx\n        });\n        gameview.start(3);\n    })\n    document.getElementsByClassName(\"4\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas4')\n        document.getElementById('game-canvas2').classList.remove(\"active\")\n        document.getElementById('game-canvas3').classList.remove(\"active\")\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 4,\n            ctx\n        });\n        gameview.start(4);\n    })\n    console.log('DOM fully loaded and parsed');\n});\n\nwindow.GameView = GameView;\nwindow.Game = Game;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Player {\n    constructor(color) {\n        this.color = color;\n    }\n}\n\nmodule.exports = Player;\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n    closestHexagon(hexObj, mousePos) {\n        let result = '';\n        let closest = 1/0;\n        let distX;\n        let distY;\n        Object.values(hexObj).forEach(hexagon => {\n            distX = Math.abs(hexagon.x - mousePos.x);\n            distY = Math.abs(hexagon.y - mousePos.y);\n            if (distX + distY < closest) {\n                closest = distX + distY;\n                result = hexagon;\n            }\n        })\n        return result;\n    }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });