# DiceWars

[DiceWars Live](https://hxie3.github.io/dice-wars/dist/)

![DiceWars](https://github.com/hxie3/dice-wars/blob/master/dist/images/dicewars.gif)

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
### Validate Board

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
`this.hexagons` is an object with keys of position arrays pointing to hexagon objects. `Object.values(this.hexagons).slice(0,1).forEach` uses one hexagon to start the root of a tree.
`currPath` is initialized with the single hexagon and behaves as a queue that will push in neighboring hexagons through `currPath.shift().findNeighbors().forEach(pos => {` while taking out the current hexagon. An array of checked hexagons is making sure hexagons are not counted twice. At the very end, `currSum` is compared with `this.hexagons` to see if each hexagon is reachable from the root. If not, `this.hexagons` randomizes to another board state in a loop until `ensureNoHoles` returns true.

### Largest Contiguous Sum
Keeping a large sequence of connected territory promotes growth to the strength of your pieces adding a layer of depth to the strategy of the game. This was done by iterating over all owned hexagons. Each hexagon is checked if there are neighboring owned hexagons. Owned hexagons was iterated over once resulting in a linear time complexity.
```javascript
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
```
Future Features:
- Single Player playing against A.I.
