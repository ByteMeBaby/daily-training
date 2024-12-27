import { createContext } from "react";
import { TerminalContextValue } from "./types";

export const TerminalContext = createContext<TerminalContextValue | undefined>(
  undefined,
);
