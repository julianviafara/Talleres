/**
 * Componente ContactList
 *
 * Muestra la lista de contactos usando el componente ContactItem.
 * Si no hay contactos, muestra un mensaje indicándolo.
 *
 * Props:
 * - contacts: Array<{id, nombre, telefono}> - Lista de contactos a mostrar
 * - onDelete: (id) => void - Función callback para eliminar un contacto
 */

import ContactItem from "./ContactItem";

interface Contact {
  id: number;
  nombre: string;
  telefono: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: number) => void;
}

export default function ContactList({ contacts, onDelete }: ContactListProps) {
  // Si no hay contactos, mostrar mensaje
  if (contacts.length === 0) {
    return <p className="no-contacts">No hay contactos aún. ¡Agregar uno!</p>;
  }

  return (
    <div className="contact-list-container">
      <h2>Contactos ({contacts.length})</h2>
      <ul className="contact-list">
        {contacts.map((contact) => (
          <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
}
