VALUES = [1,2,3,4,5,6];

class Dice {
    constructor() {
        this.value = 1;
    }

    randomValue() {
        this.value = VALUES[Math.floor(Math.random() * VALUES.length)];
        return this.value;
    }
}

module.exports = Dice;