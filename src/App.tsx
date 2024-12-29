import "./App.css";
import { CustomTableDemo } from "./table/customTable";
import { TableDemo } from "./table/example";

function App() {
  return (
    <div>
      <h1>Default table</h1>
      <TableDemo />
      <h1>Custom table</h1>
      <CustomTableDemo />
    </div>
  );
}

export default App;
