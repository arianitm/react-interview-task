import { Tag } from "antd";

export const StatusTag = ({ status }: { status: string }) => {
  const colorMap: Record<string, string> = {
    Completed: "#7AC14D",
    "In Progress": "#ECDE7C",
    "On Hold": "#FE4C4A",
  };

  return <Tag color={colorMap[status] || "default"}>{status}</Tag>;
};
