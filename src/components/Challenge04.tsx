import { useState } from "react";

interface Book {
  id: number;
  name: string;
  isbn: string;
  author: string;
  editorial: string;
}

const mockBooks: Book[] = [
  {
    id: 1,
    name: "Clean Code",
    isbn: "978-0132350884",
    author: "Robert C. Martin",
    editorial: "Prentice Hall",
  },
  {
    id: 2,
    name: "The Pragmatic Programmer",
    isbn: "978-0135957059",
    author: "David Thomas",
    editorial: "Addison-Wesley",
  },
  {
    id: 3,
    name: "You Don't Know JS",
    isbn: "978-1491904244",
    author: "Kyle Simpson",
    editorial: "O'Reilly",
  },
];

export default function Challenge04() {
  const [stack, setStack] = useState<Book[]>(mockBooks);
  const [form, setForm] = useState({
    name: "",
    isbn: "",
    author: "",
    editorial: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.name || !form.isbn || !form.author || !form.editorial) return;
    setStack([...stack, { id: Date.now(), ...form }]);
    setForm({ name: "", isbn: "", author: "", editorial: "" });
  };

  return (
    <main className="challenge">
      <p className="challenge__tag">Challenge 04</p>
      <h1 className="challenge__title">
        Book <span>Stack</span>
      </h1>

      <div className="form-card">
        <p className="form-card__heading">
          → Add a new book (Añadir Nuevo Libro)
        </p>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="name">Book Name</label>
            <input
              id="name"
              name="name"
              placeholder="e.g. Clean Code"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="isbn">ISBN</label>
            <input
              id="isbn"
              name="isbn"
              placeholder="e.g. 978-0132350884"
              value={form.isbn}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="author">Author</label>
            <input
              id="author"
              name="author"
              placeholder="e.g. Robert C. Martin"
              value={form.author}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label htmlFor="editorial">Editorial</label>
            <input
              id="editorial"
              name="editorial"
              placeholder="e.g. Prentice Hall"
              value={form.editorial}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn-submit" onClick={handleAdd}>
          Push to Stack
        </button>
      </div>

      <p className="list-heading">
        Stack — {stack.length} book{stack.length !== 1 ? "s" : ""}
      </p>

      {stack.length === 0 ? (
        <p className="list-empty">The stack is empty. Add a book above.</p>
      ) : (
        [...stack].reverse().map((book, i) => (
          <div className="item-card" key={book.id}>
            <span className="item-card__index">
              {String(stack.length - i).padStart(2, "0")}
            </span>
            <div className="item-card__body">
              <span className="item-card__name">{book.name}</span>
              <div className="item-card__meta">
                <span className="item-card__pill">
                  Author <strong>{book.author}</strong>
                </span>
                <span className="item-card__pill">
                  ISBN <strong>{book.isbn}</strong>
                </span>
                <span className="item-card__pill">
                  Editorial <strong>{book.editorial}</strong>
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </main>
  );
}
