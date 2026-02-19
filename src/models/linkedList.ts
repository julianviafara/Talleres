export interface Song {
  title: string;
  artist: string;
}

export class SongNode {
  song: Song;
  next: SongNode | null = null;

  constructor(song: Song) {
    this.song = song;
  }
}

export class LinkedList {
  private head: SongNode | null = null;
  private current: SongNode | null = null;

  append(song: Song) {
    const node = new SongNode(song);
    if (!this.head) {
      this.head = node;
      this.current = this.head;
      return;
    }

    let tail = this.head;
    while (tail.next) tail = tail.next;
    tail.next = node;
  }

  getCurrent(): Song | null {
    return this.current ? this.current.song : null;
  }

  next(): Song | null {
    if (!this.current) return null;
    if (this.current.next) {
      this.current = this.current.next;
      return this.current.song;
    }
    // end of list
    this.current = null;
    return null;
  }

  reset() {
    this.current = this.head;
  }
}
