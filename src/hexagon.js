class Hexagon {
    constructor(object) {
        this.color = object.color
        this.x = object.x;
        this.y = object.y;
        this.size = object.size;
        this.selected = false;
    }

    isNeighbor(hexagon) {
        const xUpperRange = this.x + (2 * this.size);
        const xLowerRange = this.x - (2 * this.size);
        const twoHeight = Math.sqrt((this.size * this.size) - ((this.size / 2) * (this.size / 2))) * 2;
        const yUpperRange = this.y + twoHeight;
        const yLowerRange = this.y - twoHeight;
        if ((xUpperRange >= hexagon.x) && (xLowerRange <= hexagon.x) && (yUpperRange >= hexagon.y) && (yLowerRange <= hexagon.y)){
            return true
        }
        return false;
    }

    draw(ctx) {
        ctx.moveTo(this.x + this.size, 0);
        ctx.beginPath();

        for(let i = 0; i <= 6; i++) {
            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));
        }

        ctx.fillStyle = this.color;
        ctx.fill();
    }

    highlightDraw(ctx) {
        this.selected = true;
        ctx.moveTo(this.x + this.size, 0);
        ctx.beginPath();

        for (let i = 0; i <= 6; i++) {
            ctx.lineTo(this.x + this.size * Math.cos(i * 2 * Math.PI / 6), this.y + this.size * Math.sin(i * 2 * Math.PI / 6));
        }

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = "green";
        ctx.stroke();
    }
}

module.exports = Hexagon;