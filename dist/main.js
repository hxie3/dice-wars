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

/***/ "./src/dice.js":
/*!*********************!*\
  !*** ./src/dice.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("VALUES = [1,2,3,4,5,6];\n\nclass Dice {\n    constructor() {\n        this.value = 1;\n    }\n\n    randomValue() {\n        this.value = VALUES[Math.floor(Math.random() * VALUES.length)];\n        return this.value;\n    }\n}\n\nmodule.exports = Dice;\n\n//# sourceURL=webpack:///./src/dice.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Hexagon = __webpack_require__(/*! ./hexagon.js */ \"./src/hexagon.js\");\nconst Player = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst Dice = __webpack_require__(/*! ./dice.js */ \"./src/dice.js\");\nconst DIM_X = 1000;\nconst DIM_Y = 1000;\nconst COLORS = [\"rgb(237, 52, 86)\", \"rgb(255, 246, 137)\", \"rgb(88, 53, 94)\", \"rgb(122, 231, 199)\"];\n\nclass Game {\n    constructor(object) {\n        this.players = [];\n        this.addPlayers(object.players);\n        this.colors = COLORS.slice(0, this.players.length);\n        this.colors.push(\"transparent\");\n        this.size = object.size;\n        this.ctx = object.ctx\n        this.hexagons = {};\n        this.addHexagons(this.size);\n        this.endButtonListener();\n    }\n\n    currentPlayer() {\n        return this.players[0];\n    }\n\n    ensureNoHoles() {\n        let neighborHexagon;\n        let currSum;\n        let countedHexagons = [];\n        let currPath;\n        let result = true;\n        // grabs first hexagon\n        Object.values(this.hexagons).slice(0,1).forEach(hexagon => {\n            currSum = 1;\n            // if hexagon was already accounted for, skip it\n            if (countedHexagons.includes(hexagon)) {\n                return\n            }\n            // updates hexagons accounted for, for each hexagon that makes it through\n            countedHexagons.push(hexagon);\n            // continuously shift out hexagons and push in new hexagons to check neighbors for\n            currPath = [hexagon]\n            // if theres still hexagons to check neighbors for, run code\n            while (currPath.length > 0) {\n                // take out the first hexagon, get all positions of its neighbor, and loop through them all\n                currPath.shift().findNeighbors().forEach(pos => {\n                    // use position to find specific hexagon\n                    neighborHexagon = this.hexagons[pos];\n                    // if the position is out of bounds, go to the next position\n                    if (neighborHexagon === undefined) return;\n                    // if its a valid hexagon, check if its already accounted for, if not, move on\n                    if (!(countedHexagons.includes(neighborHexagon))) {\n                        // updates accounted hexagons\n                        countedHexagons.push(neighborHexagon);\n                        // total hexagons update\n                        currSum += 1;\n                        // if hexagon is transparent, dont add to array to check its hexagons, its a barrier\n                        if (neighborHexagon.color === \"transparent\") return\n                        currPath.push(neighborHexagon);\n                    }\n                })\n            }\n            // check total connected hexagons with all hexagons\n            if (currSum !== Object.values(this.hexagons).length){\n                result = false;\n            }\n        })\n        return result;\n    }\n\n    calculateLargestContiguousSum(player) {\n        let neighborHexagon;\n        let largestSum = 0;\n        let currSum;\n        let countedHexagons = [];\n        let currPath;\n        let color = player.color;\n        let ownedHexagons = Object.values(this.hexagons).filter(hexagon => hexagon.color === color);                \n        ownedHexagons.forEach(hexagon => {\n            currSum = 1;    \n            if (countedHexagons.includes(hexagon)) {\n                return\n            }\n            currPath = [hexagon]\n            countedHexagons.push(hexagon);\n            while (currPath.length > 0) {\n                currPath.shift().findNeighbors().forEach(pos => { \n                    neighborHexagon = this.hexagons[pos];\n                    if (neighborHexagon === undefined) return;\n                    if ((neighborHexagon.color === hexagon.color) && (!(countedHexagons.includes(neighborHexagon)))) {\n                        countedHexagons.push(neighborHexagon);\n                        currPath.push(neighborHexagon);\n                        currSum += 1;\n                    }\n                })\n                if (currSum > largestSum) {\n                    largestSum = currSum;\n                }\n            }\n        })\n        return largestSum;\n    }\n\n    endButtonListener() {\n        document.getElementsByClassName(\"end-button\")[0].addEventListener(\"click\", (e) => {\n            let numOfDiceToAdd = this.calculateLargestContiguousSum(this.currentPlayer());\n            let ownedHexagons = Object.values(this.hexagons).filter(hexagon => hexagon.color === this.currentPlayer().color && hexagon.dices.length < 10);\n            let randomHexagon;\n            while (numOfDiceToAdd > 0 && ownedHexagons.length !== 0) {\n                ownedHexagons = ownedHexagons.filter(hexagon => hexagon.dices.length < 10);\n                randomHexagon = ownedHexagons[Math.floor(Math.random() * ownedHexagons.length)]\n                if (randomHexagon === undefined) return\n                randomHexagon.dices.push(new Dice());\n                randomHexagon.numOfDice += 1;\n                numOfDiceToAdd -= 1;\n            }\n            this.nextPlayer();\n            this.draw(this.ctx)\n        })\n    }\n\n    clearSelected() {\n        Object.values(this.hexagons).forEach(hexagon => hexagon.selected = false)\n    }\n\n    checkForElimination() {\n        let newPlayers = [];\n        this.players.forEach((player) => {\n            if(this.calculateLargestContiguousSum(player) !== 0) {\n                newPlayers.push(player)\n            }\n        })\n        this.players = newPlayers;\n    }\n\n    nextPlayer() {\n        let newOrder = this.players.slice(1);\n        newOrder.push(this.players[0]);\n        this.players = newOrder\n    }\n\n    allObjects() {\n        let arr = Object.values(this.hexagons);\n        return arr;\n    }\n\n    addPlayers(num) {\n        for (let i = 0; i < num; i++) {\n            this.players.push(new Player(COLORS[i]))\n        }\n    }\n\n    addHexagons(size) {\n        let color;\n        let hexagon;\n        let twoHeight = Math.sqrt((size * size) - ((size / 2) * (size / 2))) * 2;\n        for(let x = 100; x <= 700; x += 150) {\n            for(let y = 100 + twoHeight; y <= 750; y += twoHeight) {\n                color = this.colors[Math.floor(Math.random() * this.colors.length)];\n                hexagon = new Hexagon({\n                    size,\n                    color,\n                    x,\n                    y\n                });\n                hexagon.gridx = Math.round((x + 50) / 150);\n                hexagon.gridy = Math.round((y - 100) / twoHeight);\n                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;\n            }\n        }\n        for (let x = 175; x <= 625; x += 150) {\n            for (let y = 100 + twoHeight / 2; y <= 700; y += twoHeight) {\n                color = this.colors[Math.floor(Math.random() * this.colors.length)];\n                hexagon = new Hexagon({\n                    size,\n                    color,\n                    x,\n                    y\n                });\n                hexagon.gridx = Math.round((x - 25) / -150);\n                hexagon.gridy = (Math.round(((y - 100)) / twoHeight + 0.5))\n                this.hexagons[[hexagon.gridx, hexagon.gridy]] = hexagon;\n            }\n        }\n        if (!(this.ensureNoHoles())) {\n            this.hexagons = {};\n            this.addHexagons(size);\n        }\n    }\n\n    drawTwo(ctx) {\n        ctx.moveTo(350, 25)\n        ctx.beginPath();\n        ctx.lineTo(350, 75);\n        ctx.lineTo(400, 75);\n        ctx.lineTo(400, 25);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(350, 75)\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${375}`, `${50 - 10}`);\n\n        ctx.moveTo(400, 25)\n        ctx.beginPath();\n        ctx.lineTo(400, 75);\n        ctx.lineTo(450, 75);\n        ctx.lineTo(450, 25);\n        ctx.lineTo(400, 25);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${425}`, `${50 - 10}`);\n    }\n\n    drawThree(ctx) {\n        ctx.moveTo(375, 25)\n        ctx.beginPath();\n        ctx.lineTo(375, 75);\n        ctx.lineTo(425, 75);\n        ctx.lineTo(425, 25);\n        ctx.lineTo(375, 25);\n        ctx.lineTo(375, 75);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${400}`, `${50 - 10}`);\n\n        ctx.moveTo(325, 25)\n        ctx.beginPath();\n        ctx.lineTo(325, 75);\n        ctx.lineTo(375, 75);\n        ctx.lineTo(375, 25);\n        ctx.lineTo(325, 25);\n        ctx.lineTo(325, 75);\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${350}`, `${50 - 10}`);\n\n        ctx.moveTo(425, 25)\n        ctx.beginPath();\n        ctx.lineTo(425, 75);\n        ctx.lineTo(475, 75);\n        ctx.lineTo(475, 25);\n        ctx.lineTo(425, 25);\n        ctx.fillStyle = this.players[2].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[2])}`, `${450}`, `${50 - 10}`);\n    }\n\n    drawFour(ctx) {\n        ctx.moveTo(350, 25)\n        ctx.beginPath();\n        ctx.lineTo(350, 75);\n        ctx.lineTo(400, 75);\n        ctx.lineTo(400, 25);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(350, 75);\n        ctx.fillStyle = this.players[1].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[1])}`, `${375}`, `${50 - 10}`);\n\n        ctx.moveTo(300, 25)\n        ctx.beginPath();\n        ctx.lineTo(300, 75);\n        ctx.lineTo(350, 75);\n        ctx.lineTo(350, 25);\n        ctx.lineTo(300, 25);\n        ctx.lineTo(300, 75);\n        ctx.fillStyle = this.players[0].color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[0])}`, `${325}`, `${50 - 10}`);\n\n        ctx.moveTo(400, 25)\n        ctx.beginPath();\n        ctx.lineTo(400, 75);\n        ctx.lineTo(450, 75);\n        ctx.lineTo(450, 25);\n        ctx.lineTo(400, 25);\n        ctx.fillStyle = this.players[2].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[2])}`, `${425}`, `${50 - 10}`);\n\n        ctx.moveTo(450, 25)\n        ctx.beginPath();\n        ctx.lineTo(450, 75);\n        ctx.lineTo(500, 75);\n        ctx.lineTo(500, 25);\n        ctx.lineTo(450, 25);\n        ctx.fillStyle = this.players[3].color;\n        ctx.fill();\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.calculateLargestContiguousSum(this.players[3])}`, `${475}`, `${50 - 10}`);\n    }\n\n    draw(ctx) {\n        ctx.clearRect(0, 0, DIM_X, DIM_Y);\n        this.allObjects().forEach(el => {\n            el.draw(ctx)\n        })\n        if (this.players.length === 2) {\n            this.drawTwo(ctx);\n        } else if (this.players.length === 3) {\n            this.drawThree(ctx);\n        } else if (this.players.length === 4) {\n            this.drawFour(ctx);\n        }\n    }\n\n    win(player) {\n        let color;\n        if (player.color === \"rgb(237, 52, 86)\") {\n            color = \"Red\";\n        } else if (player.color === \"rgb(255, 246, 137)\") {\n            color = \"Yellow\";\n        } else if (player.color === \"rgb(88, 53, 94)\") {\n            color = \"Purple\";\n        } else {\n            color = \"Blue\";\n        }\n        if(!alert(`${color} wins! Play again?`)) {\n            window.location.reload();\n        }\n    }\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst Util = __webpack_require__(/*! ./util.js */ \"./src/util.js\")\n\nclass GameView {\n    constructor(object){\n        this.game = new Game({\n            size: object.size,\n            players: object.players,\n            ctx: object.ctx\n        });\n        this.size = object.size;\n        this.players = object.players\n        this.ctx = object.ctx;\n    }\n\n    start() {\n        this.game.draw(this.ctx);\n        let canvas = document.getElementById('game-canvas')\n        canvas.addEventListener(\"click\", (e) => {\n            let border1;\n            let border2;\n            if (this.game.players.length === 2) {\n                border1 = 350;\n                border2 = 400;\n            } else if (this.game.players.length === 3) {\n                border1 = 325;\n                border2 = 375;\n            } else {\n                border1 = 300;\n                border2 = 350;\n            }\n            const mousePos = {\n                x: e.clientX - canvas.offsetLeft,\n                y: e.clientY - canvas.offsetTop\n            };\n            const pixel = this.ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;\n            const color = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;\n            const hexagonSelected = Util.closestHexagon(this.game.hexagons, mousePos);\n            if (!(mousePos.x >= border1 && mousePos.x <= border2 && mousePos.y >= 25 && mousePos.y <= 75) && this.game.currentPlayer().color === hexagonSelected.color) {\n                this.game.draw(this.ctx);\n                this.game.clearSelected();\n                hexagonSelected.highlightDraw(this.ctx);\n            } else {\n                const playerHexagons = Object.values(this.game.hexagons).filter(hexagon => hexagon.color === this.game.players[0].color)\n                if (playerHexagons.some(hexagon => hexagon.selected) && (hexagonSelected.color !== \"transparent\")) {\n                    const prevHexagon = playerHexagons.filter(hexagon => hexagon.selected)[0]\n                    if (prevHexagon.isNeighbor(hexagonSelected) && (color !== \"rgb(0, 0, 0)\")) {\n                        prevHexagon.attack(hexagonSelected)\n                        this.game.checkForElimination();\n                        this.game.draw(this.ctx)\n                        if (this.game.players.length === 1) {\n                            setTimeout(() => this.game.win(this.game.players[0]), 50);\n                        }\n                    }\n                }\n                playerHexagons.forEach(hexagon => hexagon.selected = false);\n                this.game.draw(this.ctx);\n            }\n        })\n    }\n}\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/hexagon.js":
