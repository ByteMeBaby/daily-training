import { TerminalCommand } from "./types";

export const parseCommand = (input: string): TerminalCommand => {
  const parts = input.trim().split(" ");
  return {
    command: parts[0],
    args: parts.slice(1),
    timestamp: new Date(),
  };
};
