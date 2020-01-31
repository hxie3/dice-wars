const Util = {
    closestHexagon(hexArr, mousePos) {
        let result = '';
        let closest = 1/0;
        let distX;
        let distY;
        hexArr.forEach(hexagon => {
            distX = Math.abs(hexagon.x - mousePos.x);
            distY = Math.abs(hexagon.y - mousePos.y);
            if (distX + distY < closest) {
                closest = distX + distY;
                result = hexagon;
            }
        })
        return result;
    }
};

module.exports = Util;