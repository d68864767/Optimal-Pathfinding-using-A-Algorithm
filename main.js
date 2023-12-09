const fs = require('fs');
const Grid = require('./grid');
const PriorityQueue = require('./priorityQueue');
const heuristic = require('./heuristic');
const astar = require('./astar');

// Function to read input from stdin
function readInput() {
  return new Promise((resolve, reject) => {
    let input = '';
    process.stdin.on('data', data => {
      input += data;
    });
    process.stdin.on('end', () => {
      resolve(input.trim().split('\n'));
    });
    process.stdin.on('error', reject);
  });
}

// Function to parse input and return an object with all necessary data
function parseInput(inputLines) {
  const N = parseInt(inputLines[0]);
  const gridData = inputLines.slice(1, N + 1).map(line => line.split(' ').map(Number));
  const [sx, sy] = inputLines[N + 1].split(' ').map(Number);
  const [ex, ey] = inputLines[N + 2].split(' ').map(Number);

  return { N, gridData, start: { x: sx, y: sy }, end: { x: ex, y: ey } };
}

// Main function to execute the A* algorithm and output the result
async function main() {
  try {
    const inputLines = await readInput();
    const { N, gridData, start, end } = parseInput(inputLines);

    const grid = new Grid(N, gridData);
    const path = astar(grid, start, end, heuristic.manhattan);

    if (path) {
      console.log(path);
    } else {
      console.log('No path found');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Execute the main function
main();
