import { Button, Checkbox, Flex, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [form] = Form.useForm();
  const { signUp } = useAuthStore();
  const nav = useNavigate();

  const onFinish = async () => {
    try {
      const values = await form.validateFields();
      await signUp(
        values.username,
        values.password,
        values.email,
        values.firstName,
        values.lastName,
      );
      form.resetFields();
      nav("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form
      form={form}
      name="register"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your FirstName!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="FirstName" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your LastName!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="LastName" />
      </Form.Item>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ required: true, message: "Please input your Email!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your Password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Mật khẩu không khớp!");
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Confirm Password"
        />
      </Form.Item>

      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a href="">Forgot password</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Register
        </Button>
        or <a href="signin">Log in now!</a>
      </Form.Item>
    </Form>
  );
};

export default SignUpPage;
