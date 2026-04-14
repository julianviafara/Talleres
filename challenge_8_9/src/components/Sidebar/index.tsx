import type { MenuNode } from "../../types";
import { menuTree } from "../../utils/menuTree";
import SidebarItem from "./SidebarItem";

interface SidebarProps {
  activeId: string;
  onSelect: (node: MenuNode) => void;
}

export default function Sidebar({ activeId, onSelect }: SidebarProps) {
  return (
    <aside className="w-56 shrink-0 bg-slate-900 border-r border-slate-700 flex flex-col h-full">
      {/* Brand */}
      <div className="px-4 py-5 border-b border-slate-700">
        <span className="text-white font-bold tracking-tight text-base">
          Challenge <span className="text-indigo-400">09</span>
        </span>
        <p className="text-slate-500 text-xs mt-0.5">N-ary Tree Sidebar</p>
      </div>

      {/* Navigation tree – skip root node, render its children */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-0.5">
          {menuTree.children?.map((node) => (
            <SidebarItem
              key={node.id}
              node={node}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-700">
        <p className="text-slate-600 text-xs">EDA 2 – N-ary Tree</p>
      </div>
    </aside>
  );
}