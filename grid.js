class Grid {
    constructor(size, gridData) {
        this.size = size;
        this.gridData = gridData;
    }

    // Check if the given coordinates are within the grid bounds
    isValidCoordinate(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    // Get the cost of entering a cell at coordinates (x, y)
    getCellCost(x, y) {
        if (this.isValidCoordinate(x, y)) {
            return this.gridData[x][y];
        }
        return Infinity; // Return a high cost if the cell is out of bounds
    }

    // Get the neighbors of a cell at coordinates (x, y)
    getNeighbors(x, y) {
        const neighbors = [];
        // Up
        if (this.isValidCoordinate(x - 1, y)) {
            neighbors.push({ x: x - 1, y: y, direction: 'U' });
        }
        // Down
        if (this.isValidCoordinate(x + 1, y)) {
            neighbors.push({ x: x + 1, y: y, direction: 'D' });
        }
        // Left
        if (this.isValidCoordinate(x, y - 1)) {
            neighbors.push({ x: x, y: y - 1, direction: 'L' });
        }
        // Right
        if (this.isValidCoordinate(x, y + 1)) {
            neighbors.push({ x: x, y: y + 1, direction: 'R' });
        }
        return neighbors;
    }
}

module.exports = Grid;
