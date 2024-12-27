import { LineChart, Line, XAxis, CartesianGrid, Legend } from "recharts";
import { TerminalOutput } from "./types";
import { chartData } from "./data";

export const commands = {
  help: async (): Promise<TerminalOutput> => ({
    content: (
      <div className="space-y-1">
        <div>Available commands:</div>
        <div className="ml-2">• hello [name] - Greet with name</div>
        <div className="ml-2">• chart - Display sample chart</div>
        <div className="ml-2">• calc [expression] - Calculate</div>
        <div className="ml-2">• clear - Clear terminal</div>
      </div>
    ),
    type: "info",
    id: Date.now().toString(),
    timestamp: new Date(),
  }),

  hello: async (args: string[]): Promise<TerminalOutput> => ({
    content: `Hello ${args.join(" ") || "World"}!`,
    type: "success",
    id: Date.now().toString(),
    timestamp: new Date(),
  }),

  chart: async (): Promise<TerminalOutput> => ({
    content: (
      <div className="w-full h-64">
        <LineChart width={500} height={200} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    ),
    type: "info",
    id: Date.now().toString(),
    timestamp: new Date(),
  }),

  calc: async (args: string[]): Promise<TerminalOutput> => {
    try {
      const result = eval(args.join(" "));
      return {
        content: `Result: ${result}`,
        type: "success",
        id: Date.now().toString(),
        timestamp: new Date(),
      };
    } catch {
      return {
        content: "Error: Invalid expression",
        type: "error",
        id: Date.now().toString(),
        timestamp: new Date(),
      };
    }
  },
};
