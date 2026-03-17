import { useState } from "react";
import Header from "./components/Header";
import Challenge04 from "./components/Challenge04";
import Challenge05 from "./components/Challenge05";
import "./index.css";

// El sistema solo da la función de agregar, no hay eliminar ni editar.
//Las dos practicas dadas en la clase del día 11 de mayo estan en este proyecto
//by Julian Andres Viafara - 2236004

type Tab = "ch04" | "ch05";

export default function App() {
  const [tab, setTab] = useState<Tab>("ch04");

  return (
    <>
      <Header active={tab} onChange={setTab} />
      {tab === "ch04" ? <Challenge04 /> : <Challenge05 />}
    </>
  );
}
