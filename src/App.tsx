import { useState, useEffect } from "react";
import "./App.css";

//Por Julian Andres Viafara Mosquera - 2236004

// Hice todo en un solo componenete para no complicar la estructura, aunque no es lo ideal y en lo personal prefiero trabajar
// con componentes individuales.

// Declarar tipos de datos
interface Vehicle {
  id: number;
  name: string;
  type: string;
  plate: string;
  rate: number;
}

interface RentalRecord {
  id: number;
  name: string;
  plate: string;
}

interface FeaturedVehicle {
  id: number;
  name: string;
}

interface Investor {
  id: number;
  name: string;
  stake: string;
}

// Lista de vehiculos disponibles (Lista Enlazada)
class Node<T> {
  data: T;
  next: Node<T> | null = null;
  constructor(data: T) {
    this.data = data;
  }
}

class LinkedList<T extends { id: number }> {
  head: Node<T> | null = null;

  add(data: T): void {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      return;
    }
    let cur = this.head;
    while (cur.next) cur = cur.next;
    cur.next = node;
  }

  removeById(id: number): void {
    if (!this.head) return;
    if (this.head.data.id === id) {
      this.head = this.head.next;
      return;
    }
    let cur = this.head;
    while (cur.next) {
      if (cur.next.data.id === id) {
        cur.next = cur.next.next;
        return;
      }
      cur = cur.next;
    }
  }

  toArray(): T[] {
    const arr: T[] = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.data);
      cur = cur.next;
    }
    return arr;
  }
}

// Historial de alquileres (Lista Doblemente Enlazada)
class DNode<T> {
  data: T;
  next: DNode<T> | null = null;
  prev: DNode<T> | null = null;
  constructor(data: T) {
    this.data = data;
  }
}

class DoublyLinkedList<T> {
  head: DNode<T> | null = null;
  tail: DNode<T> | null = null;

  add(data: T): void {
    const node = new DNode(data);
    if (!this.tail) {
      this.head = this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  toArray(): T[] {
    const arr: T[] = [];
    let cur = this.head;
    while (cur) {
      arr.push(cur.data);
      cur = cur.next;
    }
    return arr;
  }
}

// Vehículo destacado (Lista Circular)
class CircularList<T> {
  private head: Node<T> | null = null;
  private current: Node<T> | null = null;

  add(data: T): void {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      node.next = node;
      this.current = node;
      return;
    }
    let tail = this.head;
    while (tail.next !== this.head) tail = tail.next!;
    tail.next = node;
    node.next = this.head;
  }

  rotate(): T | null {
    if (!this.current) return null;
    this.current = this.current.next;
    return this.current ? this.current.data : null;
  }

  getCurrent(): T | null {
    return this.current ? this.current.data : null;
  }
}

// Inversionistas (Lista Circular Doblemente Enlazada)
class CDNode<T> {
  data: T;
  next: CDNode<T> | null = null;
  prev: CDNode<T> | null = null;
  constructor(data: T) {
    this.data = data;
  }
}

class CircularDoublyLinkedList<T> {
  private head: CDNode<T> | null = null;

  add(data: T): void {
    const node = new CDNode(data);
    if (!this.head) {
      this.head = node;
      node.next = node;
      node.prev = node;
      return;
    }
    const tail = this.head.prev!;
    tail.next = node;
    node.prev = tail;
    node.next = this.head;
    this.head.prev = node;
  }

