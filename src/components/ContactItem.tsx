/**
 * Componente ContactItem
 *
 * Muestra un contacto individual con su información (id, nombre, teléfono)
 * y un botón para eliminarlo.
 *
 * Props:
 * - contact: { id, nombre, telefono } - Objeto con los datos del contacto
 * - onDelete: (id) => void - Función callback para eliminar el contacto
 */

interface Contact {
  id: number;
  nombre: string;
  telefono: string;
}

interface ContactItemProps {
  contact: Contact;
  onDelete: (id: number) => void;
}

export default function ContactItem({ contact, onDelete }: ContactItemProps) {
  return (
    <li className="contact-item">
      <div className="contact-info">
        <p className="contact-name">
          <strong>{contact.nombre}</strong>
        </p>
        <p className="contact-phone">{contact.telefono}</p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(contact.id)}>
        Eliminar
      </button>
    </li>
  );
}
