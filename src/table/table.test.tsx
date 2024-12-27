import { render, screen } from "@testing-library/react";
import { Table } from "./table";
import { TableColumn } from "./types";

interface TestData {
  id: number;
  name: string;
  age: number;
}

const mockData: TestData[] = [
  { id: 1, name: "John", age: 20 },
  { id: 2, name: "Doe", age: 30 },
  { id: 3, name: "Jane", age: 25 },
];

const mockColumns: TableColumn<TestData>[] = [
  { key: "id", title: "id", dataIndex: "id" },
  { key: "name", title: "name", dataIndex: "name" },
  { key: "age", title: "age", dataIndex: "age" },
];

describe("<Table />", () => {
  it("should render table headers correctly", () => {
    render(<Table columns={mockColumns} data={mockData} />);
    mockColumns.forEach((column) => {
      expect(screen.getByText(column.title)).toBeInTheDocument();
    });
  });

  it("should render table data correctly", () => {
    render(<Table columns={mockColumns} data={mockData} />);
    mockData.forEach((data) => {
      expect(screen.getByText(data.id)).toBeInTheDocument();
      expect(screen.getByText(data.name)).toBeInTheDocument();
      expect(screen.getByText(data.age)).toBeInTheDocument();
    });
  });

  it("should show the loading state when loading", () => {
    render(<Table columns={mockColumns} loading={true} data={[]} />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
