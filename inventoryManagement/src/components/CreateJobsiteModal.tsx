import { Modal, Form, Input, Select, Button, Typography } from "antd";
import { useJobsiteContext } from "../context/JobsiteContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";

const { Option } = Select;
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
    <Modal title="Title" open={open} onCancel={onClose} footer={null} centered>
      <Text type="secondary" style={{ marginBottom: 16, display: "block" }}>
        Informative piece of text that can be used regarding this modal.
      </Text>

      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={{ status: "In Progress" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input placeholder="Type the jobsite’s name" />
        </Form.Item>

        <Form.Item
          label="Category Included"
          name="categories"
          rules={[{ required: true, message: "Select at least one category" }]}
        >
          <Select mode="multiple" placeholder="Select">
            {categoryOptions.map((cat) => (
              <Option key={cat} value={cat}>
                {cat}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select status" }]}
        >
          <Select placeholder="Select one">
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
            <Button danger onClick={onClose}>
              Cancel Changes
            </Button>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
