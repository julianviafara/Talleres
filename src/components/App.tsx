/**
 * Componente App (Principal)
 *
 * Gestiona:
 * - Estado de carga (isLoading)
 * - Lista de contactos
 * - Simulación de carga con useEffect y setTimeout (2 segundos)
 * - Lógica para agregar contactos
 * - Lógica para eliminar contactos
 *
 * Renderizado condicional:
 * - Si isLoading es true, muestra Loader
 * - Si isLoading es false, muestra ContactForm y ContactList
 */

import { useState, useEffect } from "react";
import Loader from "./Loader";
import ContactForm from "./ContactForm";
import ContactList from "./ContactList";
import "../App.css";

interface Contact {
  id: number;
  nombre: string;
  telefono: string;
}

export default function App() {
  // Estado para controlar si está cargando
  const [isLoading, setIsLoading] = useState(true);

  // Estado para guardar los contactos
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Estado para generar IDs únicos
  const [nextId, setNextId] = useState(0);

  // Simular la carga de datos con useEffect
  useEffect(() => {
    // Simular 2 segundos de carga
    const timer = setTimeout(() => {
      // Cargar contactos iniciales simulados
      const initialContacts: Contact[] = [
        { id: 1, nombre: "Juan Pérez", telefono: "3001234567" },
        { id: 2, nombre: "María García", telefono: "3007654321" },
        { id: 3, nombre: "Carlos López", telefono: "3009876543" },
      ];

      setContacts(initialContacts);
      setNextId(4);
      setIsLoading(false);
    }, 2000);

    // Cleanup del timer
    return () => clearTimeout(timer);
  }, []);

  // Función para agregar un nuevo contacto
  const handleAddContact = (nombre: string, telefono: string) => {
    const newContact: Contact = {
      id: nextId,
      nombre,
      telefono,
    };

    setContacts([...contacts, newContact]);
    setNextId(nextId + 1);
  };

  // Función para eliminar un contacto
  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📇 Agenda de Contactos</h1>
      </header>

      <main className="app-main">
        {/* Renderizado condicional: mostrar Loader o contenido */}
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ContactForm onAdd={handleAddContact} />
            <ContactList contacts={contacts} onDelete={handleDeleteContact} />
          </>
        )}
      </main>
    </div>
  );
}
