export type NodeType = "folder" | "file";

export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  createdBy: string;   
  parentId: string | null;
  children: TreeNode[];
}