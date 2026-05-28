import { useState, useEffect } from "react";
import type { Song } from "../types";
import { Trie } from "../utils/trie";

interface Props {
  songs: Song[];
}

export default function SearchBar({ songs }: Props) {
  const [trie] = useState(() => {
    const t = new Trie();
    songs.forEach((s) => t.insert(s.title));
    return t;
  });

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [exactResult, setExactResult] = useState<boolean | null>(null);
  const [addTitle, setAddTitle] = useState("");
  const [allTitles, setAllTitles] = useState<string[]>(songs.map((s) => s.title));

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      setExactResult(null);
      return;
    }
    setSuggestions(trie.suggestions(query));
    setExactResult(trie.search(query));
  }, [query, trie]);

  function handleAddSong() {
    if (!addTitle.trim()) return;
    trie.insert(addTitle.trim());
    setAllTitles((prev) => [...prev, addTitle.trim()]);
    setAddTitle("");
  }

  const maxPlays = Math.max(...songs.map((s) => s.plays));

  return (
    <div>
      <div className="page-header">
        <p className="page-header__tag">Parcial 3 — Estructura Trie</p>
        <h1 className="page-header__title">Buscador Predictivo</h1>
        <p className="page-header__subtitle">
          Busca canciones por prefijo usando un árbol Trie.
        </p>
      </div>

    
      <div className="sp-card sp-card--accent" style={{ marginBottom: "1.5rem" }}>
        <p className="sp-section-title">Buscar canción</p>

        <div className="search-wrapper">
          <input
            className="sp-input"
            placeholder="Escribe el nombre de una canción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {exactResult !== null && query.trim() && (
          <div style={{ marginTop: "0.75rem" }}>
            {exactResult ? (
              <span className="sp-badge">Canción encontrada</span>
            ) : (
              <span className="sp-badge" style={{ background: "rgba(255,60,60,0.1)", color: "#ff6b6b" }}>
                No existe exactamente
              </span>
            )}
          </div>
        )}

        {/* Sugerencias */}
        {suggestions.length > 0 && (
          <div className="suggestions-box" style={{ marginTop: "0.75rem" }}>
            {suggestions.map((s, i) => (
              <div
                key={i}
                className={`suggestions-box__item ${trie.search(s) && s.toLowerCase() === query.toLowerCase() ? "suggestions-box__item--exact" : ""}`}
                onClick={() => setQuery(s)}
              >
                <span>🎵</span>
                <span>{s}</span>
              </div>
            ))}
          </div>
        )}

        {query && suggestions.length === 0 && (
          <p style={{ marginTop: "0.75rem", color: "var(--text-muted, #535353)", fontSize: "0.875rem" }}>
            Sin sugerencias para "{query}"
          </p>
        )}
      </div>

      {/* Agregar canción al Trie  w*/}
      <div className="sp-card" style={{ marginBottom: "1.5rem" }}>
        <p className="sp-section-title">Insertar nueva canción al Trie</p>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input
            className="sp-input"
            placeholder="Título de la canción..."
            value={addTitle}
            onChange={(e) => setAddTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddSong()}
            style={{ flex: 1 }}
          />
          <button className="sp-btn" onClick={handleAddSong}>
            Insertar
          </button>
        </div>
      </div>

      {/* Lista de canciones  */}
      <div className="sp-card">
        <p className="sp-section-title">Canciones en el Trie ({allTitles.length})</p>
        <div className="sp-scroll" style={{ maxHeight: "280px" }}>
          {songs.map((song, i) => (
            <div className="sp-song-row" key={song.id} onClick={() => setQuery(song.title)}>
              <span className="sp-song-row__index">{i + 1}</span>
              <div className="sp-song-row__info">
                <div className="sp-song-row__title">{song.title}</div>
                <div className="sp-song-row__artist">{song.artist}</div>
                <div className="rank-bar">
                  <div
                    className="rank-bar__fill"
                    style={{ width: `${(song.plays / maxPlays) * 100}%` }}
                  />
                </div>
              </div>
              <span className="sp-song-row__plays">
                {(song.plays / 1000).toFixed(0)}K
              </span>
            </div>
          ))}
          {allTitles.filter((t) => !songs.find((s) => s.title === t)).map((t, i) => (
            <div className="sp-song-row" key={`extra-${i}`} onClick={() => setQuery(t)}>
              <span className="sp-song-row__index">+</span>
              <div className="sp-song-row__info">
                <div className="sp-song-row__title">{t}</div>
                <div className="sp-song-row__artist">Agregada manualmente</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}