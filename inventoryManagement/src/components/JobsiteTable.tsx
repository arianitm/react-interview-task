import { Table, Input, Button, Card, Row, Col } from "antd";
import { useState, useMemo } from "react";
import { useJobsiteContext } from "../context/JobsiteContext";
import { useNavigate } from "react-router-dom";
import { StatusTag } from "./StatusTag";
import CreateJobsiteModal from "./CreateJobsiteModal";

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
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card style={{ backgroundColor: "#ECDE7C", textAlign: "center" }}>
            <h2>{counters["In Progress"]} On Road</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ backgroundColor: "#7AC14D", textAlign: "center" }}>
            <h2>{counters["Completed"]} Completed</h2>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ backgroundColor: "#FE4C4A", textAlign: "center" }}>
            <h2>{counters["On Hold"]} On Hold</h2>
          </Card>
        </Col>
      </Row>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ fontWeight: "bold", fontSize: "16px" }}>Title</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Input.Search
            placeholder="Search a driver"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: 300 }}
          />
          <Button type="primary" onClick={() => setModalOpen(true)}>
            Create
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <CreateJobsiteModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
