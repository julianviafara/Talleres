import type { MenuNode } from "../../types";

interface PageContentProps {
  activeNode: MenuNode;
}

// Simple placeholder pages per menu node
function PlaceholderPage({ node }: { node: MenuNode }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-3xl">
        📄
      </div>
      <div>
        <h2 className="text-xl font-bold text-white">{node.title}</h2>
        <p className="text-slate-400 text-sm mt-1">
          Component: <span className="text-indigo-400 font-mono">{node.component}</span>
        </p>
        <p className="text-slate-500 text-xs mt-1">
          Route: <span className="font-mono">{node.link}</span>
        </p>
      </div>
    </div>
  );
}

export default function PageContent({ activeNode }: PageContentProps) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-950 p-8 h-full">
      <div className="max-w-2xl mx-auto h-full">
        {/* Breadcrumb */}
        <p className="text-slate-500 text-xs font-mono mb-6">
          {activeNode.link}
        </p>
        <PlaceholderPage node={activeNode} />
      </div>
    </main>
  );
}