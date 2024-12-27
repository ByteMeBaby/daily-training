import React, {
  useContext,
  useCallback,
  useState,
  useRef,
  useEffect,
} from "react";
import { TerminalContext } from "./terminalContext";

export const Terminal: React.FC = () => {
  const context = useContext(TerminalContext);
  if (!context) {
    throw new Error("Terminal must be used within TerminalProvider");
  }

  const { history, addCommand, theme } = context;
  const [input, setInput] = useState("");
  const [, setHistoryIndex] = useState(-1);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (input.trim()) {
          addCommand(input);
          setInput("");
          setHistoryIndex(-1);
        }
      }
    },
    [input, addCommand],
  );

  return (
    <div
      className="h-[600px] rounded-lg overflow-hidden font-mono"
      style={{ backgroundColor: theme.background }}
    >
      <div
        ref={terminalRef}
        className="h-full overflow-y-auto p-4 pb-16"
        role="log"
        aria-label="Terminal output"
      >
        {/* Initial Greeting */}
        <div className="text-green-400 font-bold">
          Terminal Test Suite - Type 'help' for commands
        </div>

        {/* Command History */}
        {history.map((entry, index) => (
          <div key={`${entry.command.timestamp}-${index}`} className="mt-4">
            <div className="flex gap-2">
              <span style={{ color: theme.prompt }}>❯</span>
              <span style={{ color: theme.text }}>
                {entry.command.command} {entry.command.args.join(" ")}
              </span>
            </div>
            <div className="ml-4 mt-1">
              {entry.output.map((out) => (
                <div
                  key={out.id}
                  style={{ color: theme[out.type] }}
                  className="break-words"
                >
                  {out.content}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div
        className="absolute bottom-0 left-0 right-0 p-4"
        style={{ backgroundColor: theme.background }}
      >
        <div className="flex gap-2 items-start">
          <span style={{ color: theme.prompt }}>❯</span>
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent border-none outline-none resize-none"
            style={{ color: theme.text }}
            rows={1}
            aria-label="Terminal input"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};
