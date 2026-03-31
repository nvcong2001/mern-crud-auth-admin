import { Form, Input, Switch } from "antd";
import AppModal from "../../components/common/AppModal";
import categoryService from "../../apis/CategoryService";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  categoryId?: string;
};

const ModalCategories = ({ open, onClose, onSuccess, categoryId }: Props) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const value = await form.validateFields();
      if (categoryId) {
        await categoryService.updateCategory(categoryId, value);
      } else {
        await categoryService.createCategory(value);
      }
      form.resetFields();
      onClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!open) return;
    if (categoryId) {
      categoryService.getCategoryById(categoryId).then((res) => {
        form.setFieldsValue(res.data);
      });
    } else form.resetFields();
  }, [categoryId, open]);

  return (
    <AppModal
      title={categoryId ? "Chỉnh sửa danh mục" : "Tạo danh mục mới"}
      open={open}
      onCancel={onClose}
      onOk={handleOk}
      okText={categoryId ? "Lưu thay đổi" : "Tạo"}
      cancelText="Hủy"
    >
      <Form layout="vertical" form={form} initialValues={{ isActive: true }}>
        <Form.Item
          label="Tên danh mục"
          name="name"
          rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
        >
          <Input
            className="w-full p-2 border rounded"
            placeholder="Nhập tên danh mục"
          />
        </Form.Item>

        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true, message: "Vui lòng nhập slug!" }]}
        >
          <Input
            className="w-full p-2 border rounded"
            placeholder="Nhập slug: ví dụ: ao-thun-nam"
          />
        </Form.Item>

        <Form.Item label="Trạng thái" name="isActive" valuePropName="checked">
          <Switch />
        </Form.Item>
      </Form>
    </AppModal>
  );
};

export default ModalCategories;
