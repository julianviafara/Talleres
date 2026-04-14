import type { MenuNode } from "../types";

// ─── N-ary tree definition ────────────────────────────────────────────────────
// Each node: { id, title, link, component, children? }

export const menuTree: MenuNode = {
  id: "root",
  title: "App",
  link: "/",
  component: "Home",
  children: [
    {
      id: "profile",
      title: "Profile",
      link: "/profile",
      component: "ProfilePage",
    },
    {
      id: "messages",
      title: "Messages",
      link: "/messages",
      component: "MessagesPage",
    },
    {
      id: "settings",
      title: "Settings",
      link: "/settings",
      component: "SettingsPage",
      children: [
        {
          id: "account",
          title: "Account",
          link: "/settings/account",
          component: "AccountPage",
        },
        {
          id: "profile-settings",
          title: "Profile",
          link: "/settings/profile",
          component: "ProfileSettingsPage",
        },
        {
          id: "security",
          title: "Security & Privacy",
          link: "/settings/security",
          component: "SecurityPage",
        },
        {
          id: "password",
          title: "Password",
          link: "/settings/password",
          component: "PasswordPage",
        },
        {
          id: "notifications",
          title: "Notifications",
          link: "/settings/notifications",
          component: "NotificationsPage",
        },
      ],
    },
    {
      id: "help",
      title: "Help",
      link: "/help",
      component: "HelpPage",
      children: [
        {
          id: "faqs",
          title: "FAQs",
          link: "/help/faqs",
          component: "FAQsPage",
        },
        {
          id: "submit-ticket",
          title: "Submit a Ticket",
          link: "/help/ticket",
          component: "TicketPage",
        },
        {
          id: "network-status",
          title: "Network Status",
          link: "/help/network",
          component: "NetworkStatusPage",
        },
      ],
    },
    {
      id: "logout",
      title: "Logout",
      link: "/logout",
      component: "LogoutPage",
    },
  ],
};

// ─── Helper: flatten tree to list (BFS) ──────────────────────────────────────

export function flattenMenuTree(root: MenuNode): MenuNode[] {
  const result: MenuNode[] = [];
  const queue: MenuNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    result.push(node);
    node.children?.forEach((c) => queue.push(c));
  }
  return result;
}

// ─── Helper: find node by id ──────────────────────────────────────────────────

export function findMenuNode(root: MenuNode, id: string): MenuNode | null {
  if (root.id === id) return root;
  for (const child of root.children ?? []) {
    const found = findMenuNode(child, id);
    if (found) return found;
  }
  return null;
}