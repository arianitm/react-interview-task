import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Typography,
  Select,
} from "antd";
import { useEffect } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

const { Text } = Typography;
const { Option } = Select;

interface Props {
  item: any;
  onClose: () => void;
  onSave: (updated: any) => void;
}

export default function EditInventoryModal({ item, onClose, onSave }: Props) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(item);
  }, [item, form]);

  const handleSubmit = (values: any) => {
    onSave({ ...item, ...values });
    form.resetFields();
  };

  return (
    <Modal
      open={!!item}
      onCancel={onClose}
      footer={null}
      width={800}
      centered
      closeIcon={<CloseOutlined style={{ fontSize: 18 }} />}
      bodyStyle={{ paddingTop: 0, borderRadius: 12 }}
      style={{ borderRadius: 12 }}
      title={null}
    >
      <div
        style={{
          padding: "12px 0",
          marginBottom: 16,
        }}
      >
        <Typography.Title level={4} style={{ margin: 0, paddingLeft: 8 }}>
          Title
        </Typography.Title>
      </div>

      <div style={{ paddingBottom: "10px" }}>
        <InfoCircleOutlined style={{ color: "#1890ff", paddingRight: "5px" }} />
        <Text type="secondary">
          Informative piece of text that can be used regarding this modal.
        </Text>
      </div>

      <Form layout="vertical" form={form} onFinish={handleSubmit}>
        <div style={{ display: "flex", gap: 5 }}>
          <Form.Item
            style={{ width: "50%" }}
            label="Item"
            name="item"
            rules={[{ required: true, message: "Please select an item" }]}
          >
            <Select placeholder="Search & Select item">
              <Option value="Beam">Beam</Option>
              <Option value="Board">Board</Option>
              <Option value="Clamp">Clamp</Option>
            </Select>
          </Form.Item>

          <Form.Item
            style={{ width: "50%" }}
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Enter quantity" }]}
          >
            <InputNumber
              min={0}
              style={{ width: "100%" }}
              placeholder="Set Quantity"
            />
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Type the description…" />
        </Form.Item>

        <Form.Item label="Notes" name="notes">
          <Input.TextArea rows={2} placeholder="Type a note…" />
        </Form.Item>

        <Form.Item>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              style={{
                backgroundColor: "#7AC14D",
                borderColor: "#7AC14D",
                color: "#fff",
              }}
              icon={<CheckOutlined />}
              iconPosition="end"
              type="primary"
              htmlType="submit"
            >
              Save Changes
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
}
