import { PixelRatio } from "react-native";

export interface Expense {
  name: string;
  category: string;
  amount: number;
}

export interface Balance {
  name: string;
  amount: number;
  color: string;
}

export const expenses: Expense[] = [
  { name: "Figma Pro", category: "Software", amount: 12 },
  { name: "Wireless Mouse", category: "Products`", amount: 15 },
  { name: "Photoshop", category: "Software", amount: 21 },
  { name: "Netflix", category: "Entertainment", amount: 15 },
  { name: "Keyboard", category: "Products", amount: 65 },
  { name: "GitHub Copilot", category: "Software", amount: 10 },
  { name: "Spotify", category: "Entertainment", amount: 6 },
  { name: "Milk & Bread", category: "Groceries", amount: 12 },
  { name: "Google Drive Storage", category: "Subscription", amount: 2 },
  { name: "Notion", category: "Subscription", amount: 4 },
  { name: "Desk Lamp", category: "Products", amount: 20 },
  { name: "Laptop Stand", category: "Products", amount: 30 },
];

export const balance: Balance[] = [
  { name: "Total Balance", amount: 1000, color: "#A0522D" },
  { name: "Total Expenses", amount: 500, color: "#B22222" },
  { name: "Total Income", amount: 1500, color: "#1E3A8A" },
];

export const FACTOR = PixelRatio.getPixelSizeForLayoutSize(2);
