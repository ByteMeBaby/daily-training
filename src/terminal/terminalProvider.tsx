import React, { useCallback, useState } from "react";
import { TerminalHistory, TerminalOutput, defaultTheme } from "./types";
import { parseCommand } from "./utils";
import { commands } from "./commands";
import { TerminalContext } from "./terminalContext";

export const TerminalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [history, setHistory] = useState<TerminalHistory[]>([]);

  const addCommand = useCallback(async (commandStr: string) => {
    const command = parseCommand(commandStr);
    let output: TerminalOutput[];

    if (command.command === "clear") {
      setHistory([]);
      return;
    }

    const handler = commands[command.command as keyof typeof commands];
    if (handler) {
      try {
        const result = await handler(command.args);
        output = [result];
      } catch {
        output = [
          {
            content: "Command execution failed",
            type: "error",
            id: Date.now().toString(),
            timestamp: new Date(),
          },
        ];
      }
    } else {
      output = [
        {
          content: `Command not found: ${command.command}`,
          type: "error",
          id: Date.now().toString(),
          timestamp: new Date(),
        },
      ];
    }

    setHistory((prev) => [...prev, { command, output }]);
  }, []);

  const value = {
    history,
    addCommand,
    theme: defaultTheme,
  };

  return (
    <TerminalContext.Provider value={value}>
      {children}
    </TerminalContext.Provider>
  );
};
