import React from "react";

type TurnListProps = {
  turns: string[];
  currentIndex: number | null;
};

export const TurnList: React.FC<TurnListProps> = ({ turns, currentIndex }) => {
  if (!turns || turns.length === 0) {
    return <div className="turn-list empty">No turns yet.</div>;
  }

  return (
    <ul className="turn-list">
      {turns.map((turn, idx) => (
        <li
          key={idx}
          className={idx === currentIndex ? "turn-item active" : "turn-item"}
        >
          <span className="turn-label">{turn}</span>
          {idx === currentIndex && <span className="badge">Now</span>}
        </li>
      ))}
    </ul>
  );
};

export default TurnList;
