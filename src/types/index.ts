export interface Song {
    id: string;
    title: string;
    artist: string;
    plays: number;       // para el ranking
  }
  
  export type Tab = "search" | "ranking" | "recommendations";