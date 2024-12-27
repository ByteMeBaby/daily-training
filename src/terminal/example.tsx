import { TerminalProvider } from "./terminalProvider";
import { Terminal } from "./terminal";

const TerminalExample = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Terminal Verification</h1>

      <div className="space-y-2">
        <p>Try these commands:</p>
        <ul className="list-disc ml-6">
          <li>help (shows all commands)</li>
          <li>hello [your name]</li>
          <li>chart (displays a sample chart)</li>
          <li>calc 2 + 2</li>
          <li>clear (clears the terminal)</li>
        </ul>
      </div>

      <div className="border border-gray-200 rounded-lg shadow-lg">
        <TerminalProvider>
          <Terminal />
        </TerminalProvider>
      </div>
    </div>
  );
};

export default TerminalExample;
