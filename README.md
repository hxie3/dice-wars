# DiceWars

[DiceWars Live](https://hxie3.github.io/dice-wars/)

Instructions:
- First choose the amount of players playing, single player is a future feature. For now, it is a hotseat 2-4 multiplayer luck-based strategy game.
- At the top of the board you'll see a queue of colors. The player highlighted in green is the current player's turn. Inside of each player's color is a number representing the largest contiguous sequence of territory that player controls.
- Dice is given to randomly owned territory based on the largest contiguous sequence of territory you control when ending your turn. 
- You may end your turn at any time.
- The game ends when one player controls all territory.

Technology/Languages/API/Plugins:
- JavaScript v8.10.0
- Canvas

Technical Implementation: 
In order to increase the game's replayability,the board was randomized. However, if the board splits into two pieces, it becomes impossible to win if the islands are taken over by different colors because territory can only attack neighboring pieces. To fix this, a check was run through after making a randomized board to check if it was valid.

```javascript
ensureNoHoles() {
        let neighborHexagon;
        let currSum;
        let countedHexagons = [];
        let currPath;
        let result = true;
        Object.values(this.hexagons).slice(0,1).forEach(hexagon => {
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
                                if (!(countedHexagons.includes(neighborHexagon))) {
                                        countedHexagons.push(neighborHexagon);
                                        currSum += 1;
                                        if (neighborHexagon.color === "transparent") return
                                        currPath.push(neighborHexagon);
                                }
                        })
                }
                if (currSum !== Object.values(this.hexagons).length){
                result = false;
                }
        })
        return result;
}
```
