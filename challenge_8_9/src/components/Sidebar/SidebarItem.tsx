import { useState } from "react";
import type { MenuNode } from "../../types";
import { ChevronRight } from "lucide-react";

interface SidebarItemProps {
  node: MenuNode;
  depth?: number;
  activeId: string;
  onSelect: (node: MenuNode) => void;
}

export default function SidebarItem({
  node,
  depth = 0,
  activeId,
  onSelect,
}: SidebarItemProps) {
  const hasChildren = !!node.children?.length;
  const isActive = activeId === node.id;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (hasChildren) setIsOpen((o) => !o);
    onSelect(node);
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className={`
          w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition-all
          ${depth === 0 ? "font-semibold" : "font-normal"}
          ${isActive
            ? "bg-indigo-600 text-white"
            : "text-slate-300 hover:bg-slate-700 hover:text-white"
          }
        `}
        style={{ paddingLeft: `${0.75 + depth * 1}rem` }}
      >
        <span className="truncate">{node.title}</span>
        {hasChildren && (
          <ChevronRight
            size={14}
            className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
          />
        )}
      </button>

      {hasChildren && isOpen && (
        <ul className="mt-0.5 space-y-0.5 border-l border-slate-700 ml-4 pl-1">
          {node.children!.map((child) => (
            <SidebarItem
              key={child.id}
              node={child}
              depth={depth + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      )}
    </li>
  );
}