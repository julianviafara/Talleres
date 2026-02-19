export class PageNode {
  name: string;
  prev: PageNode | null = null;
  next: PageNode | null = null;

  constructor(name: string) {
    this.name = name;
  }
}

export class DoublyLinkedList {
  private head: PageNode | null = null;
  private tail: PageNode | null = null;
  private current: PageNode | null = null;

  visit(name: string) {
    const node = new PageNode(name);
    if (!this.head) {
      this.head = this.tail = this.current = node;
      return;
    }

    if (this.current && this.current !== this.tail) {
      // truncate forward history
      this.current.next = null;
      this.tail = this.current;
    }

    // append
    if (this.tail) {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
      this.current = node;
    }
  }

  back(): string | null {
    if (this.current && this.current.prev) {
      this.current = this.current.prev;
      return this.current.name;
    }
    return null;
  }

  forward(): string | null {
    if (this.current && this.current.next) {
      this.current = this.current.next;
      return this.current.name;
    }
    return null;
  }

  getCurrent(): string | null {
    return this.current ? this.current.name : null;
  }
}
