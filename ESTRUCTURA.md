# 📇 Agenda de Contactos - Estructura de Componentes

## 🎯 Requisitos Cumplidos

✅ **Loader con indicador de carga** - Se muestra durante 2 segundos al iniciar
✅ **useEffect y setTimeout** - Simulan la carga de datos
✅ **useState para estado** - Se usa para contactos, isLoading y formulario
✅ **Agregar contactos** - Formulario controlado con validación
✅ **Eliminar contactos** - Con botón y filtrado del estado
✅ **Componentes divididos** - Estructura modular y limpia
✅ **Props y renderizado condicional** - Solo React hooks básicos
✅ **Estilos CSS** - Diseño atractivo y responsivo

---

## 📂 Estructura de Archivos

```
src/
├── App.tsx                    # Re-export del componente principal
├── App.css                    # Estilos de la aplicación
├── main.tsx                   # Punto de entrada
└── components/
    ├── App.tsx                # Componente principal (gestiona estado)
    ├── Loader.tsx             # Indicador de carga
    ├── ContactForm.tsx        # Formulario para agregar contactos
    ├── ContactList.tsx        # Lista de contactos
    └── ContactItem.tsx        # Item individual de contacto
```

---

## 📝 Descripción de Componentes

### **Loader.tsx**

- **Propósito**: Muestra un spinner animado mientras se cargan los datos
- **Props**: Ninguna
- **Estado**: No usa estado local
- **Funcionalidad**: Solo renderiza el indicador de carga

```tsx
<Loader /> → Muestra spinner animado y "Cargando contactos..."
```

---

### **ContactItem.tsx**

- **Propósito**: Renderiza un contacto individual con su información y botón eliminar
- **Props**:
  - `contact`: { id, nombre, telefono }
  - `onDelete`: (id) => void
- **Funcionalidad**: Muestra datos y maneja eliminación

```tsx
<ContactItem
  contact={{ id: 1, nombre: "Juan", telefono: "123" }}
  onDelete={handleDelete}
/>
```

---

### **ContactList.tsx**

- **Propósito**: Renderiza la lista de todos los contactos
- **Props**:
  - `contacts`: Contact[]
  - `onDelete`: (id) => void
- **Funcionalidad**: Mapea contactos a ContactItem, muestra mensaje si está vacía

```tsx
<ContactList contacts={[...]} onDelete={handleDelete} />
```

---

### **ContactForm.tsx**

- **Propósito**: Formulario controlado para agregar nuevos contactos
- **Estado Local**: nombre, telefono, error
- **Props**: `onAdd`: (nombre, telefono) => void
- **Validación**: Verifica que los campos no estén vacíos
- **Funcionalidad**: Agrega contacto y limpia el formulario

```tsx
<ContactForm onAdd={handleAddContact} />
```

---

### **App.tsx** (Componentes)

- **Propósito**: Componente raíz que gestiona toda la lógica
- **Estado**:
  - `isLoading`: boolean - controla si se está cargando
  - `contacts`: Contact[] - lista de contactos
  - `nextId`: number - para generar IDs únicos
- **useEffect**: Simula carga de 2 segundos y carga datos iniciales
- **Funciones**:
  - `handleAddContact()`: Agrega nuevo contacto
  - `handleDeleteContact()`: Elimina contacto por ID
- **Renderizado Condicional**:
  - Si `isLoading`: muestra `<Loader />`
  - Si no: muestra `<ContactForm />` y `<ContactList />`

```tsx
{
  isLoading ? <Loader /> : <>contenido</>;
}
```

---

## 🔄 Flujo de Datos

```
App.tsx (Estado Principal)
│
├─→ isLoading ──→ Loader (mientras carga)
│
├─→ contacts ──→ ContactList
│               └─→ ContactItem (map cada contacto)
│                   └─→ onDelete callback a App
│
└─→ ContactForm
    └─→ onAdd callback a App (agrega a state)
```

---

## 💾 Datos Iniciales

Los contactos se cargan después de 2 segundos:

```javascript
[
  { id: 1, nombre: "Juan Pérez", telefono: "3001234567" },
  { id: 2, nombre: "María García", telefono: "3007654321" },
  { id: 3, nombre: "Carlos López", telefono: "3009876543" },
];
```

---

## 🎨 Estilos Principales

- **Gradient Background**: Púrpura elegante en el header
- **Cards**: Tarjetas blancas con sombra para mejor visibilidad
- **Animaciones**:
  - Spinner del loader
  - Hover effects en botones y items
  - Transiciones suaves
- **Colores**:
  - Primario: #667eea (púrpura)
  - Secundario: #764ba2 (púrpura oscuro)
  - Error: #e74c3c (rojo)

---

## ⚙️ Tecnologías Usadas

- ✅ **React** (Hooks: useState, useEffect)
- ✅ **TypeScript** (Type Safety)
- ✅ **Vite** (Build tool)
- ✅ **CSS3** (Estilos sin librerías)
- ❌ Sin Redux, Router, ni frameworks CSS

---

## 🚀 Cómo Usar

1. **Iniciar**: La app muestra un loader durante 2 segundos
2. **Esperar**: Se cargan 3 contactos de ejemplo
3. **Agregar**: Completa nombre y teléfono, haz clic en "Agregar Contacto"
4. **Eliminar**: Haz clic en el botón "Eliminar" de cualquier contacto
5. **Validación**: No puedes agregar contacto sin nombre o teléfono

---

## 📱 Características Principales

| Característica          | Implementación                   |
| ----------------------- | -------------------------------- |
| Loader                  | Componente con spinner CSS       |
| Carga async             | useEffect + setTimeout           |
| Agregar                 | useState + formulario controlado |
| Eliminar                | filter() en el estado            |
| Validación              | Checkeo de campos vacíos         |
| IDs únicos              | Contador `nextId`                |
| Componentes             | 5 archivos separados             |
| Props                   | Pasaje de datos y callbacks      |
| Renderizado condicional | Ternario en App.tsx              |
