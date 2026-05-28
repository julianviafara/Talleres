import { useState } from "react";
import type { Song, Tab } from "./types";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/SearchBar";
import RankingPanel from "./components/RankingPanel";
import RecommendationGraph from "./components/RecommendationGraph";
import "./styles/main.scss";

const SONGS: Song[] = [
  { id: "1",  title: "Dos Gardenias",      artist: "Buena Vista Social Club", plays: 3_800_000 },
  { id: "2",  title: "Shape of You",       artist: "Ed Sheeran",           plays: 3_500_000 },
  { id: "3",  title: "Dance Monkey",       artist: "Tones and I",         plays: 2_900_000 },
  { id: "4",  title: "Rockstar",           artist: "Post Malone",         plays: 2_700_000 },
  { id: "5",  title: "Someone You Loved",  artist: "Lewis Capaldi",       plays: 2_500_000 },
  { id: "6",  title: "Bad Guy",            artist: "Billie Eilish",       plays: 2_400_000 },
  { id: "7",  title: "Sunflower",          artist: "Post Malone",         plays: 2_200_000 },
  { id: "8",  title: "Senorita",           artist: "Shawn Mendes",        plays: 2_100_000 },
  { id: "9",  title: "Stay",               artist: "The Kid LAROI",       plays: 1_950_000 },
  { id: "10", title: "Levitating",         artist: "Dua Lipa",            plays: 1_800_000 },
  { id: "11", title: "Qué Será de Mí",     artist: "Lolita Flores",       plays: 4_800_000 },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("search");

  return (
    <div className="app">
      <Sidebar active={tab} onChange={setTab} />

      <div className="main-content">
        <div className="main-content__inner">
          {tab === "search"          && <SearchBar songs={SONGS} />}
          {tab === "ranking"         && <RankingPanel songs={SONGS} />}
          {tab === "recommendations" && <RecommendationGraph songs={SONGS} />}
        </div>
      </div>
    </div>
  );
}

/**
 * Parcial 3 
 * Julian Andres Viafara Mosquera - 2236004
 *
 * En este parcial construí una mini plataforma musical usando tres estructuras
 * de datos avanzadas, cada una resolviendo un problema concreto:
 *
 * 1. TRIE (Buscador predictivo)
 *    Implementé un Trie para almacenar los títulos de las canciones carácter
 *    por carácter. Esto permite buscar sugerencias por prefijo en O(m) donde
 *    m es la longitud del prefijo, mucho más eficiente que recorrer un array.
 *
 * 2. MAX HEAP (Ranking de popularidad)
 *    Usé un Max Heap para organizar las canciones por reproducciones. Siempre
 *    mantiene la canción más escuchada en la raíz, permitiendo extraer el TOP N
 *    en O(n log n) sin necesidad de ordenar todo el arreglo cada vez.
 *
 * 3. GRAFO NO DIRIGIDO (El usado para las recomendaciones)
 *    Representé las canciones como nodos y sus relaciones como aristas en un
 *    grafo no dirigido con lista de adyacencia. Así, dado un nodo, obtener sus
 *    vecinos (recomendaciones) es O(k) donde k es el número de conexiones.
 *
 * ── SCSS ───────────────────────────────────────
 *
 * Elegí SCSS porque permite organizar los estilos de forma modular y reutilizable,
 * algo que CSS plano no ofrece de manera nativa:
 *
 * - Variables ($green, $surface-2, etc.): un solo lugar para cambiar colores
 *   o tamaños en toda la app, sin buscar y reemplazar manualmente.
 *
 * - Mixins: bloques de estilos reutilizables
 *   que se "inyectan" donde se necesiten, evitando repetir las mismas reglas
 *   en múltiples clases.
 *
 * - Archivos parciales (_variables, _mixins, _components): ofrece una separación clara
 *   de responsabilidades; cada archivo tiene un único propósito y main.scss
 *   los une todos. Esto escala mejor que un solo archivo CSS gigante.
 *
 * En resumen, SCSS no cambia cómo funciona CSS en el navegador, sino cómo lo
 * escribimos: más limpio, más mantenible y mucho más fácil de escalar. 
 * 
 * Adicionalmente aproveche la oportunidad del parcial para mejorar mis habilidades 
 * con esta técnologia, espero que no haya problema al respecto.
 */