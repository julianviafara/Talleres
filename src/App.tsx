import React, { useState } from "react";
import "./App.css";
import LinkedListPage from "./pages/LinkedListPage.tsx";
import DoublyLinkedListPage from "./pages/DoublyLinkedListPage.tsx";

type Route = "linked" | "doubly";

function App() {
  const [route, setRoute] = useState<Route>("linked");

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Reto 07</h1>
        <nav className="app-nav">
          <button
            className={`nav-btn ${route === "linked" ? "active" : ""}`}
            onClick={() => setRoute("linked")}
          >
            Songs Player
          </button>
          <button
            className={`nav-btn ${route === "doubly" ? "active" : ""}`}
            onClick={() => setRoute("doubly")}
          >
            Browser Nav
          </button>
        </nav>
      </header>

      <main className="app-main">
        {route === "linked" ? <LinkedListPage /> : <DoublyLinkedListPage />}
      </main>
    </div>
  );
}

export default App;
