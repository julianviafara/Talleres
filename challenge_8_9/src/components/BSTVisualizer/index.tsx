import { useState, useCallback } from "react";
import Tree from "react-d3-tree";
import {
  buildBST,
  traverse,
  searchBST,
  toD3Tree,
  inorder,
  preorder,
  postorder,
} from "../../utils/bts.ts";
import type { BSTNode, TraversalType } from "../../types";

const DEFAULT_VALUES = [50, 30, 70, 20, 40, 60, 80, 10, 35];

// Custom node renderer for react-d3-tree
const renderCustomNode = ({
  nodeDatum,
}: {
  nodeDatum: { name: string; attributes?: Record<string, string | number> };
}) => (
  <g>
    <circle r={22} className="fill-indigo-600 stroke-indigo-300 stroke-2" />
    <text
      textAnchor="middle"
      dominantBaseline="central"
      className="fill-white text-xs font-bold"
      style={{ fontSize: 13, fontWeight: 700, fill: "white" }}
    >
      {nodeDatum.name}
    </text>
    {nodeDatum.attributes?.side && (
      <text
        x={26}
        y={-18}
        style={{ fontSize: 10, fill: "#a5b4fc" }}
      >
        {nodeDatum.attributes.side}
      </text>
    )}
  </g>
);

export default function BSTVisualizer() {
  const [inputStr, setInputStr] = useState(DEFAULT_VALUES.join(", "));
  const [tree, setTree] = useState<BSTNode | null>(() => buildBST(DEFAULT_VALUES));
  const [activeTraversal, setActiveTraversal] = useState<TraversalType>("inorder");
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState<boolean | null>(null);
  const [error, setError] = useState("");

  const handleBuild = useCallback(() => {
    setError("");
    setSearchResult(null);
    const nums = inputStr
      .split(/[\s,]+/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map(Number);

    if (nums.some(isNaN)) {
      setError("Please enter valid numbers separated by commas.");
      return;
    }
    const newTree = buildBST(nums);
    setTree(newTree);
    // Print to console as required
    console.log("── BST Traversals ──────────────────────────────");
    console.log("Inorder   (sorted):", inorder(newTree).join(" → "));
    console.log("Preorder  (root-L-R):", preorder(newTree).join(" → "));
    console.log("Postorder (L-R-root):", postorder(newTree).join(" → "));
  }, [inputStr]);

  const handleSearch = useCallback(() => {
    const val = Number(searchVal);
    if (isNaN(val)) return;
    const found = searchBST(tree, val);
    setSearchResult(found);
    console.log(`Search ${val}:`, found ? "✅ Found" : "❌ Not found");
  }, [searchVal, tree]);

  const traversalResult = traverse(tree, activeTraversal);
  const d3Data = toD3Tree(tree);

  const traversalColors: Record<TraversalType, string> = {
    inorder: "bg-indigo-600",
    preorder: "bg-violet-600",
    postorder: "bg-purple-600",
  };

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Challenge 08 — Binary Search Tree
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Insert values, traverse inorder / preorder / postorder, search, and visualize.
        </p>
      </div>

      {/* Input row */}
      <div className="flex gap-3 items-start flex-wrap">
        <div className="flex-1 min-w-0">
          <label className="text-xs text-slate-400 mb-1 block">Numbers (comma-separated)</label>
          <input
            value={inputStr}
            onChange={(e) => setInputStr(e.target.value)}
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="e.g. 50, 30, 70, 20"
          />
          {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
        </div>
        <button
          onClick={handleBuild}
          className="mt-5 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition"
        >
          Build Tree
        </button>
      </div>

      {/* Traversal tabs */}
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex gap-2 mb-3">
          {(["inorder", "preorder", "postorder"] as TraversalType[]).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTraversal(t)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition ${
                activeTraversal === t
                  ? `${traversalColors[t]} text-white`
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {traversalResult.map((val, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-slate-700 text-indigo-300 rounded-md text-sm font-mono"
            >
              {val}
            </span>
          ))}
          {!traversalResult.length && (
            <span className="text-slate-500 text-sm">No nodes yet.</span>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-3 items-center">
        <div>
          <label className="text-xs text-slate-400 mb-1 block">Search value</label>
          <input
            value={searchVal}
            onChange={(e) => { setSearchVal(e.target.value); setSearchResult(null); }}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-40 bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="e.g. 40"
          />
        </div>
        <button
          onClick={handleSearch}
          className="mt-5 px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-semibold transition"
        >
          Search
        </button>
        {searchResult !== null && (
          <span
            className={`mt-5 px-4 py-2 rounded-lg text-sm font-semibold ${
              searchResult ? "bg-emerald-900 text-emerald-300" : "bg-red-900 text-red-300"
            }`}
          >
            {searchResult ? `✅ ${searchVal} found` : `❌ ${searchVal} not found`}
          </span>
        )}
      </div>

      {/* Tree Visualization */}
      <div className="flex-1 min-h-[340px] bg-slate-800 rounded-xl border border-slate-700 overflow-hidden relative">
        <span className="absolute top-3 left-4 text-xs text-slate-500 z-10">
          react-d3-tree visualization
        </span>
        {d3Data ? (
          <Tree
            data={d3Data}
            orientation="vertical"
            renderCustomNodeElement={renderCustomNode as any}
            pathFunc="step"
            separation={{ siblings: 1.2, nonSiblings: 1.5 }}
            translate={{ x: 400, y: 60 }}
            zoom={0.8}
            pathClassFunc={() => "stroke-indigo-400 stroke-2 fill-none"}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-500">
            Build a tree to visualize it here.
          </div>
        )}
      </div>
    </div>
  );
}