/*!************************!*\
  !*** ./src/hexagon.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Dice = __webpack_require__(/*! ./dice.js */ \"./src/dice.js\")\n\nclass Hexagon {\n    constructor(object) {\n        this.color = object.color\n        this.x = object.x;\n        this.gridx = 0;\n        this.y = object.y;\n        this.gridy = 0;\n        this.size = object.size;\n        this.selected = false;\n        this.dices = [];\n        this.pushRandomDice();\n        this.numOfDice = this.dices.length;\n    }\n\n    pushRandomDice() {\n        for(let i = Math.floor(Math.random() * 4 + 1); i > 0; i--) {\n            this.dices.push(new Dice());\n        }\n    }\n\n    isNeighbor(hexagon) {\n        let result = false;\n        let pos = [hexagon.gridx, hexagon.gridy];\n        let neighbors = this.findNeighbors();\n        neighbors.forEach(neighbor => {\n            if (neighbor[0] === pos[0] && neighbor[1] === pos[1]) result = true;\n        })\n        return result\n    }\n\n    rollDice(str) {\n        let sum = 0;\n        let randomValue;\n        let htmlElement;\n        let diceRollElement;\n        document.getElementsByClassName(str)[0].style.backgroundColor = `${this.color}`;\n        this.dices.forEach((dice, idx) => {\n            randomValue = dice.randomValue();\n            htmlElement = document.getElementsByClassName(`${str}-dice-${idx.toString()}`)[0];\n            diceRollElement = document.getElementsByClassName(`${randomValue.toString()}`)[0].cloneNode(true);\n            htmlElement.appendChild(diceRollElement);\n            sum += randomValue;\n        })\n        return sum;\n    }\n\n    findNeighbors() {\n        let pos = [this.gridx, this.gridy];\n        let newpos;\n        let neighbors = []\n        let dirs;\n        if (this.gridx > 0) {\n            dirs = [\n                [0, -1],\n                [0, 1],\n                [this.gridx * -2, 0],\n                [this.gridx * -2, 1],\n                [this.gridx * -2 + 1, 0],\n                [this.gridx * -2 + 1, 1]\n            ]\n        } else {\n            dirs = [\n                [0, -1],\n                [0, 1],\n                [this.gridx * -2, -1],\n                [this.gridx * -2, 0],\n                [this.gridx * -2 + 1, -1],\n                [this.gridx * -2 + 1, 0]\n            ]\n        }\n        dirs.forEach(dir => {\n            newpos = [pos[0]+dir[0], pos[1]+dir[1]];\n            neighbors.push(newpos);\n        })\n        return neighbors;\n    }\n\n    draw(ctx) {\n        ctx.moveTo(this.x + this.size, 0);\n        ctx.beginPath();\n\n        for(let i = 0; i <= 6; i++) {\n            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));\n        }\n\n        ctx.fillStyle = this.color;\n        ctx.fill();\n        if (this.color === \"transparent\") return;\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n        ctx.fillText(`${this.numOfDice}`, `${this.x}`, `${this.y-10}`);\n    }\n\n    highlightDraw(ctx) {\n        this.selected = true;\n        ctx.moveTo(this.x + this.size, 0);\n        ctx.beginPath();\n\n        for (let i = 0; i <= 6; i++) {\n            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));\n        }\n\n        ctx.fillStyle = this.color;\n        ctx.fill();\n        ctx.lineWidth = 5;\n        ctx.strokeStyle = \"green\";\n        ctx.stroke();\n        if (this.color === \"transparent\") return;\n        ctx.font = '25px serif';\n        ctx.textBaseline = 'hanging';\n        ctx.fillStyle = \"black\";\n        ctx.textAlign = \"center\";\n\n        ctx.fillText(`${this.numOfDice}`, `${this.x}`, `${this.y-10}`);\n    }\n\n    attack(otherHexagon) {\n        if (this.color === otherHexagon.color) return\n        if (this.numOfDice === 1) {\n            return\n        }\n        this.clearAttackerDefender();\n        let sum = this.rollDice(\"attacker\");\n        let otherSum = otherHexagon.rollDice(\"defender\");\n        document.getElementsByClassName(\"sum\")[0].innerHTML = sum;\n        document.getElementsByClassName(\"sum\")[1].innerHTML = otherSum;\n        if (sum > otherSum) {\n            let promise = document.getElementsByClassName(\"success\")[0].cloneNode(true).play();\n            if (typeof promise !== undefined) {\n                promise.then(() => {\n                    \n                }).catch(() => {\n\n                });\n            }\n            otherHexagon.color = this.color\n            otherHexagon.numOfDice = this.numOfDice - 1;\n            this.numOfDice = 1;\n            this.dices = [new Dice()]\n            otherHexagon.dices = [];\n            while(otherHexagon.dices.length !== otherHexagon.numOfDice) {\n                otherHexagon.dices.push(new Dice());\n            }\n        } else {\n            let promise = document.getElementsByClassName(\"fail\")[0].cloneNode(true).play();\n            if (typeof promise !== undefined) {\n                promise.then(() => {\n                    \n                }).catch(() => {\n\n                });\n            }\n            this.numOfDice = 1;\n            this.dices = [new Dice()];\n        }\n    }\n\n    clearAttackerDefender() {\n        let htmlElement;\n        let str = \"attacker\";\n        for(let i = 0; i <= 9; i++) {\n            htmlElement = document.getElementsByClassName(`${str}-dice-${i.toString()}`)[0];\n            htmlElement.innerHTML = ''\n        }\n        str = \"defender\";\n        for (let j = 0; j <= 9; j++) {\n            htmlElement = document.getElementsByClassName(`${str}-dice-${j.toString()}`)[0];\n            htmlElement.innerHTML = ''\n        }\n    }\n}\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./src/hexagon.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view.js */ \"./src/game_view.js\");\n\nwindow.addEventListener('DOMContentLoaded', (event) => {\n    let canvas; \n    document.getElementsByClassName(\"two\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas')\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 2,\n            ctx\n        });\n        gameview.start();\n    })\n    document.getElementsByClassName(\"three\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas')\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 3,\n            ctx\n        });\n        gameview.start();\n    })\n    document.getElementsByClassName(\"four\")[0].addEventListener(\"click\", (event) => {\n        document.getElementsByClassName(\"player-buttons\")[0].classList.add(\"hidden\");\n        canvas = document.getElementById('game-canvas')\n        canvas.classList.add(\"active\")\n        let ctx = canvas.getContext('2d');\n        let gameview = new GameView({\n            size: 50,\n            players: 4,\n            ctx\n        });\n        gameview.start();\n    })\n});\n\nwindow.GameView = GameView;\nwindow.Game = Game;\n\n//# sourceURL=webpack:///./src/index.js?");

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