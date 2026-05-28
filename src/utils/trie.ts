
class TrieNode {
    children: Map<string, TrieNode> = new Map();
    isEnd: boolean = false;
    songTitle: string = "";
  }
  
  export class Trie {
    private root: TrieNode = new TrieNode();
  
    insert(title: string): void {
      let node = this.root;
      const lower = title.toLowerCase();
  
      for (const char of lower) {
        if (!node.children.has(char)) {
          node.children.set(char, new TrieNode());
        }
        node = node.children.get(char)!;
      }
  
      node.isEnd = true;
      node.songTitle = title; 
    }
  
    search(title: string): boolean {
      const node = this.getNode(title.toLowerCase());
      return node !== null && node.isEnd;
    }
  
    suggestions(prefix: string): string[] {
      const node = this.getNode(prefix.toLowerCase());
      if (!node) return [];
  
      const results: string[] = [];
      this.dfs(node, results);
      return results.slice(0, 8); 
    }
  
    private getNode(str: string): TrieNode | null {
      let node = this.root;
      for (const char of str) {
        if (!node.children.has(char)) return null;
        node = node.children.get(char)!;
      }
      return node;
    }
  
    private dfs(node: TrieNode, results: string[]): void {
      if (node.isEnd) results.push(node.songTitle);
      for (const child of node.children.values()) {
        this.dfs(child, results);
      }
    }
  }