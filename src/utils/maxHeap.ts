import type { Song } from "../types";

export class MaxHeap {
  private heap: Song[] = [];

  insert(song: Song): void {
    this.heap.push(song);
    this.bubbleUp(this.heap.length - 1);
  }

  extractMax(): Song | null {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop()!;

    const max = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.sinkDown(0);
    return max;
  }

  getTop(n: number): Song[] {
   
    const clone = new MaxHeap();
    clone.heap = [...this.heap];
    const result: Song[] = [];

    for (let i = 0; i < n && clone.heap.length > 0; i++) {
      const song = clone.extractMax();
      if (song) result.push(song);
    }
    return result;
  }

  get size(): number {
    return this.heap.length;
  }


  private bubbleUp(index: number): void {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (this.heap[parent].plays >= this.heap[index].plays) break;
      [this.heap[parent], this.heap[index]] = [this.heap[index], this.heap[parent]];
      index = parent;
    }
  }

  private sinkDown(index: number): void {
    const n = this.heap.length;
    while (true) {
      let largest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (left < n && this.heap[left].plays > this.heap[largest].plays)
        largest = left;
      if (right < n && this.heap[right].plays > this.heap[largest].plays)
        largest = right;
      if (largest === index) break;

      [this.heap[largest], this.heap[index]] = [this.heap[index], this.heap[largest]];
      index = largest;
    }
  }
}