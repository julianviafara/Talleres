import { useMemo, useState } from "react";
import type { Song } from "../types";
import { MaxHeap } from "../utils/maxHeap";

interface Props {
  songs: Song[];
}


export default function RankingPanel({ songs }: Props) {
  const [topN, setTopN] = useState(5);

  const heap = useMemo(() => {
    const h = new MaxHeap();
    songs.forEach((s) => h.insert(s));
    return h;
  }, [songs]);

  const topSongs = useMemo(() => heap.getTop(topN), [heap, topN]);
  const maxPlays = topSongs[0]?.plays ?? 1;

  return (
    <div>
      <div className="page-header">
        <p className="page-header__tag">Parcial 3 — Max Heap</p>
        <h1 className="page-header__title">Ranking de Popularidad</h1>
        <p className="page-header__subtitle">
          TOP canciones más escuchadas usando un Max Heap.
        </p>
      </div>

      {/* Stats */}
      <div className="grid-3" style={{ marginBottom: "1.5rem" }}>
        <div className="stat-card">
          <p className="stat-card__label">Total canciones</p>
          <p className="stat-card__value">{songs.length}</p>
          <p className="stat-card__sub">en el heap</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Más escuchada</p>
          <p className="stat-card__value">{(topSongs[0]?.plays / 1000).toFixed(0)}K</p>
          <p className="stat-card__sub">{topSongs[0]?.title}</p>
        </div>
        <div className="stat-card">
          <p className="stat-card__label">Mostrando TOP</p>
          <p className="stat-card__value">{topN}</p>
          <p className="stat-card__sub">canciones</p>
        </div>
      </div>

      {/* Selector TOP N */}
      <div className="sp-card" style={{ marginBottom: "1.5rem" }}>
        <p className="sp-section-title">Filtrar ranking</p>
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {[3, 5, 10, songs.length].map((n) => (
            <button
              key={n}
              className={`sp-chip ${topN === n ? "sp-chip--active" : ""}`}
              onClick={() => setTopN(n)}
            >
              TOP {n === songs.length ? "All" : n}
            </button>
          ))}
        </div>
      </div>

      {/* Ranking list */}
      <div className="sp-card">
        <p className="sp-section-title">Canciones más escuchadas</p>
        <div className="sp-scroll" style={{ maxHeight: "420px" }}>
          {topSongs.map((song, i) => (
            <div key={song.id} style={{ marginBottom: "0.75rem" }}>
              <div className="sp-song-row">
                <div className="sp-song-row__info">
                  <div className="sp-song-row__title">{song.title}</div>
                  <div className="sp-song-row__artist">{song.artist}</div>
                  <div className="rank-bar" style={{ marginTop: "0.5rem" }}>
                    <div
                      className="rank-bar__fill"
                      style={{ width: `${(song.plays / maxPlays) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="sp-song-row__plays">
                  {(song.plays / 1000).toFixed(1)}K
                </span>
              </div>
              <div className="sp-divider" style={{ margin: "0.5rem 0 0" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}