import type { TreeNode, NodeType } from "../types";


export function buildTree(flatNodes: Omit<TreeNode, "children">[]): TreeNode[] {
  const map: Record<string, TreeNode> = {};

 
  flatNodes.forEach((node) => {
    map[node.id] = { ...node, children: [] };
  });

  const roots: TreeNode[] = [];


  flatNodes.forEach((node) => {
    if (node.parentId === null) {
      roots.push(map[node.id]);
    } else if (map[node.parentId]) {
      map[node.parentId].children.push(map[node.id]);
    }
  });

  return roots;
}

export function createNode(
  id: string,
  name: string,
  type: NodeType,
  createdBy: string,
  parentId: string | null
): Omit<TreeNode, "children"> {
  return { id, name, type, createdBy, parentId };
}


export function canHaveChildren(node: TreeNode): boolean {
  return node.type === "folder";
}