/**
 * Componente ContactForm
 *
 * Formulario controlado para agregar nuevos contactos.
 * Valida que los campos nombre y teléfono no estén vacíos.
 * Al hacer clic en "Agregar", llama a la función onAdd y limpia el formulario.
 *
 * Props:
 * - onAdd: (nombre: string, telefono: string) => void - Función para agregar contacto
 */

import { useState } from "react";

interface ContactFormProps {
  onAdd: (nombre: string, telefono: string) => void;
}

export default function ContactForm({ onAdd }: ContactFormProps) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validación: campos no vacíos
    if (!nombre.trim() || !telefono.trim()) {
      setError("Por favor, completa todos los campos");
      return;
    }

    // Agregar contacto
    onAdd(nombre, telefono);

    // Limpiar formulario y error
    setNombre("");
    setTelefono("");
    setError("");
  };

  return (
    <div className="form-container">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </div>

        <div className="form-group">
          <label htmlFor="telefono">Teléfono:</label>
          <input
            id="telefono"
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            placeholder="Ingresa el teléfono"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn-add">
          Agregar Contacto
        </button>
      </form>
    </div>
  );
}
