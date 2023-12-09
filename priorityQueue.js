// priorityQueue.js

class PriorityQueue {
    constructor(comparator = (a, b) => a.cost < b.cost) {
        this.heap = [];
        this.comparator = comparator;
    }

    // Get the parent index
    _parent(idx) {
        return Math.floor((idx - 1) / 2);
    }

    // Get the left child index
    _leftChild(idx) {
        return (2 * idx) + 1;
    }

    // Get the right child index
    _rightChild(idx) {
        return (2 * idx) + 2;
    }

    // Swap elements at indices i and j
    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    // Check if the element at index i is in the correct position
    _compare(i, j) {
        return this.comparator(this.heap[i], this.heap[j]);
    }

    // Move the element at idx up to its correct position
    _siftUp(idx) {
        let parentIdx = this._parent(idx);
        while (idx > 0 && this._compare(idx, parentIdx)) {
            this._swap(idx, parentIdx);
            idx = parentIdx;
            parentIdx = this._parent(idx);
        }
    }

    // Move the element at idx down to its correct position
    _siftDown(idx) {
        let left = this._leftChild(idx);
        let right = this._rightChild(idx);
        let largest = idx;

        if (left < this.size() && this._compare(left, largest)) {
            largest = left;
        }

        if (right < this.size() && this._compare(right, largest)) {
            largest = right;
        }

        if (largest !== idx) {
            this._swap(idx, largest);
            this._siftDown(largest);
        }
    }

    // Add an element to the priority queue
    enqueue(element) {
        this.heap.push(element);
        this._siftUp(this.heap.length - 1);
    }

    // Remove and return the element with the highest priority
    dequeue() {
        if (this.size() === 0) {
            return null;
        }
        const result = this.heap[0];
        const last = this.heap.pop();
        if (this.size() !== 0) {
            this.heap[0] = last;
            this._siftDown(0);
        }
        return result;
    }

    // Return the element with the highest priority without removing it
    peek() {
        return this.size() > 0 ? this.heap[0] : null;
    }

    // Return the number of elements in the priority queue
    size() {
        return this.heap.length;
    }

    // Check if the priority queue is empty
    isEmpty() {
        return this.size() === 0;
    }
}

module.exports = PriorityQueue;
