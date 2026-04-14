// ─── Challenge 08 – Binary Search Tree ───────────────────────────────────────

export interface BSTNodeData {
    id: string;
    name: string;    // required by react-d3-tree
    children?: BSTNodeData[];
    attributes?: Record<string, string | number>;
  }
  
  export interface BSTNode {
    value: number;
    left: BSTNode | null;
    right: BSTNode | null;
  }
  
  export type TraversalType = "inorder" | "postorder" | "preorder";
  
  // ─── Challenge 09 – N-ary Tree Sidebar ───────────────────────────────────────
  
  export interface MenuNode {
    id: string;
    title: string;
    link: string;
    component: string;        // name of the "page" component to render
    children?: MenuNode[];
  }