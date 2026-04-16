import { useState } from "react";
import type { NodeType, TreeNode } from "../types";
import { canHaveChildren } from "../utils/naryTree";

interface Props {
  selectedNode: TreeNode | null;  
  onAdd: (name: string, type: NodeType, parentId: string | null) => void;
}

export default function AddNodeForm({ selectedNode, onAdd }: Props) {
  const [name, setName] = useState("");
  const [type, setType] = useState<NodeType>("folder");

 
  const parentIsFile = selectedNode !== null && !canHaveChildren(selectedNode);

  function handleSubmit() {
    if (!name.trim()) return;
    const parentId = selectedNode ? selectedNode.id : null;
    onAdd(name.trim(), type, parentId);
    setName("");
  }

  return (
    <div className="bg-white border rounded-xl p-4 mb-4">
      <h2 className="font-semibold mb-3 text-sm">
        Agregar en:{" "}
        <span className="text-blue-600">
          {selectedNode ? selectedNode.name : "Raíz"}
        </span>
      </h2>

      {parentIsFile ? (
        <p className="text-red-500 text-sm">
          Un archivo no puede contener hijos. Selecciona una carpeta.
        </p>
      ) : (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="border rounded-md px-3 py-2 text-sm w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value="folder"
                checked={type === "folder"}
                onChange={() => setType("folder")}
              />
               Carpeta
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                value="file"
                checked={type === "file"}
                onChange={() => setType("file")}
              />
               Archivo
            </label>
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
          >
            Agregar
          </button>
        </>
      )}
    </div>
  );
}