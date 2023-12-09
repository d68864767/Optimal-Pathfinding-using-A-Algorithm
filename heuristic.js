// heuristic.js

/**
 * Calculate the Manhattan Distance between two points (x1, y1) and (x2, y2)
 * @param {number} x1 - The x-coordinate of the first point
 * @param {number} y1 - The y-coordinate of the first point
 * @param {number} x2 - The x-coordinate of the second point
 * @param {number} y2 - The y-coordinate of the second point
 * @returns {number} The Manhattan Distance between the two points
 */
function manhattanDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

module.exports = manhattanDistance;
