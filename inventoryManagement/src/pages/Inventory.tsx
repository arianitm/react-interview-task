// ✅ pages/Inventory.tsx (Ant Design Table version)
import { useParams, useNavigate } from "react-router-dom";
import { useJobsiteContext } from "../context/JobsiteContext";
import { useState, useEffect } from "react";
import { Button, Empty, Typography, Table } from "antd";
import EditInventoryModal from "../components/EditInventoryModal";
import { EditOutlined, RollbackOutlined } from "@ant-design/icons";

export default function Inventory() {
  const { jobsiteId } = useParams();
  const { jobsites } = useJobsiteContext();
  const navigate = useNavigate();
  const jobsite = jobsites.find((j) => j.id === jobsiteId);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [categoryItems, setCategoryItems] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCategory) {
      setCategoryItems([
        {
          key: "1",
          item: `${selectedCategory} Beam`,
          quantity: 20,
          description: "Heavy duty beam for structure",
          notes: "",
        },
        {
          key: "2",
          item: `${selectedCategory} Clamp`,
          quantity: 10,
          description: "Standard scaffold clamp",
          notes: "",
        },
      ]);
    } else {
      setCategoryItems([]);
    }
  }, [selectedCategory]);

  const handleSave = (updated: any) => {
    setCategoryItems((prev) =>
      prev.map((item) => (item.key === updated.key ? updated : item))
    );
    setEditItem(null);
  };

  const columns = [
    {
      title: "Item",
      dataIndex: "item",
      key: "item",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "",
      key: "edit",
      render: (_: any, record: any) => (
        <Button
          icon={<EditOutlined />}
          iconPosition="end"
          type="link"
          onClick={() => setEditItem(record)}
        ></Button>
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        padding: 24,
        gap: 16,
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: 260,
          minWidth: 260,
          background: "#fff",
          borderRadius: 8,
          padding: 16,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title level={5} style={{ marginBottom: 24 }}>
          {jobsite?.name || "Unknown Jobsite"}
        </Typography.Title>

        {jobsite?.categories.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "12px 16px",
              backgroundColor: selectedCategory === cat ? "#e6f7ff" : "#f5f5f5",
              borderRadius: 4,
              marginBottom: 10,
              cursor: "pointer",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            {cat}
          </div>
        ))}

        <Button
          type="primary"
          onClick={() => navigate(-1)}
          block
          icon={<RollbackOutlined />}
          iconPosition="end"
          style={{ marginTop: 24 }}
        >
          Go Back
        </Button>
      </div>

      {/* Main Data Grid Area */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          padding: 24,
          borderRadius: 8,
          boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography.Title level={5} style={{ marginBottom: 16 }}>
          Data Grid
        </Typography.Title>

        {selectedCategory ? (
          <Table
            columns={columns}
            dataSource={categoryItems}
            pagination={false}
            bordered
            style={{ fontSize: 15 }}
          />
        ) : (
          <div
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: 64,
            }}
          >
            <Empty description="No Service Selected" />
          </div>
        )}

        {editItem && (
          <EditInventoryModal
            item={editItem}
            onClose={() => setEditItem(null)}
            onSave={handleSave}
          />
        )}
      </div>
    </div>
  );
}
