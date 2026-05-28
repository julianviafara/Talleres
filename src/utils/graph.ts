import type { Song } from "../types";

export interface GraphEdge {
  from: string; 
  to: string;
}

// ── Grafo no dirigido (lista de adyacencia) ───────────────────────────────────
export class SongGraph {
  private adjacency: Map<string, Set<string>> = new Map();
  private songs: Map<string, Song> = new Map();

  // Agregar canción como nodo
  addNode(song: Song): void {
    this.songs.set(song.id, song);
    if (!this.adjacency.has(song.id)) {
      this.adjacency.set(song.id, new Set());
    }
  }

  // Conectar dos canciones como relacionadas 
  addEdge(idA: string, idB: string): void {
    if (!this.adjacency.has(idA)) this.adjacency.set(idA, new Set());
    if (!this.adjacency.has(idB)) this.adjacency.set(idB, new Set());
    this.adjacency.get(idA)!.add(idB);
    this.adjacency.get(idB)!.add(idA);
  }

  // Obtener recomendaciones para una canción
  getRecommendations(songId: string): Song[] {
    const neighbors = this.adjacency.get(songId) ?? new Set();
    return [...neighbors]
      .map((id) => this.songs.get(id))
      .filter(Boolean) as Song[];
  }

  // Todos los nodos
  getAllSongs(): Song[] {
    return [...this.songs.values()];
  }

  // Todos los edges (sin duplicados)
  getAllEdges(): GraphEdge[] {
    const edges: GraphEdge[] = [];
    const seen = new Set<string>();
    for (const [from, neighbors] of this.adjacency.entries()) {
      for (const to of neighbors) {
        const key = [from, to].sort().join("--");
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ from, to });
        }
      }
    }
    return edges;
  }

  getSong(id: string): Song | undefined {
    return this.songs.get(id);
  }
}