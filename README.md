Welcome to the Dice-wars repo!

[Dice-wars Live](https://hxie3.github.io/dice-wars/)

Instructions:
- Change all tiles on the baord to your color
- Click on an owned tile and then a neighboring enemy tile, both player rolls the amount of dice that tile controls. The higher sum wins. If the attacker wins, the defending tile's color is turned into the attacker's color and all dice is removed from the defending tile. The winner's tile keeps 1 die while the rest take over the new tile. If the defender wins, the attacker's tile loses all of its dice except one.
- Gain dice based on the largest contiguous sequence of territory you control when ending your turn, you may end it whenever.

Technology/Languages/API/Plugins:
- JavaScript
- Canvas

Technical Implementation: 
In order to increase the game's replayability, I randomized the board. However, this creates a problem. If the board splits into two pieces, it becomes impossible to win if the islands are taken over by different colors. To fix this, I implemented a helper function that checks if the board is valid.

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
