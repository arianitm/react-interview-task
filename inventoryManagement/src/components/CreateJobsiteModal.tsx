import { Modal, Form, Input, Select, Button, Typography } from "antd";
import { useJobsiteContext } from "../context/JobsiteContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import renderStatusOption from "../utils/Status";
import { renderCategoryOption } from "../utils/CategoryOptions";

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

const statusOptions = ["Completed", "In Progress", "On Hold"];
const categoryOptions = ["Sidewalk Shed", "Scaffold", "Shoring"];

export default function CreateJobsiteModal({ open, onClose }: Props) {
  const [form] = Form.useForm();
  const { addJobsite } = useJobsiteContext();

  const handleSubmit = (values: any) => {
    addJobsite({
      id: uuidv4(),
      name: values.name,
      status: values.status,
      categories: values.categories,
    });
    form.resetFields();
    onClose();
  };

  useEffect(() => {
    if (!open) form.resetFields();
  }, [open, form]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined style={{ fontSize: 18 }} />}
      centered
      title={null}
    >
      {/* Custom Figma Title Header */}
      <div
        style={{
          padding: "12px 0",
          marginBottom: 16,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, paddingLeft: 8 }}>
          Create Job Post
        </Typography.Title>
      </div>

      <div style={{ paddingBottom: "10px" }}>
        <InfoCircleOutlined style={{ color: "#1890ff", paddingRight: "5px" }} />
        <Text type="secondary">
          Informative piece of text that can be used regarding this modal.
        </Text>
      </div>
      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <Form.Item
          label="
           Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Type the jobsite’s name" />
        </Form.Item>

        <div
          style={{
            display: "flex",
            gap: 5,
            paddingBottom: "10px",
          }}
        >
          <Form.Item
            style={{ width: "70%" }}
            label="Category Included"
            name="categories"
            rules={[
              { required: true, message: "Select at least one category" },
            ]}
          >
            <Select mode="multiple" placeholder="Select">
              {categoryOptions.map((cat) => (
                <Select.Option key={cat} value={cat}>
                  {renderCategoryOption(cat)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "30%" }}
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="Select one" optionLabelProp="label">
              {statusOptions.map((status) => (
                <Select.Option
                  key={status}
                  value={status}
                  label={renderStatusOption(status)}
                >
                  {renderStatusOption(status)}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button
              style={{
                backgroundColor: "#FE4C4A",
                color: "#fff",
                borderColor: "#FE4C4A",
              }}
              icon={<CloseOutlined />}
              iconPosition="end"
              onClick={onClose}
            >
              Cancel Changes
            </Button>
            <Button
              style={{
                backgroundColor: "#7AC14D",
                borderColor: "#7AC14D",
                color: "#fff",
              }}
              htmlType="submit"
              icon={<CheckOutlined />}
              iconPosition="end"
            >
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
