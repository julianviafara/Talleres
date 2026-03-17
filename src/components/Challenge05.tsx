import { useState } from "react";

interface Person {
  id: number;
  name: string;
  withdrawal: number;
  arrival: string; // lo genera al azar el sistema, no lo ingresa el usuario
}

function randomArrival(): string {
  const base = new Date();
  base.setMinutes(base.getMinutes() + Math.floor(Math.random() * 120));
  return base.toISOString();
}

function formatArrival(iso: string): string {
  return new Date(iso).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

const mockPeople: Person[] = [
  { id: 1, name: "Laura Gómez", withdrawal: 150000, arrival: randomArrival() },
  { id: 2, name: "Carlos Pérez", withdrawal: 80000, arrival: randomArrival() },
  {
    id: 3,
    name: "Valentina Ruiz",
    withdrawal: 200000,
    arrival: randomArrival(),
  },
  { id: 4, name: "Andrés Silva", withdrawal: 50000, arrival: randomArrival() },
];

export default function Challenge05() {
  const [queue, setQueue] = useState<Person[]>(mockPeople);
  const [form, setForm] = useState({ name: "", withdrawal: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.withdrawal) return;
    const newPerson: Person = {
      id: Date.now(),
      name: form.name,
      withdrawal: Number(form.withdrawal),
      arrival: randomArrival(),
    };
    setQueue([...queue, newPerson]);
    setForm({ name: "", withdrawal: "" });
  };

  const sorted = [...queue].sort(
    (a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime(),
  );

  return (
    <main className="challenge">
      <p className="challenge__tag">Challenge 05</p>
      <h1 className="challenge__title">
        ATM <span>Queue</span>
      </h1>

      <div className="form-card">
        <p className="form-card__heading">→ Add a person to the queue</p>
        <div className="form-grid">
          <div className="field form-grid--wide">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              name="name"
              placeholder="e.g. Laura Gómez"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field form-grid--wide">
            <label htmlFor="withdrawal">Withdrawal Amount (COP)</label>
            <input
              id="withdrawal"
              name="withdrawal"
              type="number"
              placeholder="e.g. 150000"
              value={form.withdrawal}
              onChange={handleChange}
            />
          </div>
        </div>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.7rem",
            color: "var(--muted)",
            marginTop: "1rem",
          }}
        >
          * Arrival time is assigned automatically by the system.
        </p>
        <button className="btn-submit" onClick={handleAdd}>
          Join Queue
        </button>
      </div>

      <p className="list-heading">
        Queue — {queue.length} person{queue.length !== 1 ? "s" : ""} · sorted by
        arrival
      </p>

      {sorted.length === 0 ? (
        <p className="list-empty">The queue is empty. Add a person above.</p>
      ) : (
        sorted.map((person, i) => (
          <div className="item-card" key={person.id}>
            <span className="item-card__index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="item-card__body">
              <span className="item-card__name">
                {person.name}
                {i === 0 && <span className="atm-badge">Next</span>}
              </span>
              <div className="item-card__meta">
                <span className="item-card__pill">
                  Withdrawal{" "}
                  <strong>
                    ${person.withdrawal.toLocaleString("es-CO")} COP
                  </strong>
                </span>
                <span className="item-card__pill">
                  Arrival <strong>{formatArrival(person.arrival)}</strong>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
