import React, { useState } from "react";

type ControlsProps = {
  onAddTurn: (label: string) => void;
  onNext: () => void;
  onReset: () => void;
  disableNext: boolean;
};

export const Controls: React.FC<ControlsProps> = ({
  onAddTurn,
  onNext,
  onReset,
  disableNext,
}) => {
  const [input, setInput] = useState<string>("");

  const handleAdd = (e?: React.FormEvent) => {
    e?.preventDefault();
    const value = input.trim();
    if (!value) return;
    onAddTurn(value);
    setInput("");
  };

  return (
    <div className="controls">
      <form onSubmit={handleAdd} className="add-form">
        <input
          aria-label="new-turn"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter new turn label"
        />
        <button type="submit">Add Turn</button>
      </form>

      <div className="buttons">
        <button onClick={onNext} disabled={disableNext}>
          Next Turn
        </button>
        <button onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default Controls;
