import { useEffect, useState } from "react";
import "./App.css";
import TurnList from "./components/TurnList";
import Controls from "./components/Controls";

type NullableNumber = number | null;

function App() {
  const [turns, setTurns] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<NullableNumber>(null);
  const [message, setMessage] = useState<string | null>(null);

  const addTurn = (label: string) => {
    setTurns((prev) => {
      const next = [...prev, label];
      if (currentIndex === null) {
        setCurrentIndex(0);
      }
      return next;
    });
  };

  const nextTurn = () => {
    if (turns.length === 0) return;
    setCurrentIndex((prev) => {
      const current = prev === null ? 0 : prev;
      const next = (current + 1) % turns.length;
      return next;
    });
  };

  const reset = () => {
    setTurns([]);
    setCurrentIndex(null);
    setMessage(null);
  };

  useEffect(() => {
    if (currentIndex === null || turns.length === 0) {
      setMessage("No active turn");
      console.log("No active turn");
      return;
    }

    const active = turns[currentIndex];
    const text = `Active turn: ${active}`;
    setMessage(text);
    console.log(text);

    const timer = setTimeout(() => setMessage(null), 3000);
    return () => clearTimeout(timer);
  }, [currentIndex, turns]);

  const activeTurn =
    currentIndex === null || turns.length === 0 ? "—" : turns[currentIndex];

  return (
    <div className="app-container">
      <header>
        <h1>Turn Taking System</h1>
      </header>

      <main>
        <section className="status">
          <h2>Current Active Turn</h2>
          <div className="active-display">{activeTurn}</div>
          {message && <div className="message">{message}</div>}
        </section>

        <section className="controls-section">
          <Controls
            onAddTurn={addTurn}
            onNext={nextTurn}
            onReset={reset}
            disableNext={turns.length === 0}
          />
        </section>

        <section className="list-section">
          <h2>Queue</h2>
          <TurnList turns={turns} currentIndex={currentIndex} />
        </section>
      </main>
    </div>
  );
}

export default App;
