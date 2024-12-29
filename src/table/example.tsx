import { useState } from "react";
import { Table } from "./table";
import type { TableColumn } from "./types";
import { MoreHorizontal, Check } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "User";
  status: "active" | "inactive" | "pending";
  joinDate: string;
  lastActive: string;
  projects: number;
  tasksCompleted: number;
}

const STATUS_OPTIONS = ["active", "inactive", "pending"] as const;
const ROLE_OPTIONS = ["Admin", "Editor", "User"] as const;

const StatusBadge = ({ status }: { status: User["status"] }) => {
  const styles = {
    active: "bg-green-100 text-green-800 border-green-200",
    inactive: "bg-red-100 text-red-800 border-red-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
};

const ActionMenu = () => (
  <div className="flex items-center gap-2">
    <button className="p-1 hover:bg-gray-100 rounded">
      <MoreHorizontal className="w-4 h-4" />
    </button>
  </div>
);

export function TableDemo() {
  // Generate sample data
  const [users] = useState<User[]>(() =>
    Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@example.com`,
      role: ROLE_OPTIONS[Math.floor(Math.random() * ROLE_OPTIONS.length)],
      status: STATUS_OPTIONS[Math.floor(Math.random() * STATUS_OPTIONS.length)],
      joinDate: new Date(
        Date.now() - Math.random() * 31536000000,
      ).toISOString(),
      lastActive: new Date(
        Date.now() - Math.random() * 2592000000,
      ).toISOString(),
      projects: Math.floor(Math.random() * 20),
      tasksCompleted: Math.floor(Math.random() * 100),
    })),
  );

  const columns: TableColumn<User>[] = [
    {
      key: "name",
      title: "Name",
      dataIndex: "name",
      width: 200,
      sorter: true,
      render: (value, record) => (
        <div>
          <div className="font-medium">{String(value)}</div>
          <div className="text-sm text-gray-500">{record.email}</div>
        </div>
      ),
    },
    {
      key: "role",
      title: "Role",
      dataIndex: "role",
      width: 120,
      sorter: true,
      filters: ROLE_OPTIONS.map((role) => ({ text: role, value: role })),
      render: (value) => (
        <span className="inline-flex items-center">
          {value === "Admin" && (
            <Check className="w-4 h-4 text-blue-500 mr-1" />
          )}
          {String(value)}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      dataIndex: "status",
      width: 120,
      filters: STATUS_OPTIONS.map((status) => ({
        text: status,
        value: status,
      })),
      render: (value, record) => <StatusBadge status={record.status} />,
    },
    {
      key: "joinDate",
      title: "Join Date",
      dataIndex: "joinDate",
      width: 150,
      sorter: true,
      render: (value) =>
        new Date(String(value)).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
    },
    {
      key: "lastActive",
      title: "Last Active",
      dataIndex: "lastActive",
      width: 150,
      sorter: true,
      render: (value) => {
        const date = new Date(String(value));
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return `${diffDays} days ago`;
      },
    },
    {
      key: "projects",
      title: "Projects",
      dataIndex: "projects",
      width: 100,
      sorter: (a, b) => a.projects - b.projects,
      align: "right",
      render: (value) => String(value),
    },
    {
      key: "tasksCompleted",
      title: "Tasks",
      dataIndex: "tasksCompleted",
      width: 100,
      sorter: (a, b) => a.tasksCompleted - b.tasksCompleted,
      align: "right",
      render: (value, record) => (
        <div className="flex items-center justify-end gap-1">
          <span>{record.tasksCompleted}</span>
          {record.tasksCompleted >= 50 && (
            <Check className="w-4 h-4 text-green-500" />
          )}
        </div>
      ),
    },
    {
      key: "actions",
      title: "",
      dataIndex: "id",
      width: 50,
      render: () => <ActionMenu />,
    },
  ];

  return (
    <div className="p-4 max-w-[1200px] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table<User>
          columns={columns}
          dataSource={users}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
          }}
          bordered
          size="middle"
        />
      </div>
    </div>
  );
}
