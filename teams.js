const teams = [
    "Duke",
    "Shelly",
    "Caleb",
    "Lo Wang",
    "Serious Sam",
    "DoomGuy"
]

Array.prototype.shuffle = function () {
    var i = this.length, j, temp;
    if (i == 0) return this;
    while (--i) {
        j = Math.floor(Math.random() * (i + 1));
        temp = this[i];
        this[i] = this[j];
        this[j] = temp;
    }
    return this;
}

export default teams