const Grid = require('./grid');
const PriorityQueue = require('./priorityQueue');
const manhattanDistance = require('./heuristic');

class Node {
    constructor(x, y, cost, heuristic, parent, direction) {
        this.x = x;
        this.y = y;
        this.cost = cost; // Cost to reach this node
        this.heuristic = heuristic; // Heuristic cost from this node to the end node
        this.parent = parent; // Reference to the parent node
        this.direction = direction; // Direction taken to reach this node
    }

    // Total cost function for the priority queue
    get totalCost() {
        return this.cost + this.heuristic;
    }
}

function reconstructPath(node) {
    let path = '';
    while (node.parent) {
        path = node.direction + path;
        node = node.parent;
    }
    return path;
}

function astar(grid, start, end) {
    const openSet = new PriorityQueue((a, b) => a.totalCost < b.totalCost);
    const closedSet = new Set();
    const startNode = new Node(start.x, start.y, 0, manhattanDistance(start.x, start.y, end.x, end.y), null, '');

    openSet.enqueue(startNode);

    while (!openSet.isEmpty()) {
        const currentNode = openSet.dequeue();

        if (currentNode.x === end.x && currentNode.y === end.y) {
            return reconstructPath(currentNode);
        }

        closedSet.add(currentNode.x + ',' + currentNode.y);

        const neighbors = grid.getNeighbors(currentNode.x, currentNode.y);
        for (const neighbor of neighbors) {
            if (closedSet.has(neighbor.x + ',' + neighbor.y)) {
                continue;
            }

            const tentativeGScore = currentNode.cost + grid.getCellCost(neighbor.x, neighbor.y);
            const neighborNode = new Node(
                neighbor.x,
                neighbor.y,
                tentativeGScore,
                manhattanDistance(neighbor.x, neighbor.y, end.x, end.y),
                currentNode,
                neighbor.direction
            );

            if (!openSet.heap.some(node => node.x === neighborNode.x && node.y === neighborNode.y && node.totalCost <= neighborNode.totalCost)) {
                openSet.enqueue(neighborNode);
            }
        }
    }

    return "No path found";
}

module.exports = astar;
