import { ReactNode } from "react";

export type TerminalOutput = {
  content: string | ReactNode;
  type: "success" | "error" | "info" | "warning";
  id: string;
  timestamp: Date;
};

export type TerminalCommand = {
  command: string;
  args: string[];
  timestamp: Date;
};

export type TerminalHistory = {
  command: TerminalCommand;
  output: TerminalOutput[];
};

export type TerminalContextValue = {
  history: TerminalHistory[];
  addCommand: (command: string) => Promise<void>;
  theme: typeof defaultTheme;
};

// Default theme configuration
export const defaultTheme = {
  background: "#1a1a1a",
  text: "#ffffff",
  prompt: "#00ff00",
  success: "#00ff00",
  error: "#ff0000",
  info: "#0099ff",
  warning: "#ffcc00",
};
