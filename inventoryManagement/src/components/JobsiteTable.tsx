import { Table, Input, Button, Card, Row, Col, Typography } from "antd";
import { useState, useMemo } from "react";
import { useJobsiteContext } from "../context/JobsiteContext";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "./StatusTag";
import CreateJobsiteModal from "./CreateJobsiteModal";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";
import "./JobsiteTable.css";

const { Text } = Typography;

export default function JobsiteTable() {
  const { jobsites } = useJobsiteContext();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const filtered = jobsites.filter((job) =>
    job.name.toLowerCase().includes(search.toLowerCase())
  );

  const counters = useMemo(() => {
    const statusCount = {
      "On Hold": 0,
      Completed: 0,
      "In Progress": 0,
    };
    jobsites.forEach((j) => {
      statusCount[j.status]++;
    });
    return statusCount;
  }, [jobsites]);

  const columns = [
    {
      title: "Jobsite Name",
      dataIndex: "name",
      render: (text: string, record: any) => (
        <a onClick={() => navigate(`/inventory/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status: string) => <StatusTag status={status} />,
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      {/* Status Summary */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: "#ECDE7C",
              borderRadius: 12,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2 style={{ margin: 0 }}>{counters["In Progress"]} On Road</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: "#7AC14D",
              borderRadius: 12,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2 style={{ margin: 0 }}>{counters["Completed"]} Completed</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            style={{
              backgroundColor: "#FE4C4A",
              borderRadius: 12,
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2 style={{ margin: 0 }}>{counters["On Hold"]} On Hold</h2>
          </Card>
        </Col>
      </Row>

      {/* Title + Info + Search/Create */}
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          background: "#fff",
        }}
      >
        <div
          style={{
            backgroundColor: "#F8F8FA",
            padding: "10px",
            borderRadius: "10px",
          }}
        >
          <Text strong style={{ fontSize: 16 }}>
            Title
          </Text>
        </div>

        <div
          style={{
            margin: "8px 0 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 8,
            padding: "10px",
          }}
        >
          <div>
            <InfoCircleOutlined
              style={{ color: "#1890ff", paddingRight: "5px" }}
            />
            <Text type="secondary">
              Informative piece of text that can be used regarding this modal.
            </Text>
          </div>
          <div>
            <Input.Search
              placeholder="Search a driver"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 300, paddingRight: "20px" }}
            />

            <Button
              icon={<PlusOutlined />}
              iconPosition="end"
              onClick={() => setModalOpen(true)}
              style={{
                backgroundColor: "#7AC14D",
                borderColor: "#7AC14D",
                color: "#fff",
              }}
            >
              Create
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          bordered
          className="jobsite-table"
          rowClassName={() => "jobsite-table-row"}
        />

        <CreateJobsiteModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      </div>
    </div>
  );
}
