import { useMemo, useState } from "react";
import type { Song } from "../types";
import { SongGraph } from "../utils/graph";

interface Props {
  songs: Song[];
}

// Posiciones fijas en círculo para visualizar el grafo
function getCirclePositions(count: number, cx: number, cy: number, r: number) {
  return Array.from({ length: count }, (_, i) => {
    const angle = (2 * Math.PI * i) / count - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });
}

// conexiones entre canciones
const EDGES: [number, number][] = [
  [0, 10], [3, 2], [1, 3], [2, 4], [3, 5],
  [4, 5], [1, 6], [6, 7], [7, 8], [8, 9],
  [2, 9], [3, 7], [2, 6],
];

export default function RecommendationGraph({ songs }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const graph = useMemo(() => {
    const g = new SongGraph();
    songs.forEach((s) => g.addNode(s));
    EDGES.forEach(([a, b]) => {
      if (songs[a] && songs[b]) g.addEdge(songs[a].id, songs[b].id);
    });
    return g;
  }, [songs]);

  const recommendations = useMemo(
    () => (selected ? graph.getRecommendations(selected) : []),
    [selected, graph]
  );

  const edges = graph.getAllEdges();
  const W = 700, H = 380, cx = W / 2, cy = H / 2, r = 150;
  const positions = getCirclePositions(songs.length, cx, cy, r);

  const selectedSong = selected ? graph.getSong(selected) : null;
  const neighborIds = new Set(recommendations.map((s) => s.id));

  return (
    <div>
      <div className="page-header">
        <p className="page-header__tag">Parcial 3 — Grafo no dirigido</p>
        <h1 className="page-header__title">Recomendaciones</h1>
        <p className="page-header__subtitle">
          Haz clic en una canción para ver sus canciones relacionadas.
        </p>
      </div>

      <div className="grid-2" style={{ marginBottom: "1.5rem" }}>
        {/* SVG Grafo */}
        <div className="graph-container">
          <p className="sp-section-title">Grafo de canciones</p>
          <div className="graph-container__canvas">
            <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: "block" }}>
              {/* Edges */}
              {edges.map((edge, i) => {
                const fromIdx = songs.findIndex((s) => s.id === edge.from);
                const toIdx   = songs.findIndex((s) => s.id === edge.to);
                if (fromIdx < 0 || toIdx < 0) return null;
                const p1 = positions[fromIdx];
                const p2 = positions[toIdx];
                const isHighlighted =
                  selected &&
                  (edge.from === selected || edge.to === selected);
                return (
                  <line
                    key={i}
                    x1={p1.x} y1={p1.y}
                    x2={p2.x} y2={p2.y}
                    stroke={isHighlighted ? "#1db954" : "rgba(255,255,255,0.08)"}
                    strokeWidth={isHighlighted ? 2 : 1}
                  />
                );
              })}

             
              {songs.map((song, i) => {
                const pos = positions[i];
                const isSelected  = song.id === selected;
                const isNeighbor  = neighborIds.has(song.id);
                const fill = isSelected ? "#1db954" : isNeighbor ? "#17a34a" : "#242424";
                const stroke = isSelected || isNeighbor ? "#1db954" : "rgba(255,255,255,0.1)";

                return (
                  <g
                    key={song.id}
                    className="graph-node"
                    onClick={() => setSelected(isSelected ? null : song.id)}
                  >
                    <circle
                      cx={pos.x} cy={pos.y} r={22}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={2}
                    />
                    <text
                      x={pos.x} y={pos.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={9}
                      fill={isSelected || isNeighbor ? "#000" : "#b3b3b3"}
                      fontWeight="700"
                    >
                      {song.title.slice(0, 6)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

 
        <div className="sp-card">
          <p className="sp-section-title">
            {selectedSong
              ? `Relacionadas con "${selectedSong.title}"`
              : "Selecciona una canción"}
          </p>

          {!selected && (
            <div className="sp-empty">
              <span style={{ fontSize: "2rem" }}>🎵</span>
              <p>Haz clic en un nodo del grafo para ver las recomendaciones.</p>
            </div>
          )}

          {selected && recommendations.length === 0 && (
            <div className="sp-empty">Sin canciones relacionadas.</div>
          )}

          <div className="sp-scroll" style={{ maxHeight: "280px" }}>
            {recommendations.map((song, i) => (
              <div className="sp-song-row" key={song.id} onClick={() => setSelected(song.id)}>
                <span className="sp-song-row__index">{i + 1}</span>
                <div className="sp-song-row__info">
                  <div className="sp-song-row__title">{song.title}</div>
                  <div className="sp-song-row__artist">{song.artist}</div>
                </div>
                <span className="sp-song-row__plays">
                  {(song.plays / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

   
      <div className="sp-card">
        <p className="sp-section-title">Lista de adyacencia del grafo</p>
        <div className="sp-scroll" style={{ maxHeight: "200px" }}>
          {songs.map((song) => {
            const neighbors = graph.getRecommendations(song.id);
            return (
              <div key={song.id} style={{ marginBottom: "0.5rem", fontSize: "0.8rem" }}>
                <span style={{ color: "#1db954", fontWeight: 700 }}>{song.title}</span>
                <span style={{ color: "#535353" }}> → </span>
                <span style={{ color: "#b3b3b3" }}>
                  {neighbors.length > 0
                    ? neighbors.map((n) => n.title).join(", ")
                    : "sin conexiones"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}