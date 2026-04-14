import type { BSTNode, BSTNodeData, TraversalType } from "../types";

// ─── Insert ──────────────────────────────────────────────────────────────────

export function insertBST(root: BSTNode | null, value: number): BSTNode {
  if (!root) return { value, left: null, right: null };
  if (value < root.value) return { ...root, left: insertBST(root.left, value) };
  if (value > root.value) return { ...root, right: insertBST(root.right, value) };
  return root; // duplicate – ignore
}

export function buildBST(values: number[]): BSTNode | null {
  return values.reduce<BSTNode | null>((root, v) => insertBST(root, v), null);
}

// ─── Traversals ───────────────────────────────────────────────────────────────

export function inorder(node: BSTNode | null, result: number[] = []): number[] {
  if (!node) return result;
  inorder(node.left, result);
  result.push(node.value);
  inorder(node.right, result);
  return result;
}

export function preorder(node: BSTNode | null, result: number[] = []): number[] {
  if (!node) return result;
  result.push(node.value);
  preorder(node.left, result);
  preorder(node.right, result);
  return result;
}

export function postorder(node: BSTNode | null, result: number[] = []): number[] {
  if (!node) return result;
  postorder(node.left, result);
  postorder(node.right, result);
  result.push(node.value);
  return result;
}

export function traverse(node: BSTNode | null, type: TraversalType): number[] {
  switch (type) {
    case "inorder":   return inorder(node);
    case "preorder":  return preorder(node);
    case "postorder": return postorder(node);
  }
}

// ─── Search ───────────────────────────────────────────────────────────────────

export function searchBST(root: BSTNode | null, value: number): boolean {
  if (!root) return false;
  if (root.value === value) return true;
  return value < root.value
    ? searchBST(root.left, value)
    : searchBST(root.right, value);
}

// ─── Convert to react-d3-tree format ─────────────────────────────────────────

export function toD3Tree(node: BSTNode | null): BSTNodeData | null {
  if (!node) return null;
  const d3Node: BSTNodeData = { id: String(node.value), name: String(node.value) };
  const children: BSTNodeData[] = [];
  const left = toD3Tree(node.left);
  const right = toD3Tree(node.right);
  if (left)  children.push({ ...left,  attributes: { side: "L" } });
  if (right) children.push({ ...right, attributes: { side: "R" } });
  if (children.length) d3Node.children = children;
  return d3Node;
}