  toArray(): T[] {
    if (!this.head) return [];
    const arr: T[] = [];
    let cur = this.head;
    do {
      arr.push(cur.data);
      cur = cur.next!;
    } while (cur !== this.head);
    return arr;
  }
}

// Datos iniciales
const availableList = new LinkedList<Vehicle>();
[
  {
    id: 1,
    name: "Tesla Model 3",
    type: "Eléctrico",
    plate: "ABC-123",
    rate: 45,
  },
  { id: 2, name: "Toyota Prius", type: "Híbrido", plate: "DEF-456", rate: 35 },
  { id: 3, name: "Renault Zoe", type: "Eléctrico", plate: "GHI-789", rate: 30 },
  { id: 4, name: "BMW i3", type: "Eléctrico", plate: "JKL-012", rate: 55 },
  { id: 5, name: "VW Golf", type: "Gasolina", plate: "MNO-345", rate: 28 },
].forEach((v) => availableList.add(v));

const rentalHistory = new DoublyLinkedList<RentalRecord>();

const featuredList = new CircularList<FeaturedVehicle>();
[
  { id: 1, name: "Ferrari Roma" },
  { id: 2, name: "Porsche Taycan" },
  { id: 3, name: "Lamborghini Urus" },
].forEach((v) => featuredList.add(v));

const investorList = new CircularDoublyLinkedList<Investor>();
[
  { id: 1, name: "Carlos Ruiz", stake: "32%" },
  { id: 2, name: "Ana Gómez", stake: "14%" },
  { id: 3, name: "Pedro Mora", stake: "18%" },
  { id: 4, name: "Laura Díaz", stake: "11%" },
  { id: 2236004, name: "Julian Viafara", stake: "25%" },
].forEach((i) => investorList.add(i));

export default function App() {
  const [available, setAvailable] = useState<Vehicle[]>(
    availableList.toArray(),
  );
  const [history, setHistory] = useState<RentalRecord[]>([]);
  const [featured, setFeatured] = useState<FeaturedVehicle | null>(
    featuredList.getCurrent(),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setFeatured(featuredList.rotate());
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  function rentVehicle(vehicle: Vehicle): void {
    availableList.removeById(vehicle.id);
    rentalHistory.add({
      id: vehicle.id,
      name: vehicle.name,
      plate: vehicle.plate,
    });
    setAvailable(availableList.toArray());
    setHistory(rentalHistory.toArray());
  }

  return (
    <div className="app">
      <header className="header">
        {/*El Nombre de la Empresa lo Invente */}
        <h1>UrbanRide Fleet</h1>
        <p>Sistema de Gestión de Movilidad Urbana</p>{" "}
      </header>

      <div className="grid">
        {/* La Lista Enlazada */}
        <div className="panel">
          <h2>
            Vehículos Disponibles <span className="tag">Lista Enlazada</span>
          </h2>
          {available.length === 0 && (
            <p className="empty">Sin vehículos disponibles</p>
          )}
          {available.map((v) => (
            <div className="item" key={v.id}>
              <div>
                <strong>{v.name}</strong>
                <small>
                  {v.type} · {v.plate} · ${v.rate}/h
                </small>
              </div>
              <button onClick={() => rentVehicle(v)}>Alquilar</button>
            </div>
          ))}
        </div>

        {/* Lista Doblemente Enlazada */}
        <div className="panel">
          <h2>
            Historial de Alquileres <span className="tag">Lista Doble</span>
          </h2>
          {history.length === 0 && <p className="empty">Sin alquileres aún</p>}
          {[...history].reverse().map((r, i) => (
            <div className="item" key={i}>
              <div>
                <strong>{r.name}</strong>
                <small>{r.plate}</small>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Lista Circular */}
        <div className="panel">
          <h2>
            Vehículo Destacado <span className="tag">Lista Circular</span>
          </h2>
          {featured && (
            <div className="featured">
              <p className="featured-name">{featured.name}</p>
              <small>Cambia cada 5 segundos</small>
            </div>
          )}
        </div>

        {/*  Lista Circular Doble */}
        <div className="panel">
          <h2>
            Inversionistas <span className="tag">Lista Circ. Doble</span>
          </h2>
          {investorList.toArray().map((inv) => (
            <div className="item" key={inv.id}>
              <div>
                <strong>{inv.name}</strong>
                <small>{inv.stake} de participación</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
