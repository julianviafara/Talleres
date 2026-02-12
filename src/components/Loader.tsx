/**
 * Componente Loader
 *
 * Muestra un indicador de carga animado mientras se cargan los datos.
 * No recibe props, simplemente muestra un mensaje de carga.
 */

export default function Loader() {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Cargando contactos...</p>
    </div>
  );
}
