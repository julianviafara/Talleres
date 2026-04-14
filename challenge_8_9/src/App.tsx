import { useState } from "react";
import BSTVisualizer from "./components/BSTVisualizer";
import Sidebar from "./components/Sidebar";
import PageContent from "./components/Sidebar/PageContent";
import { menuTree } from "./utils/menuTree";
import type { MenuNode } from "./types";

type Challenge = "08" | "09";

export default function App() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge>("08");
  const [activeMenuNode, setActiveMenuNode] = useState<MenuNode>(
    menuTree.children![0]
  );

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top nav – challenge switcher */}
      <header className="border-b border-slate-800 px-6 py-3 flex items-center gap-6 shrink-0">
        <span className="text-slate-400 text-sm font-semibold tracking-widest uppercase">
          EDA 2
        </span>
        <div className="flex gap-2">
          {(["08", "09"] as Challenge[]).map((c) => (
            <button
              key={c}
              onClick={() => setActiveChallenge(c)}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
                activeChallenge === c
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
              }`}
            >
              Challenge {c}
            </button>
          ))}
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {activeChallenge === "08" ? (
          // Challenge 08 – BST full-width
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto h-full flex flex-col gap-6">
              <BSTVisualizer />
            </div>
          </div>
        ) : (
          // Challenge 09 – Sidebar layout
          <>
            <Sidebar activeId={activeMenuNode.id} onSelect={setActiveMenuNode} />
            <PageContent activeNode={activeMenuNode} />
          </>
        )}
      </div>
    </div>
  );
}