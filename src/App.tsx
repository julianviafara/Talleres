import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {
  collection,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../src/firebase/config";
import { useAuth } from "../src/context/AuthContext";
import { buildTree, createNode } from "../src/utils/naryTree";
import Login from "../src/components/Login";
import FileTree from "../src/components/FileTree";
import AddNodeForm from "../src/components/AddNodeForm";
import type { TreeNode, NodeType } from "../src/types";

export default function App() {
  const { user, loading } = useAuth();
  const [flatNodes, setFlatNodes] = useState<Omit<TreeNode, "children">[]>([]);
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null);


  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "nodes"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        type: doc.data().type,
        createdBy: doc.data().createdBy,
        parentId: doc.data().parentId,
      })) as Omit<TreeNode, "children">[];
      setFlatNodes(data);
    });

    return unsub;
  }, [user]);

  async function handleAdd(name: string, type: NodeType, parentId: string | null) {
    if (!user) return;

    const newNode = createNode("", name, type, user.email!, parentId);

    await addDoc(collection(db, "nodes"), {
      name: newNode.name,
      type: newNode.type,
      createdBy: newNode.createdBy,
      parentId: newNode.parentId,
      createdAt: serverTimestamp(),
    });
  }

  function handleLogout() {
    signOut(auth);
    setSelectedNode(null);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const tree = buildTree(flatNodes);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-700"> Gestor de Archivos</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">{user.email}</span>
          <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">
            Cerrar sesión
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto mt-6 px-4 flex gap-6">
        <div className="flex-1 bg-white border rounded-xl p-4 min-h-[500px]">
          <h2 className="font-semibold text-sm mb-3 text-gray-700">Árbol de archivos</h2>
          <FileTree nodes={tree} selectedId={selectedNode?.id ?? null} onSelect={setSelectedNode} />
        </div>

        <div className="w-72">
          <AddNodeForm selectedNode={selectedNode} onAdd={handleAdd} />
          {selectedNode && (
            <div className="bg-white border rounded-xl p-4 text-sm text-gray-600">
              <p className="font-semibold mb-1">Nodo seleccionado</p>
              <p>Nombre: {selectedNode.name}</p>
              <p>Tipo: {selectedNode.type === "folder" ? "Carpeta" : "Archivo"}</p>
              <p>Creado por: {selectedNode.createdBy}</p>
              <button onClick={() => setSelectedNode(null)} className="mt-2 text-xs text-blue-500 hover:underline">
                Deseleccionar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}