import { useState } from "react";
import type { TreeNode } from "../types";

interface FileTreeNodeProps {
  node: TreeNode;
  selectedId: string | null;
  onSelect: (node: TreeNode) => void;
}

function FileTreeNode({ node, selectedId, onSelect }: FileTreeNodeProps) {
  const [open, setOpen] = useState(true);
  const isSelected = node.id === selectedId;
  const isFolder = node.type === "folder";

  return (
    <div className="ml-4">
      <div
        onClick={() => {
          onSelect(node);
          if (isFolder) setOpen((o) => !o);
        }}
        className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md text-sm hover:bg-gray-100 ${
          isSelected ? "bg-blue-100 font-semibold text-blue-700" : ""
        }`}
      >
        <span>{isFolder ? (open ? "Carpeta" : "Carpeta") : "Archivo"}</span>
        <span>{node.name}</span>
        <span className="text-xs text-gray-400 ml-auto">{node.createdBy}</span>
      </div>

      {isFolder && open && node.children.length > 0 && (
        <div className="border-l border-gray-200 ml-3">
          {node.children.map((child) => (
            <FileTreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface FileTreeProps {
  nodes: TreeNode[];
  selectedId: string | null;
  onSelect: (node: TreeNode) => void;
}

export default function FileTree({ nodes, selectedId, onSelect }: FileTreeProps) {
  if (nodes.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center mt-8">
        No hay carpetas ni archivos aún. ¡Crea uno!
      </p>
    );
  }

  return (
    <div>
      {nodes.map((node) => (
        <FileTreeNode
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}