import "./App.css";
import { Table } from "./table/table";
import { TableColumn } from "./table/types";
import TerminalExample from "./terminal/example";

interface User {
  id: number;
  name: string;
  age: number;
}

function App() {
  const data: User[] = [
    { id: 1, name: "John Doe", age: 32 },
    { id: 2, name: "Jane Doe", age: 31 },
  ];

  const columns: TableColumn<User>[] = [
    {
      title: "ID",
      key: "id",
      dataIndex: "id",
      render: (value) => <span>{value}</span>,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Age",
      key: "age",
      dataIndex: "age",
    },
  ];
  return (
    <>
      <Table<User> data={data} columns={columns} />
      <TerminalExample />
    </>
  );
}

export default App;
